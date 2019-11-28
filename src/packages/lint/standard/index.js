import {CLIEngine} from 'eslint'
import standard from 'standard'
import exportPlugin from '../../../shared/export-plugin'
import * as info from './info'

const formatter = CLIEngine.getFormatter()
const {log} = global.fis

function lint(content, file) {
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

module.exports = exportPlugin(lint, info)
