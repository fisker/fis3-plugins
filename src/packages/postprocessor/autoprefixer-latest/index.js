import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import * as info from './info'

function process(content, file, config) {
  return postcss([autoprefixer(config)]).process(content, {
    from: config.filename,
  }).css
}

export default process
export const defaultOptions = info.options
