const jsBeautifier = require('js-beautify').html

module.exports = function(content, file, conf) {
  return content ? jsBeautifier(content, conf) : ''
}
