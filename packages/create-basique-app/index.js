#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');
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

function main() {
  const rl = readline.createInterface({ input: stdin, output: stdout });
  rl.question(`What is your project named? `, (projectName) => {
    const templateFilesPath = path.join(`${__dirname}`, '..', '..', 'template');
    console.log(templateFilesPath);
    const projectPath = `${process.cwd()}/${projectName}`;
    console.log(`Creating a new Basique app in ${projectPath}...`);

    createProjectFolder(projectPath);
    copyDirectory(templateFilesPath, `${projectPath}`);
    console.log(`Done. Now run:

    cd ${projectName}
    npm install
    npm run dev
    `);
    rl.close();
  });
}

main();
