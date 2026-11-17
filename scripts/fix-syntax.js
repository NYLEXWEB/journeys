const fs = require('fs');

const lines = fs.readFileSync('src/lib/seedData.ts', 'utf8').split(/\r?\n/);
for (let i = 440; i < 460; i++) {
  console.log(`${i + 1}: ${JSON.stringify(lines[i])}`);
}

// Find line where `{` is right after author
for (let i = 445; i < 455; i++) {
  if (lines[i] && lines[i].trim() === '{' && lines[i - 1] && lines[i - 1].includes('author: "Dr. Alistair & Fiona Ross"')) {
    console.log(`Found duplicate { at line ${i + 1}. Removing.`);
    lines.splice(i, 2); // remove { and duplicate author
    fs.writeFileSync('src/lib/seedData.ts', lines.join('\n'), 'utf8');
    console.log('Fixed seedData.ts!');
    break;
  }
}
