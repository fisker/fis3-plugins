import {render} from 'pug'

module.exports = function(content, file, conf) {
  return content ? render(content, conf) : ''
}
