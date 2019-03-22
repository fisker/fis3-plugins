import {join, isAbsolute, dirname, basename, normalize, extname} from 'path'
import {readFileSync} from 'fs'

function startsWithPartial(base) {
  return base[0] === '_'
}

function getDirs(dirs, id) {
  dirs = dirs.map(dir => join(dir, id))

  if (isAbsolute(id)) {
    dirs.push(id)
  }

  return dirs.map(dirname)
}

const extensions = ['scss', 'css', 'sass'].map(ext => `.${ext}`)

function withExtension(fileName) {
  const ext = extname(fileName)
  return extensions.includes(ext)
}

function getFileNames(id) {
  const fileName = basename(id)

  const fileNames = [fileName]

  if (!startsWithPartial(fileName)) {
    fileNames.unshift(`_${fileName}`)
  }

  return withExtension(fileName)
    ? fileNames
    : extensions.reduce(
        (all, extension) => [
          ...all,
          ...fileNames.map(file => file + extension),
        ],
        []
      )
}

function getFiles(parents, url) {
  const dirs = getDirs(parents, url)
  const fileNames = getFileNames(url)

  return dirs.reduce(
    (files, dir) => [
      ...files,
      ...fileNames.map(fileName => join(dir, fileName)),
    ],
    []
  )
}

function resolveInDirs(includePaths, cache = {}) {
  return function(url, prev) {
    const cacheKey = `${normalize(prev)}|${url}`

    if (cache[cacheKey]) {
      return cache[cacheKey]
    }

    const files = getFiles([dirname(prev), ...includePaths, process.cwd()], url)

    const results = files
      .map(file => {
        try {
          return {
            file,
            contents: readFileSync(file, 'utf8'),
          }
        } catch (error) {
          return null
        }
      })
      .filter(Boolean)

    if (results.length > 1) {
      return new Error(
        `importing ${url} from ${prev}. It's not clear which file to import. \n found files:${results
          .map(({file}) => file)
          .join('\n')}`
      )
    }

    if (results.length === 0) {
      return new Error(
        `importing ${url} from ${prev}. File to import not found or unreadable. \n tried files:${results
          .map(({file}) => file)
          .join('\n')}`
      )
    }

    const result = results[0]
    cache[cacheKey] = result

    return result
  }
}

module.exports = resolveInDirs
