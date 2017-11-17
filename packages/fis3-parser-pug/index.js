'use strict'

var render = require('pug').render

module.exports = function(content, file, conf) {
  return content ? render(content, conf) : ''
}

module.exports.defaultOptions = {
  pretty: '  ',
  doctype: 'html'
}
