<!-- markdownlint-disable MD002 MD041 -->

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
