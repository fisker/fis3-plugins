/*!
 * config file for `eslint`
 *
 * update: wget https://git.io/fhNxh
 * document: https://eslint.org/docs/user-guide/configuring
 */

/* eslint-disable no-unused-vars */

/* @xwtec/eslint-config https://git.io/fhNpT */
const xwtec = (pkg => ({
  default: pkg,
  legacy: `${pkg}/legacy`,
  vue: `${pkg}/vue`,
}))('@xwtec/eslint-config')

module.exports = {
  root: true,
  parserOptions: {},
  extends: [xwtec.default],
  settings: {},
  rules: {
    'unicorn/no-process-exit': 'off',
  },
  plugins: [],
  overrides: [],
}
