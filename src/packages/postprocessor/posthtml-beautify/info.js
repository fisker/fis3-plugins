module.exports = {
  version: '1.0.13',
  description: 'a html formatter of fis3 based on posthtml-beautify.',
  keywords: ['posthtml', 'beautify', 'html', 'format', 'formatter'],
  dependencies: ['posthtml', 'posthtml-beautify', 'promise-synchronizer'],
  options: {
    rules: {
      indent: 2,
      eol: '\n',
      eof: '\n'
    }
  },
  links: {'posthtml-beautify': 'https://github.com/gitscrum/posthtml-beautify'}
}
