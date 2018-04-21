import prettier from 'prettier'

const log = global.fis.log
const assign = Object.assign || global.fis.util.assign
const rcConfig = prettier.resolveConfig.sync('prettier')

export default function(content, file, conf) {
  delete conf.filename
  content = prettier.format(content, assign({}, rcConfig, conf))

  // remove inline file final newline
  if (file.cache.isInline) {
    content.replace(/\s*$/, '')
  }
  return content
}
