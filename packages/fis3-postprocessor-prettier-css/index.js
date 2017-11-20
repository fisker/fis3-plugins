'use strict'

var prettier = require('prettier')
var assign = Object.assign || global.fis.util.assign
var rcConfig = prettier.resolveConfig.sync('prettier')

module.exports = function(content, file, conf) {
  delete conf.filename
  content = prettier.format(content, assign({}, rcConfig, conf))

  // remove inline file final newline
  if (file.cache.isInline) {
    content.replace(/\s*$/, '')
  }
  return content
}

module.exports.defaultOptions = {
  parser: 'css',
  singleQuote: false
}
