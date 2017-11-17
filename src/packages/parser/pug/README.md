## usage

```
// fis-conf.js

var pugConf = {
  doctype: 'html', // default html
  pretty: '  ', // default '  '
  .. more
};

fis.match('*.{pug,jade}', {
  parser: fis.plugin('pug', pugConf);
});
```

[more options](https://pugjs.org/api/reference.html)
