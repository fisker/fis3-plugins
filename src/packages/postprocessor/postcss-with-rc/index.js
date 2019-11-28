import postcss from 'postcss'
import postcssrc from 'postcss-load-config'
import sync from 'promise-synchronizer'
import * as info from './info'

async function postcssProcess(content, file, config) {
  const {plugins, options} = await postcssrc()
  const {css} = await postcss(plugins).process(content, {
    ...config,
    ...options,
    from: config.filename,
  })

  return css
}

function process(content, file, config) {
  return sync(postcssProcess(content, file, config))
}

export default process
export const defaultOptions = info.options
