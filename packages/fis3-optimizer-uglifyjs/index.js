'use strict'

var _uglifyJs = require('uglify-js')

function getUglifyJSOptions(file, conf) {
  var options = Object.assign({}, conf)
  delete options.filename

  var filename = file.filename + file.rExt

  if (file.isInline) {
    options.sourceMap = false
  }

  var sourceMap = options.sourceMap

  if (sourceMap) {
    if (sourceMap.filename && typeof sourceMap.filename === 'string') {
      sourceMap.filename = filename
    }
    if (
      sourceMap.url &&
      sourceMap.url !== 'inline' &&
      typeof sourceMap.url === 'string'
    ) {
      sourceMap.url = filename + '.map'
    }
  }
} /*
   * fis3-optimizer-uglify-js-latest
   * fisker Cheung<lionkay@gmail.com>
   */

function deriveSourceMap(file, sourceMap) {
  if (!sourceMap) {
    return
  }

  var mapping = global.fis.file.wrap(
    file.dirname + '/' + file.filename + file.rExt + '.map'
  )

  mapping.setContent(sourceMap)

  file.extras = file.extras || {}
  file.extras.derived = file.extras.derived || []
  file.extras.derived.push(mapping)
}

module.exports = function(content, file, conf) {
  var options = getUglifyJSOptions(file, conf)
  var result = (0, _uglifyJs.minify)(content, options)

  deriveSourceMap(file, result.map)

  return result.code
}
