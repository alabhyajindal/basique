const fs = require('fs');

const PROJECT_NAME = 'my-zeta-app';

function createHomePage() {
  const src = fs.readFileSync(`${__dirname}/sourceFiles/index.html`, 'utf-8');
  const sourcePath = `./${PROJECT_NAME}/source`;

  fs.mkdir(`./${PROJECT_NAME}`, { recursive: true }, (err) => {
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
  console.log('Project created!');
}

module.exports = { main };
