'use strict'

var eslint = require('eslint')

var info = {
  description: 'a js linter plugin of fis3 based on eslint.',
  keywords: ['eslint', 'linter'],
  dependencies: ['eslint'],
  options: {
    envs: ['browser'],
    fix: true,
    useEslintrc: true,
  },
  links: {
    eslint: 'http://eslint.org/',
  },
}
var info_4 = info.options

var formatter = eslint.CLIEngine.getFormatter()
var log = global.fis.log

module.exports = function(content, file, config) {
  if (!content) {
    return
  }

  var cli = new eslint.CLIEngine(config)

  if (cli.isPathIgnored(file.realpath)) {
    return
  }

  var report = cli.executeOnText(content, file.realpath)

  if (report.errorCount || report.warningCount) {
    if (config.fix) {
      eslint.CLIEngine.outputFixes(report)
    }

    log.warn('[%s] lint failed: \n %s', file.id, formatter(report.results))

    if (report.errorCount) {
      process.exitCode = 1
      throw new Error('eslint error.')
    }
  }
}

module.exports.defaultOptions = info_4
