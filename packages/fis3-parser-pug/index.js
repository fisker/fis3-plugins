'use strict'

var pug$1 = require('pug')

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

function exportPlugin(process, _ref) {
  var options = _ref.options
  process.defaultOptions = options
  return process
}

function process(content, file, config) {
  return content ? pug$1.render(content, config) : ''
}

var pug = exportPlugin(process, info$1)
