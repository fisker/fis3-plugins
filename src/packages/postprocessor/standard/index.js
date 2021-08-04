/*
 * fis3-postprocessor-standard
 * fisker Cheung<lionkay@gmail.com>
 */
import process from 'process'
import standard from 'standard'
import exportPlugin from '../../../shared/export-plugin.js'
import info from './info.js'

const {log} = global.fis

function format(content) {
  content = content.replace(/\n\s+$/, '')

  try {
    content = standard.lintTextSync(content, {fix: true}).results[0].output
  } catch (error) {
    log.error(error)
    process.exitCode = 1
    throw new Error('standard lint error.')
  }

  return content
}

module.exports = exportPlugin(format, info)
