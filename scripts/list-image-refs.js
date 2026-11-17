const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(full));
    } else if (/\.(tsx?|jsx?|css|json)$/i.test(file)) {
      results.push(full);
    }
  }
  return results;
}

const files = getFiles(path.join(__dirname, '..', 'src'));
const imageRegex = /\/images\/[a-zA-Z0-9_\-\/]+\.(jpg|jpeg|png)/g;

let count = 0;
const affectedFiles = new Set();

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(imageRegex);
  if (matches) {
    affectedFiles.add(f);
    count += matches.length;
    console.log(path.relative(path.join(__dirname, '..'), f), `(${matches.length} matches):`);
    matches.forEach(m => console.log('  -', m));
  }
}

console.log(`\nTotal matches: ${count} across ${affectedFiles.size} files.`);
