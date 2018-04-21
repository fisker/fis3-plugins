/*
 * fis3-postprocessor-standard
 * fisker Cheung<lionkay@gmail.com>
 */

'use strict'

var _standard = require('standard')

var _standard2 = _interopRequireDefault(_standard)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

var log = global.fis.log

module.exports = function(content, file, conf) {
  content = content.replace(/\n\s+$/, '')

  try {
    content = _standard2.default.lintTextSync(content, {fix: true}).results[0]
      .output
  } catch (err) {
    log.error(err)
    process.exit(1)
  }

  return content
}
