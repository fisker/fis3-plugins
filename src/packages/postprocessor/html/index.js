import {html as jsBeautifier} from 'js-beautify'
import * as info from './info'

function process(content, file, config) {
  return content ? jsBeautifier(content, config) : ''
}

export default process
export const defaultOptions = info.options
