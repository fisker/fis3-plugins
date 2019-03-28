import prettier from 'prettier'

const assign = Object.assign || global.fis.util.assign

module.exports = function(content, file, config_) {
  const fileFakePath = file.realpathNoExt + file.rExt

  let config = prettier.resolveConfig.sync(fileFakePath, {
    editorconfig: true,
  })

  config = assign(config, config_, {
    filepath: fileFakePath,
  })

  delete config.filename

  const parsed = prettier.format(content, config)

  return parsed
}
