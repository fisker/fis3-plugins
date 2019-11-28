import path from 'path'
import * as info from './info'
import exportPlugin from '../../../shared/export-plugin'

const {fis} = global

const quotes = {
  '': 'QUOTE_NONE',
  "'": 'QUOTE_SINGLE',
  '"': 'QUOTE_DOUBLE',
}

const rUrl = /(["']?)__relative___(QUOTE_(?:NONE|SINGLE|DOUBLE))-(.*?)___(\1)/g
const rFile = /\.[^.]+$/

function wrapPath(info) {
  const path = info.file.subpath + info.query + info.hash
  const {quote} = info
  const quoteStyle = quotes[quote]
  return `${quote}__relative___${quoteStyle}-${path}___${quote}`
}

function getRelativeUrl(file, host) {
  let url = ''

  if (typeof file === 'string') {
    url = file
  } else {
    url = file.getUrl()

    if (file.domain) {
      return url
    }
  }

  let relativeFrom =
    typeof host.relative === 'string' ? host.relative : host.release
  if (rFile.test(relativeFrom)) {
    relativeFrom = path.dirname(relativeFrom)
  }

  url = path.relative(relativeFrom, url)
  url = url.replace(/\\/g, '/')

  if (url[0] !== '.') {
    url = `./${url}`
  }

  return url
}

function convert(content, file, host) {
  return content.replace(rUrl, function(all, _, quoteStyle, path) {
    const info = fis.project.lookup(path)

    if (!info.file) {
      return info.origin
    }

    // 再编译一遍，为了保证 hash 值是一样的。
    fis.compile(info.file)

    const {query} = info
    const hash = info.hash || info.file.hash
    let url = getRelativeUrl(info.file, host || file)

    const parts = url.split('?')

    if (parts.length > 1 && query) {
      url = `${parts[0] + query}&amp;${parts[1]}`
    } else if (query) {
      url += query
    }

    let quoteChr = ''
    for (const chr in quotes) {
      if (quotes[chr] === quoteStyle) {
        quoteChr = chr
        break
      }
    }

    return quoteChr + url + hash + quoteChr
  })
}

function onStandardRestoreUri(message) {
  const {info, file} = message

  // 没有配置，不开启。
  // 或者目标文件不存在
  if (!file.relative || !info.file) {
    return
  }

  message.ret = wrapPath(info)
}

function onProcessEnd(file) {
  // 没有配置，不开启。
  if (!file.relative || !file.isText() || file.isInline) {
    return
  }

  let content = file.getContent()
  file.relativeBody = content
  content = convert(content, file)
  file.setContent(content)
}

function onPackFile(message) {
  const {file} = message
  const {pkg: package_} = message

  // 没有配置，不开启。
  if (!file.relative || !file.relativeBody) {
    return
  }

  message.content = convert(file.relativeBody, file, package_)
}

function onFetchRelativeUrl(message) {
  const {target} = message
  const host = message.file

  if (!host.relative) {
    return
  }

  message.ret = getRelativeUrl(target, host)
}

function process(fis) {
  fis.on('process:end', onProcessEnd)
  fis.on('standard:restore:uri', onStandardRestoreUri)
  fis.on('pack:file', onPackFile)

  // 给其他插件用的
  fis.on('plugin:relative:fetch', onFetchRelativeUrl)
}

module.exports = exportPlugin(process, info)
