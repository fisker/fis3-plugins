'use strict'

var _promiseSynchronizer = _interopRequireDefault(
  require('promise-synchronizer')
)

var _postcss = _interopRequireDefault(require('postcss'))

var _stylelint = _interopRequireDefault(require('stylelint'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

/*
 * fis3-lint-stylelint
 * fisker Cheung<lionkay@gmail.com>
 */
var log = global.fis.log
var syntax = {
  '.scss': 'scss',
  '.less': 'less',
  '.sss': 'sugarss',
}

module.exports = function(content, file, conf) {
  if (!content) {
    return
  }

  var config = Object.assign({}, conf, {
    formatter: 'string',
    files: file.realpath,
    extractStyleTagsFromHtml: false,
    from: config.filename,
  })
  delete config.filename
  delete config.code
  delete config.codeFilename

  if (!config.syntax && syntax[file.ext]) {
    config.syntax = syntax[file.ext]
  }

  var promise = (0, _postcss.default)([_stylelint.default])
    .process(content, config)
    .then(function(result) {
      var messages = result.messages || []
      var errorMsg = []
      var warnMsg = []

      for (var i = 0; i < messages.length; i++) {
        var message = messages[i]
        var type = message.severity || 'warn'
        ;(type === 'error' ? errorMsg : warnMsg).push(
          [
            ' ',
            type + ':',
            message.line ? '[' + message.line + ':' + message.column + ']' : '', // '[' + message.rule + ']',
            message.text,
          ].join(' ')
        )
      }

      if (warnMsg.length || errorMsg.length) {
        log.warn(
          '[%s] lint failed: \n%s \n  %s problem (%s errors, %s warning)',
          file.id,
          warnMsg.concat(errorMsg).join('\n'),
          warnMsg.length + errorMsg.length,
          errorMsg.length,
          warnMsg.length
        )

        if (errorMsg.length) {
          process.exit(1)
        }
      }

      if (result && result.css) {
        return result.css
      }
    })

  try {
    return (0, _promiseSynchronizer.default)(promise)
  } catch (err) {
    log.warn('[%s] lint failed with %s: \n\n %s', file.id, 'error', err)
    process.exit(1)
  }
}
