## usage

```js
// fis-conf.js

var ejsConf = {
  // ejs render data
  data: {

  },
  // ejs render options
  options: {

  }
}

fis.match('*.ejs', {
  parser: fis.plugin('node-sass-latest', ejsConf);
});
```

[more options](https://github.com/mde/ejs)