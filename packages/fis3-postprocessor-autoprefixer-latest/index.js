'use strict'

var _postcss = require('postcss')

var _postcss2 = _interopRequireDefault(_postcss)

var _autoprefixer = require('autoprefixer')

var _autoprefixer2 = _interopRequireDefault(_autoprefixer)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

module.exports = function(content, file, conf) {
  return (0, _postcss2.default)([(0, _autoprefixer2.default)(conf)]).process(
    content,
    {
      from: conf.filename
    }
  ).css
}
