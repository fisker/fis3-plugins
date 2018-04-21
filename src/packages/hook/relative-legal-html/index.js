const quotes = {
  '': 'QUOTE_NONE',
  "'": 'QUOTE_SINGLE',
  '"': 'QUOTE_DOUBLE'
}

const rUrl = /("|')?__relative___(QUOTE_(?:NONE|SINGLE|DOUBLE))-(.*?)___(\1)/g
const path = require('path')
const rFile = /\.[^\.]+$/

function wrap(value) {
  const str = fis.util.stringQuote(value).rest
  return `"__relative___${quotes[info.quote]}-${str}___"`
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
  return url.replace(/\\/g, '/')
}

function convert(content, file, host) {
  return content.replace(rUrl, function(all, _, quoteStyle, value) {
    const info = fis.project.lookup(value)

    if (!info.file) {
      return info.origin
    }

    // 再编译一遍，为了保证 hash 值是一样的。
    fis.compile(info.file)

    const query = info.query
    const hash = info.hash || info.file.hash
    let url = /*/__sprite/.test(info.origin) ? info.file.getUrl() : */ getRelativeUrl(
      info.file,
      host || file
    )

    const parts = url.split('?')

    if (parts.length > 1 && query) {
      url = parts[0] + query + '&amp;' + parts[1]
    } else if (query) {
      url += query
    }

    let quoteChr = ''
    for (let chr in quotes) {
      if (quotes[chr] === quoteStyle) {
        quoteChr = chr
        break
      }
    }

    return quoteChr + url + hash + quoteChr
  })
}

function combineQuery(query1, query2) {
  query1 = query1.replace(/^\?/, '')
  query2 = query2.replace(/^\?/, '')
  const arr = []
  query1 && arr.push(query1)
  query2 && arr.push(query2)
  const query = arr.join('&')
  return query ? '?' + query : ''
}

function onStandardRestoreUri(message) {
  const value = message.value
  const file = message.file
  const info = message.info

  // 没有配置，不开启。
  // 或者目标文件不存在
  if (!file.relative || !info.file) {
    return
  }

  message.ret = wrap(info.quote + info.file.subpath + info.query + info.quote)
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
  const file = message.file
  const content = message.content
  const pkg = message.pkg

  // 没有配置，不开启。
  if (!file.relative || !file.relativeBody) {
    return
  }

  message.content = convert(file.relativeBody, file, pkg)
}

function onFetchRelativeUrl(message) {
  const target = message.target
  const host = message.file

  if (!host.relative) {
    return
  }

  message.ret = getRelativeUrl(target, host)
}

export default function(fis, opts) {
  fis.on('process:end', onProcessEnd)
  fis.on('standard:restore:uri', onStandardRestoreUri)
  fis.on('pack:file', onPackFile)

  // 给其他插件用的
  fis.on('plugin:relative:fetch', onFetchRelativeUrl)
}
