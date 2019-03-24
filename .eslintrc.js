/*!
 * config file for `eslint`
 *
 * update: wget -O .eslintrc.js https://git.io/fjJKA
 * document: https://eslint.org/docs/user-guide/configuring
 */

/* eslint-config-fisker https://git.io/fjJKy */

module.exports = {
  root: true,
  parserOptions: {},
  extends: ['fisker'],
  settings: {},
  rules: {
    'no-console': 'off',
    'unicorn/no-process-exit': 'off',
  },
  plugins: [],
  overrides: [],
}
