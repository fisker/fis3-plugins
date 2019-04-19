'use strict'

var _postcss = _interopRequireDefault(require('postcss'))

var _postcssLoadConfig = _interopRequireDefault(require('postcss-load-config'))

var _promiseSynchronizer = _interopRequireDefault(
  require('promise-synchronizer')
)

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

module.exports = function(content, file, config) {
  var _sync = (0, _promiseSynchronizer['default'])(
      (0, _postcssLoadConfig['default'])()
    ),
    plugins = _sync.plugins,
    options = _sync.options

  return (0, _postcss['default'])(plugins).process(
    content,
    _objectSpread({}, config, options, {
      from: config.filename,
    })
  ).css
}
