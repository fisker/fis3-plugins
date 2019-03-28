const _cleanCss = _interopRequireDefault(require('clean-css'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

const {log} = global.fis

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
  const options = Object.assign({}, conf)
  delete options.filename

  if (options.returnPromise) {
    options.returnPromise = false
  }

  const result = new _cleanCss.default(conf).minify(content)

  if (result.warnings && result.warnings.length > 0) {
    log.warn(result.warnings)
  }

  if (result.errors && result.errors.length > 0) {
    log.warn(result.errors)
    process.exit(1)
  }

  deriveSourceMap(file, result.sourceMap)
  return result.styles
}
