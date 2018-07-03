## usage

```js
// fis-conf.js

var cleanCSSConf = {};

fis.match('*.css', {
  optimizer: fis.plugin('cleancss', cleanCSSConf)
});
```

### options

```js
var cleanCSSConf = {
};
```

notice:

`cleanCSSConf.returnPromise` is always `false`

options:

[https://github.com/jakubpawlowicz/clean-css#constructor-options]
