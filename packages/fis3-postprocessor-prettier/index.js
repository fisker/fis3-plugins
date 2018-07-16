'use strict'

var _prettier = require('prettier')

var _prettier2 = _interopRequireDefault(_prettier)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

var log = global.fis.log
var assign = Object.assign || global.fis.util.assign

module.exports = function(content, file, conf) {
  var fileFakePath = file.realpathNoExt + file.rExt

  var config = _prettier2.default.resolveConfig.sync(fileFakePath, {
    editorconfig: true
  })

  config = assign(config, conf, {
    filepath: fileFakePath
  })

  delete config.filename

  var parsed = _prettier2.default.format(content, config)

  // fix inline indent
  if (file.isInline || file.filename[0] === '.') {
    parsed = parsed.trim()

    if (parsed.indexOf('\n') !== -1) {
      parsed = '\n' + parsed + '\n'
    }
  }

  return parsed
}
