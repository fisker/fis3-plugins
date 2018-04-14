const path = require('path')
const args = process.argv.join('|')
const DOCUMENT_ROOT = path.resolve(
  /\-\-root\|(.*?)(?:\||$)/.test(args) ? RegExp.$1 : process.cwd()
)
const scriptTag = path.join(__dirname, 'templates/script-tags.tmpl')
const bs = require('browser-sync').create()

const getBsConfig = require('./lib/browser-sync-config.js')

// replace scriptTag template with mine
bs.instance.config.templates.scriptTag = scriptTag

function now() {
  var d = new Date()
  var str
  str = [d.getHours(), d.getMinutes(), d.getSeconds()]
    .join(':')
    .replace(/\b\d\b/g, '0$&')

  str += '.' + ('00' + d.getMilliseconds()).slice(-3)
  return str
}

function startServer() {
  var bsConfig = getBsConfig(DOCUMENT_ROOT)

  bs.exit()
  bs.init(bsConfig, function() {
    console.log(
      'Listening on %s://127.0.0.1:%d',
      bsConfig.https ? 'https' : 'http',
      bsConfig.port
    )
  })

  bs.watch(DOCUMENT_ROOT, function(event, file) {
    var relativePath = path.relative(DOCUMENT_ROOT, file)
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
