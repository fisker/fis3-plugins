## usage

```js
// fis-conf.js

var uglifyJSConf = {};

fis.match('*.js', {
  optimizer: fis.plugin('uglify-js-latest', uglifyJSConf)
});
```

### options

```js
var uglifyJSConf = {
};
```

notice:
if `uglifyJSConf.sourceMap` is a object,

if `uglifyJSConf.sourceMap.filename` is a non-empty string like `out.js`, it will replace with the currect js filename
if `uglifyJSConf.sourceMap.url` is a non-empty string like `out.js.map`, it will replace with the currect map filename,
`uglifyJSConf.sourceMap.url` === `inline` behavior as except

options: [https://github.com/mishoo/UglifyJS2#minify-options]
