import postcss from 'postcss'
import postcssrc from 'postcss-load-config'
import sync from 'promise-synchronizer'

module.exports = function(content, file, config) {
  const {plugins, options} = sync(postcssrc())

  return postcss(plugins).process(content, {
    ...config,
    ...options,
    from: config.filename,
  }).css
}
