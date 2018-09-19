# fis3-postprocessor-prettyhtml

> a code formatter of fis3 based on prettyhtml.

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/fis3-postprocessor-prettyhtml.svg?style=flat-square)](https://www.npmjs.com/package/fis3-postprocessor-prettyhtml)
[![npm](https://img.shields.io/npm/dt/fis3-postprocessor-prettyhtml.svg?style=flat-square)](https://www.npmjs.com/package/fis3-postprocessor-prettyhtml)
[![npm](https://img.shields.io/npm/dm/fis3-postprocessor-prettyhtml.svg?style=flat-square)](https://www.npmjs.com/package/fis3-postprocessor-prettyhtml)

## install

```sh
$ npm i -g fis3-postprocessor-prettyhtml
```

## usage

```
// fis-conf.js
var options = {};

fis.match('*.html', {
  postprocessor: fis.plugin('prettyhtml', options)
});
```

## config
https://github.com/Prettyhtml/prettyhtml



## default options
```json
{
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 80,
  "usePrettier": true,
  "singleQuote": false
}
```
** NOTICE: this might change in future **


## links

  fis3 [http://fis.baidu.com/](http://fis.baidu.com/)

  prettyhtml [https://github.com/Prettyhtml/prettyhtml](https://github.com/Prettyhtml/prettyhtml)


## license
MIT © [fisker Cheung](https://github.com/fisker)
