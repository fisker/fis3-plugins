# fis3-postprocessor-prettier-css

> a code formatter of fis3 based on prettier.

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/fis3-postprocessor-prettier-css.svg?style=flat-square)](https://www.npmjs.com/package/fis3-postprocessor-prettier-css)
[![npm](https://img.shields.io/npm/dt/fis3-postprocessor-prettier-css.svg?style=flat-square)](https://www.npmjs.com/package/fis3-postprocessor-prettier-css)
[![npm](https://img.shields.io/npm/dm/fis3-postprocessor-prettier-css.svg?style=flat-square)](https://www.npmjs.com/package/fis3-postprocessor-prettier-css)

## install

```sh
$ npm i -g fis3-postprocessor-prettier-css
```

## usage
```js
// fis-conf.js
var options = {};

fis.match('*.css', {
  postprocessor: fis.plugin('prettier-css', options)
});
```

## config
https://github.com/prettier/prettier#options

both options && Configuration File are supported.



## default options
```json
{
  "parser": "css",
  "singleQuote": false
}
```
** NOTICE: this might change in future **


## links

  fis3 [http://fis.baidu.com/](http://fis.baidu.com/)

  prettier [https://github.com/prettier/prettier](https://github.com/prettier/prettier)


## license
MIT © [fisker Cheung](https://github.com/fisker)
