# fis3-preprocessor-cssgrace

> cssgrace for fis3.

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/fis3-preprocessor-cssgrace.svg?style=flat-square)](https://www.npmjs.com/package/fis3-preprocessor-cssgrace)
[![npm](https://img.shields.io/npm/dt/fis3-preprocessor-cssgrace.svg?style=flat-square)](https://www.npmjs.com/package/fis3-preprocessor-cssgrace)
[![npm](https://img.shields.io/npm/dm/fis3-preprocessor-cssgrace.svg?style=flat-square)](https://www.npmjs.com/package/fis3-preprocessor-cssgrace)

## install

```sh
npm install --global fis3-preprocessor-cssgrace
```

## usage

```js
// fis-conf.js
const options = {}

fis.match("*.{css,less,sass,scss,sss,styl}", {
  preprocessor: fis.plugin("cssgrace", options),
})
```

config: [https://github.com/cssdream/cssgrace](https://github.com/cssdream/cssgrace)

## links

- fis3: [http://fis.baidu.com/](http://fis.baidu.com/)

- cssgrace: [https://github.com/cssdream/cssgrace](https://github.com/cssdream/cssgrace)

## license

MIT © [fisker Cheung](https://github.com/fisker)
