'use strict'

require('es6-shim')

var _promiseSynchronizer = require('promise-synchronizer')

var _promiseSynchronizer2 = _interopRequireDefault(_promiseSynchronizer)

var _postcss = require('postcss')

var _postcss2 = _interopRequireDefault(_postcss)

var _stylelint = require('stylelint')

var _stylelint2 = _interopRequireDefault(_stylelint)

var _stylefmt = require('stylefmt')

var _stylefmt2 = _interopRequireDefault(_stylefmt)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

var log =
  global.fis
    .log /*
                           * fis3-lint-stylelint
                           * fisker Cheung<lionkay@gmail.com>
                           */

var syntax = {
  '.scss': 'scss',
  '.less': 'less',
  '.sss': 'sugarss'
}

module.exports = function(content, file, conf) {
  if (!content) {
    return
  }

  var config = Object.assign({}, conf, {
    formatter: 'string',
    files: file.realpath,
    extractStyleTagsFromHtml: false
  })
  delete config.filename
  delete config.code
  delete config.codeFilename

  if (!config.syntax && syntax[file.ext]) {
    config.syntax = syntax[file.ext]
  }

  if (config.fix) {
    try {
      ;(0, _promiseSynchronizer2.default)(
        (0, _postcss2.default)([_stylefmt2.default])
          .process(content, config)
          .then(function(result) {
            if (result && result.css) {
              content = result.css
            }
          })
      )
    } catch (err) {}
  }
  delete config.fix

  var promise = (0, _postcss2.default)([_stylelint2.default])
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
            message.line ? '[' + message.line + ':' + message.column + ']' : '',
            // '[' + message.rule + ']',
            message.text
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
    return (0, _promiseSynchronizer2.default)(promise)
  } catch (err) {
    log.warn('[%s] lint failed with %s: \n\n %s', file.id, 'error', err)
    process.exit(1)
  }
}
