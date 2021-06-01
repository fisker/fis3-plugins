import {CLIEngine} from 'eslint'
import info from './info'
import exportPlugin from '../../../shared/export-plugin'

const formatter = CLIEngine.getFormatter()
const {log} = global.fis

function process(content, file, config) {
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
module.exports = exportPlugin(process, info)
