const fs = require('fs');

function createHomePage() {
  const src = fs.readFileSync(`${__dirname}/index.html`, 'utf-8');
  const sourcePath = './zeta-starter/source';

  fs.mkdir('./zeta-starter', { recursive: true }, (err) => {
    fs.mkdir(sourcePath, { recursive: true }, (err) => {
      if (err) {
        console.error(err);
      }
      fs.closeSync(fs.openSync(`${sourcePath}/index.html`, 'w'));
      fs.writeFile(`${sourcePath}/index.html`, src, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  });
}

function main() {
  console.log('Creating your project...');
  createHomePage();
}

module.exports = { main };
