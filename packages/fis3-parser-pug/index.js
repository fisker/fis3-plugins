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
var info_4 = info.options

module.exports = function(content, file, config) {
  return content ? pug.render(content, config) : ''
}

module.exports.defaultOptions = info_4
