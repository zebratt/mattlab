/* eslint-env node */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['vite.config.ts'],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-console': 1,
    '@typescript-eslint/explicit-module-boundary-types': 0
  },
};
