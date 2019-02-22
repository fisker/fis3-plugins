"use strict";

var _postcss = _interopRequireDefault(require("postcss"));

var _autoprefixer = _interopRequireDefault(require("autoprefixer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (content, file, conf) {
  return (0, _postcss.default)([(0, _autoprefixer.default)(conf)]).process(content, {
    from: conf.filename
  }).css;
};