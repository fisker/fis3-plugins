'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

exports.default = function(content, file, conf) {
  if (!content) {
    return
  }
  var cli = new CLIEngine(conf)

  if (cli.isPathIgnored(file.realpath)) {
    return
  }
  var report = cli.executeOnText(content, file.realpath)

  if (conf.fix) {
    CLIEngine.outputFixes(report)
  }

  if (report.errorCount || report.warningCount) {
    log.warn('[%s] lint failed: \n %s', file.id, formatter(report.results))
    if (report.errorCount) {
      process.exit(1)
    }
  }
}

var CLIEngine = require('eslint').CLIEngine
var formatter = CLIEngine.getFormatter()
var log = global.fis.log

module.exports.defaultOptions = {
  envs: ['browser'],
  fix: false,
  useEslintrc: true
}
module.exports = exports['default']
