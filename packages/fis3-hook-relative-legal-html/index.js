'use strict'

var _path = _interopRequireDefault(require('path'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

var quotes = {
  '': 'QUOTE_NONE',
  "'": 'QUOTE_SINGLE',
  '"': 'QUOTE_DOUBLE'
}
var rUrl = /(["']?)__relative___(QUOTE_(?:NONE|SINGLE|DOUBLE))-(.*?)___(\1)/g
var rFile = /\.[^\.]+$/

function wrap(info) {
  var path = info.file.subpath + info.query + info.hash
  var quote = info.quote
  var quoteStyle = quotes[quote]
  return ''
    .concat(quote, '__relative___')
    .concat(quoteStyle, '-')
    .concat(path, '___')
    .concat(quote)
}

function getRelativeUrl(file, host) {
  var url = ''

  if (typeof file === 'string') {
    url = file
  } else {
    url = file.getUrl()

    if (file.domain) {
      return url
    }
  }

  var relativeFrom =
    typeof host.relative === 'string' ? host.relative : host.release

  if (rFile.test(relativeFrom)) {
    relativeFrom = _path.default.dirname(relativeFrom)
  }

  url = _path.default.relative(relativeFrom, url)
  return url.replace(/\\/g, '/')
}

function convert(content, file, host) {
  return content.replace(rUrl, function(all, _, quoteStyle, path) {
    var info = fis.project.lookup(path)

    if (!info.file) {
      return info.origin
    } // 再编译一遍，为了保证 hash 值是一样的。

    fis.compile(info.file)
    var query = info.query
    var hash = info.hash || info.file.hash
    var url = getRelativeUrl(info.file, host || file)
    var parts = url.split('?')

    if (parts.length > 1 && query) {
      url = parts[0] + query + '&amp;' + parts[1]
    } else if (query) {
      url += query
    }

    var quoteChr = ''

    for (var chr in quotes) {
      if (quotes[chr] === quoteStyle) {
        quoteChr = chr
        break
      }
    }

    return quoteChr + url + hash + quoteChr
  })
}

function onStandardRestoreUri(message) {
  var value = message.value
  var file = message.file
  var info = message.info // 没有配置，不开启。
  // 或者目标文件不存在

  if (!file.relative || !info.file) {
    return
  }

  message.ret = wrap(info)
}

function onProcessEnd(file) {
  // 没有配置，不开启。
  if (!file.relative || !file.isText() || file.isInline) {
    return
  }

  var content = file.getContent()
  file.relativeBody = content
  content = convert(content, file)
  file.setContent(content)
}

function onPackFile(message) {
  var file = message.file
  var content = message.content
  var pkg = message.pkg // 没有配置，不开启。

  if (!file.relative || !file.relativeBody) {
    return
  }

  message.content = convert(file.relativeBody, file, pkg)
}

function onFetchRelativeUrl(message) {
  var target = message.target
  var host = message.file

  if (!host.relative) {
    return
  }

  message.ret = getRelativeUrl(target, host)
}

module.exports = function(fis, opts) {
  fis.on('process:end', onProcessEnd)
  fis.on('standard:restore:uri', onStandardRestoreUri)
  fis.on('pack:file', onPackFile) // 给其他插件用的

  fis.on('plugin:relative:fetch', onFetchRelativeUrl)
}
