# fis3-postprocessor-autoprefixer-latest

> latest version autoprefixer for fis3.

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/fis3-postprocessor-autoprefixer-latest.svg?style=flat-square)](https://www.npmjs.com/package/fis3-postprocessor-autoprefixer-latest)
[![npm](https://img.shields.io/npm/dt/fis3-postprocessor-autoprefixer-latest.svg?style=flat-square)](https://www.npmjs.com/package/fis3-postprocessor-autoprefixer-latest)
[![npm](https://img.shields.io/npm/dm/fis3-postprocessor-autoprefixer-latest.svg?style=flat-square)](https://www.npmjs.com/package/fis3-postprocessor-autoprefixer-latest)

## install

```sh
$ npm i -g fis3-postprocessor-autoprefixer-latest
```

## usage

```
// fis-conf.js
var options = {
  browsers: ['last 2 versions']
}

fis.match('*.js', {
  postprocessor: fis.plugin('autoprefixer-latest', options)
})
```

## config
https://github.com/postcss/autoprefixer



## links

  fis3 [http://fis.baidu.com/](http://fis.baidu.com/)

  autoprefixer [https://github.com/postcss/autoprefixer](https://github.com/postcss/autoprefixer)


## license
MIT © [fisker Cheung](https://github.com/fisker)
