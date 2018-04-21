/*
 * fis3-postprocessor-standard
 * fisker Cheung<lionkay@gmail.com>
 */

'use strict'

import standard from 'standard'

const log = global.fis.log

module.exports = function(content, file, conf) {
  content = content.replace(/\n\s+$/, '')

  try {
    content = standard.lintTextSync(content, {fix: true}).results[0].output
  } catch (err) {
    log.error(err)
    process.exit(1)
  }

  return content
}
