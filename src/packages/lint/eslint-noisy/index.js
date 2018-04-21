import {CLIEngine} from 'eslint'

const formatter = CLIEngine.getFormatter()
const log = global.fis.log

export default function(content, file, conf) {
  if (!content) {
    return
  }
  const cli = new CLIEngine(conf)

  if (cli.isPathIgnored(file.realpath)) {
    return
  }
  const report = cli.executeOnText(content, file.realpath)

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
