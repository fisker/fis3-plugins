# fis3-parser-ejs

> a fis plugin to parse ejs.

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/fis3-parser-ejs.svg?style=flat-square)](https://www.npmjs.com/package/fis3-parser-ejs)
[![npm](https://img.shields.io/npm/dt/fis3-parser-ejs.svg?style=flat-square)](https://www.npmjs.com/package/fis3-parser-ejs)
[![npm](https://img.shields.io/npm/dm/fis3-parser-ejs.svg?style=flat-square)](https://www.npmjs.com/package/fis3-parser-ejs)

## install

```sh
npm install --global fis3-parser-ejs
```

## usage

```js
// fis-conf.js

const ejsConf = {
  // ejs render data
  data: {

  },
  // ejs render options
  options: {

  }
}

fis.match('*.ejs', {
  parser: fis.plugin('ejs', ejsConf);
});
```

more options: [https://github.com/mde/ejs](https://github.com/mde/ejs)

## links

- fis3: [http://fis.baidu.com/](http://fis.baidu.com/)

- ejs: [http://ejs.co/](http://ejs.co/)

## license

MIT © [fisker Cheung](https://github.com/fisker)
