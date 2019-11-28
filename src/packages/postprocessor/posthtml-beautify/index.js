import posthtml from 'posthtml'
import beautify from 'posthtml-beautify'
import sync from 'promise-synchronizer'
import * as info from './info'

const {log} = global.fis

module.exports = function(content, file, config) {
  content = content.replace(
    /__relative\("(.*?)"\)/g,
    '"__relative_fn1_start__$1__relative_fn1_end__"'
  )
  content = content.replace(
    /__relative<<<"(.*?)">>>/g,
    '"__relative_fn2_start__$1__relative_fn2_end__"'
  )

  const promise = posthtml()
    .use(
      beautify({
        rules: config.rules,
      })
    )
    .process(content)
    .then(function(data) {
      return data.html
    })

  try {
    content = sync(promise)
  } catch (error) {
    log.warn('%s might not processed due to:\n %s', file.id, error)

    process.exitCode = 1
    throw new Error('posthtml-beautify error.')
  }

  content = content.replace(
    /"__relative_fn2_start__(.*?)__relative_fn2_end__"/g,
    '__relative<<<"$1">>>'
  )

  content = content.replace(
    /"__relative_fn1_start__(.*?)__relative_fn1_end__"/g,
    '__relative("$1")'
  )

  return content
}
module.exports.defaultOptions = info.options
