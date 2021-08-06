/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const { promise: exec } = require('exec-sh');

exec('yarn build').catch((e) => {
  process.exit(e.code || -1);
});
