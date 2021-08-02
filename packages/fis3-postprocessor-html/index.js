'use strict'

var jsBeautify = require('js-beautify')

function exportPlugin(process, _ref) {
  var options = _ref.options
  process.defaultOptions = options
  return process
}

var info = {
  description: 'a html formatter of fis3 based on js-beautify',
  keywords: ['js-beautify', 'beautify', 'format', 'formatter'],
  dependencies: ['js-beautify'],
  options: {
    indent_size: 2,
    indent_char: ' ',
    eol: '\n',
    indent_level: 0,
    indent_with_tabs: false,
    preserve_newlines: true,
    max_preserve_newlines: 10,
    jslint_happy: false,
    space_after_anon_function: false,
    brace_style: 'collapse',
    keep_array_indentation: false,
    keep_function_indentation: false,
    space_before_conditional: true,
    break_chained_methods: false,
    eval_code: false,
    unescape_strings: false,
    wrap_line_length: 0,
    wrap_attributes: 'auto',
    wrap_attributes_indent_size: 4,
    end_with_newline: false,
  },
  links: {
    'js-beautify': 'https://github.com/beautify-web/js-beautify',
  },
}
var info$1 = info

function process(content, file, config) {
  return content ? jsBeautify.html(content, config) : ''
}

module.exports = exportPlugin(process, info$1)
