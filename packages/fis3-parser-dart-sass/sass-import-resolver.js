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

function getDirectories(directories, id) {
  directories = directories.map(function(directory) {
    return (0, _path.join)(directory, id)
  })

  if ((0, _path.isAbsolute)(id)) {
    directories.push(id)
  }

  return directories.map(_path.dirname)
}

var extensions = ['scss', 'css', 'sass'].map(function(extension) {
  return '.'.concat(extension)
})

function withExtension(fileName) {
  var extension = (0, _path.extname)(fileName)
  return extensions.includes(extension)
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
  var directories = getDirectories(parents, url)
  var fileNames = getFileNames(url)
  var files = directories.reduce(function(files, directory) {
    return [].concat(
      _toConsumableArray(files),
      _toConsumableArray(
        fileNames.map(function(fileName) {
          return (0, _path.join)(directory, fileName)
        })
      )
    )
  }, [])
  return _toConsumableArray(new Set(files))
}

function resolveInDirectories(includePaths, cache, onFound) {
  return function(url, previous) {
    var cacheKey = ''.concat((0, _path.normalize)(previous), '|').concat(url)

    if (cache[cacheKey]) {
      var file = cache[cacheKey]
      onFound(file)
      return file
    }

    var files = getFiles(
      [(0, _path.dirname)(previous)].concat(_toConsumableArray(includePaths), [
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
            previous,
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
            previous,
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
    onFound(result)
    cache[cacheKey] = result
    return result
  }
}

module.exports = resolveInDirectories
