const render = require('pug').render

module.exports = function(content, file, conf) {
  return content ? render(content, conf) : ''
}
