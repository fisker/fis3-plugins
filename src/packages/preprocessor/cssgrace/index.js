import {pack as cssgrace} from 'cssgrace-lite'

module.exports = function(content, file, config) {
  return cssgrace(content, config)
}
