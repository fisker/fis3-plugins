'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

exports.default = function(content, file, conf) {
  try {
    content = (0, _promiseSynchronizer2.default)(
      (0, _stylefmt.process)(content, {
        from: conf.filename
      }).then(function(result) {
        if (result && result.css) {
          return result.css
        }
      })
    )
  } catch (err) {}
  return content
}

require('es6-shim')

var _promiseSynchronizer = require('promise-synchronizer')

var _promiseSynchronizer2 = _interopRequireDefault(_promiseSynchronizer)

var _stylefmt = require('stylefmt')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

// colors.js bug
// es6-shim `bold` breaks colors.js
var getter = String.prototype.__lookupGetter__('bold')

if (getter) {
  String.prototype.__defineGetter__('bold', function() {
    return this
  })
}

module.exports = exports['default']
