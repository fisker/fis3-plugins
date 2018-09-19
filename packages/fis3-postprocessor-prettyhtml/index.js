'use strict'

var _prettyhtml = require('@starptech/prettyhtml')

var _prettyhtml2 = _interopRequireDefault(_prettyhtml)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

module.exports = function(content, file, conf) {
  return (0, _prettyhtml2.default)(content, conf)
}

module.exports.defaultOptions = {
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  usePrettier: true,
  singleQuote: false
}
