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

function _call(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body()
  }

  try {
    var result = Promise.resolve(body())
    return then ? result.then(then) : result
  } catch (e) {
    return Promise.reject(e)
  }
}

var process = function process(content, file, config) {
  return _call(_postcssLoadConfig['default'], function(_ref) {
    var plugins = _ref.plugins,
      options = _ref.options

    var _postcss$process = (0, _postcss['default'])(plugins).process(
        content,
        _objectSpread({}, config, {}, options, {
          from: config.filename,
        })
      ),
      css = _postcss$process.css

    return css
  })
}

module.exports = function(content, file, config) {
  return (0, _promiseSynchronizer['default'])(process(content, file, config))
}
