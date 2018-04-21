'use strict'

var _htmlhint = require('htmlhint')

var _fs = require('fs')

var _fs2 = _interopRequireDefault(_fs)

var _path = require('path')

var _path2 = _interopRequireDefault(_path)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

var log =
  global.fis
    .log /*
                           * fis3-lint-htmlhint
                           * fisker Cheung<lionkay@gmail.com>
                           */

function readConfig(filename) {
  var currentFolder = process.cwd()
  var currentFile = ''
  var parentFolder = ''

  do {
    currentFolder = parentFolder || currentFolder
    currentFile = _path2.default.normalize(
      _path2.default.join(currentFolder, filename)
    )

    if (_fs2.default.existsSync(currentFile)) {
      try {
        return JSON.parse(require('fs').readFileSync(currentFile, 'utf8'))
      } catch (_) {
        return
      }
    }

    parentFolder = _path2.default.resolve(currentFolder, '../')
  } while (parentFolder !== currentFolder)
}

var htmlhintrcConfig = {}

module.exports = function(content, file, conf) {
  if (!content) {
    return
  }

  var ruleset =
    conf.rules ||
    htmlhintrcConfig ||
    (htmlhintrcConfig = readConfig('.htmlhintrc') || {})

  var results = _htmlhint.HTMLHint.verify(content, ruleset)
  var errorType = 'warning'

  results.forEach(function(msg) {
    if (msg.type === 'error') {
      errorType = 'error'
    }
  })

  if (results.length) {
    log.warn(
      '[%s] lint failed with %s: \n\n %s',
      file.id,
      errorType,
      _htmlhint.HTMLHint.format(results, {indent: 2}).join('\n')
    )
    if (errorType === 'error') {
      process.exit(1)
    }
  }
}
