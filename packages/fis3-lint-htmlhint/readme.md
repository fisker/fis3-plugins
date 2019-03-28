# fis3-lint-htmlhint

> a html linter plugin of fis3 based on htmlhint.

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/fis3-lint-htmlhint.svg?style=flat-square)](https://www.npmjs.com/package/fis3-lint-htmlhint)
[![npm](https://img.shields.io/npm/dt/fis3-lint-htmlhint.svg?style=flat-square)](https://www.npmjs.com/package/fis3-lint-htmlhint)
[![npm](https://img.shields.io/npm/dm/fis3-lint-htmlhint.svg?style=flat-square)](https://www.npmjs.com/package/fis3-lint-htmlhint)

## install

```sh
npm install --global fis3-lint-htmlhint
```

## usage

```js
// fis-conf.js

// config with .htmlhintrc file (Recommended)
const htmlhintConf = {
  // key `rules` should be falsy
};

fis.match('*.html', {
  lint: fis.plugin('htmlhint', htmlhintConf);
});


// config with inline rules
const htmlhintConf = {
  rules: {
    "tagname-lowercase": true,
    "attr-lowercase": true,
    "attr-value-double-quotes": true,
    "doctype-first": true,
    "tag-pair": true,
    "spec-char-escape": true,
    "id-unique": true,
    "src-not-empty": true,
    "attr-no-duplication": true,
    "title-require": true
  }
};
```

rules: [https://github.com/yaniswang/HTMLHint/wiki/Rules](https://github.com/yaniswang/HTMLHint/wiki/Rules)

## links

- fis3: [http://fis.baidu.com/](http://fis.baidu.com/)

- htmlhint: [http://htmlhint.com/](http://htmlhint.com/)

## license

MIT © [fisker Cheung](https://www.fiskercheung.com/)
