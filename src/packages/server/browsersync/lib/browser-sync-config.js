'use strict'

var path = require('path')
var bsDefaultConfig = require(path.join(
  path.dirname(require.resolve('browser-sync')),
  'lib',
  'default-config.js'
))
var serveDirectory = require('./serve-directory.js')
var merge = require('lodash.merge')
var args = process.argv.join('|')
var context = /\-\-context\|(.*?)(?:\||$)/.test(args) ? RegExp.$1 : ''
var bsConfigFile = /\-\-bs\-config\|(.*?)(?:\||$)/.test(args) ? RegExp.$1 : ''
var bs = require('browser-sync').create()
var port = /\-\-port\|(\d+)(?:\||$)/.test(args) ? ~~RegExp.$1 : 8080
var https = /\-\-https\|(true)(?:\||$)/.test(args) ? !!RegExp.$1 : false

var userConfigFile = path.resolve(
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

  var config = merge({}, bsDefaultConfig, defaultConfig, userConfig)

  config = merge(config, {
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
    var type = getType(config.middleware)

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

module.exports = getConfig
