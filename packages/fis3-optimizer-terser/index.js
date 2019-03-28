const _terser = require('terser')

/*
 * fis3-optimizer-terser
 * fisker Cheung<lionkay@gmail.com>
 */
const {log} = global.fis

function getTerserOptions(file, conf) {
  const options = Object.assign({}, conf)
  delete options.filename
  const filename = file.filename + file.rExt

  if (file.isInline) {
    options.sourceMap = false
  }

  const {sourceMap} = options

  if (sourceMap) {
    if (sourceMap.filename && typeof sourceMap.filename === 'string') {
      sourceMap.filename = filename
    }

    if (
      sourceMap.url &&
      sourceMap.url !== 'inline' &&
      typeof sourceMap.url === 'string'
    ) {
      sourceMap.url = ''.concat(filename, '.map')
    }
  }
}

function deriveSourceMap(file, sourceMap) {
  if (!sourceMap) {
    return
  }

  const mapping = global.fis.file.wrap(
    ''
      .concat(file.dirname, '/')
      .concat(file.filename)
      .concat(file.rExt, '.map')
  )
  mapping.setContent(sourceMap)
  file.extras = file.extras || {}
  file.extras.derived = file.extras.derived || []
  file.extras.derived.push(mapping)
}

module.exports = function(content, file, conf) {
  const options = getTerserOptions(file, conf)
  const result = (0, _terser.minify)(content, options)

  if (result.warnings) {
    log.warn(result.warnings)
  }

  if (result.errors) {
    log.warn(result.errors)
    process.exit(1)
  }

  deriveSourceMap(file, result.map)
  return result.code
}
