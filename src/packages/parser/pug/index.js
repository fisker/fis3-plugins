import {render} from 'pug'

module.exports = function(content, file, config) {
  return content ? render(content, config) : ''
}
