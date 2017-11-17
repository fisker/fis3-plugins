var postcss = require('postcss')
var autoprefixer = require('autoprefixer')

module.exports = function(content, file, conf) {
  return postcss([autoprefixer(conf)]).process(content).css
}
