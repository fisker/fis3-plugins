import {join, isAbsolute, dirname, basename, normalize, extname} from 'path'
import {readFileSync} from 'fs'
import cartesianProduct from 'fast-cartesian-product'

const isPartial = (file) => file[0] === '_'
const extensions = ['scss', 'css', 'sass'].map((extension) => `.${extension}`)
const hasExtension = (file) => extensions.includes(extname(file))
const unique = (array) => [...new Set(array)]

function getDirectories(directories, file) {
  directories = directories.map((directory) => join(directory, file))

  if (isAbsolute(file)) {
    directories.push(file)
  }

  return directories.map(dirname)
}

function possibleFileNames(file) {
  const fileName = basename(file)

  const fileNames = [fileName]

  if (!isPartial(fileName)) {
    fileNames.unshift(`_${fileName}`)
  }

  return hasExtension(fileName)
    ? fileNames
    : cartesianProduct([fileNames, extensions]).map(
        ([fileName, extension]) => fileName + extension
      )
}

function getFiles(directories, file) {
  directories = getDirectories(directories, file)
  const fileNames = possibleFileNames(file)

  const files = cartesianProduct([
    directories,
    fileNames,
  ]).map(([directory, fileName]) => join(directory, fileName))

  return unique(files)
}

function resolveInDirectories({includePaths, cache = {}, alias = {}}) {
  return function (file, previous) {
    const cacheKey = `${normalize(previous)}|${file}`

    if (cache[cacheKey]) {
      const file = cache[cacheKey]
      return file
    }

    ;[file] = file.split(/[#?]/)

    let files = []

    if (file[0] === '~') {
      files = [
        require.resolve(file.slice(1), {
          paths: [process.cwd()],
        }),
      ]
    } else {
      for (const [aliasName, path] of Object.entries(alias)) {
        if (file.startsWith(aliasName)) {
          file = file.replace(aliasName, `${path}/`)
        }
      }

      files = getFiles(
        [dirname(previous), ...includePaths, process.cwd()],
        file
      )
    }

    const results = files
      .map((file) => {
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
        `importing ${file} from ${previous}. It's not clear which file to import. \n found files:${results
          .map(({file}) => file)
          .join('\n')}`
      )
    }

    if (results.length === 0) {
      return new Error(
        `importing ${file} from ${previous}. File to import not found or unreadable. \n tried files:${results
          .map(({file}) => file)
          .join('\n')}`
      )
    }

    const result = results[0]
    cache[cacheKey] = result
    return result
  }
}

export default resolveInDirectories
