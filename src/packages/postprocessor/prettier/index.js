import prettier from 'prettier'

const {log} = global.fis
const assign = Object.assign || global.fis.util.assign

module.exports = function(content, file, conf) {
  const fileFakePath = file.realpathNoExt + file.rExt

  let config = prettier.resolveConfig.sync(fileFakePath, {
    editorconfig: true,
  })

  config = assign(config, conf, {
    filepath: fileFakePath,
  })

  delete config.filename

  const parsed = prettier.format(content, config)

  return parsed
}
