## usage

```
// fis-conf.js
var options = {};

fis.match('*.{js,css,json,less,sass,md}', {
  postprocessor: fis.plugin('prettier', options)
});
```

## config
https://github.com/prettier/prettier#options

both options && Configuration File are supported.
