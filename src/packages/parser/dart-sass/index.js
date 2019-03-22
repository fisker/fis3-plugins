import {join, dirname, isAbsolute} from 'path'
import util from 'util'
import sass from 'sass'
import sassImportResolve from './sass-import-resolver'

const {fis} = global
const PROJECT_ROOT = fis.project.getProjectPath()

function normalizeIncludePath(dirs) {
  return dirs.reduce((all, dir) => {
    const dirs = []
    if (isAbsolute(dir) && dir[0] !== '/') {
      dirs.push(dir)
    } else {
      dirs.push(dir)
      dirs.push(join(PROJECT_ROOT, dir))
      dirs.push(join(process.cwd(), dir))
    }

    return [...all, ...dirs]
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
    importer: sassImportResolve(includePaths, importCache),
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
