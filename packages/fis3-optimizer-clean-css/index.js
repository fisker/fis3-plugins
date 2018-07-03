'use strict'

var _cleanCss = require('clean-css')

var _cleanCss2 = _interopRequireDefault(_cleanCss)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

var log = global.fis.log

module.exports = function(content, file, conf) {
  var options = Object.assign({}, conf)
  delete options.filename

  if (options.returnPromise) {
    options.returnPromise = false
  }

  var result = new _cleanCss2.default(conf).minify(content)

  if (result.warnings) {
    log.warn(result.warnings)
  }

  if (result.errors) {
    log.warn(result.errors)
    process.exit(1)
  }

  return result.styles
}
