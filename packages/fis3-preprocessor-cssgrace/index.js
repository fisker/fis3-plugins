'use strict'

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
var info_4 = info.options

module.exports = function(content, file, config) {
  return cssgraceLite.pack(content, config)
}

module.exports.defaultOptions = info_4
