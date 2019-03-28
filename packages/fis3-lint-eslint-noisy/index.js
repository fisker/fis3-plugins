const _eslint = require('eslint')

const formatter = _eslint.CLIEngine.getFormatter()

const {log} = global.fis

module.exports = function(content, file, conf) {
  if (!content) {
    return
  }

  const cli = new _eslint.CLIEngine(conf)

  if (cli.isPathIgnored(file.realpath)) {
    return
  }

  const report = cli.executeOnText(content, file.realpath)

  if (conf.fix) {
    _eslint.CLIEngine.outputFixes(report)
  }

  if (report.errorCount || report.warningCount) {
    log.warn('[%s] lint failed: \n %s', file.id, formatter(report.results))

    if (report.errorCount) {
      process.exit(1)
    }
  }
}

module.exports.defaultOptions = {
  envs: ['browser'],
  fix: false,
  useEslintrc: true,
}
