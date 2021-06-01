import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import exportPlugin from '../../../shared/export-plugin'
import info from './info'

function process(content, file, config) {
  return postcss([autoprefixer(config)]).process(content, {
    from: config.filename,
  }).css
}

module.exports = exportPlugin(process, info)
