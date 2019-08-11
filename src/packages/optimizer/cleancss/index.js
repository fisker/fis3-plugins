import CleanCSS from 'clean-css'

const {log} = global.fis

function deriveSourceMap(file, sourceMap) {
  if (!sourceMap) {
    return
  }

  const mapping = global.fis.file.wrap(
    `${file.dirname}/${file.filename}${file.rExt}.map`
  )

  mapping.setContent(sourceMap)

  file.extras = file.extras || {}
  file.extras.derived = file.extras.derived || []
  file.extras.derived.push(mapping)
}

module.exports = function(content, file, config) {
  const options = {...config}
  delete options.filename

  if (options.returnPromise) {
    options.returnPromise = false
  }

  const result = new CleanCSS(config).minify(content)

  if (result.warnings && result.warnings.length > 0) {
    log.warn(result.warnings)
  }

  if (result.errors && result.errors.length > 0) {
    log.warn(result.errors)
    process.exitCode = 1
    throw new Error('cleancss error.')
  }

  deriveSourceMap(file, result.sourceMap)

  return result.styles
}
