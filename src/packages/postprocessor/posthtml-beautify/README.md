## usage

```
// fis-conf.js
var config = {
  rules: {
    Indent: 2,
    eol: '\n',
    eof: '\n'
  }
};

fis.match('*.html', {
  postprocessor: fis.plugin('posthtml-beautify', config)
});
```
more rules: https://github.com/gitscrum/posthtml-beautify