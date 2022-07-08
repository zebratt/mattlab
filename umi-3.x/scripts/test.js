const umi = require('umi');
const path = require('path');

console.log('cwd:', path.resolve(__dirname, '../src'));

const files = umi.utils.glob.sync('**/models/**/*.rm.{ts,tsx,js,jsx}', {
  cwd: path.resolve(__dirname, '../src'),
});

console.log(files);
