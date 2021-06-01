import {render} from 'pug'
import info from './info'
import exportPlugin from '../../../shared/export-plugin'

function process(content, file, config) {
  return content ? render(content, config) : ''
}

module.exports = exportPlugin(process, info)
