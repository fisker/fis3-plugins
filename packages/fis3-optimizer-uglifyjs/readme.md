# fis3-optimizer-uglifyjs

> js minifer for fis3 based on uglifyjs.

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/fis3-optimizer-uglifyjs.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-uglifyjs)
[![npm](https://img.shields.io/npm/dt/fis3-optimizer-uglifyjs.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-uglifyjs)
[![npm](https://img.shields.io/npm/dm/fis3-optimizer-uglifyjs.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-uglifyjs)

## install

```sh
npm install --global fis3-optimizer-uglifyjs
```

## usage

```js
// fis-conf.js

const uglifyJSConf = {}

fis.match('*.js', {
  optimizer: fis.plugin('uglifyjs', uglifyJSConf),
})
```

### options

```js
const uglifyJSConf = {}
```

notice:

- if `uglifyJSConf.sourceMap` is a object,
- if `uglifyJSConf.sourceMap.filename` is a non-empty string like `out.js`, it will replace with the currect js filename
- if `uglifyJSConf.sourceMap.url` is a non-empty string like `out.js.map`, it will replace with the currect map filename,
  `uglifyJSConf.sourceMap.url` === `inline` behavior as except

options:

[https://github.com/mishoo/UglifyJS2#minify-options](https://github.com/mishoo/UglifyJS2#minify-options)

## links

- fis3: [http://fis.baidu.com/](http://fis.baidu.com/)

- UglifyJS2: [https://github.com/mishoo/UglifyJS2](https://github.com/mishoo/UglifyJS2)

## license

MIT © [fisker Cheung](https://www.fiskercheung.com/)
