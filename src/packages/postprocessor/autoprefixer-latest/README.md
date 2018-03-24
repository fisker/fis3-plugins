## usage

```
// fis-conf.js
var options = {
  browsers: ['last 2 versions']
}

fis.match('*.js', {
  postprocessor: fis.plugin('autoprefixer-latest', options)
})
```

## config
https://github.com/postcss/autoprefixer
