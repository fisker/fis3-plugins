<!-- markdownlint-disable MD002 MD041 -->

## usage

```js
// fis-conf.js

const cleanCSSConf = {}

fis.match('*.css', {
  optimizer: fis.plugin('cleancss', cleanCSSConf),
})
```

### options

```js
const cleanCSSConf = {}
```

notice:

`cleanCSSConf.returnPromise` is always `false`

options:

[https://github.com/jakubpawlowicz/clean-css#constructor-options](https://github.com/jakubpawlowicz/clean-css#constructor-options)
