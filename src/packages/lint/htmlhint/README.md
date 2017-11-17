## usage

```
// fis-conf.js

// config with .htmlhintrc file (Recommended)
var htmlhintConf = {
  // key `rules` should be falsy
};

fis.match('*.html', {
  lint: fis.plugin('htmlhint', htmlhintConf);
});


// config with inline rules
var htmlhintConf = {
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
rules: [https://github.com/yaniswang/HTMLHint/wiki/Rules]
