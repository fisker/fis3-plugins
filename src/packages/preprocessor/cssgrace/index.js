import {pack as cssgrace} from 'cssgrace-lite'

module.exports = function(content, file, conf) {
  return cssgrace(content, conf)
}
