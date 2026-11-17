const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'video');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mp4'));

for (const f of files) {
  const full = path.join(dir, f);
  const size = (fs.statSync(full).size / (1024 * 1024)).toFixed(2);
  try {
    execSync(`"${ffmpeg}" -i "${full}"`, { stdio: 'pipe' });
  } catch (err) {
    const out = (err.stderr || err.stdout || '').toString();
    const durationMatch = out.match(/Duration: ([^,]+)/);
    const videoStreamMatch = out.match(/Stream #0:.*Video: ([^\n\r]+)/);
    const audioStreamMatch = out.match(/Stream #0:.*Audio: ([^\n\r]+)/);
    console.log(
      f,
      '| Size:', size + ' MB',
      '| Duration:', durationMatch ? durationMatch[1] : '?',
      '| Video:', videoStreamMatch ? videoStreamMatch[1] : 'none',
      '| Audio:', audioStreamMatch ? audioStreamMatch[1] : 'none'
    );
  }
}
