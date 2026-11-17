const sharp = require('sharp');
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
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      results.push(full);
    }
  }
  return results;
}

async function processImages() {
  const rootDir = path.join(__dirname, '..', 'public', 'images');
  const files = getFiles(rootDir);

  console.log(`Found ${files.length} images to process in public/images...\n`);
  let totalOriginalSize = 0;
  let totalWebpSize = 0;
  let totalOptimizedOrigSize = 0;

  for (const file of files) {
    const relPath = path.relative(rootDir, file);
    const ext = path.extname(file);
    const baseName = file.slice(0, -ext.length);
    const webpPath = baseName + '.webp';
    const originalSize = fs.statSync(file).size;
    totalOriginalSize += originalSize;

    const isPng = ext.toLowerCase() === '.png';

    // 1. Generate WebP
    if (isPng) {
      await sharp(file)
        .webp({ quality: 85, effort: 6, alphaQuality: 90 })
        .toFile(webpPath);
    } else {
      await sharp(file)
        .webp({ quality: 82, effort: 6 })
        .toFile(webpPath);
    }
    const webpSize = fs.statSync(webpPath).size;
    totalWebpSize += webpSize;

    // 2. Also optimize original in place so legacy references are also lightweight
    const tempOriginal = file + '.tmp';
    if (isPng) {
      await sharp(file)
        .png({ compressionLevel: 9, palette: true })
        .toFile(tempOriginal);
    } else {
      await sharp(file)
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(tempOriginal);
    }
    const optimizedSize = fs.statSync(tempOriginal).size;
    if (optimizedSize < originalSize) {
      fs.unlinkSync(file);
      fs.renameSync(tempOriginal, file);
      totalOptimizedOrigSize += optimizedSize;
    } else {
      fs.unlinkSync(tempOriginal);
      totalOptimizedOrigSize += originalSize;
    }

    const savedPct = ((1 - webpSize / originalSize) * 100).toFixed(1);
    console.log(
      `✓ ${relPath} -> ${path.basename(webpPath)}: ` +
      `${(originalSize / 1024).toFixed(1)} KB -> ${(webpSize / 1024).toFixed(1)} KB (${savedPct}% reduction)`
    );
  }

  console.log('\n--- Image Compression Summary ---');
  console.log(`Original total size: ${(totalOriginalSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`WebP total size: ${(totalWebpSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total saved: ${((1 - totalWebpSize / totalOriginalSize) * 100).toFixed(1)}%`);
}

processImages().catch(err => {
  console.error('Error during image processing:', err);
  process.exit(1);
});
