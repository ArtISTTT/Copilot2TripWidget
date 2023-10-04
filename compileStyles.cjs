const less = require('less');
const fs = require('fs');
const path = require('path');

const lessContent = fs.readFileSync('./src/index.less', 'utf8');

const options = {
    compress: true,
};

const availableFonts = [
    {
        name: 'Montserrat-Bold.ttf',
        weight: 700,
    },
    {
        name: 'Montserrat-Regular.ttf',
        weight: 400,
    },
];

function fontToBase64(fontPath) {
    const fontData = fs.readFileSync(fontPath);
    return fontData.toString('base64');
}

const getFontFaces = () => {
    const fontsDir = './src/assets/fonts/';

    const fontFaces = availableFonts
        .map(font => {
            const fontPath = path.resolve(__dirname, fontsDir + font.name);
            const base64Font = fontToBase64(fontPath);

            return `
            @font-face {
                font-family: 'Montserrat';
                src: url(data:application/font-woff;charset=utf-8;base64,${base64Font}) format('truetype');
                font-weight: ${font.weight};
                font-style: normal;
                font-display: swap;
            }
        `;
        })
        .join('');

    return fontFaces;
};

less.render(lessContent, options, (err, output) => {
    if (err) {
        console.error('Error compiling LESS:', err);
        return;
    }

    const cssContent = output.css + getFontFaces();

    const jsContent = `export default \`${cssContent}\`;`;

    fs.writeFileSync('./src/styles.ts', jsContent, 'utf8');
});
