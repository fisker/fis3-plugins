'use strict'

var _cleanCss = require('clean-css')

var _cleanCss2 = _interopRequireDefault(_cleanCss)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

var log = global.fis.log

function deriveSourceMap(file, sourceMap) {
  if (!sourceMap) {
    return
  }

  var mapping = global.fis.file.wrap(
    file.dirname + '/' + file.filename + file.rExt + '.map'
  )

  mapping.setContent(sourceMap)

  file.extras = file.extras || {}
  file.extras.derived = file.extras.derived || []
  file.extras.derived.push(mapping)
}

module.exports = function(content, file, conf) {
  var options = Object.assign({}, conf)
  delete options.filename

  if (options.returnPromise) {
    options.returnPromise = false
  }

  var result = new _cleanCss2.default(conf).minify(content)

  if (result.warnings && result.warnings.length) {
    log.warn(result.warnings)
  }

  if (result.errors && result.errors.length) {
    log.warn(result.errors)
    process.exit(1)
  }

  deriveSourceMap(file, result.sourceMap)

  return result.styles
}
