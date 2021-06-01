import {html as jsBeautifier} from 'js-beautify'
import exportPlugin from '../../../shared/export-plugin'
import info from './info'

function process(content, file, config) {
  return content ? jsBeautifier(content, config) : ''
}
module.exports = exportPlugin(process, info)
