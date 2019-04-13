# fis3-lint-eslint-noisy

> a js linter plugin of fis3 based on eslint.

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/fis3-lint-eslint-noisy.svg?style=flat-square)](https://www.npmjs.com/package/fis3-lint-eslint-noisy)
[![npm](https://img.shields.io/npm/dt/fis3-lint-eslint-noisy.svg?style=flat-square)](https://www.npmjs.com/package/fis3-lint-eslint-noisy)
[![npm](https://img.shields.io/npm/dm/fis3-lint-eslint-noisy.svg?style=flat-square)](https://www.npmjs.com/package/fis3-lint-eslint-noisy)

## install

```sh
npm install --global fis3-lint-eslint-noisy
```

## about package name

i named this package `noisy` is because the other eslint plugins for fis all silently failed when error report by eslint.

## usage

```js
// fis-conf.js

const eslintConf = {}

fis.match('*.js', {
  lint: fis.plugin('eslint-noisy', eslintConf),
})
```

### options

options: [http://eslint.org/docs/developer-guide/nodejs-api#cliengine](http://eslint.org/docs/developer-guide/nodejs-api#cliengine)

rules and fixable rules: [http://eslint.org/docs/rules/](http://eslint.org/docs/rules/)

<!-- prettier-ignore-start -->

```js
const eslintConf = {
  configFile:
  envs: // default: ['browser']
  extensions:
  globals:
  fix: , // ❗!!! important !!!❗
         // default:false,
         // be careful, this might change your source code
         // this will trigger `CLIEngine.outputFixes` automatically
  ignore:
  ignorePath:
  ignorePattern:
  baseConfig:
  rulePaths:
  rules:
  useEslintrc: // defalut: true
  parser:
  cache:
  cacheFile:
  cacheLocation:
  cwd:
};
```

<!-- prettier-ignore-end -->

## default options

```json
{
  "envs": ["browser"],
  "fix": false,
  "useEslintrc": true
}
```

NOTICE: **this might change in future**

## links

- fis3: [http://fis.baidu.com/](http://fis.baidu.com/)

- eslint: [http://eslint.org/](http://eslint.org/)

## license

MIT © [fisker Cheung](https://www.fiskercheung.com/)
