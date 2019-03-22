const _path = _interopRequireDefault(require('path'))

const _sass = _interopRequireDefault(require('sass'))

const _util = _interopRequireDefault(require('util'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

/*
 * fork from https://github.com/fex-team/fis-parser-node-sass
 */
const _global = global
const {fis} = _global
const PROJECT_ROOT = fis.project.getProjectPath()

function resolveAndLoad(filename, dir) {
  // Resolution order for ambiguous imports:
  // (1) filename as given
  // (2) underscore + given
  // (3) underscore + given + extension
  // (4) given + extension
  //
  const basename = _path.default.basename(filename)

  const dirname = _path.default.dirname(filename)

  const files = [
    _path.default.join(dirname, basename),
    _path.default.join(dirname, '_'.concat(basename)),
    _path.default.join(dirname, '_'.concat(basename, '.scss')),
    _path.default.join(dirname, '_'.concat(basename, '.sass')),
    _path.default.join(dirname, ''.concat(basename, '.scss')),
    _path.default.join(dirname, ''.concat(basename, '.sass')),
  ]
  let found = null
  files.every(function(url) {
    const file = fis.util(dir, url)

    if (file && fis.util.isFile(file)) {
      found = fis.file(file)
      return false
    }

    return true
  })
  return found
}

function find(filename, paths) {
  let found = null
  paths.every(function(dir) {
    let file

    if ((file = resolveAndLoad(filename, dir))) {
      found = file
      return false
    }

    return true
  })
  return found
}

function fixSourcePath(content, file) {
  // 处理，解决资源引用路径问题。
  content = fis.compile.extCss(content)
  return content.replace(fis.compile.lang.reg, function(
    all,
    type,
    depth,
    value
  ) {
    // 如果是 fis2 的版本
    if (!fis.match) {
      value = depth
    }

    const info = fis.uri(value, file.dirname)

    if (info.file && info.file.subpath) {
      value =
        info.quote + info.file.subpath + info.query + info.hash + info.quote
    }

    return value
  })
}

module.exports = function(content, file, conf) {
  // 不处理空文件，处理空文件有人反馈报错。
  if (!content || !content.trim() || file.basename[0] === '_') {
    return content
  } // sass 对 unicode 字符处理有 bug, 所以这里先用这种方法 解决下。

  const backups = {}
  let backupId = 0 // content = fixImport(content);

  content = content.replace(/('|")\\\w{4}\1/g, function(raw) {
    const id = backupId
    backupId += 1
    backups[id] = raw
    return "'__scss_backup_".concat(id, "'")
  })
  const opts = fis.util.clone(conf) // 读取私有配置。

  if (file.sass) {
    fis.util.map(fis.sass, opts, true)
  }

  opts.includePaths = opts.include_paths || opts.includePaths || [] // file.dirname !== root && opts.includePaths.unshift(file.dirname);

  opts.includePaths.push(PROJECT_ROOT)
  opts.includePaths = opts.includePaths.map(function(dir) {
    if (
      _path.default.resolve(dir) !== _path.default.normalize(dir) ||
      fis.util.exists(_path.default.join(PROJECT_ROOT, dir))
    ) {
      dir = _path.default.join(PROJECT_ROOT, dir)
    }

    return dir
  })
  opts.file = file.subpath
  opts.data = content

  if (file.ext === '.sass') {
    opts.indentedSyntax = true
  }

  const stacks = []
  const includePaths = opts.includePaths.concat()
  const sources = [file.subpath]

  opts.importer = function(url, prev, done) {
    prev = prev.replace(/^\w+:/, '') // windows 里面莫名加个盘符。

    const prevFile = find(prev, stacks.concat(includePaths))

    if (!prevFile) {
      return new Error("Can't find `".concat(prev, '`'))
    }

    const {dirname} = prevFile // 如果已经在里面

    const idx = stacks.indexOf(dirname)

    if (idx !== -1) {
      stacks.splice(idx, 1)
    }

    stacks.unshift(dirname)
    const target = find(url, stacks.concat(includePaths))

    if (!target) {
      return new Error("Can't find `".concat(url, '` in `').concat(prev, '`'))
    }

    let content = target.getContent()
    content = fixSourcePath(content, target)
    content = content.replace(/('|")\\\w{4}\1/g, function(raw) {
      const id = backupId
      backupId += 1
      backups[id] = raw
      return "'__scss_backup_".concat(id, "'")
    })

    if (file.cache) {
      file.cache.addDeps(target.realpath)
    } // 解决include_path 内import导致subpath为空报错问题

    if (!target.subpath) {
      target.subpath = _path.default.relative(PROJECT_ROOT, target.realpath)
    }

    if (sources.includes(target.subpath)) {
      sources.push(target.subpath)
    }

    return {
      file: target.subpath,
      contents: content,
    }
  }

  let mapping

  if (opts.sourceMap) {
    opts.sourceMapContents = true
    mapping = fis.file.wrap(
      ''
        .concat(file.dirname, '/')
        .concat(file.filename)
        .concat(file.rExt, '.map')
    )
    opts.sourceMap = mapping.getUrl(
      fis.compile.settings.hash,
      fis.compile.settings.domain
    )

    if (file.release) {
      opts.outFile = file.getUrl(
        fis.compile.settings.hash,
        fis.compile.settings.domain
      )
    }
  }

  let ret

  try {
    ret = _sass.default.renderSync(opts)
  } catch (error) {
    fis.log.error(
      _util.default.format(
        '%s'.red + ' [`%s` %s:%s]'.yellow,
        error.message,
        error.file,
        error.line,
        error.column
      )
    )
  } // if (file.cache && ret.stats.includedFiles.length) {
  //     ret.stats.includedFiles.forEach(function(dep) {
  //         file.cache.addDeps(dep);
  //     });
  // }
  //

  if (mapping && ret.map) {
    let sourceMap = ret.map.toString('utf8') // 修复 sourceMap 文件路径错误问题
    // 等 node-sass 修复后，可以删除。
    // ---------------------------------------------

    const sourceMapObj = JSON.parse(sourceMap)
    sourceMapObj.sources = sources
    sourceMap = JSON.stringify(sourceMapObj, null, 2) // -----------------------------------------------

    mapping.setContent(sourceMap)
    file.extras = file.extras || {}
    file.extras.derived = file.extras.derived || []
    file.extras.derived.push(mapping)
  }

  content = ret.css.toString('utf8')
  content = content.replace(/('|")__scss_backup_(\d+)\1/g, function(
    _,
    quote,
    index
  ) {
    return backups[index]
  })
  return content
}

module.exports.defaultOptions = {
  outputStyle: 'expanded',
  sourceMapContents: true,
  sourceMap: false,
  omitSourceMapUrl: false,
}
