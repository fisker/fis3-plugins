const _path = require('path')

const _util = _interopRequireDefault(require('util'))

const _sass = _interopRequireDefault(require('sass'))

const _sassImportResolve = _interopRequireDefault(
  require('@csstools/sass-import-resolve')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

function _objectSpread(target) {
  for (let i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}
    let ownKeys = Object.keys(source)
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable
        })
      )
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key])
    })
  }
  return target
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }
  return obj
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  )
}

function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance')
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in new Object(iter) ||
    Object.prototype.toString.call(iter) === '[object Arguments]'
  ) {
    return Array.from(iter)
  }
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i]
    }
    return arr2
  }
}

const _global = global
const {fis} = _global
const PROJECT_ROOT = fis.project.getProjectPath()

function toAbsolute(dir) {
  if (
    (0, _path.resolve)(dir) !== (0, _path.normalize)(dir) ||
    fis.util.exists((0, _path.join)(PROJECT_ROOT, dir))
  ) {
    return (0, _path.join)(PROJECT_ROOT, dir)
  }

  return dir
}

function resolveInDirs(dirs, cache) {
  return function(url, prev, done) {
    const cwds = [].concat(_toConsumableArray(dirs), [
      (0, _path.dirname)((0, _path.resolve)(prev)),
    ])
    cwds
      .reduce(function(promise, cwd) {
        return promise.catch(function() {
          return (0, _sassImportResolve.default)(url, {
            cwd,
            cache,
            readFile: true,
          })
        })
      }, Promise.reject()) // eslint-disable-next-line promise/no-callback-in-promise
      .then(done, done)
  }
}

module.exports = function(content, file, config) {
  if (file.basename[0] === '_') {
    return content
  }

  const importCache = {}
  const _config$includePaths = config.includePaths
  let includePaths = _config$includePaths === void 0 ? [] : _config$includePaths
  const _config$sourceMap = config.sourceMap
  let sourceMap = _config$sourceMap === void 0 ? false : _config$sourceMap
  let {sourceMapContents} = config
  includePaths = []
    .concat(_toConsumableArray(includePaths), [
      PROJECT_ROOT,
      (0, _path.dirname)(file.realpath),
    ])
    .map(toAbsolute)
  let sourceMapFile

  if (sourceMap) {
    sourceMapContents = true
    sourceMapFile = fis.file.wrap(
      ''
        .concat(file.dirname, '/')
        .concat(file.filename)
        .concat(file.rExt, '.map')
    )
    sourceMap = sourceMapFile.getUrl(
      fis.compile.settings.hash,
      fis.compile.settings.domain
    )
  }

  const options = _objectSpread({}, config, {
    includePaths,
    file: file.realpath,
    data: content,
    indentedSyntax: file.ext === '.sass',
    importer: resolveInDirs(includePaths, importCache),
    sourceMap,
    sourceMapContents,
  })

  delete options.outFile
  let result

  try {
    result = _sass.default.renderSync(options)
  } catch (error) {
    fis.log.error(
      _util.default.format(
        '%s'.red + ' [`%s` %s:%s]'.yellow,
        error.message,
        error.file,
        error.line,
        error.column
      )
    )
  }

  if (sourceMapFile && result.map) {
    const _sourceMap = result.map.toString('utf8')

    sourceMapFile.setContent(_sourceMap)
    file.extras = file.extras || {}
    file.extras.derived = file.extras.derived || []
    file.extras.derived.push(sourceMapFile)
  }

  content = result.css.toString('utf8')
  return content
}

module.exports.defaultOptions = {
  outputStyle: 'expanded',
  sourceMapContents: true,
  sourceMap: false,
  omitSourceMapUrl: false,
}
