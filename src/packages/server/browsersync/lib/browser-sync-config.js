'use strict'

import path from 'path'
import serveDirectory from './serve-directory.js'
import merge from 'lodash.merge'
import browserSync from 'browser-sync'

const bsDefaultConfig = require(path.join(
  path.dirname(require.resolve('browser-sync')),
  'default-config.js'
))

const args = process.argv.join('|')
const context = /\-\-context\|(.*?)(?:\||$)/.test(args) ? RegExp.$1 : ''
const bsConfigFile = /\-\-bs\-config\|(.*?)(?:\||$)/.test(args) ? RegExp.$1 : ''
const bs = browserSync.create()
const port = /\-\-port\|(\d+)(?:\||$)/.test(args) ? ~~RegExp.$1 : 8080
const https = /\-\-https\|(true)(?:\||$)/.test(args) ? !!RegExp.$1 : false

const userConfigFile = path.resolve(
  context,
  bsConfigFile || bs.instance.config.userFile
)

function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

function getUserConfig(path) {
  let config = {}
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
  const defaultConfig = {
    server: {
      directory: true
    },
    watchEvents: ['change', 'add', 'addDir', 'unlink', 'unlinkDir'],
    ghostMode: false,
    reloadDebounce: 500,
    notify: false,
    online: false
  }

  const userConfig = getUserConfig(userConfigFile)

  const config = merge({}, bsDefaultConfig, defaultConfig, userConfig, {
    server: {
      baseDir: root
    },
    port: port,
    open: false,
    snippetOptions: {
      rule: {
        match: /<\/body>|<!--\s*browser-sync-script\s*-->/i,
        fn: function(snippet, match) {
          return snippet + match
        }
      }
    }
  })

  if (!https) {
    config.https = false
  }

  if (config.server.directory) {
    const type = getType(config.middleware)

    if (type !== 'Array') {
      if (type === 'Boolean') {
        config.middleware = []
      } else {
        config.middleware = [config.middleware]
      }
    }

    config.middleware.push(serveDirectory(root))
    config.server.directory = false
  }

  return config
}

export default getConfig
