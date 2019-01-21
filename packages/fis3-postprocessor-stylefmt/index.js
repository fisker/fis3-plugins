'use strict'

var _promiseSynchronizer = _interopRequireDefault(
  require('promise-synchronizer')
)

var _stylefmt = require('stylefmt')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

module.exports = function(content, file, conf) {
  try {
    content = (0, _promiseSynchronizer.default)(
      (0, _stylefmt.process)(content, {
        from: conf.filename,
      }).then(function(result) {
        if (result && result.css) {
          return result.css
        }
      })
    )
  } catch (err) {}

  return content
}
