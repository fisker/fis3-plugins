import CleanCSS from 'clean-css'
const log = global.fis.log

module.exports = function(content, file, conf) {
  const options = Object.assign({}, conf)
  delete options.filename

  if (options.returnPromise) {
    options.returnPromise = false
  }

  var result = new CleanCSS(conf).minify(content)

  if (result.warnings) {
    log.warn(result.warnings)
  }

  if (result.errors) {
    log.warn(result.errors)
    process.exit(1)
  }

  return result.styles
}
