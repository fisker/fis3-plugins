'use strict'

var _prettier = _interopRequireDefault(require('prettier'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

var assign = Object.assign || global.fis.util.assign

module.exports = function(content, file, config_) {
  var fileFakePath = file.realpathNoExt + file.rExt

  var config = _prettier.default.resolveConfig.sync(fileFakePath, {
    editorconfig: true,
  })

  config = assign(config, config_, {
    filepath: fileFakePath,
  })
  delete config.filename

  var parsed = _prettier.default.format(content, config)

  return parsed
}
