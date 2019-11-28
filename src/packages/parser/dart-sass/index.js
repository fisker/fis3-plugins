import {join, dirname, isAbsolute} from 'path'
import util from 'util'
import sass from 'sass'
import sassImportResolve from '../../../shared/sass-import-resolver'
import * as info from './info'

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

function process(content, file, config) {
  if (file.basename[0] === '_') {
    return content
  }

  let {
    includePaths = [],
    sourceMap = false,
    sourceMapContents,
    alias = {},
  } = config

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

  const importer = sassImportResolve({
    includePaths,
    alias: {
      '@/': PROJECT_ROOT,
      ...alias,
    },
  })
  const options = {
    ...config,
    includePaths,
    // file: file.realpath,
    data: content,
    indentedSyntax: file.ext === '.sass',
    importer(file, previous) {
      const result = importer(file, previous)
      if (file.cache) {
        file.cache.addDeps(result.file)
      }
      return result
    },
    sourceMap,
    sourceMapContents,
  }

  // we must not give `node-sass` the real file path,
  // otherwise `options.importer` will not called
  // https://github.com/sass/dart-sass/issues/574
  delete options.file
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

export default process
export const defaultOptions = info.options
