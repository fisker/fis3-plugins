import posthtml from 'posthtml'
import beautify from 'posthtml-beautify'
import sync from 'promise-synchronizer'
import exportPlugin from '../../../shared/export-plugin.js'
import info from './info.js'

const {log} = global.fis

const runBeautify = sync(async (html, rules) => {
  const data = await posthtml()
    .use(
      beautify({
        rules,
      }),
    )
    .process(html)

  return data.html
})

function process(content, file, config) {
  content = content.replace(
    /__relative\("(.*?)"\)/g,
    '"__relative_fn1_start__$1__relative_fn1_end__"',
  )
  content = content.replace(
    /__relative<<<"(.*?)">>>/g,
    '"__relative_fn2_start__$1__relative_fn2_end__"',
  )

  try {
    content = runBeautify(content, config.rules)
  } catch (error) {
    log.warn('%s might not processed due to:\n %s', file.id, error)

    process.exitCode = 1
    throw new Error('posthtml-beautify error.')
  }

  content = content.replace(
    /"__relative_fn2_start__(.*?)__relative_fn2_end__"/g,
    '__relative<<<"$1">>>',
  )

  content = content.replace(
    /"__relative_fn1_start__(.*?)__relative_fn1_end__"/g,
    '__relative("$1")',
  )

  return content
}
module.exports = exportPlugin(process, info)
