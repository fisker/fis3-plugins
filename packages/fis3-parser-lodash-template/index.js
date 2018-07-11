'use strict'

var _lodash = require('lodash')

var _lodash2 = _interopRequireDefault(_lodash)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

module.exports = function(content, file, conf) {
  var data = conf.data
  var options = conf.options

  var compiled = _lodash2.default.template(content, options)

  content = compiled(data)

  return content
}
