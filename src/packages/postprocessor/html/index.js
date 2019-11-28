import {html as jsBeautifier} from 'js-beautify'
import * as info from './info'

module.exports = function(content, file, config) {
  return content ? jsBeautifier(content, config) : ''
}

module.exports.defaultOptions = info.options
