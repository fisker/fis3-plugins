<!-- markdownlint-disable MD002 MD041 -->

## usage

```js
// fis-conf.js

const ejsConf = {
  // ejs render data
  data: {

  },
  // ejs render options
  options: {

  }
}

fis.match('*.ejs', {
  parser: fis.plugin('ejs', ejsConf);
});
```

more options: [https://github.com/mde/ejs](https://github.com/mde/ejs)
