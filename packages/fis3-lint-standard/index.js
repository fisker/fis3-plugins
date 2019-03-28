const _eslint = require('eslint')

const _standard = _interopRequireDefault(require('standard'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

const formatter = _eslint.CLIEngine.getFormatter()

const {log} = global.fis

module.exports = function(content, file) {
  content = content.replace(/\n\s+$/, '')
  let results = []

  try {
    results = _standard.default.lintTextSync(content, {}).results
  } catch (error) {
    log.error(error)
    process.exit(1)
  }

  results = results[0]

  if (results.errorCount || results.warningCount) {
    log.warn('[%s] lint failed: \n %s', file.id, formatter([results]))

    if (results.errorCount) {
      process.exit(1)
    }
  }
}
