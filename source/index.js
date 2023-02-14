const showdown = require('showdown');
const fs = require('fs');

function createHomePage() {
  const src = fs.readFileSync('./source/index.html', 'utf-8');
  fs.mkdir('./dist', { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }
    fs.closeSync(fs.openSync('./dist/index.html', 'w'));
    fs.writeFile('./dist/index.html', src, (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
}

function createBlogPages({ files }) {
  files.forEach((file) => {
    const converter = new showdown.Converter();
    const text = fs.readFileSync(`./source/blog/${file}/index.md`, 'utf-8');
    const html = converter.makeHtml(text);
    const css = fs.readFileSync('./source/style.css', 'utf-8');
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
}

fs.readdir('./source/blog', (err, files) => {
  if (err) {
    console.error(err);
  }
  createHomePage();
  createBlogPages({ files });
});
