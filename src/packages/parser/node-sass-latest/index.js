import {join, dirname, isAbsolute} from 'path'
import util from 'util'
import sass from 'node-sass'
import sassImportResolve from './sass-import-resolver'

const {fis} = global
const PROJECT_ROOT = fis.project.getProjectPath()

function normalizeIncludePath(directories) {
  return directories.reduce((all, directory) => {
    const directories_ = []
    if (isAbsolute(directory) && directory[0] !== '/') {
      directories_.push(directory)
    } else {
      directories_.push(directory)
      directories_.push(join(PROJECT_ROOT, directory))
      directories_.push(join(process.cwd(), directory))
    }

    return [...all, ...directories_]
  }, [])
}

module.exports = function(content, file, config) {
  if (file.basename[0] === '_') {
    return content
  }

  const importCache = {}

  let {includePaths = [], sourceMap = false, sourceMapContents} = config

  includePaths = [
    dirname(file.realpath),
    ...normalizeIncludePath(includePaths),
    PROJECT_ROOT,
  ]

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
    importer: sassImportResolve({
      includePaths,
      cache: importCache,
      onFound({file: imported}) {
        if (file.cache) {
          file.cache.addDeps(imported)
        }
      },
    }),
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
