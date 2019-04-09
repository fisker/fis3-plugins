'use strict'

var _lodash = _interopRequireDefault(require('lodash'))

var _path = _interopRequireDefault(require('path'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}
    var ownKeys = Object.keys(source)
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable
        })
      )
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key])
    })
  }
  return target
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }
  return obj
}

var _global = global,
  fis = _global.fis
var PROJECT_ROOT = fis.project.getProjectPath()

var root = _path['default'].normalize(PROJECT_ROOT)

var re = /^[.\\/]/i

function cleanRequireCache() {
  Object.keys(require.cache)
    .filter(function(id) {
      return _path['default'].normalize(id).startsWith(root)
    })
    .forEach(function(id) {
      delete require.cache[id]
    })
}

function makeRequireFunction(context) {
  return function(module_) {
    cleanRequireCache()

    if (re.test(module_)) {
      module_ = _path['default'].resolve(context, module_)
    }

    return require(module_)
  }
}

module.exports = function(content, file, config) {
  var data = config.data
  var options = config.options
  var filename = config.filename

  var dirname = _path['default'].dirname(filename)

  options.imports = _objectSpread(
    {
      require: makeRequireFunction(dirname),
      __dirname: dirname,
      __filename: filename,
    },
    options.imports
  )

  var compiled = _lodash['default'].template(content, options)

  content = compiled(data)
  return content
}

module.exports.lodash = _lodash['default']
