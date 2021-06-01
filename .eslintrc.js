/*!
 * config file for `eslint`
 *
 * update: wget -O .eslintrc.js https://git.io/fjVjK
 * document: https://eslint.org/docs/user-guide/configuring
 */

/* @fisker/eslint-config https://git.io/fjOeH */

module.exports = {
  root: true,
  env: {},
  parserOptions: {},
  extends: ['@fisker'],
  settings: {},
  rules: {
    'unicorn/prefer-node-protocol': 'off',
  },
  plugins: [],
  globals: {},
  overrides: [
    {
      files: ['scripts/**/*'],
      rules: {
        'unicorn/prefer-node-protocol': 'error',
      },
    },
  ],
}
