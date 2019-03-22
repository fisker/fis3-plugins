'use strict'

var _path = require('path')

var _fs = require('fs')

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

function startsWithPartial(base) {
  return base[0] === '_'
}

function getDirs(dirs, id) {
  dirs = dirs.map(function(dir) {
    return (0, _path.join)(dir, id)
  })

  if ((0, _path.isAbsolute)(id)) {
    dirs.push(id)
  }

  return dirs.map(_path.dirname)
}

var extensions = ['scss', 'css', 'sass'].map(function(ext) {
  return '.'.concat(ext)
})

function withExtension(fileName) {
  var ext = (0, _path.extname)(fileName)
  return extensions.includes(ext)
}

function getFileNames(id) {
  var fileName = (0, _path.basename)(id)
  var fileNames = [fileName]

  if (!startsWithPartial(fileName)) {
    fileNames.unshift('_'.concat(fileName))
  }

  return withExtension(fileName)
    ? fileNames
    : extensions.reduce(function(all, extension) {
        return [].concat(
          _toConsumableArray(all),
          _toConsumableArray(
            fileNames.map(function(file) {
              return file + extension
            })
          )
        )
      }, [])
}

function getFiles(parents, url) {
  var dirs = getDirs(parents, url)
  var fileNames = getFileNames(url)
  var files = dirs.reduce(function(files, dir) {
    return [].concat(
      _toConsumableArray(files),
      _toConsumableArray(
        fileNames.map(function(fileName) {
          return (0, _path.join)(dir, fileName)
        })
      )
    )
  }, [])
  return _toConsumableArray(new Set(files))
}

function resolveInDirs(includePaths) {
  var cache =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  return function(url, prev) {
    var cacheKey = ''.concat((0, _path.normalize)(prev), '|').concat(url)

    if (cache[cacheKey]) {
      return cache[cacheKey]
    }

    var files = getFiles(
      [(0, _path.dirname)(prev)].concat(_toConsumableArray(includePaths), [
        process.cwd(),
      ]),
      url
    )
    var results = files
      .map(function(file) {
        try {
          return {
            file: file,
            contents: (0, _fs.readFileSync)(file, 'utf8'),
          }
        } catch (error) {
          return null
        }
      })
      .filter(Boolean)

    if (results.length > 1) {
      return new Error(
        'importing '
          .concat(url, ' from ')
          .concat(
            prev,
            ". It's not clear which file to import. \n found files:"
          )
          .concat(
            results
              .map(function(_ref) {
                var file = _ref.file
                return file
              })
              .join('\n')
          )
      )
    }

    if (results.length === 0) {
      return new Error(
        'importing '
          .concat(url, ' from ')
          .concat(
            prev,
            '. File to import not found or unreadable. \n tried files:'
          )
          .concat(
            results
              .map(function(_ref2) {
                var file = _ref2.file
                return file
              })
              .join('\n')
          )
      )
    }

    var result = results[0]
    cache[cacheKey] = result
    return result
  }
}

module.exports = resolveInDirs
