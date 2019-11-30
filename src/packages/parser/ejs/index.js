import ejs from 'ejs'
import path from 'path'
import exportPlugin from '../../../shared/export-plugin'
import * as info from './info'

const {fis} = global
const PROJECT_ROOT = fis.project.getProjectPath()
const root = path.normalize(PROJECT_ROOT)

const re = /^[./\\]/i

function cleanRequireCache() {
  Object.keys(require.cache)
    .filter(function(id) {
      return path.normalize(id).startsWith(root)
    })
    .forEach(function(id) {
      delete require.cache[id]
    })
}

function makeRequireFunction(context) {
  return function(module_) {
    cleanRequireCache()

    if (re.test(module_)) {
      module_ = path.resolve(context, module_)
    }

    return require(module_)
  }
}

function process(content, file, config) {
  if (file.filename[0] === '_') {
    return content
  }
  const {filename} = config
  const dirname = path.dirname(filename)

  const data = {
    require: makeRequireFunction(dirname),
    __dirname: dirname,
    __filename: filename,
    ...config.data,
  }
  const {options} = config

  options.root = PROJECT_ROOT
  options.filename = file.realpath
  options.cache = false

  content = ejs.render(content, data, options)

  return content
}

module.exports = exportPlugin(process, info)
