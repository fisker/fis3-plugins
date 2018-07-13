import ejs from 'ejs'
import path from 'path'

const PROJECT_ROOT = fis.project.getProjectPath()

const re = /^[.\\/]/i
function makeRequireFunction(context) {
  return function(mod) {
    if (re.test(mod)) {
      mod = path.resolve(context, mod)
    }

    return require(mod)
  }
}

module.exports = function (content, file, conf) {
  if (file.filename[0] === '_') {
    return content
  }
  const filename = conf.filename
  const dirname = path.dirname(filename)

  const data = {
    require: makeRequireFunction(dirname),
    __dirname: dirname,
    __filename: filename,
    ...conf.data
  }
  const options = conf.options

  options.root = PROJECT_ROOT
  options.filename = file.realpath
  options.cache = false

  content = ejs.render(content, data, options)

  return content
}
