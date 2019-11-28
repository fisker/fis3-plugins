/*
 * fis3-postprocessor-standard
 * fisker Cheung<lionkay@gmail.com>
 */

import standard from 'standard'
import * as info from './info'

const {log} = global.fis

function lint(content) {
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

export default lint
export const defaultOptions = info.options
