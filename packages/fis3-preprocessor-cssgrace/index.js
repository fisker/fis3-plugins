'use strict'

var _cssgraceLite = require('cssgrace-lite')

module.exports = function(content, file, config) {
  return (0, _cssgraceLite.pack)(content, config)
}
