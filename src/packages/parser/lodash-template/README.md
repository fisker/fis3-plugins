## usage

```js
// fis-conf.js

var lodashTemplateConf = {
  // lodashTemplate render data
  data: {

  },
  // lodashTemplate render options
  options: {

  }
}

fis.match('*.jst', {
  parser: fis.plugin('lodash-template', lodashTemplateConf);
});
```

[more options](https://lodash.com/docs/#template)