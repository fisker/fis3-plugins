'use strict'

var pug = require('pug')

function exportPlugin(process, _ref) {
  var options = _ref.options
  process.defaultOptions = options
  return process
}

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
var info$1 = info

function process(content, file, config) {
  return content ? pug.render(content, config) : ''
}

module.exports = exportPlugin(process, info$1)
