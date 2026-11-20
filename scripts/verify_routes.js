const http = require('http');

const routes = [
  '/',
  '/destinations',
  '/journeys',
  '/experiences',
  '/about',
  '/blog',
  '/contact'
];

let completed = 0;
let hasError = false;

console.log('Testing routes against http://localhost:3000 ...');

routes.forEach(route => {
  http.get('http://localhost:3000' + route, (res) => {
    console.log(`${route} -> HTTP ${res.statusCode}`);
    if (res.statusCode !== 200) {
      hasError = true;
    }
    completed++;
    if (completed === routes.length) {
      if (hasError) {
        console.error('FAILED: Some routes did not return 200');
        process.exit(1);
      } else {
        console.log('SUCCESS: All routes returned HTTP 200 OK');
        process.exit(0);
      }
    }
  }).on('error', (err) => {
    console.error(`${route} -> ERROR: ${err.message}`);
    hasError = true;
    completed++;
    if (completed === routes.length) {
      process.exit(1);
    }
  });
});
