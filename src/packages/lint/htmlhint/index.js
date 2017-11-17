/*
 * fis3-lint-htmlhint
 * fisker Cheung<lionkay@gmail.com>
 */

var HTMLHint = require('htmlhint').HTMLHint
var log = global.fis.log

function readConfig(filename) {
  var fs = require('fs')
  var path = require('path')
  var currentFolder = process.cwd()
  var currentFile
  var parentFolder

  do {
    currentFolder = parentFolder || currentFolder
    currentFile = path.normalize(path.join(currentFolder, filename))

    if (fs.existsSync(currentFile)) {
      try {
        return JSON.parse(require('fs').readFileSync(currentFile, 'utf8'))
      } catch (_) {
        return
      }
    }

    parentFolder = path.resolve(currentFolder, '../')
  } while (parentFolder !== currentFolder)
}

var htmlhintrcConfig

module.exports = function(content, file, conf) {
  if (!content) {
    return
  }

  var ruleset =
    conf.rules ||
    htmlhintrcConfig ||
    (htmlhintrcConfig = readConfig('.htmlhintrc') || {})

  var results = HTMLHint.verify(content, ruleset)
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
      HTMLHint.format(results, {indent: 2}).join('\n')
    )
    if (errorType === 'error') {
      process.exit(1)
    }
  }
}
