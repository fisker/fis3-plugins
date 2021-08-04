'use strict'

var eslint = require('eslint')

function exportPlugin(process, _ref) {
  var options = _ref.options
  process.defaultOptions = options
  return process
}

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
var info$1 = info

var formatter = eslint.CLIEngine.getFormatter()
var log = global.fis.log

function process(content, file, config) {
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

module.exports = exportPlugin(process, info$1)
