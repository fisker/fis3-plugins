import sync from 'promise-synchronizer'
import {
  process as stylefmt
} from 'stylefmt'

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
