'use strict'

var cssgraceLite = require('cssgrace-lite')

function exportPlugin(process, _ref) {
  var options = _ref.options
  process.defaultOptions = options
  return process
}

var info = {
  description: 'cssgrace for fis3.',
  keywords: ['cssgrace'],
  dependencies: ['cssgrace-lite'],
  options: {},
  links: {
    cssgrace: 'https://github.com/cssdream/cssgrace',
  },
}

var info$1 = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  default: info,
})

function process(content, file, config) {
  return cssgraceLite.pack(content, config)
}

var cssgrace_1 = exportPlugin(process, info$1)
