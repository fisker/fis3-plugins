'use strict'

var _cleanCss = _interopRequireDefault(require('clean-css'))

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

var log = global.fis.log

function deriveSourceMap(file, sourceMap) {
  if (!sourceMap) {
    return
  }

  var mapping = global.fis.file.wrap(
    ''
      .concat(file.dirname, '/')
      .concat(file.filename)
      .concat(file.rExt, '.map')
  )
  mapping.setContent(sourceMap)
  file.extras = file.extras || {}
  file.extras.derived = file.extras.derived || []
  file.extras.derived.push(mapping)
}

module.exports = function(content, file, config) {
  var options = _objectSpread({}, config)

  delete options.filename

  if (options.returnPromise) {
    options.returnPromise = false
  }

  var result = new _cleanCss['default'](config).minify(content)

  if (result.warnings && result.warnings.length > 0) {
    log.warn(result.warnings)
  }

  if (result.errors && result.errors.length > 0) {
    log.warn(result.errors)
    process.exitCode = 1
    throw new Error('cleancss error.')
  }

  deriveSourceMap(file, result.sourceMap)
  return result.styles
}
