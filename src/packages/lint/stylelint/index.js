/*
 * fis3-lint-stylelint
 * fisker Cheung<lionkay@gmail.com>
 */
import sync from 'promise-synchronizer'
import postcss from 'postcss'
import stylelint from 'stylelint'
import exportPlugin from '../../../shared/export-plugin'
import * as info from './info'

const {log} = global.fis

const syntax = {
  '.scss': 'scss',
  '.less': 'less',
  '.sss': 'sugarss',
}

const runStylelint = sync(async (content, config, file) => {
  const result = await postcss([stylelint]).process(content, config)

  const messages = result.messages || []
  const errorMessage = []
  const warnMessage = []
  for (const message of messages) {
    const type = message.severity || 'warn'
    ;(type === 'error' ? errorMessage : warnMessage).push(
      [
        ' ',
        `${type}:`,
        message.line ? `[${message.line}:${message.column}]` : '',
        // '[' + message.rule + ']',
        message.text,
      ].join(' ')
    )
  }

  if (warnMessage.length !== 0 || errorMessage.length !== 0) {
    log.warn(
      '[%s] lint failed: \n%s \n  %s problem (%s errors, %s warning)',
      file.id,
      [...warnMessage, ...errorMessage].join('\n'),
      warnMessage.length + errorMessage.length,
      errorMessage.length,
      warnMessage.length
    )

    if (errorMessage.length !== 0) {
      process.exitCode = 1
      throw new Error('stylelint error.')
    }
  }

  if (result && result.css) {
    return result.css
  }

  return ''
})

function process(content, file, config_) {
  if (!content) {
    return content
  }

  const config = {
    ...config_,
    formatter: 'string',
    files: file.realpath,
    extractStyleTagsFromHtml: false,
    from: config_.filename,
  }

  delete config.filename
  delete config.code
  delete config.codeFilename

  if (!config.syntax && syntax[file.ext]) {
    config.syntax = syntax[file.ext]
  }

  try {
    return runStylelint(content, config, file)
  } catch (error) {
    throw new Error(`[${file.id}] lint failed with error: \n\n ${error}`)
  }
}

module.exports = exportPlugin(process, info)
