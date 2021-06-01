import info from './info'
import exportPlugin from '../../../shared/export-plugin'

function process() {
  throw new Error('use prettier instead of stylefmt')
}

module.exports = exportPlugin(process, info)
