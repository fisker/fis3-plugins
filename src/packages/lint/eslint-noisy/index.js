import {CLIEngine} from 'eslint'
import * as info from './info'

const formatter = CLIEngine.getFormatter()
const {log} = global.fis

module.exports = function(content, file, config) {
  if (!content) {
    return
  }
  const cli = new CLIEngine(config)

  if (cli.isPathIgnored(file.realpath)) {
    return
  }
  const report = cli.executeOnText(content, file.realpath)

  if (report.errorCount || report.warningCount) {
    if (config.fix) {
      CLIEngine.outputFixes(report)
    }
    log.warn('[%s] lint failed: \n %s', file.id, formatter(report.results))
    if (report.errorCount) {
      process.exitCode = 1
      throw new Error('eslint error.')
    }
  }
}
module.exports.defaultOptions = info.options
