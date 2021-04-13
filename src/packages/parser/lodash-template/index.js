import _ from 'lodash'
import path from 'path'
import exportPlugin from '../../../shared/export-plugin'
import * as info from './info'

const {fis} = global
const PROJECT_ROOT = fis.project.getProjectPath()
const root = path.normalize(PROJECT_ROOT)

const re = /^[./\\]/i

function cleanRequireCache() {
  for (const id of Object.keys(require.cache).filter((id) =>
    path.normalize(id).startsWith(root)
  )) {
    delete require.cache[id]
  }
}

function makeRequireFunction(context) {
  return function (module_) {
    cleanRequireCache()

    if (re.test(module_)) {
      module_ = path.resolve(context, module_)
    }

    return require(module_)
  }
}

function process(content, file, config) {
  const {data} = config
  const {options} = config
  const {filename} = config
  const dirname = path.dirname(filename)

  options.imports = {
    require: makeRequireFunction(dirname),
    __dirname: dirname,
    __filename: filename,
    ...options.imports,
  }

  const compiled = _.template(content, options)

  content = compiled(data)

  return content
}

const plugin = exportPlugin(process, info)
plugin.lodash = _
module.exports = plugin
