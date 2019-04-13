# fis3-postprocessor-stylefmt

> a css formatter of fis3 based on stylefmt.

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/fis3-postprocessor-stylefmt.svg?style=flat-square)](https://www.npmjs.com/package/fis3-postprocessor-stylefmt)
[![npm](https://img.shields.io/npm/dt/fis3-postprocessor-stylefmt.svg?style=flat-square)](https://www.npmjs.com/package/fis3-postprocessor-stylefmt)
[![npm](https://img.shields.io/npm/dm/fis3-postprocessor-stylefmt.svg?style=flat-square)](https://www.npmjs.com/package/fis3-postprocessor-stylefmt)

## install

```sh
npm install --global fis3-postprocessor-stylefmt
```

## usage

```js
// fis-conf.js

fis.match('*.{css,scss,less,sss}}', {
  postprocessor: fis.plugin('stylefmt'),
})
```

## links

- fis3: [http://fis.baidu.com/](http://fis.baidu.com/)

- stylefmt: [https://github.com/morishitter/stylefmt](https://github.com/morishitter/stylefmt)

## license

MIT © [fisker Cheung](https://www.fiskercheung.com/)
