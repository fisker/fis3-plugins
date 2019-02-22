"use strict";

var _cleanCss = _interopRequireDefault(require("clean-css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = global.fis.log;

function deriveSourceMap(file, sourceMap) {
  if (!sourceMap) {
    return;
  }

  var mapping = global.fis.file.wrap("".concat(file.dirname, "/").concat(file.filename).concat(file.rExt, ".map"));
  mapping.setContent(sourceMap);
  file.extras = file.extras || {};
  file.extras.derived = file.extras.derived || [];
  file.extras.derived.push(mapping);
}

module.exports = function (content, file, conf) {
  var options = Object.assign({}, conf);
  delete options.filename;

  if (options.returnPromise) {
    options.returnPromise = false;
  }

  var result = new _cleanCss.default(conf).minify(content);

  if (result.warnings && result.warnings.length) {
    log.warn(result.warnings);
  }

  if (result.errors && result.errors.length) {
    log.warn(result.errors);
    process.exit(1);
  }

  deriveSourceMap(file, result.sourceMap);
  return result.styles;
};