import {html as jsBeautifier} from 'js-beautify'

module.exports = function(content, file, config) {
  return content ? jsBeautifier(content, config) : ''
}
