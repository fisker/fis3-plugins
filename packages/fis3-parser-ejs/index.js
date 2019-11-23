'use strict'

var _ejs = _interopRequireDefault(require('ejs'))

var _path = _interopRequireDefault(require('path'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object)
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object)
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })
    keys.push.apply(keys, symbols)
  }
  return keys
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key])
      })
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        )
      })
    }
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
  if (file.filename[0] === '_') {
    return content
  }

  var filename = config.filename

  var dirname = _path['default'].dirname(filename)

  var data = _objectSpread(
    {
      require: makeRequireFunction(dirname),
      __dirname: dirname,
      __filename: filename,
    },
    config.data
  )

  var options = config.options
  options.root = PROJECT_ROOT
  options.filename = file.realpath
  options.cache = false
  content = _ejs['default'].render(content, data, options)
  return content
}
