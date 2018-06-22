# fis3-lint-stylelint

> a css linter plugin of fis3 based on stylelint.

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/fis3-lint-stylelint.svg?style=flat-square)](https://www.npmjs.com/package/fis3-lint-stylelint)
[![npm](https://img.shields.io/npm/dt/fis3-lint-stylelint.svg?style=flat-square)](https://www.npmjs.com/package/fis3-lint-stylelint)
[![npm](https://img.shields.io/npm/dm/fis3-lint-stylelint.svg?style=flat-square)](https://www.npmjs.com/package/fis3-lint-stylelint)

## install

```sh
$ npm i -g fis3-lint-stylelint
```

## usage

```
// fis-conf.js

var stylelintConf = {};

fis.match('*.{css,scss,less,sss}}', {
  lint: fis.plugin('stylelint', stylelintConf)
});
```

### options

```
var stylelintConf = {
  fix: false,
  code: // useless, will be unset
  codeFilename: // useless, will be unset
  config:
  configBasedir:
  configFile:
  configOverrides:
  files: // useless, will be overwrite
  formatter: // useless, will be overwrite
  ignorePath:
  syntax: // if not set, will fix by file ext
          // rules: .scss => scss, .less => less, .sss =>sugarss
};
```
options: [http://stylelint.io/user-guide/node-api/#options]

rules: [http://stylelint.io/user-guide/rules/]



## links

  fis3 [http://fis.baidu.com/](http://fis.baidu.com/)

  stylelint [http://stylelint.io/](http://stylelint.io/)


## license
MIT © [fisker Cheung](https://github.com/fisker)
