const fs = require('fs');
const path = require('path');

function getFiles(dir, exts = ['.tsx', '.ts', '.jsx', '.js', '.json']) {
  let res = [];
  if (!fs.existsSync(dir)) return res;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name !== 'node_modules' && item.name !== '.next' && item.name !== '.git') {
        res = res.concat(getFiles(full, exts));
      }
    } else if (exts.includes(path.extname(item.name))) {
      res.push(full);
    }
  }
  return res;
}

const files = getFiles('src');
const imageRegex = /["'](\/(?:images|video|icons)[^"']+\.(?:webp|jpg|jpeg|png|svg|mp4|webm))["']/g;
const missing = new Map();
const existing = new Set();

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = imageRegex.exec(content)) !== null) {
    const rel = match[1];
    const diskPath = path.join('public', rel.replace(/^\//, '').replace(/\//g, path.sep));
    if (!fs.existsSync(diskPath)) {
      if (!missing.has(rel)) missing.set(rel, []);
      missing.get(rel).push(path.relative('.', file));
    } else {
      existing.add(rel);
    }
  }
}

console.log('--- MISSING ASSETS (' + missing.size + ') ---');
for (const [asset, callers] of missing.entries()) {
  console.log(asset + ' -> ' + callers.slice(0, 3).join(', '));
}
console.log('--- TOTAL EXISTING UNIQUE: ' + existing.size + ' ---');
