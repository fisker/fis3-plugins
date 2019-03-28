import _ from 'lodash'
import path from 'path'

const {fis} = global
const PROJECT_ROOT = fis.project.getProjectPath()
const root = path.normalize(PROJECT_ROOT)

const re = /^[.\\/]/i

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

module.exports = function(content, file, config) {
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

module.exports.lodash = _
