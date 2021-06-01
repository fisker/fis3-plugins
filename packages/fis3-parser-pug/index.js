'use strict'

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

function exportPlugin(process, _ref) {
  var options = _ref.options
  process.defaultOptions = options
  return process
}

function process(content, file, config) {
  return content ? pug.render(content, config) : ''
}

module.exports = exportPlugin(process, info)
