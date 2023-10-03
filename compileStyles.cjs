const less = require('less');
const fs = require('fs');

const lessContent = fs.readFileSync('./src/index.less', 'utf8');

const options = {
    compress: true,
};

less.render(lessContent, options, (err, output) => {
    if (err) {
        console.error('Error compiling LESS:', err);
        return;
    }

    const cssContent = output.css;

    const jsContent = `export default \`${cssContent}\`;`;

    fs.writeFileSync('./src/styles.ts', jsContent, 'utf8');
});
