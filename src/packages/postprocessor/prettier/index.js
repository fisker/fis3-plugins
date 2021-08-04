import prettier from 'prettier'
import exportPlugin from '../../../shared/export-plugin.js'
import info from './info.js'

function process(content, file, config) {
  const fileFakePath = file.realpathNoExt + file.rExt

  const prettierConfig = {
    ...prettier.resolveConfig.sync(fileFakePath, {
      editorconfig: true,
    }),
    ...config,
    filepath: fileFakePath,
    filename: undefined,
  }

  return prettier.format(content, prettierConfig)
}

module.exports = exportPlugin(process, info)
