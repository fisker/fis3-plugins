import {render} from 'pug'
import * as info from './info'

function process(content, file, config) {
  return content ? render(content, config) : ''
}

export default process
export const defaultOptions = info.options
