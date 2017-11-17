# fis3-lint-eslint-noisy

> a js linter plugin of fis3 based on eslint.

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/fis3-lint-eslint-noisy.svg?style=flat-square)](https://www.npmjs.com/package/fis3-lint-eslint-noisy)
[![npm](https://img.shields.io/npm/dt/fis3-lint-eslint-noisy.svg?style=flat-square)](https://www.npmjs.com/package/fis3-lint-eslint-noisy)
[![npm](https://img.shields.io/npm/dm/fis3-lint-eslint-noisy.svg?style=flat-square)](https://www.npmjs.com/package/fis3-lint-eslint-noisy)

## install

```sh
$ npm i -g fis3-lint-eslint-noisy
```

## about package name
i named this package `noisy` is because the other eslint plugins for fis all silently failed when error report by eslint.

## usage
```
// fis-conf.js

var eslintConf = {};

fis.match('*.js', {
  lint: fis.plugin('eslint-noisy', eslintConf)
});
```

### options

options: [http://eslint.org/docs/developer-guide/nodejs-api#cliengine]

rules and fixable rules: [http://eslint.org/docs/rules/]

```
var eslintConf = {
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



## links

  fis3 [http://fis.baidu.com/](http://fis.baidu.com/)

  eslint [http://eslint.org/](http://eslint.org/)


## license
MIT © [fisker Cheung](https://github.com/fisker)
