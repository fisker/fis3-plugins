import prettyhtml from '@starptech/prettyhtml'
import * as info from './info'

function process(content, file, config) {
  content = prettyhtml(content, config).contents
  content = content.replace(/\n\s*<!-- prettyhtml-ignore -->\n/g, '\n')
  return content
}
export default process
export const defaultOptions = info.options
