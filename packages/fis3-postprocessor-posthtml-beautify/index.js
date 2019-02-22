"use strict";

var _posthtml = _interopRequireDefault(require("posthtml"));

var _posthtmlBeautify = _interopRequireDefault(require("posthtml-beautify"));

var _promiseSynchronizer = _interopRequireDefault(require("promise-synchronizer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = global.fis.log;

module.exports = function (content, file, conf) {
  content = content.replace(/__relative\("(.*?)"\)/g, '"__relative_fn1_start__$1__relative_fn1_end__"');
  content = content.replace(/__relative<<<"(.*?)">>>/g, '"__relative_fn2_start__$1__relative_fn2_end__"');
  var promise = (0, _posthtml.default)().use((0, _posthtmlBeautify.default)({
    rules: conf.rules
  })).process(content).then(function (data) {
    return data.html;
  });

  try {
    content = (0, _promiseSynchronizer.default)(promise);
  } catch (error) {
    log.warn('%s might not processed due to:\n %s', file.id, error);
    process.exit(1);
  }

  content = content.replace(/"__relative_fn2_start__(.*?)__relative_fn2_end__"/g, '__relative<<<"$1">>>');
  content = content.replace(/"__relative_fn1_start__(.*?)__relative_fn1_end__"/g, '__relative("$1")');
  return content;
};

module.exports.defaultOptions = {
  "rules": {
    "indent": 2,
    "eol": "\n",
    "eof": "\n"
  }
};