'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

exports.default = function(content, file, conf) {
  delete conf.filename
  content = _prettier2.default.format(content, assign({}, rcConfig, conf))

  // remove inline file final newline
  if (file.cache.isInline) {
    content.replace(/\s*$/, '')
  }
  return content
}

var _prettier = require('prettier')

var _prettier2 = _interopRequireDefault(_prettier)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

var assign = Object.assign || global.fis.util.assign
var rcConfig = _prettier2.default.resolveConfig.sync('prettier')

module.exports.defaultOptions = {
  parser: 'css',
  singleQuote: false
}
module.exports = exports['default']
