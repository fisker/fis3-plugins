import path from 'path'
import process from 'process'
import browserSync from 'browser-sync'
import yargs from 'yargs'
import getBsConfig from './lib/browser-sync-config.js'

const {argv} = yargs

startServer(argv)

function now() {
  const d = new Date()
  let string = [d.getHours(), d.getMinutes(), d.getSeconds()]
    .join(':')
    .replace(/\b\d\b/g, '0$&')

  string += `.${`00${d.getMilliseconds()}`.slice(-3)}`
  return string
}

function logEvent(event, path) {
  console.log('%s %s: %s', now(), `         ${event}`.slice(-9), path)
}

function onInit(config) {
  return function () {
    console.log(
      'Listening on %s://127.0.0.1:%d',
      config.https ? 'https' : 'http',
      config.port
    )
  }
}

function watch(bs, root) {
  return function (event, file) {
    const relativePath = path.relative(root, file)
    if (
      !relativePath ||
      relativePath === 'server.log' ||
      /(?:^|[/\\])[._]./.test(relativePath)
    ) {
      return
    }
    bs.reload(file)
    logEvent(event, relativePath)
  }
}

function signalTerminate(bs) {
  process.on('SIGTERM', () => {
    console.log('Recive quit signal in worker %s.', process.pid)
    bs.exit()
  })
}

function replaceScriptTag(bs) {
  // replace scriptTag template with mine
  bs.instance.config.templates.scriptTag = path.join(
    __dirname,
    'templates/script-tags.tmpl'
  )
}

function startServer(argv) {
  const bs = browserSync.create()
  const bsConfig = getBsConfig(bs, argv)

  bs.exit()

  bs.init(bsConfig, onInit(bsConfig))
  bs.watch(argv.root, watch(bs, argv.root))
  replaceScriptTag(bs)
  signalTerminate(bs)
}
