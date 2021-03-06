# fis3-lint-stylelint

> a css linter plugin of fis3 based on stylelint.

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/fis3-lint-stylelint.svg?style=flat-square)](https://www.npmjs.com/package/fis3-lint-stylelint)
[![npm](https://img.shields.io/npm/dt/fis3-lint-stylelint.svg?style=flat-square)](https://www.npmjs.com/package/fis3-lint-stylelint)
[![npm](https://img.shields.io/npm/dm/fis3-lint-stylelint.svg?style=flat-square)](https://www.npmjs.com/package/fis3-lint-stylelint)

## install

```sh
npm install --global fis3-lint-stylelint
```

## usage

```js
// fis-conf.js

var stylelintConf = {}

fis.match('*.{css,scss,less,sss}}', {
  lint: fis.plugin('stylelint', stylelintConf),
})
```

### options

<!-- prettier-ignore-start -->

```js
const stylelintConf = {
  fix: true, // ❗!!! important !!!❗
         // default: true,
         // be careful, this might change your source code
         // this will trigger `CLIEngine.outputFixes` automatically
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

<!-- prettier-ignore-start -->

options: [http://stylelint.io/user-guide/node-api/#options](http://stylelint.io/user-guide/node-api/#options)

rules: [http://stylelint.io/user-guide/rules/](http://stylelint.io/user-guide/rules/)

## default options

```json
{
  "fix": true
}
```

NOTICE: **this might change in future**

## links

- fis3: [http://fis.baidu.com/](http://fis.baidu.com/)

- stylelint: [http://stylelint.io/](http://stylelint.io/)

## license

MIT © [fisker Cheung](https://www.fiskercheung.com/)
