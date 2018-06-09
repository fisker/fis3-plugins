'use strict'

var _ejs = require('ejs')

var _ejs2 = _interopRequireDefault(_ejs)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

var PROJECT_ROOT = fis.project.getProjectPath()

module.exports = function(content, file, conf) {
  if (file.filename[0] === '_') {
    return content
  }

  var data = conf.data
  var options = conf.options

  options.root = PROJECT_ROOT
  options.filename = file.realpath
  options.cache = false

  content = _ejs2.default.render(content, data, options)

  return content
}
