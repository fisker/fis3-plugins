## usage
```js
// fis-conf.js
var options = {};

fis.match('*.css', {
  postprocessor: fis.plugin('prettier-css', options)
});
```

## config
https://github.com/prettier/prettier#options

both options && Configuration File are supported.
