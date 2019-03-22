<!-- markdownlint-disable MD002 MD041 -->

## usage

```js
// fis-conf.js

const sassConf = {
  outputStyle: 'expanded',
  sourceMapContents: true,
  sourceMap: false,
  omitSourceMapUrl: false
}

fis.match('*.{sass,scss}', {
  parser: fis.plugin('dart-sass', sassConf);
});
```

more options: [https://github.com/sass/dart-sass](https://github.com/sass/dart-sass)
