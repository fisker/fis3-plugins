import {pack as cssgrace} from 'cssgrace-lite'
import * as info from './info'

function process(content, file, config) {
  return cssgrace(content, config)
}

export default process
export const defaultOptions = info.options
