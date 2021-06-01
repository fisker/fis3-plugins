import prettyhtml from '@starptech/prettyhtml'
import exportPlugin from '../../../shared/export-plugin'
import info from './info'

function process(content, file, config) {
  content = prettyhtml(content, config).contents
  content = content.replace(/\n\s*<!-- prettyhtml-ignore -->\n/g, '\n')
  return content
}
module.exports = exportPlugin(process, info)
