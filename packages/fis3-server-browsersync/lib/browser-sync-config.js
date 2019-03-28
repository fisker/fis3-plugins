const _path = _interopRequireDefault(require('path'))

const _lodash = _interopRequireDefault(require('lodash.merge'))

const _defaultConfig = _interopRequireDefault(
  require('browser-sync/dist/default-config')
)

const _middleware = _interopRequireDefault(require('./middleware'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

const {mock} = _middleware.default
const {logger} = _middleware.default
const {directory} = _middleware.default
const defaultOptions = (0, _lodash.default)({}, _defaultConfig.default, {
  server: {
    directory: true,
  },
  watchEvents: ['change', 'add', 'addDir', 'unlink', 'unlinkDir'],
  ghostMode: false,
  reloadDebounce: 500,
  notify: false,
  online: false,
})
const overrideOptions = {
  open: false,
  snippetOptions: {
    rule: {
      match: /<\/body>|<!--\s*browser-sync-script\s*-->/i,
      fn: function fn(snippet, match) {
        return snippet + match
      },
    },
  },
}

function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

function getUserConfig(path) {
  let config = {}

  try {
    config = require(path)

    if (!config.server || getType(config.server) === 'String') {
      config.server = {
        directory: true,
      }
    }

    delete config.port
  } catch (_) {}

  return config
}

function parseMiddleware(middleware) {
  const type = getType(middleware)

  if (type !== 'Array') {
    if (type === 'Boolean') {
      return []
    }

    return [middleware]
  }

  return middleware
}

function getConfig(bs, argv) {
  const userConfig = getUserConfig(
    _path.default.resolve(
      argv.context,
      argv.bsConfig || bs.instance.config.userFile
    )
  )
  const config = (0, _lodash.default)(
    {},
    defaultOptions,
    userConfig,
    overrideOptions,
    {
      server: {
        baseDir: argv.root,
      },
      port: argv.port, // https: argv.https
    }
  )
  config.middleware = parseMiddleware(config.middleware) // logger

  config.middleware.push(logger('short')) // mock

  config.middleware.push(mock(argv.root)) // serveDirectory

  if (config.server && config.server.directory) {
    config.middleware.push(directory(argv.root))
    config.server.directory = false
  }

  return config
}

module.exports = getConfig
