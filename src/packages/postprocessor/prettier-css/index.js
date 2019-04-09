import prettier from 'prettier'

const {fis} = global
const assign = Object.assign || fis.util.assign

module.exports = function(content, file, config_) {
  const fileFakePath = file.realpathNoExt + file.rExt

  let config = prettier.resolveConfig.sync(fileFakePath, {
    editorconfig: true,
  })

  config = assign(config, config_, {
    filepath: fileFakePath,
  })

  delete config.filename

  let parsed = prettier.format(content, config)

  // fix inline indent
  if (file.isInline) {
    parsed = parsed.trim()

    if (parsed.includes('\n')) {
      parsed = `\n${parsed}\n`
    }
  }

  return parsed
}
