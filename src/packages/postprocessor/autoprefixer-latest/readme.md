<!-- markdownlint-disable MD002 MD041 -->

## usage

```js
// fis-conf.js
const options = {
  browsers: ['last 2 versions'],
}

fis.match('*.js', {
  postprocessor: fis.plugin('autoprefixer-latest', options),
})
```

config: [https://github.com/postcss/autoprefixer](https://github.com/postcss/autoprefixer)
