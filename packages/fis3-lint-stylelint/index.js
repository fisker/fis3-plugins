const _promiseSynchronizer = _interopRequireDefault(
  require('promise-synchronizer')
)

const _postcss = _interopRequireDefault(require('postcss'))

const _stylelint = _interopRequireDefault(require('stylelint'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

/*
 * fis3-lint-stylelint
 * fisker Cheung<lionkay@gmail.com>
 */
const {log} = global.fis
const syntax = {
  '.scss': 'scss',
  '.less': 'less',
  '.sss': 'sugarss',
}

module.exports = function(content, file, conf) {
  if (!content) {
    return
  }

  const config = Object.assign({}, conf, {
    formatter: 'string',
    files: file.realpath,
    extractStyleTagsFromHtml: false,
    from: conf.filename,
  })
  delete config.filename
  delete config.code
  delete config.codeFilename

  if (!config.syntax && syntax[file.ext]) {
    config.syntax = syntax[file.ext]
  }

  const promise = (0, _postcss.default)([_stylelint.default])
    .process(content, config)
    .then(function(result) {
      const messages = result.messages || []
      const errorMsg = []
      const warnMsg = []

      for (let i = 0; i < messages.length; i++) {
        const message = messages[i]
        const type = message.severity || 'warn'
        ;(type === 'error' ? errorMsg : warnMsg).push(
          [
            ' ',
            ''.concat(type, ':'),
            message.line
              ? '['.concat(message.line, ':').concat(message.column, ']')
              : '', // '[' + message.rule + ']',
            message.text,
          ].join(' ')
        )
      }

      if (warnMsg.length > 0 || errorMsg.length > 0) {
        log.warn(
          '[%s] lint failed: \n%s \n  %s problem (%s errors, %s warning)',
          file.id,
          warnMsg.concat(errorMsg).join('\n'),
          warnMsg.length + errorMsg.length,
          errorMsg.length,
          warnMsg.length
        )

        if (errorMsg.length > 0) {
          process.exit(1)
        }
      }

      if (result && result.css) {
        return result.css
      }

      return ''
    })

  try {
    return (0, _promiseSynchronizer.default)(promise)
  } catch (error) {
    throw new Error(
      '['.concat(file.id, '] lint failed with error: \n\n ').concat(error)
    )
  }
}
