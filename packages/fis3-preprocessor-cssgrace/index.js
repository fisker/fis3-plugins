const _cssgraceLite = require('cssgrace-lite')

module.exports = function(content, file, conf) {
  return (0, _cssgraceLite.pack)(content, conf)
}
