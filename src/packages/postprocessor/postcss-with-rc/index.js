import postcss from 'postcss'
import postcssrc from 'postcss-load-config'
import sync from 'promise-synchronizer'

async function process(content, file, config) {
  const {plugins, options} = await postcssrc()
  const {css} = await postcss(plugins).process(content, {
    ...config,
    ...options,
    from: config.filename,
  })

  return css
}

module.exports = function(content, file, config) {
  return sync(process(content, file, config))
}
