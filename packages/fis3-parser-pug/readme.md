# fis3-parser-pug

> a fis plugin to parse pug(aka jade).

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/fis3-parser-pug.svg?style=flat-square)](https://www.npmjs.com/package/fis3-parser-pug)
[![npm](https://img.shields.io/npm/dt/fis3-parser-pug.svg?style=flat-square)](https://www.npmjs.com/package/fis3-parser-pug)
[![npm](https://img.shields.io/npm/dm/fis3-parser-pug.svg?style=flat-square)](https://www.npmjs.com/package/fis3-parser-pug)

## install

```sh
npm install --global fis3-parser-pug
```

## usage

```js
// fis-conf.js

const pugConf = {
  doctype: 'html', // default html
  pretty: '  ', // default '  '
  .. more
};

fis.match('*.{pug,jade}', {
  parser: fis.plugin('pug', pugConf);
});
```

more options: [https://pugjs.org/api/reference.html](https://pugjs.org/api/reference.html)

## default options

```json
{
  "pretty": "  ",
  "doctype": "html"
}
```

NOTICE: **this might change in future**

## links

- fis3: [http://fis.baidu.com/](http://fis.baidu.com/)

- pug: [https://pugjs.org/](https://pugjs.org/)

## license

MIT © [fisker Cheung](https://github.com/fisker)
