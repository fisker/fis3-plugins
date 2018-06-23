'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _morgan = require('morgan')

var _morgan2 = _interopRequireDefault(_morgan)

var _bodyParser = require('body-parser')

var _bodyParser2 = _interopRequireDefault(_bodyParser)

var _rewrite = require('yog-devtools/lib/rewrite')

var _rewrite2 = _interopRequireDefault(_rewrite)

var _preview = require('yog-devtools/lib/preview')

var _preview2 = _interopRequireDefault(_preview)

var _script = require('yog-devtools/lib/script')

var _script2 = _interopRequireDefault(_script)

var _serveDirectory = require('serve-directory')

var _serveDirectory2 = _interopRequireDefault(_serveDirectory)

var _serveDirectoryThemeOcticons = require('serve-directory-theme-octicons')

var _serveDirectoryThemeOcticons2 = _interopRequireDefault(
  _serveDirectoryThemeOcticons
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

function mock(rewrite, data) {
  var options = {
    view_path: '', // 避免报错。
    rewrite_file: rewrite,
    data_path: data
  }

  return function(req, res, next) {
    ;[
      (0, _rewrite2.default)(options),
      _bodyParser2.default.urlencoded({extended: false}),
      _bodyParser2.default.json(),
      (0, _preview2.default)(options),
      (0, _script2.default)(options)
    ].reduceRight(function(next, middlewave) {
      return function() {
        middlewave(req, res, next)
      }
    }, next)()
  }
}

function getMiddleware(name, handler) {
  return function() {
    return {
      route: '',
      handle: handler.apply(null, arguments),
      id: 'Browsersync ' + name + ' Middleware'
    }
  }
}

exports.default = {
  logger: getMiddleware('Logger', _morgan2.default),
  mock: getMiddleware('Mock', mock),
  directory: function directory(root) {
    return getMiddleware('Server Directory', _serveDirectory2.default)(
      root,
      _serveDirectoryThemeOcticons2.default
    )
  }
}
module.exports = exports['default']
