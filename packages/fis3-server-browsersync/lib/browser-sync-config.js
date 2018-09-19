'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _path = require('path')

var _path2 = _interopRequireDefault(_path)

var _lodash = require('lodash.merge')

var _lodash2 = _interopRequireDefault(_lodash)

var _defaultConfig = require('browser-sync/dist/default-config.js')

var _defaultConfig2 = _interopRequireDefault(_defaultConfig)

var _middleware = require('./middleware.js')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

var defaultOptions = (0, _lodash2.default)({}, _defaultConfig2.default, {
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
    _path2.default.resolve(
      argv.context,
      argv.bsConfig || bs.instance.config.userFile
    )
  )

  var config = (0, _lodash2.default)(
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

  config.middleware = parseMiddleware(config.middleware)

  // logger
  config.middleware.push((0, _middleware.logger)('short'))

  // mock
  config.middleware.push((0, _middleware.mock)(argv.root))

  // serveDirectory
  if (config.server && config.server.directory) {
    config.middleware.push((0, _middleware.directory)(argv.root))
    config.server.directory = false
  }

  return config
}

exports.default = getConfig
module.exports = exports.default
