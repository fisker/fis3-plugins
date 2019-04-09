'use strict'

var _prettier = _interopRequireDefault(require('prettier'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

var _global = global,
  fis = _global.fis
var assign = Object.assign || fis.util.assign

module.exports = function(content, file, config_) {
  var fileFakePath = file.realpathNoExt + file.rExt

  var config = _prettier['default'].resolveConfig.sync(fileFakePath, {
    editorconfig: true,
  })

  config = assign(config, config_, {
    filepath: fileFakePath,
  })
  delete config.filename

  var parsed = _prettier['default'].format(content, config) // fix inline indent

  if (file.isInline) {
    parsed = parsed.trim()

    if (parsed.includes('\n')) {
      parsed = '\n'.concat(parsed, '\n')
    }
  }

  return parsed
}
