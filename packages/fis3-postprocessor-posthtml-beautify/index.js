'use strict'

var posthtml = require('posthtml')
var beautify = require('posthtml-beautify')
var sync = require('promise-synchronizer')
var log = global.fis.log

module.exports = function(content, file, conf) {
  content = content.replace(
    /__relative\("(.*?)"\)/g,
    '"__relative_fn1_start__$1__relative_fn1_end__"'
  )
  content = content.replace(
    /__relative<<<"(.*?)">>>/g,
    '"__relative_fn2_start__$1__relative_fn2_end__"'
  )

  var promise = posthtml()
    .use(
      beautify({
        rules: conf.rules
      })
    )
    .process(content)
    .then(function(data) {
      return data.html
    })

  try {
    content = sync(promise)
  } catch (err) {
    log.warn('%s might not processed due to:\n %s', file.id, err)
    process.exit(1)
  }

  content = content.replace(
    /"__relative_fn2_start__(.*?)__relative_fn2_end__"/g,
    '__relative<<<"$1">>>'
  )

  content = content.replace(
    /"__relative_fn1_start__(.*?)__relative_fn1_end__"/g,
    '__relative("$1")'
  )

  return content
}

module.exports.defaultOptions = {
  rules: {
    indent: 2,
    eol: '\n',
    eof: '\n'
  }
}
