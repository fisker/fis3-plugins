'use strict'

var _prettier = _interopRequireDefault(require('prettier'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

var log = global.fis.log
var assign = Object.assign || global.fis.util.assign

module.exports = function(content, file, conf) {
  var fileFakePath = file.realpathNoExt + file.rExt

  var config = _prettier.default.resolveConfig.sync(fileFakePath, {
    editorconfig: true
  })

  config = assign(config, conf, {
    filepath: fileFakePath
  })
  delete config.filename

  var parsed = _prettier.default.format(content, config) // fix inline indent

  if (file.isInline) {
    parsed = parsed.trim()

    if (parsed.indexOf('\n') !== -1) {
      parsed = '\n' + parsed + '\n'
    }
  }

  return parsed
}
