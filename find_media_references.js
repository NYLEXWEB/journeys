const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) results.push(...walk(full));
    else if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(full);
  });
  return results;
}

const files = walk('src');
files.forEach(f => {
  const code = fs.readFileSync(f, 'utf8');
  const lines = code.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('<video') || l.includes('.mp4') || l.includes('videoUrl') || l.includes('videoSrc')) {
      console.log(`${f}:${i+1} -> ${l.trim()}`);
    }
  });
});
