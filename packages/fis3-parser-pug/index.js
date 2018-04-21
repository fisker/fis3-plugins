'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

exports.default = function(content, file, conf) {
  return content ? (0, _pug.render)(content, conf) : ''
}

var _pug = require('pug')

module.exports.defaultOptions = {
  pretty: '  ',
  doctype: 'html'
}
module.exports = exports['default']
