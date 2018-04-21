// colors.js bug
// es6-shim `bold` breaks colors.js
const getter = String.prototype.__lookupGetter__('bold')

import 'es6-shim'

if (getter) {
  String.prototype.__defineGetter__('bold', function() {
    return this
  })
}

import sync from 'promise-synchronizer'
import {
  process as stylefmt
} from 'stylefmt'

export default function(content, file, conf) {
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
