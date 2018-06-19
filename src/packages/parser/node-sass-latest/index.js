/*
 * fork from https://github.com/fex-team/fis-parser-node-sass
 */

'use strict'

import path from 'path'
import sass from 'node-sass'
import util from 'util'

const PROJECT_ROOT = fis.project.getProjectPath()

function resolve_and_load(filename, dir) {
  // Resolution order for ambiguous imports:
  // (1) filename as given
  // (2) underscore + given
  // (3) underscore + given + extension
  // (4) given + extension
  //

  const basename = path.basename(filename)
  const dirname = path.dirname(filename)
  const files = [
    path.join(dirname, basename),
    path.join(dirname, '_' + basename),
    path.join(dirname, '_' + basename + '.scss'),
    path.join(dirname, '_' + basename + '.sass'),
    path.join(dirname, basename + '.scss'),
    path.join(dirname, basename + '.sass')
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

    if ((file = resolve_and_load(filename, dir))) {
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

    var info = fis.uri(value, file.dirname)

    if (info.file && info.file.subpath) {
      value =
        info.quote + info.file.subpath + info.query + info.hash + info.quote
    }

    return value
  })
}

// function fixImport(content) {

//     var reg = /((?:\/\/.*?\n)|(?:\/\*[\s\S]*?\*\/))|(?:@import\s([\s\S]*?)(?:\n|$)(?!\s+[^{@]*\n))/ig;

//     return content.replace(reg, function(all, comments, value) {

//         if (!comments && value && value.trim() && !/;$/.test(value)) {
//             all += ';';
//         }

//         return all;
//     });
// }

module.exports = function(content, file, conf) {
  // 不处理空文件，处理空文件有人反馈报错。
  if (!content || !content.trim() || file.basename[0] === '_') {
    return content
  }

  // sass 对 unicode 字符处理有 bug, 所以这里先用这种方法 解决下。
  var backups = {}
  var backupId = 0

  // content = fixImport(content);

  content = content.replace(/('|")\\\w{4}\1/g, function(raw) {
    var id = backupId++
    backups[id] = raw
    return "'__scss_backup_" + id + "'"
  })

  var opts = fis.util.clone(conf)

  // 读取私有配置。
  if (file.sass) {
    fis.util.map(fis.sass, opts, true)
  }

  opts.includePaths = opts.include_paths || opts.includePaths || []
  // file.dirname !== root && opts.includePaths.unshift(file.dirname);
  opts.includePaths.push(PROJECT_ROOT)

  opts.includePaths = opts.includePaths.map(function(dir) {
    if (
      path.resolve(dir) != path.normalize(dir) ||
      fis.util.exists(path.join(PROJECT_ROOT, dir))
    ) {
      dir = path.join(PROJECT_ROOT, dir)
    }

    return dir
  })

  opts.file = file.subpath
  opts.data = content

  if (file.ext === '.sass') {
    opts.indentedSyntax = true
  }

  var stacks = []
  var includePaths = opts.includePaths.concat()
  var sources = [file.subpath]

  opts.importer = function(url, prev, done) {
    prev = prev.replace(/^\w+\:/, '') // windows 里面莫名加个盘符。
    var prevFile = find(prev, stacks.concat(includePaths))

    if (!prevFile) {
      return new Error("Can't find `" + prev + '`')
    }

    var dirname = prevFile.dirname

    // 如果已经在里面
    var idx = stacks.indexOf(dirname)
    if (idx !== -1) {
      stacks.splice(idx, 1)
    }
    stacks.unshift(dirname)

    var target = find(url, stacks.concat(includePaths))
    if (!target) {
      return new Error("Can't find `" + url + '` in `' + prev + '`')
    }

    var content = target.getContent()
    content = fixSourcePath(content, target)
    content = content.replace(/('|")\\\w{4}\1/g, function(raw) {
      var id = backupId++
      backups[id] = raw
      return "'__scss_backup_" + id + "'"
    })

    if (file.cache) {
      file.cache.addDeps(target.realpath)
    }
    //解决include_path 内import导致subpath为空报错问题
    if (!target.subpath) {
      target.subpath = path.relative(PROJECT_ROOT, target.realpath)
    }

    if (sources.includes(target.subpath)) {
      sources.push(target.subpath)
    }

    return {
      file: target.subpath,
      contents: content
    }
  }

  if (opts.sourceMap) {
    opts.sourceMapContents = true
    var mapping = fis.file.wrap(
      file.dirname + '/' + file.filename + file.rExt + '.map'
    )

    opts.sourceMap = mapping.getUrl(
      fis.compile.settings.hash,
      fis.compile.settings.domain
    )
    file.release &&
      (opts.outFile = file.getUrl(
        fis.compile.settings.hash,
        fis.compile.settings.domain
      ))
  }

  var ret
  try {
    ret = sass.renderSync(opts)
  } catch (e) {
    fis.log.error(
      util.format(
        '%s'.red + ' [`%s` %s:%s]'.yellow,
        e.message,
        e.file,
        e.line,
        e.column
      )
    )
  }

  // if (file.cache && ret.stats.includedFiles.length) {
  //     ret.stats.includedFiles.forEach(function(dep) {
  //         file.cache.addDeps(dep);
  //     });
  // }
  //

  if (mapping && ret.map) {
    var sourceMap = ret.map.toString('utf8')

    // 修复 sourceMap 文件路径错误问题
    // 等 node-sass 修复后，可以删除。
    // ---------------------------------------------
    var sourceMapObj = JSON.parse(sourceMap)
    sourceMapObj.sources = sources
    sourceMap = JSON.stringify(sourceMapObj, null, 2)
    // -----------------------------------------------

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
