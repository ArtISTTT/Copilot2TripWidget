const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = './src/assets/images';
const OUTPUT_FILE = 'path-to-output-dir/images.js';

const imageFiles = fs.readdirSync(IMAGES_DIR);

const imagesPromises = imageFiles.map(file => {
    const filePath = path.join(IMAGES_DIR, file);

    return sharp(filePath)
        .toBuffer()
        .then(buffer => {
            const base64Image = `data:image/${path
                .extname(file)
                .slice(1)};base64,${buffer.toString('base64')}`;
            return [file, base64Image];
        });
});

Promise.all(imagesPromises).then(images => {
    const imagesObject = images.reduce((obj, [filename, base64]) => {
        const key = path.basename(filename, path.extname(filename)); // используем имя файла без расширения как ключ объекта
        obj[key] = base64;
        return obj;
    }, {});

    const jsContent = `export default ${JSON.stringify(
        imagesObject,
        null,
        2
    )};`;
    fs.writeFileSync(OUTPUT_FILE, jsContent, 'utf8');
});
