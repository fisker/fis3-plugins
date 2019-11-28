'use strict'

Object.defineProperty(exports, '__esModule', {value: true})

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var prettier = _interopDefault(require('prettier'))

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

function _objectSpread2(target) {
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

var info = {
  description: 'a code formatter of fis3 based on prettier.',
  keywords: ['beautify', 'format', 'formatter'],
  dependencies: ['prettier'],
  options: {},
  links: {
    prettier: 'https://github.com/prettier/prettier',
  },
}

var info$1 = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  default: info,
})

function process(content, file, config) {
  var fileFakePath = file.realpathNoExt + file.rExt

  var prettierConfig = _objectSpread2(
    {},
    prettier.resolveConfig.sync(fileFakePath, {
      editorconfig: true,
    }),
    {},
    config,
    {
      filepath: fileFakePath,
      filename: undefined,
    }
  )

  return prettier.format(content, prettierConfig)
}
var defaultOptions = undefined

exports.default = process
exports.defaultOptions = defaultOptions
