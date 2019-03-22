module.exports = {
  version: '1.0.0',
  description: 'A fis plugin to parse sass with dart-sass.',
  keywords: ['scss', 'sass', 'node-sass'],
  dependencies: ['sass'],
  options: {
    outputStyle: 'expanded',
    sourceMapContents: true,
    sourceMap: false,
    omitSourceMapUrl: false,
  },
  links: {
    sass: 'http://sass-lang.com/',
    'dart-sass': 'https://github.com/sass/dart-sass/',
  },
}
