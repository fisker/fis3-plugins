const _prettier = _interopRequireDefault(require('prettier'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

const assign = Object.assign || global.fis.util.assign

module.exports = function(content, file, conf) {
  const fileFakePath = file.realpathNoExt + file.rExt

  let config = _prettier.default.resolveConfig.sync(fileFakePath, {
    editorconfig: true,
  })

  config = assign(config, conf, {
    filepath: fileFakePath,
  })
  delete config.filename

  const parsed = _prettier.default.format(content, config)

  return parsed
}
