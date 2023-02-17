const fs = require('fs');
const path = require('path');
const readline = require('readline/promises');
const { stdin, stdout } = require('process');

function createProjectFolder(projectPath) {
  fs.mkdirSync(projectPath);
}

function copyDirectory(source, destination) {
  // Create the destination directory if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }

  // Get the list of files and folders in the source directory
  const files = fs.readdirSync(source);

  // Loop through the files and folders
  for (const file of files) {
    // Get the full path of the file or folder
    const sourcePath = path.join(source, file);
    const destinationPath = path.join(destination, file);

    // Get the stats for the current file or folder
    const stats = fs.statSync(sourcePath);

    // If it's a file, copy it to the destination
    if (stats.isFile()) {
      fs.copyFileSync(sourcePath, destinationPath);
    }
    // If it's a directory, recursively call the copyDirectory function
    else if (stats.isDirectory()) {
      copyDirectory(sourcePath, destinationPath);
    }
  }
}

async function main() {
  const rl = readline.createInterface({ input: stdin, output: stdout });
  const projectName = await rl.question('What is your project named?\n');
  rl.close();

  const sourceFilesPath = `${__dirname}/sourceFiles`;
  const projectPath = `${process.cwd()}/${projectName}`;
  console.log(`Creating a new Zeta app in ${projectPath}...`);

  createProjectFolder(projectPath);
  copyDirectory(sourceFilesPath, `${projectPath}`);
  console.log(`Done. Now run:
  
  cd ${projectName}
  npm install
  npm run dev
  `);
}

module.exports = { main };
