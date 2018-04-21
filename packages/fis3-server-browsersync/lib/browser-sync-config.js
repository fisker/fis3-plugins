'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _path = require('path')

var _path2 = _interopRequireDefault(_path)

var _serveDirectory = require('./serve-directory.js')

var _serveDirectory2 = _interopRequireDefault(_serveDirectory)

var _lodash = require('lodash.merge')

var _lodash2 = _interopRequireDefault(_lodash)

var _browserSync = require('browser-sync')

var _browserSync2 = _interopRequireDefault(_browserSync)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

var bsDefaultConfig = require(_path2.default.join(
  _path2.default.dirname(require.resolve('browser-sync')),
  'default-config.js'
))

var args = process.argv.join('|')
var context = /\-\-context\|(.*?)(?:\||$)/.test(args) ? RegExp.$1 : ''
var bsConfigFile = /\-\-bs\-config\|(.*?)(?:\||$)/.test(args) ? RegExp.$1 : ''
var bs = _browserSync2.default.create()
var port = /\-\-port\|(\d+)(?:\||$)/.test(args) ? ~~RegExp.$1 : 8080
var https = /\-\-https\|(true)(?:\||$)/.test(args) ? !!RegExp.$1 : false

var userConfigFile = _path2.default.resolve(
  context,
  bsConfigFile || bs.instance.config.userFile
)

function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

function getUserConfig(path) {
  var config = {}
  try {
    config = require(path)

    if (!config.server || getType(config.server) === 'String') {
      config.server = {
        directory: true
      }
    }

    delete config.port
  } catch (_) {}

  return config
}

function getConfig(root) {
  var defaultConfig = {
    server: {
      directory: true
    },
    watchEvents: ['change', 'add', 'addDir', 'unlink', 'unlinkDir'],
    ghostMode: false,
    reloadDebounce: 500,
    notify: false,
    online: false
  }

  var userConfig = getUserConfig(userConfigFile)

  var config = (0, _lodash2.default)(
    {},
    bsDefaultConfig,
    defaultConfig,
    userConfig,
    {
      server: {
        baseDir: root
      },
      port: port,
      open: false,
      snippetOptions: {
        rule: {
          match: /<\/body>|<!--\s*browser-sync-script\s*-->/i,
          fn: function fn(snippet, match) {
            return snippet + match
          }
        }
      }
    }
  )

  if (!https) {
    config.https = false
  }

  if (config.server.directory) {
    var type = getType(config.middleware)

    if (type !== 'Array') {
      if (type === 'Boolean') {
        config.middleware = []
      } else {
        config.middleware = [config.middleware]
      }
    }

    config.middleware.push((0, _serveDirectory2.default)(root))
    config.server.directory = false
  }

  return config
}

exports.default = getConfig
module.exports = exports['default']
