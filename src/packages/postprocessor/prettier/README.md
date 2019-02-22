<!-- markdownlint-disable MD002 MD041 -->

## usage

```js
// fis-conf.js
const options = {}

fis.match("*.{js,css,json,less,sass,md}", {
  postprocessor: fis.plugin("prettier", options),
})
```

config: [https://github.com/prettier/prettier#options](https://github.com/prettier/prettier#options)

FYI: **both options && Configuration File are supported.**
