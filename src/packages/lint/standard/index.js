import {CLIEngine} from 'eslint'
import standard from 'standard'

const formatter = CLIEngine.getFormatter()
const {log} = global.fis

module.exports = function(content, file) {
  content = content.replace(/\n\s+$/, '')
  let results = []

  try {
    ;({results} = standard.lintTextSync(content, {}))
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
