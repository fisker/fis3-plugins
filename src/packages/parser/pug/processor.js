const render = require('pug').render
const log = global.fis.log

module.exports = function(content, file, conf) {
  return content ? render(content, conf) : ''
}
