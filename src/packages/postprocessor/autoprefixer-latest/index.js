import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

module.exports = function(content, file, config) {
  return postcss([autoprefixer(config)]).process(content, {
    from: config.filename,
  }).css
}
