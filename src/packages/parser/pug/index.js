import {render} from 'pug'
import * as info from './info'

module.exports = function(content, file, config) {
  return content ? render(content, config) : ''
}
module.exports.defaultOptions = info.options
