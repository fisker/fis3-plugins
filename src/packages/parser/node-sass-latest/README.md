## usage

```
// fis-conf.js

var sassConf = {
  outputStyle: 'expanded',
  sourceMapContents: true,
  sourceMap: false,
  omitSourceMapUrl: false
}

fis.match('*.{sass,scss}', {
  parser: fis.plugin('node-sass-latest', sassConf);
});
```

[more options](https://github.com/sass/node-sass)
