'use strict'

var _eslint = require('eslint')

var _standard = _interopRequireDefault(require('standard'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

var formatter = _eslint.CLIEngine.getFormatter()

var log = global.fis.log

module.exports = function(content, file) {
  content = content.replace(/\n\s+$/, '')
  var results = []

  try {
    var _standard$lintTextSyn = _standard.default.lintTextSync(content, {})

    results = _standard$lintTextSyn.results
  } catch (error) {
    log.error(error)
    process.exitCode = 1
    throw new Error('standard error.')
  }

  results = results[0]

  if (results.errorCount || results.warningCount) {
    log.warn('[%s] lint failed: \n %s', file.id, formatter([results]))

    if (results.errorCount) {
      process.exitCode = 1
      throw new Error('standard error.')
    }
  }
}
