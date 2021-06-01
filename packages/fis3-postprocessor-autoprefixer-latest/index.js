'use strict'

var postcss = require('postcss')
var autoprefixer = require('autoprefixer')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {default: e}
}

var postcss__default = /*#__PURE__*/ _interopDefaultLegacy(postcss)
var autoprefixer__default = /*#__PURE__*/ _interopDefaultLegacy(autoprefixer)

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

function process(content, file, config) {
  return postcss__default['default']([
    autoprefixer__default['default'](config),
  ]).process(content, {
    from: config.filename,
  }).css
}

module.exports = exportPlugin(process, info)
