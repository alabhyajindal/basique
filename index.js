const showdown = require('showdown');
const fs = require('fs');

fs.readdir('./source', (err, files) => {
  files.forEach((file) => {
    const converter = new showdown.Converter();
    const text = fs.readFileSync(`./source/${file}/index.md`, 'utf-8');
    const html = converter.makeHtml(text);
    const css = fs.readFileSync('./style.css', 'utf-8');
    const src = `
    <style> 
      ${css}
    </style>
    ${html}`;

    const distFilePath = `./dist/${file}`;
    fs.mkdir(distFilePath, { recursive: true }, (err) => {
      if (err) {
        console.error(err);
      }
      fs.closeSync(fs.openSync(`${distFilePath}/index.html`, 'w'));
      fs.writeFile(`${distFilePath}/index.html`, src, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  });
});
