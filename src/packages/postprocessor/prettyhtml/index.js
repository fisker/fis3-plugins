import prettyhtml from '@starptech/prettyhtml'
import * as info from './info'

module.exports = function(content, file, config) {
  content = prettyhtml(content, config).contents
  content = content.replace(/\n\s*<!-- prettyhtml-ignore -->\n/g, '\n')
  return content
}

module.exports.defaultOptions = info.options
