'use strict'

var _eslint = require('eslint')

var formatter = _eslint.CLIEngine.getFormatter()

var log = global.fis.log

module.exports = function(content, file, config) {
  if (!content) {
    return
  }

  var cli = new _eslint.CLIEngine(config)

  if (cli.isPathIgnored(file.realpath)) {
    return
  }

  var report = cli.executeOnText(content, file.realpath)

  if (config.fix) {
    _eslint.CLIEngine.outputFixes(report)
  }

  if (report.errorCount || report.warningCount) {
    log.warn('[%s] lint failed: \n %s', file.id, formatter(report.results))

    if (report.errorCount) {
      process.exitCode = 1
      throw new Error('eslint error.')
    }
  }
}

module.exports.defaultOptions = {
  envs: ['browser'],
  fix: false,
  useEslintrc: true,
}
