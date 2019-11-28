import {pack as cssgrace} from 'cssgrace-lite'
import * as info from './info'

module.exports = function(content, file, config) {
  return cssgrace(content, config)
}
module.exports.defaultOptions = info.options
