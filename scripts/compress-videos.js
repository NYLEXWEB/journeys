const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const fs = require('fs');
const path = require('path');

const videoDir = path.join(__dirname, '..', 'public', 'video');
const backupDir = path.join(videoDir, '.backup');

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

const videos = [
  { name: 'video-1.mp4', scale: '1920:-2', fps: 30, crf: 26 },
  { name: 'video-2.mp4', scale: '1280:-2', fps: 24, crf: 26 },
  { name: 'video-4.mp4', scale: '1920:-2', fps: 25, crf: 26 },
  { name: 'video-5.mp4', scale: '1920:-2', fps: 30, crf: 26 },
];

console.log('Starting video compression and WebM/poster generation...\n');

let totalBefore = 0;
let totalAfterMp4 = 0;
let totalWebm = 0;

for (const v of videos) {
  const inputPath = path.join(videoDir, v.name);
  const backupPath = path.join(backupDir, v.name);
  const baseName = v.name.replace('.mp4', '');
  const tempMp4 = path.join(videoDir, `${baseName}-compressed.mp4`);
  const webmPath = path.join(videoDir, `${baseName}.webm`);
  const posterPath = path.join(videoDir, `${baseName}-poster.webp`);

  if (!fs.existsSync(backupPath)) {
    console.log(`Backing up original ${v.name}...`);
    fs.copyFileSync(inputPath, backupPath);
  }

  const originalSize = fs.statSync(backupPath).size;
  totalBefore += originalSize;

  console.log(`\nCompressing ${v.name} (Original: ${(originalSize / (1024 * 1024)).toFixed(2)} MB)...`);

  // 1. Generate optimized MP4 (H.264, web-optimized, faststart, capped 1080p, capped 30fps)
  const mp4Cmd = `"${ffmpeg}" -y -i "${backupPath}" -vf "scale=${v.scale},fps=${v.fps}" -c:v libx264 -crf ${v.crf} -preset fast -pix_fmt yuv420p -an -movflags +faststart "${tempMp4}"`;
  execSync(mp4Cmd, { stdio: 'inherit' });

  // Replace original with compressed MP4
  if (fs.existsSync(inputPath)) {
    fs.unlinkSync(inputPath);
  }
  fs.renameSync(tempMp4, inputPath);
  const newMp4Size = fs.statSync(inputPath).size;
  totalAfterMp4 += newMp4Size;

  console.log(`✓ MP4 optimized: ${(originalSize / (1024 * 1024)).toFixed(2)} MB -> ${(newMp4Size / (1024 * 1024)).toFixed(2)} MB (${((1 - newMp4Size / originalSize) * 100).toFixed(1)}% reduction)`);

  // 2. Generate WebM (VP9 multithreaded fast encoding)
  console.log(`Generating WebM for ${baseName}...`);
  const webmCmd = `"${ffmpeg}" -y -i "${backupPath}" -vf "scale=${v.scale},fps=${v.fps}" -c:v libvpx-vp9 -b:v 0 -crf 32 -cpu-used 4 -row-mt 1 -threads 0 -an "${webmPath}"`;
  execSync(webmCmd, { stdio: 'inherit' });
  const webmSize = fs.statSync(webmPath).size;
  totalWebm += webmSize;
  console.log(`✓ WebM created: ${(webmSize / (1024 * 1024)).toFixed(2)} MB`);

  // 3. Generate WebP Poster Frame
  console.log(`Generating WebP Poster for ${baseName}...`);
  const posterCmd = `"${ffmpeg}" -y -ss 00:00:01 -i "${backupPath}" -vframes 1 -vf "scale=${v.scale}" -vcodec libwebp -quality 85 "${posterPath}"`;
  execSync(posterCmd, { stdio: 'inherit' });
  const posterSize = fs.statSync(posterPath).size;
  console.log(`✓ Poster WebP created: ${(posterSize / 1024).toFixed(1)} KB`);
}

console.log('\n--- Video Optimization Summary ---');
console.log(`Original total size: ${(totalBefore / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Compressed MP4 total size: ${(totalAfterMp4 / (1024 * 1024)).toFixed(2)} MB (${((1 - totalAfterMp4 / totalBefore) * 100).toFixed(1)}% reduction)`);
console.log(`WebM total size: ${(totalWebm / (1024 * 1024)).toFixed(2)} MB`);
