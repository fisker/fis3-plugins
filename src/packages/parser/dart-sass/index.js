import path from 'path'
import {pathToFileURL} from 'url'
import {format} from 'util'
import sass from 'sass'
import exportPlugin from '../../../shared/export-plugin.js'
import sassImportResolve from '../../../shared/sass-import-resolver.js'
import info from './info.js'

const {fis} = global
const PROJECT_ROOT = fis.project.getProjectPath()

function normalizeIncludePath(directories) {
  return directories.reduce((all, directory) => {
    const directories_ = []
    if (path.isAbsolute(directory) && directory[0] !== '/') {
      directories_.push(directory)
    } else {
      directories_.push(
        directory,
        path.join(PROJECT_ROOT, directory),
        path.join(process.cwd(), directory)
      )
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
    path.dirname(file.realpath),
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
    includePaths: includePaths.map(
      (directory) => pathToFileURL(directory).href
    ),
    file: file.realpath,
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

  delete options.outFile

  let result
  try {
    result = sass.renderSync(options)
  } catch (error) {
    fis.log.error(
      format(
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

module.exports = exportPlugin(process, info)
