'use strict'

var _path = require('path')

var _util = _interopRequireDefault(require('util'))

var _sass = _interopRequireDefault(require('sass'))

var _sassImportResolver = _interopRequireDefault(
  require('./sass-import-resolver')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}
    var ownKeys = Object.keys(source)
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
      value: value,
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
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === '[object Arguments]'
  )
    return Array.from(iter)
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i]
    }
    return arr2
  }
}

var _global = global,
  fis = _global.fis
var PROJECT_ROOT = fis.project.getProjectPath()

function normalizeIncludePath(dirs) {
  return dirs.reduce(function(all, dir) {
    var dirs = []

    if ((0, _path.isAbsolute)(dir) && dir[0] !== '/') {
      dirs.push(dir)
    } else {
      dirs.push(dir)
      dirs.push((0, _path.join)(PROJECT_ROOT, dir))
      dirs.push((0, _path.join)(process.cwd(), dir))
    }

    return [].concat(_toConsumableArray(all), dirs)
  }, [])
}

module.exports = function(content, file, config) {
  if (file.basename[0] === '_') {
    return content
  }

  var importCache = {}
  var _config$includePaths = config.includePaths,
    includePaths = _config$includePaths === void 0 ? [] : _config$includePaths,
    _config$sourceMap = config.sourceMap,
    sourceMap = _config$sourceMap === void 0 ? false : _config$sourceMap,
    sourceMapContents = config.sourceMapContents
  includePaths = [(0, _path.dirname)(file.realpath)].concat(
    _toConsumableArray(normalizeIncludePath(includePaths)),
    [PROJECT_ROOT]
  )
  var sourceMapFile

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

  var options = _objectSpread({}, config, {
    includePaths: includePaths,
    file: file.realpath,
    data: content,
    indentedSyntax: file.ext === '.sass',
    importer: (0, _sassImportResolver.default)(includePaths, importCache),
    sourceMap: sourceMap,
    sourceMapContents: sourceMapContents,
  })

  delete options.outFile
  var result

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
    var _sourceMap = result.map.toString('utf8')

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
