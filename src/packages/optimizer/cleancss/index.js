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

module.exports = function(content, file, conf) {
  const options = Object.assign({}, conf)
  delete options.filename

  if (options.returnPromise) {
    options.returnPromise = false
  }

  const result = new CleanCSS(conf).minify(content)

  if (result.warnings && result.warnings.length) {
    log.warn(result.warnings)
  }

  if (result.errors && result.errors.length) {
    log.warn(result.errors)
    process.exit(1)
  }

  deriveSourceMap(file, result.sourceMap)

  return result.styles
}
