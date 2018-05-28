import prettier from 'prettier'

const log = global.fis.log
const assign = Object.assign || global.fis.util.assign

module.exports = function(content, file, conf) {
  const fileFakePath = file.realpathNoExt + file.rExt

  let config = prettier.resolveConfig.sync(fileFakePath, {
    editorconfig: true
  })

  config = assign(config, conf, {
    filepath: fileFakePath
  })

  delete config.filename

  let parsed = prettier.format(content, config)

  // fix inline indent
  if (file.isInline) {
    parsed = parsed.trim()

    if (parsed.indexOf('\n') !== -1) {
      parsed = '\n' + parsed + '\n'
    }
  }

  return parsed
}
