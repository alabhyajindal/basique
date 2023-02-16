const fs = require('fs');
const path = require('path');

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

function main() {
  const PROJECT_NAME = 'my-zeta-app';
  const projectPath = `${process.cwd()}/${PROJECT_NAME}`;

  console.log('Creating your project...');
  createProjectFolder(projectPath);
  copyDirectory(`${__dirname}/sourceFiles`, projectPath);
  console.log('Project created!');
}

module.exports = { main };
