import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import * as info from './info'

module.exports = function(content, file, config) {
  return postcss([autoprefixer(config)]).process(content, {
    from: config.filename,
  }).css
}
module.exports.defaultOptions = info.options
