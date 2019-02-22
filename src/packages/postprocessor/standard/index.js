/*
 * fis3-postprocessor-standard
 * fisker Cheung<lionkay@gmail.com>
 */

import standard from 'standard'

const {log} = global.fis

module.exports = function(content, file, conf) {
  content = content.replace(/\n\s+$/, '')

  try {
    content = standard.lintTextSync(content, {fix: true}).results[0].output
  } catch (error) {
    log.error(error)
    process.exit(1)
  }

  return content
}
