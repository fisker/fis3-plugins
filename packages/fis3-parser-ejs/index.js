'use strict'

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
    return target
  }

var _ejs = require('ejs')

var _ejs2 = _interopRequireDefault(_ejs)

var _path = require('path')

var _path2 = _interopRequireDefault(_path)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

var PROJECT_ROOT = fis.project.getProjectPath()
var root = _path2.default.normalize(PROJECT_ROOT)

var re = /^[.\\/]/i

function cleanRequireCache() {
  Object.keys(require.cache)
    .filter(function(id) {
      return _path2.default.normalize(id).startsWith(root)
    })
    .forEach(function(id) {
      delete require.cache[id]
    })
}

function makeRequireFunction(context) {
  return function(mod) {
    cleanRequireCache()

    if (re.test(mod)) {
      mod = _path2.default.resolve(context, mod)
    }

    return require(mod)
  }
}

module.exports = function(content, file, conf) {
  if (file.filename[0] === '_') {
    return content
  }
  var filename = conf.filename
  var dirname = _path2.default.dirname(filename)

  var data = _extends(
    {
      require: makeRequireFunction(dirname),
      __dirname: dirname,
      __filename: filename
    },
    conf.data
  )
  var options = conf.options

  options.root = PROJECT_ROOT
  options.filename = file.realpath
  options.cache = false

  content = _ejs2.default.render(content, data, options)

  return content
}
