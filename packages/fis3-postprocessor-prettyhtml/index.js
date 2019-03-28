'use strict'

var _prettyhtml = _interopRequireDefault(require('@starptech/prettyhtml'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

module.exports = function(content, file, config) {
  content = (0, _prettyhtml.default)(content, config).contents
  content = content.replace(/\n\s*<!-- prettyhtml-ignore -->\n/g, '\n')
  return content
}

module.exports.defaultOptions = {
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  usePrettier: true,
  singleQuote: false,
}
