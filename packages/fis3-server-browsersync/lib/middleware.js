'use strict'

var _path = _interopRequireDefault(require('path'))

var _morgan = _interopRequireDefault(require('morgan'))

var _bodyParser = _interopRequireDefault(require('body-parser'))

var _rewrite = _interopRequireDefault(require('yog-devtools/lib/rewrite'))

var _preview = _interopRequireDefault(require('yog-devtools/lib/preview'))

var _script = _interopRequireDefault(require('yog-devtools/lib/script'))

var _serveDirectory = _interopRequireDefault(require('serve-directory'))

var _serveDirectoryThemeOcticons = _interopRequireDefault(
  require('serve-directory-theme-octicons')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

function mock(root) {
  var options = {
    view_path: '',
    // 避免报错。
    rewrite_file: [
      _path.default.join(root, 'server.conf'),
      _path.default.join(root, 'config', 'server.conf'),
      _path.default.join(root, 'mock', 'server.conf')
    ],
    data_path: [
      _path.default.join(root, 'test'),
      _path.default.join(root, 'mock')
    ]
  }
  return function(req, res, next) {
    ;[
      (0, _rewrite.default)(options),
      _bodyParser.default.urlencoded({
        extended: false
      }),
      _bodyParser.default.json(),
      (0, _preview.default)(options),
      (0, _script.default)(options)
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
      id: 'Browsersync '.concat(name, ' Middleware')
    }
  }
}

module.exports = {
  logger: getMiddleware('Logger', _morgan.default),
  mock: getMiddleware('Mock', mock),
  directory: function directory(root) {
    return getMiddleware('Server Directory', _serveDirectory.default)(
      root,
      _serveDirectoryThemeOcticons.default
    )
  }
}
