#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read package.json to get current version
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

// Update version in src/index.ts
const indexPath = path.join(__dirname, '..', 'src', 'index.ts');
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Replace version in the .version() call
indexContent = indexContent.replace(
  /\.version\('[\d.]+'\)/,
  `.version('${version}')`
);

fs.writeFileSync(indexPath, indexContent);

console.log(`✅ Updated version to ${version} in src/index.ts`);

// Update version in README.md if it exists
const readmePath = path.join(__dirname, '..', 'README.md');
if (fs.existsSync(readmePath)) {
  let readmeContent = fs.readFileSync(readmePath, 'utf8');
  
  // Update version in installation examples
  readmeContent = readmeContent.replace(
    /devai@[\d.]+/g,
    `devai@${version}`
  );
  
  fs.writeFileSync(readmePath, readmeContent);
  console.log(`✅ Updated version to ${version} in README.md`);
}

console.log(`🎉 Version ${version} updated successfully!`);
