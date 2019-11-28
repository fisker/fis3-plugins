module.exports = {
  description: 'A fis plugin to parse sass with dart-sass.',
  keywords: ['scss', 'sass', 'dart-sass'],
  dependencies: ['sass', 'fast-cartesian-product'],
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
