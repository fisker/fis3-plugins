# fis3-optimizer-cleancss

> css minifer for fis based on clean-css.

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/fis3-optimizer-cleancss.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-cleancss)
[![npm](https://img.shields.io/npm/dt/fis3-optimizer-cleancss.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-cleancss)
[![npm](https://img.shields.io/npm/dm/fis3-optimizer-cleancss.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-cleancss)

## install

```sh
$ npm i -g fis3-optimizer-cleancss
```

## usage

```js
// fis-conf.js

var cleanCSSConf = {};

fis.match('*.css', {
  optimizer: fis.plugin('cleancss', cleanCSSConf)
});
```

### options

```js
var cleanCSSConf = {
};
```

notice:

`cleanCSSConf.returnPromise` is always `false`

options:

[https://github.com/jakubpawlowicz/clean-css#constructor-options]



## links

  fis3 [http://fis.baidu.com/](http://fis.baidu.com/)

  clean-css [https://github.com/jakubpawlowicz/clean-css](https://github.com/jakubpawlowicz/clean-css)


## license
MIT © [fisker Cheung](https://github.com/fisker)
