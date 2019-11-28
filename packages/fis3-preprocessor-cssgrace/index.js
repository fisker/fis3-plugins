'use strict'

Object.defineProperty(exports, '__esModule', {value: true})

var cssgraceLite = require('cssgrace-lite')

var info = {
  description: 'cssgrace for fis3.',
  keywords: ['cssgrace'],
  dependencies: ['cssgrace-lite'],
  options: {},
  links: {
    cssgrace: 'https://github.com/cssdream/cssgrace',
  },
}

var info$1 = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  default: info,
})

function process(content, file, config) {
  return cssgraceLite.pack(content, config)
}
var defaultOptions = undefined

exports.default = process
exports.defaultOptions = defaultOptions
