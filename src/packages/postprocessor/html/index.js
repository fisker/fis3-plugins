import {html as jsBeautifier} from 'js-beautify'

module.exports = function(content, file, conf) {
  return content ? jsBeautifier(content, conf) : ''
}
