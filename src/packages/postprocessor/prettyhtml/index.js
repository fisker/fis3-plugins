import prettyhtml from '@starptech/prettyhtml'

module.exports = function(content, file, config) {
  content = prettyhtml(content, config).contents
  content = content.replace(/\n\s*<!-- prettyhtml-ignore -->\n/g, '\n')
  return content
}
