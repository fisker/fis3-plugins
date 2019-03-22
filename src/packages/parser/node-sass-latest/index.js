import {normalize, resolve, join, dirname} from 'path'
import util from 'util'
import sass from 'sass'
import sassResolve from '@csstools/sass-import-resolve'

const {fis} = global
const PROJECT_ROOT = fis.project.getProjectPath()

function toAbsolute(dir) {
  if (
    resolve(dir) !== normalize(dir) ||
    fis.util.exists(join(PROJECT_ROOT, dir))
  ) {
    return join(PROJECT_ROOT, dir)
  }

  return dir
}

function resolveInDirs(dirs, cache) {
  return function(url, prev, done) {
    const cwds = [...dirs, dirname(resolve(prev))]
    cwds
      .reduce(
        (promise, cwd) =>
          promise.catch(() =>
            sassResolve(url, {
              cwd,
              cache,
              readFile: true,
            })
          ),
        Promise.reject()
      )
      // eslint-disable-next-line promise/no-callback-in-promise
      .then(done, done)
  }
}

module.exports = function(content, file, config) {
  if (file.basename[0] === '_') {
    return content
  }

  const importCache = {}

  let {includePaths = [], sourceMap = false, sourceMapContents} = config

  includePaths = [...includePaths, PROJECT_ROOT, dirname(file.realpath)].map(
    toAbsolute
  )

  let sourceMapFile
  if (sourceMap) {
    sourceMapContents = true
    sourceMapFile = fis.file.wrap(
      `${file.dirname}/${file.filename}${file.rExt}.map`
    )

    sourceMap = sourceMapFile.getUrl(
      fis.compile.settings.hash,
      fis.compile.settings.domain
    )
  }

  const options = {
    ...config,
    includePaths,
    file: file.realpath,
    data: content,
    indentedSyntax: file.ext === '.sass',
    importer: resolveInDirs(includePaths, importCache),
    sourceMap,
    sourceMapContents,
  }

  delete options.outFile

  let result
  try {
    result = sass.renderSync(options)
  } catch (error) {
    fis.log.error(
      util.format(
        '%s'.red + ' [`%s` %s:%s]'.yellow,
        error.message,
        error.file,
        error.line,
        error.column
      )
    )
  }

  if (sourceMapFile && result.map) {
    const sourceMap = result.map.toString('utf8')

    sourceMapFile.setContent(sourceMap)

    file.extras = file.extras || {}
    file.extras.derived = file.extras.derived || []
    file.extras.derived.push(sourceMapFile)
  }

  content = result.css.toString('utf8')

  return content
}
