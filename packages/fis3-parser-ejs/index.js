"use strict";

var _ejs = _interopRequireDefault(require("ejs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _global = global,
    fis = _global.fis;
var PROJECT_ROOT = fis.project.getProjectPath();

var root = _path.default.normalize(PROJECT_ROOT);

var re = /^[.\\/]/i;

function cleanRequireCache() {
  Object.keys(require.cache).filter(function (id) {
    return _path.default.normalize(id).startsWith(root);
  }).forEach(function (id) {
    delete require.cache[id];
  });
}

function makeRequireFunction(context) {
  return function (mod) {
    cleanRequireCache();

    if (re.test(mod)) {
      mod = _path.default.resolve(context, mod);
    }

    return require(mod);
  };
}

module.exports = function (content, file, conf) {
  if (file.filename[0] === '_') {
    return content;
  }

  var filename = conf.filename;

  var dirname = _path.default.dirname(filename);

  var data = _objectSpread({
    require: makeRequireFunction(dirname),
    __dirname: dirname,
    __filename: filename
  }, conf.data);

  var options = conf.options;
  options.root = PROJECT_ROOT;
  options.filename = file.realpath;
  options.cache = false;
  content = _ejs.default.render(content, data, options);
  return content;
};