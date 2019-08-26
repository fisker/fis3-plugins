import prettier from 'prettier'

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
