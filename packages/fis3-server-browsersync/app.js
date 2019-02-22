'use strict'

var _path = _interopRequireDefault(require('path'))

var _browserSync = _interopRequireDefault(require('browser-sync'))

var _yargs = _interopRequireDefault(require('yargs'))

var _browserSyncConfig = _interopRequireDefault(
  require('./lib/browser-sync-config')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

var argv = (function(argv) {
  argv.root = _path.default.resolve(argv.root || process.cwd())
  argv.context = argv.context || ''
  argv.port = argv.port || 8080
  argv.https = typeof argv.https !== 'undefined' && argv.https !== 'false'
  argv.bsConfig = argv.bsConfig || ''
  return argv
})(_yargs.default.argv)

startServer(argv)

function now() {
  var d = new Date()
  var str = [d.getHours(), d.getMinutes(), d.getSeconds()]
    .join(':')
    .replace(/\b\d\b/g, '0$&')
  str += '.'.concat('00'.concat(d.getMilliseconds()).slice(-3))
  return str
}

function logEvent(event, path) {
  console.log('%s %s: %s', now(), '         '.concat(event).slice(-9), path)
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

function watch(bs, root) {
  return function(event, file) {
    var relativePath = _path.default.relative(root, file)

    if (
      !relativePath ||
      relativePath === 'server.log' ||
      /(^|[/\\])[._]./.test(relativePath)
    ) {
      return
    }

    bs.reload(file)
    logEvent(event, relativePath)
  }
}

function signalTerminate(bs) {
  process.on('SIGTERM', function() {
    console.log('Recive quit signal in worker %s.', process.pid)
    bs.exit()
  })
}

function replaceScriptTag(bs) {
  // replace scriptTag template with mine
  bs.instance.config.templates.scriptTag = _path.default.join(
    __dirname,
    'templates/script-tags.tmpl'
  )
}

function startServer(argv) {
  var bs = _browserSync.default.create()

  var bsConfig = (0, _browserSyncConfig.default)(bs, argv)
  bs.exit()
  bs.init(bsConfig, onInit(bsConfig))
  bs.watch(argv.root, watch(bs, argv.root))
  replaceScriptTag(bs)
  signalTerminate(bs)
}
