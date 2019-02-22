import ejs from 'ejs'
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
  return function(mod) {
    cleanRequireCache()

    if (re.test(mod)) {
      mod = path.resolve(context, mod)
    }

    return require(mod)
  }
}

module.exports = function(content, file, conf) {
  if (file.filename[0] === '_') {
    return content
  }
  const {filename} = conf
  const dirname = path.dirname(filename)

  const data = {
    require: makeRequireFunction(dirname),
    __dirname: dirname,
    __filename: filename,
    ...conf.data,
  }
  const {options} = conf

  options.root = PROJECT_ROOT
  options.filename = file.realpath
  options.cache = false

  content = ejs.render(content, data, options)

  return content
}
