import {pack as cssgrace} from 'cssgrace-lite'
import exportPlugin from '../../../shared/export-plugin.js'
import info from './info.js'

function process(content, file, config) {
  return cssgrace(content, config)
}

module.exports = exportPlugin(process, info)
