module.exports = {
  version: '1.0.8',
  description: 'a html formatter of fis3 based on posthtml-beautify.',
  keywords: ['posthtml', 'beautify', 'html', 'format', 'formatter'],
  dependencies: {
    posthtml: '^0.9.2',
    'posthtml-beautify': '^0.1.8',
    'promise-synchronizer': '^1.0.6'
  },
  options: {
    rules: {
      indent: 2,
      eol: '\n',
      eof: '\n'
    }
  },
  links: {'posthtml-beautify': 'https://github.com/gitscrum/posthtml-beautify'}
}
