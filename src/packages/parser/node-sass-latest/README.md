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
  parser: fis.plugin('node-sass-latest', sassConf);
});
```

more options: [https://github.com/sass/node-sass](https://github.com/sass/node-sass)
