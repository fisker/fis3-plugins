'use strict'

var _eslint = require('eslint')

var _standard = _interopRequireDefault(require('standard'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

var formatter = _eslint.CLIEngine.getFormatter()

var log = global.fis.log

module.exports = function(content, file, conf) {
  content = content.replace(/\n\s+$/, '')
  var results = []

  try {
    results = _standard.default.lintTextSync(content, {}).results
  } catch (err) {
    log.error(err)
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
