import prettyhtml from '@starptech/prettyhtml'

module.exports = function(content, file, conf) {
  content = prettyhtml(content, conf)
  content = content.replace(/\n\s?<!-- prettyhtml-ignore -->\n/g, '\n')
  return content
}
