const _standard = _interopRequireDefault(require('standard'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

/*
 * fis3-postprocessor-standard
 * fisker Cheung<lionkay@gmail.com>
 */
const {log} = global.fis

module.exports = function(content, file, conf) {
  content = content.replace(/\n\s+$/, '')

  try {
    content = _standard.default.lintTextSync(content, {
      fix: true,
    }).results[0].output
  } catch (error) {
    log.error(error)
    process.exit(1)
  }

  return content
}
