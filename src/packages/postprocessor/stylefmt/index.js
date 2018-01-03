// colors.js bug
// es6-shim `bold` breaks colors.js
var getter = String.prototype.__lookupGetter__('bold')
require('es6-shim')
if (getter) {
  String.prototype.__defineGetter__('bold', function() {
    return this
  })
}

var sync = require('promise-synchronizer')
var stylefmt = require('stylefmt').process

module.exports = function(content, file, conf) {
  try {
    content = sync(
      stylefmt(content, {
        from: conf.filename
      }).then(function(result) {
        if (result && result.css) {
          return result.css
        }
      })
    )
  } catch (err) {}
  return content
}
