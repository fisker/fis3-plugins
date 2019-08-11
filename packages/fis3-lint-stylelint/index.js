'use strict'

var _promiseSynchronizer = _interopRequireDefault(
  require('promise-synchronizer')
)

var _postcss = _interopRequireDefault(require('postcss'))

var _stylelint = _interopRequireDefault(require('stylelint'))

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

var log = global.fis.log
var syntax = {
  '.scss': 'scss',
  '.less': 'less',
  '.sss': 'sugarss',
}

module.exports = function(content, file, config_) {
  if (!content) {
    return content
  }

  var config = _objectSpread({}, config_, {
    formatter: 'string',
    files: file.realpath,
    extractStyleTagsFromHtml: false,
    from: config_.filename,
  })

  delete config.filename
  delete config.code
  delete config.codeFilename

  if (!config.syntax && syntax[file.ext]) {
    config.syntax = syntax[file.ext]
  }

  var promise = (0, _postcss['default'])([_stylelint['default']])
    .process(content, config)
    .then(function(result) {
      var messages = result.messages || []
      var errorMessage = []
      var warnMessage = []
      var _iteratorNormalCompletion = true
      var _didIteratorError = false
      var _iteratorError = undefined

      try {
        for (
          var _iterator = messages[Symbol.iterator](), _step;
          !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
          _iteratorNormalCompletion = true
        ) {
          var message = _step.value
          var type = message.severity || 'warn'
          ;(type === 'error' ? errorMessage : warnMessage).push(
            [
              ' ',
              ''.concat(type, ':'),
              message.line
                ? '['.concat(message.line, ':').concat(message.column, ']')
                : '', // '[' + message.rule + ']',
              message.text,
            ].join(' ')
          )
        }
      } catch (err) {
        _didIteratorError = true
        _iteratorError = err
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return'] != null) {
            _iterator['return']()
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError
          }
        }
      }

      if (warnMessage.length > 0 || errorMessage.length > 0) {
        log.warn(
          '[%s] lint failed: \n%s \n  %s problem (%s errors, %s warning)',
          file.id,
          warnMessage.concat(errorMessage).join('\n'),
          warnMessage.length + errorMessage.length,
          errorMessage.length,
          warnMessage.length
        )

        if (errorMessage.length > 0) {
          process.exitCode = 1
          throw new Error('stylelint error.')
        }
      }

      if (result && result.css) {
        return result.css
      }

      return ''
    })

  try {
    return (0, _promiseSynchronizer['default'])(promise)
  } catch (error) {
    throw new Error(
      '['.concat(file.id, '] lint failed with error: \n\n ').concat(error)
    )
  }
}
