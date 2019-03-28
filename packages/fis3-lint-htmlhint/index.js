const _htmlhint = _interopRequireDefault(require('htmlhint'))

const _fs = _interopRequireDefault(require('fs'))

const _path = _interopRequireDefault(require('path'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

/*
 * fis3-lint-htmlhint
 * fisker Cheung<lionkay@gmail.com>
 */
const _global = global
const _global$fis = _global.fis
const fis = _global$fis === void 0 ? {} : _global$fis
const _fis$log = fis.log
const log = _fis$log === void 0 ? function() {} : _fis$log

function readConfig(filename) {
  let currentFolder = process.cwd()
  let currentFile = ''
  let parentFolder = ''

  do {
    currentFolder = parentFolder || currentFolder
    currentFile = _path.default.normalize(
      _path.default.join(currentFolder, filename)
    )

    if (_fs.default.existsSync(currentFile)) {
      try {
        return JSON.parse(_fs.default.readFileSync(currentFile, 'utf8'))
      } catch (_) {
        return {}
      }
    }

    parentFolder = _path.default.resolve(currentFolder, '../')
  } while (parentFolder !== currentFolder)

  return {}
}

let htmlhintrcConfig = {}

module.exports = function(content, file, conf) {
  if (!content) {
    return
  }

  const ruleset =
    conf.rules ||
    htmlhintrcConfig ||
    (htmlhintrcConfig = readConfig('.htmlhintrc'))

  const results = _htmlhint.default.verify(content, ruleset)

  let errorType = 'warning'
  results.forEach(function(msg) {
    if (msg.type === 'error') {
      errorType = 'error'
    }
  })

  if (results.length > 0) {
    log.warn(
      '[%s] lint failed with %s: \n\n %s',
      file.id,
      errorType,
      _htmlhint.default
        .format(results, {
          indent: 2,
        })
        .join('\n')
    )

    if (errorType === 'error') {
      process.exit(1)
    }
  }
}
