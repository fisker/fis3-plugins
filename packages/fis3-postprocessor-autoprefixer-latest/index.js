'use strict'

var _postcss = _interopRequireDefault(require('postcss'))

var _autoprefixer = _interopRequireDefault(require('autoprefixer'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

module.exports = function(content, file, config) {
  return (0, _postcss.default)([(0, _autoprefixer.default)(config)]).process(
    content,
    {
      from: config.filename,
    }
  ).css
}
