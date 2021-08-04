import {render} from 'pug'
import exportPlugin from '../../../shared/export-plugin.js'
import info from './info.js'

function process(content, file, config) {
  return content ? render(content, config) : ''
}

module.exports = exportPlugin(process, info)
