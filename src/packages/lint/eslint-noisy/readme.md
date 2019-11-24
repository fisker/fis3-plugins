<!-- markdownlint-disable MD002 MD041 -->

## about package name

i named this package `noisy` is because the other eslint plugins for fis all silently failed when error report by eslint.

## usage

```js
// fis-conf.js

const eslintConf = {}

fis.match('*.js', {
  lint: fis.plugin('eslint-noisy', eslintConf),
})
```

### options

options: [http://eslint.org/docs/developer-guide/nodejs-api#cliengine](http://eslint.org/docs/developer-guide/nodejs-api#cliengine)

rules and fixable rules: [http://eslint.org/docs/rules/](http://eslint.org/docs/rules/)

<!-- prettier-ignore-start -->

```js
const eslintConf = {
  fix: true, // ❗!!! important !!!❗
         // default: true,
         // be careful, this might change your source code
         // this will trigger `CLIEngine.outputFixes` automatically
  configFile:
  envs: // default: ['browser']
  extensions:
  globals:
  ignore:
  ignorePath:
  ignorePattern:
  baseConfig:
  rulePaths:
  rules:
  useEslintrc: // defalut: true
  parser:
  cache:
  cacheFile:
  cacheLocation:
  cwd:
};
```

<!-- prettier-ignore-end -->
