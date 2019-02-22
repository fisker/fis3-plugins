import path from 'path'
import merge from 'lodash.merge'
import bsDefaultConfig from 'browser-sync/dist/default-config'
import middleware from './middleware'

const {mock, logger, directory} = middleware

const defaultOptions = merge({}, bsDefaultConfig, {
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
      fn(snippet, match) {
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
    path.resolve(argv.context, argv.bsConfig || bs.instance.config.userFile)
  )

  const config = merge({}, defaultOptions, userConfig, overrideOptions, {
    server: {
      baseDir: argv.root,
    },
    port: argv.port,
    // https: argv.https
  })

  config.middleware = parseMiddleware(config.middleware)

  // logger
  config.middleware.push(logger('short'))

  // mock
  config.middleware.push(mock(argv.root))

  // serveDirectory
  if (config.server && config.server.directory) {
    config.middleware.push(directory(argv.root))
    config.server.directory = false
  }

  return config
}

module.exports = getConfig
