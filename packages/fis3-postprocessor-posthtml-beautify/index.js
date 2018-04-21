'use strict'

var _posthtml = require('posthtml')

var _posthtml2 = _interopRequireDefault(_posthtml)

var _posthtmlBeautify = require('posthtml-beautify')

var _posthtmlBeautify2 = _interopRequireDefault(_posthtmlBeautify)

var _promiseSynchronizer = require('promise-synchronizer')

var _promiseSynchronizer2 = _interopRequireDefault(_promiseSynchronizer)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

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

  var promise = (0, _posthtml2.default)()
    .use(
      (0, _posthtmlBeautify2.default)({
        rules: conf.rules
      })
    )
    .process(content)
    .then(function(data) {
      return data.html
    })

  try {
    content = (0, _promiseSynchronizer2.default)(promise)
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
