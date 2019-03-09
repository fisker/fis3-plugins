<!-- markdownlint-disable MD002 MD041 -->

## usage

```js
// fis-conf.js

const lodashTemplateConf = {
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

more options [https://lodash.com/docs/#template](https://lodash.com/docs/#template)
