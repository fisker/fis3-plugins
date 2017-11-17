'use strict'

/*
 * fis3-lint-stylelint
 * fisker Cheung<lionkay@gmail.com>
 */
require('es6-shim')
var sync = require('promise-synchronizer')
var postcss = require('postcss')
var stylelint = require('stylelint')
var stylefmt = require('stylefmt')
var log = global.fis.log

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
      sync(
        postcss([stylefmt])
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

  var promise = postcss([stylelint])
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
    return sync(promise)
  } catch (err) {
    log.warn('[%s] lint failed with %s: \n\n %s', file.id, 'error', err)
    process.exit(1)
  }
}
