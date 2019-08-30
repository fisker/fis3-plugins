'use strict'

var _standard = _interopRequireDefault(require('standard'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

/*
 * fis3-postprocessor-standard
 * fisker Cheung<lionkay@gmail.com>
 */
var log = global.fis.log

module.exports = function(content) {
  content = content.replace(/\n\s+$/, '')

  try {
    content = _standard['default'].lintTextSync(content, {
      fix: true,
    }).results[0].output
  } catch (error) {
    log.error(error)
    process.exitCode = 1
    throw new Error('standard lint error.')
  }

  return content
}
