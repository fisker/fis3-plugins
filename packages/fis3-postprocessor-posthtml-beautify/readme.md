# fis3-postprocessor-posthtml-beautify

> a html formatter of fis3 based on posthtml-beautify.

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/fis3-postprocessor-posthtml-beautify.svg?style=flat-square)](https://www.npmjs.com/package/fis3-postprocessor-posthtml-beautify)
[![npm](https://img.shields.io/npm/dt/fis3-postprocessor-posthtml-beautify.svg?style=flat-square)](https://www.npmjs.com/package/fis3-postprocessor-posthtml-beautify)
[![npm](https://img.shields.io/npm/dm/fis3-postprocessor-posthtml-beautify.svg?style=flat-square)](https://www.npmjs.com/package/fis3-postprocessor-posthtml-beautify)

## install

```sh
npm install --global fis3-postprocessor-posthtml-beautify
```

## usage

```js
// fis-conf.js
var config = {
  rules: {
    Indent: 2,
    eol: "\n",
    eof: "\n",
  },
}

fis.match("*.html", {
  postprocessor: fis.plugin("posthtml-beautify", config),
})
```

more rules: [https://github.com/gitscrum/posthtml-beautify](https://github.com/gitscrum/posthtml-beautify)

## default options

```json
{
  "rules": {
    "indent": 2,
    "eol": "\n",
    "eof": "\n"
  }
}
```

NOTICE: **this might change in future**

## links

- fis3: [http://fis.baidu.com/](http://fis.baidu.com/)

- posthtml-beautify: [https://github.com/gitscrum/posthtml-beautify](https://github.com/gitscrum/posthtml-beautify)

## license

MIT © [fisker Cheung](https://github.com/fisker)
