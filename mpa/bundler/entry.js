const fs = require('fs');
const path = require('path');

const resolve = (dir) => {
  return path.resolve(__dirname, '../src/pages', dir || '');
};

const entries = fs
  .readdirSync(resolve())
  .map((ele) => ({ name: ele, path: resolve(`${ele}/index.tsx`) }));

const entryMap = entries.reduce((acc, cur) => {
  acc[cur.name] = cur.path;

  return acc;
}, {});

module.exports = {
  entries,
  entryMap,
};
