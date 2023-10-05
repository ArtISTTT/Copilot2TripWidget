const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = './src/assets/images';
const OUTPUT_FILE = './src/images.ts';

function getFiles(dir) {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    const files = dirents.map(dirent => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    });
    return Array.prototype.concat(...files);
}

const imageFiles = getFiles(IMAGES_DIR);

const imagesPromises = imageFiles.map(filePath => {
    const file = path.basename(filePath);

    // Sharp не обрабатывает svg и возвращает ошибку - обрабатываем их отдельно
    if (path.extname(file) === '.svg') {
        const svgContent = fs.readFileSync(filePath, 'utf8');
        const base64Image = `data:image/svg+xml;base64,${Buffer.from(
            svgContent
        ).toString('base64')}`;
        return Promise.resolve([file, base64Image]);
    }

    // Иначе обрабатываем с помощью sharp
    return sharp(filePath)
        .toBuffer()
        .then(buffer => {
            const base64Image = `data:image/${path
                .extname(file)
                .slice(1)};base64,${buffer.toString('base64')}`;
            return [file, base64Image];
        })
        .catch(error => {
            console.error(`Ошибка при обработке файла ${file}:`, error.message);
            return [file, null]; // Возвращаем null, чтобы файл не вносил вклад в итоговый результат
        });
});

Promise.all(imagesPromises).then(images => {
    const imagesObject = images.reduce((obj, [filename, base64]) => {
        if (base64) {
            // Убедимся, что у нас есть допустимое значение base64
            const key = path.basename(filename, path.extname(filename));
            obj[key] = base64;
        }
        return obj;
    }, {});

    // Записываем в файл объект с base64-изображениями
    const jsContent = `export default ${JSON.stringify(
        imagesObject,
        null,
        2
    )} as Record<string, string>;`;
    fs.writeFileSync(OUTPUT_FILE, jsContent, 'utf8');
});
