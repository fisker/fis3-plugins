import {pack as cssgrace} from 'cssgrace'

module.exports = function(content, file, conf) {
  const options = {
    from: file.realpath
  }
  return cssgrace(content, options)
}
