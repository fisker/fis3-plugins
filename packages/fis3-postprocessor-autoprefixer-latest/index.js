'use strict'

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var postcss = _interopDefault(require('postcss'))
var autoprefixer = _interopDefault(require('autoprefixer'))

var info = {
  description: 'latest version autoprefixer for fis3.',
  keywords: ['autoprefixer'],
  dependencies: ['postcss', 'autoprefixer'],
  options: {},
  links: {
    autoprefixer: 'https://github.com/postcss/autoprefixer',
  },
}
var info_4 = info.options

module.exports = function(content, file, config) {
  return postcss([autoprefixer(config)]).process(content, {
    from: config.filename,
  }).css
}

module.exports.defaultOptions = info_4
