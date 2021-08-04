import exportPlugin from '../../../shared/export-plugin.js'
import info from './info.js'

function process() {
  throw new Error('use prettier instead of stylefmt')
}

module.exports = exportPlugin(process, info)
