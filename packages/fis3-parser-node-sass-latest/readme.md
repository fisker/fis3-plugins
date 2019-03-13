# fis3-parser-node-sass-latest

> A fis plugin to parse sass with latest node-sass.

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/fis3-parser-node-sass-latest.svg?style=flat-square)](https://www.npmjs.com/package/fis3-parser-node-sass-latest)
[![npm](https://img.shields.io/npm/dt/fis3-parser-node-sass-latest.svg?style=flat-square)](https://www.npmjs.com/package/fis3-parser-node-sass-latest)
[![npm](https://img.shields.io/npm/dm/fis3-parser-node-sass-latest.svg?style=flat-square)](https://www.npmjs.com/package/fis3-parser-node-sass-latest)

## install

```sh
npm install --global fis3-parser-node-sass-latest
```

## usage

```js
// fis-conf.js

const sassConf = {
  outputStyle: 'expanded',
  sourceMapContents: true,
  sourceMap: false,
  omitSourceMapUrl: false
}

fis.match('*.{sass,scss}', {
  parser: fis.plugin('node-sass-latest', sassConf);
});
```

more options: [https://github.com/sass/node-sass](https://github.com/sass/node-sass)

## default options

```json
{
  "outputStyle": "expanded",
  "sourceMapContents": true,
  "sourceMap": false,
  "omitSourceMapUrl": false
}
```

NOTICE: **this might change in future**

## links

- fis3: [http://fis.baidu.com/](http://fis.baidu.com/)

- sass: [http://sass-lang.com/](http://sass-lang.com/)

- node-sass: [https://github.com/sass/node-sass](https://github.com/sass/node-sass)

## license

MIT © [fisker Cheung](https://github.com/fisker)
