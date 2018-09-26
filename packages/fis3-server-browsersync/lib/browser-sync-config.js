'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

var _path = _interopRequireDefault(require('path'))

var _lodash = _interopRequireDefault(require('lodash.merge'))

var _defaultConfig = _interopRequireDefault(
  require('browser-sync/dist/default-config.js')
)

var _middleware = require('./middleware.js')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

var defaultOptions = (0, _lodash.default)({}, _defaultConfig.default, {
  server: {
    directory: true
  },
  watchEvents: ['change', 'add', 'addDir', 'unlink', 'unlinkDir'],
  ghostMode: false,
  reloadDebounce: 500,
  notify: false,
  online: false
})
var overrideOptions = {
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

function parseMiddleware(middleware) {
  var type = getType(middleware)

  if (type !== 'Array') {
    if (type === 'Boolean') {
      return []
    } else {
      return [middleware]
    }
  }

  return middleware
}

function getConfig(bs, argv) {
  var userConfig = getUserConfig(
    _path.default.resolve(
      argv.context,
      argv.bsConfig || bs.instance.config.userFile
    )
  )
  var config = (0, _lodash.default)(
    {},
    defaultOptions,
    userConfig,
    overrideOptions,
    {
      server: {
        baseDir: argv.root
      },
      port: argv.port,
      https: argv.https
    }
  )
  config.middleware = parseMiddleware(config.middleware) // logger

  config.middleware.push((0, _middleware.logger)('short')) // mock

  config.middleware.push((0, _middleware.mock)(argv.root)) // serveDirectory

  if (config.server && config.server.directory) {
    config.middleware.push((0, _middleware.directory)(argv.root))
    config.server.directory = false
  }

  return config
}

var _default = getConfig
exports.default = _default
