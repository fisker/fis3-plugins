'use strict'

var CLIEngine = require('eslint').CLIEngine
var formatter = CLIEngine.getFormatter()
var standard = require('standard')
var log = global.fis.log

module.exports = function(content, file, conf) {
  content = content.replace(/\n\s+$/, '')
  var results

  try {
    results = standard.lintTextSync(content, {}).results
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
