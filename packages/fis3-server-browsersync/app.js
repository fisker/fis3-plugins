'use strict'

var _path = require('path')

var _path2 = _interopRequireDefault(_path)

var _browserSync = require('browser-sync')

var _browserSync2 = _interopRequireDefault(_browserSync)

var _browserSyncConfig = require('./lib/browser-sync-config.js')

var _browserSyncConfig2 = _interopRequireDefault(_browserSyncConfig)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

var args = process.argv.join('|')
var DOCUMENT_ROOT = _path2.default.resolve(
  /\-\-root\|(.*?)(?:\||$)/.test(args) ? RegExp.$1 : process.cwd()
)
var scriptTag = _path2.default.join(__dirname, 'templates/script-tags.tmpl')

var bs = _browserSync2.default.create()

// replace scriptTag template with mine
bs.instance.config.templates.scriptTag = scriptTag

function now() {
  var d = new Date()
  var str = [d.getHours(), d.getMinutes(), d.getSeconds()]
    .join(':')
    .replace(/\b\d\b/g, '0$&')

  str += '.' + ('00' + d.getMilliseconds()).slice(-3)
  return str
}

function startServer() {
  var bsConfig = (0, _browserSyncConfig2.default)(DOCUMENT_ROOT)

  bs.exit()
  bs.init(bsConfig, function() {
    console.log(
      'Listening on %s://127.0.0.1:%d',
      bsConfig.https ? 'https' : 'http',
      bsConfig.port
    )
  })

  bs.watch(DOCUMENT_ROOT, function(event, file) {
    var relativePath = _path2.default.relative(DOCUMENT_ROOT, file)
    if (
      !relativePath ||
      relativePath === 'server.log' ||
      /(^|[\/\\])[\._]./.test(relativePath)
    ) {
      return
    }
    bs.reload(file)
    console.log(
      '%s %s: %s',
      now(),
      ('         ' + event).slice(-9),
      relativePath
    )
  })
}

process.on('SIGTERM', function() {
  console.log(' Recive quit signal in worker %s.', process.pid)
  bs.exit()
})

startServer()
