import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

module.exports = function(content, file, conf) {
  return postcss([autoprefixer(conf)]).process(content).css
}
