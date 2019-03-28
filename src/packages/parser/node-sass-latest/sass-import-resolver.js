import {join, isAbsolute, dirname, basename, normalize, extname} from 'path'
import {readFileSync} from 'fs'

function startsWithPartial(base) {
  return base[0] === '_'
}

function getDirectories(directories, id) {
  directories = directories.map(directory => join(directory, id))

  if (isAbsolute(id)) {
    directories.push(id)
  }

  return directories.map(dirname)
}

const extensions = ['scss', 'css', 'sass'].map(extension => `.${extension}`)

function withExtension(fileName) {
  const extension = extname(fileName)
  return extensions.includes(extension)
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
  const directories = getDirectories(parents, url)
  const fileNames = getFileNames(url)

  const files = directories.reduce(
    (files, directory) => [
      ...files,
      ...fileNames.map(fileName => join(directory, fileName)),
    ],
    []
  )

  return [...new Set(files)]
}

function resolveInDirectories(includePaths, cache = {}) {
  return function(url, previous) {
    const cacheKey = `${normalize(previous)}|${url}`

    if (cache[cacheKey]) {
      return cache[cacheKey]
    }

    const files = getFiles(
      [dirname(previous), ...includePaths, process.cwd()],
      url
    )

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
        `importing ${url} from ${previous}. It's not clear which file to import. \n found files:${results
          .map(({file}) => file)
          .join('\n')}`
      )
    }

    if (results.length === 0) {
      return new Error(
        `importing ${url} from ${previous}. File to import not found or unreadable. \n tried files:${results
          .map(({file}) => file)
          .join('\n')}`
      )
    }

    const result = results[0]
    cache[cacheKey] = result

    return result
  }
}

module.exports = resolveInDirectories
