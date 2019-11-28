import prettier from 'prettier'
import * as info from './info'

module.exports = function(content, file, config) {
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

module.exports.defaultOptions = info.options
