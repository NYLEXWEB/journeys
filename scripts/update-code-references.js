const fs = require('fs');
const path = require('path');

function getWebpFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(getWebpFiles(full));
    } else if (file.endsWith('.webp')) {
      results.push(full);
    }
  }
  return results;
}

function getSourceFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(getSourceFiles(full));
    } else if (/\.(tsx?|jsx?|css|json)$/i.test(file)) {
      results.push(full);
    }
  }
  return results;
}

const publicImagesDir = path.join(__dirname, '..', 'public', 'images');
const webpFiles = getWebpFiles(publicImagesDir);
const srcFiles = getSourceFiles(path.join(__dirname, '..', 'src'));

// Build list of target replacements
const replacements = [];
for (const webp of webpFiles) {
  const relWebp = path.relative(path.join(__dirname, '..', 'public'), webp).replace(/\\/g, '/');
  // Check if .jpg, .jpeg, or .png exists
  const base = webp.replace(/\.webp$/, '');
  const extensions = ['.jpg', '.jpeg', '.png'];
  for (const ext of extensions) {
    const orig = base + ext;
    if (fs.existsSync(orig)) {
      const relOrig = path.relative(path.join(__dirname, '..', 'public'), orig).replace(/\\/g, '/');
      replacements.push({
        orig: '/' + relOrig,
        webp: '/' + relWebp
      });
    }
  }
}

console.log(`Prepared ${replacements.length} image replacements:`);
replacements.forEach(r => console.log(`  ${r.orig} -> ${r.webp}`));

let totalFilesModified = 0;
let totalOccurrences = 0;

for (const file of srcFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;
  let fileMatches = 0;

  for (const r of replacements) {
    if (content.includes(r.orig)) {
      const parts = content.split(r.orig);
      fileMatches += (parts.length - 1);
      content = parts.join(r.webp);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    totalFilesModified++;
    totalOccurrences += fileMatches;
    console.log(`✓ Updated ${path.relative(path.join(__dirname, '..'), file)} (${fileMatches} replacements)`);
  }
}

console.log(`\nCompleted! Modified ${totalFilesModified} files with ${totalOccurrences} total replacements.`);
