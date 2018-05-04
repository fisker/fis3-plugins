'use strict'

import path from 'path'
import browserSync from 'browser-sync'
import getBsConfig from './lib/browser-sync-config.js'
import yargs from 'yargs'

const argv = (function(argv) {
  argv.context = argv.context || ''
  argv.port = argv.port || 8080
  argv.https = typeof argv.https !== 'undefined' && argv.https !== 'false'
  argv.bsConfig = argv.bsConfig || ''

  return argv
})(yargs.argv)

const scriptTag = path.join(__dirname, 'templates/script-tags.tmpl')

const bs = browserSync.create()

function now() {
  const d = new Date()
  let str = [d.getHours(), d.getMinutes(), d.getSeconds()]
    .join(':')
    .replace(/\b\d\b/g, '0$&')

  str += '.' + ('00' + d.getMilliseconds()).slice(-3)
  return str
}

function logEvent(event, path) {
  console.log(
    '%s %s: %s',
    now(),
    ('         ' + event).slice(-9),
    path
  )
}

function onInit(config) {
  return function() {
    console.log(
      'Listening on %s://127.0.0.1:%d',
      config.https ? 'https' : 'http',
      config.port
    )
  }
}

function watch(event, file) {
  var relativePath = path.relative(argv.root, file)
  if (
    !relativePath ||
    relativePath === 'server.log' ||
    /(^|[\/\\])[\._]./.test(relativePath)
  ) {
    return
  }
  bs.reload(file)
  logEvent(event, relativePath)
}

function signalTerminate() {
  process.on('SIGTERM', function() {
    console.log(' Recive quit signal in worker %s.', process.pid)
    bs.exit()
  })
}

function replaceScriptTag() {
  // replace scriptTag template with mine
  bs.instance.config.templates.scriptTag = scriptTag
}

function startServer() {
  const bsConfig = getBsConfig(bs, argv)

  bs.init(bsConfig, onInit(bsConfig))
  bs.watch(argv.root, watch)
  replaceScriptTag()
  signalTerminate()
}

bs.exit()
startServer()
