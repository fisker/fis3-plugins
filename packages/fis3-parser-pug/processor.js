'use strict'

var render = require('pug').render
var log = global.fis.log

module.exports = function(content, file, conf) {
  return content ? render(content, conf) : ''
}
