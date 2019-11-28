'use strict'

Object.defineProperty(exports, '__esModule', {value: true})

var pug = require('pug')

var info = {
  description: 'a fis plugin to parse pug(aka jade).',
  keywords: ['jade', 'html'],
  dependencies: ['pug'],
  options: {
    pretty: '  ',
    doctype: 'html',
  },
  links: {
    pug: 'https://pugjs.org/',
  },
}

var info$1 = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  default: info,
})

function process(content, file, config) {
  return content ? pug.render(content, config) : ''
}
var defaultOptions = undefined

exports.default = process
exports.defaultOptions = defaultOptions
