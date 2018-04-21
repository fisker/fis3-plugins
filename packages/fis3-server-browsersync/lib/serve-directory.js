'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _path = require('path')

var _path2 = _interopRequireDefault(_path)

var _fs = require('fs')

var _fs2 = _interopRequireDefault(_fs)

var _serveDirectory = require('serve-directory')

var _serveDirectory2 = _interopRequireDefault(_serveDirectory)

var _serveDirectoryThemeOcticons = require('serve-directory-theme-octicons')

var _serveDirectoryThemeOcticons2 = _interopRequireDefault(
  _serveDirectoryThemeOcticons
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

function getServeDirectoryMiddleWare(root) {
  return {
    route: '',
    handle: (0, _serveDirectory2.default)(
      root,
      _serveDirectoryThemeOcticons2.default
    ),
    id: 'Browsersync Server Directory Middleware'
  }
}

exports.default = getServeDirectoryMiddleWare
module.exports = exports['default']
