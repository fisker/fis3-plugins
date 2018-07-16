import _ from 'lodash'
import path from 'path'

const PROJECT_ROOT = fis.project.getProjectPath()
const root = path.normalize(PROJECT_ROOT)


const re = /^[.\\/]/i

function cleanRequireCache() {
  Object.keys(require.cache)
    .filter(function (id) {
      return path.normalize(id).startsWith(root)
    })
    .forEach(function (id) {
      delete require.cache[id]
    })
}

function makeRequireFunction(context) {
  return function (mod) {
    cleanRequireCache()

    if (re.test(mod)) {
      mod = path.resolve(context, mod)
    }

    return require(mod)
  }
}

module.exports = function (content, file, conf) {
  const data = conf.data
  const options = conf.options
  const filename = conf.filename
  const dirname = path.dirname(filename)

  options.imports = {
    require: makeRequireFunction(dirname),
    __dirname: dirname,
    __filename: filename,
    ...options.imports
  }

  const compiled = _.template(content, options)

  content = compiled(data)

  return content
}

module.exports.lodash = _
