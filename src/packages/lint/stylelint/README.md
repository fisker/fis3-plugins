## usage

```
// fis-conf.js

var stylelintConf = {};

fis.match('*.{css,scss,less,sss}}', {
  lint: fis.plugin('stylelint', stylelintConf)
});
```

### options

```
var stylelintConf = {
  fix: false,
  code: // useless, will be unset
  codeFilename: // useless, will be unset
  config:
  configBasedir:
  configFile:
  configOverrides:
  files: // useless, will be overwrite
  formatter: // useless, will be overwrite
  ignorePath:
  syntax: // if not set, will fix by file ext
          // rules: .scss => scss, .less => less, .sss =>sugarss
};
```
options: [http://stylelint.io/user-guide/node-api/#options]

rules: [http://stylelint.io/user-guide/rules/]
