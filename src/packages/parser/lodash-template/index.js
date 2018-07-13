import _ from 'lodash'
import path from 'path'

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
  const data = conf.data
  const options = conf.options
  const filename = conf.filename
  const dirname = path.dirname(filename)
  const variable = options.variable || 'obj'

  options.imports = {
    require: makeRequireFunction(dirname),
    __dirname: dirname,
    __filename: filename,
    [variable]: data,
    ...options.imports
  }

  const compiled = _.template(content, options)

  content = compiled(data)

  return content
}
