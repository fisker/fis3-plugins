'use strict'

var _postcss = _interopRequireDefault(require('postcss'))

var _postcssLoadConfig = _interopRequireDefault(require('postcss-load-config'))

var _promiseSynchronizer = _interopRequireDefault(
  require('promise-synchronizer')
)

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
      ownKeys(source, true).forEach(function(key) {
        _defineProperty(target, key, source[key])
      })
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
    } else {
      ownKeys(source).forEach(function(key) {
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

module.exports = function(content, file, config) {
  var _sync = (0, _promiseSynchronizer['default'])(
      (0, _postcssLoadConfig['default'])()
    ),
    plugins = _sync.plugins,
    options = _sync.options

  var result = (0, _promiseSynchronizer['default'])(
    (0, _postcss['default'])(plugins).process(
      content,
      _objectSpread({}, config, {}, options, {
        from: config.filename,
      })
    )
  )
  return result.css
}
