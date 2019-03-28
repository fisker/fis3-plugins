'use strict'

var _pug = require('pug')

module.exports = function(content, file, config) {
  return content ? (0, _pug.render)(content, config) : ''
}

module.exports.defaultOptions = {
  pretty: '  ',
  doctype: 'html',
}
