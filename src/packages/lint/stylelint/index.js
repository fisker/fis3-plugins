/*
 * fis3-lint-stylelint
 * fisker Cheung<lionkay@gmail.com>
 */
import sync from 'promise-synchronizer'
import postcss from 'postcss'
import stylelint from 'stylelint'

const log = global.fis.log

const syntax = {
  '.scss': 'scss',
  '.less': 'less',
  '.sss': 'sugarss'
}

module.exports = function(content, file, conf) {
  if (!content) {
    return
  }

  const config = Object.assign({}, conf, {
    formatter: 'string',
    files: file.realpath,
    extractStyleTagsFromHtml: false,
    from: config.filename
  })
  delete config.filename
  delete config.code
  delete config.codeFilename

  if (!config.syntax && syntax[file.ext]) {
    config.syntax = syntax[file.ext]
  }

  const promise = postcss([stylelint])
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
