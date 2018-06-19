'use strict'

var _cssgrace = require('cssgrace')

module.exports = function(content, file, conf) {
  var options = {
    from: file.realpath
  }
  return (0, _cssgrace.pack)(content, options)
}
