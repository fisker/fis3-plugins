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

var _lodash = require('lodash')

var _lodash2 = _interopRequireDefault(_lodash)

var _path = require('path')

var _path2 = _interopRequireDefault(_path)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

var re = /^[.\\/]/i
function makeRequireFunction(context) {
  return function(mod) {
    if (re.test(mod)) {
      mod = _path2.default.resolve(context, mod)
    }

    return require(mod)
  }
}

module.exports = function(content, file, conf) {
  var data = conf.data
  var options = conf.options
  var filename = conf.filename
  var dirname = _path2.default.dirname(filename)

  options.imports = _extends(
    {
      require: makeRequireFunction(dirname),
      __dirname: dirname,
      __filename: filename
    },
    options.imports
  )

  var compiled = _lodash2.default.template(content, options)

  content = compiled(data)

  return content
}

module.exports.lodash = _lodash2.default
