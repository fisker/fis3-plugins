'use strict'

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var postcss = _interopDefault(require('postcss'))
var autoprefixer = _interopDefault(require('autoprefixer'))

function exportPlugin(process, _ref) {
  var options = _ref.options
  process.defaultOptions = options
  return process
}

var info = {
  description: 'latest version autoprefixer for fis3.',
  keywords: ['autoprefixer'],
  dependencies: ['postcss', 'autoprefixer'],
  options: {},
  links: {
    autoprefixer: 'https://github.com/postcss/autoprefixer',
  },
}

var info$1 = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  default: info,
})

function process(content, file, config) {
  return postcss([autoprefixer(config)]).process(content, {
    from: config.filename,
  }).css
}

var autoprefixerLatest = exportPlugin(process, info$1)
