import prettier from 'prettier'
import * as info from './info'

const {fis} = global
const assign = Object.assign || fis.util.assign

function process(content, file, config_) {
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

export default process
export const defaultOptions = info.options
