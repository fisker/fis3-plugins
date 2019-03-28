# fis3-parser-lodash-template

> a fis plugin to parse lodash template.

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/fis3-parser-lodash-template.svg?style=flat-square)](https://www.npmjs.com/package/fis3-parser-lodash-template)
[![npm](https://img.shields.io/npm/dt/fis3-parser-lodash-template.svg?style=flat-square)](https://www.npmjs.com/package/fis3-parser-lodash-template)
[![npm](https://img.shields.io/npm/dm/fis3-parser-lodash-template.svg?style=flat-square)](https://www.npmjs.com/package/fis3-parser-lodash-template)

## install

```sh
npm install --global fis3-parser-lodash-template
```

## usage

```js
// fis-conf.js

const lodashTemplateConf = {
  // lodashTemplate render data
  data: {

  },
  // lodashTemplate render options
  options: {

  }
}

fis.match('*.jst', {
  parser: fis.plugin('lodash-template', lodashTemplateConf);
});
```

more options [https://lodash.com/docs/#template](https://lodash.com/docs/#template)

## links

- fis3: [http://fis.baidu.com/](http://fis.baidu.com/)

- lodash.template: [https://lodash.com/docs/#template](https://lodash.com/docs/#template)

## license

MIT © [fisker Cheung](https://www.fiskercheung.com/)
