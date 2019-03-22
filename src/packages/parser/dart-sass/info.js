module.exports = {
  version: '1.0.4',
  description: 'A fis plugin to parse sass with dart-sass.',
  keywords: ['scss', 'sass', 'dart-sass'],
  dependencies: ['sass'],
  options: {
    outputStyle: 'expanded',
    sourceMapContents: true,
    sourceMap: false,
    omitSourceMapUrl: false,
  },
  files: ['sass-import-resolver.js'],
  links: {
    sass: 'http://sass-lang.com/',
    'dart-sass': 'https://github.com/sass/dart-sass/',
  },
}
