module.exports = {
  version: '1.3.5',
  description: 'A fis plugin to parse sass with latest node-sass.',
  keywords: ['scss', 'sass', 'node-sass'],
  dependencies: ['node-sass'],
  options: {
    outputStyle: 'expanded',
    sourceMapContents: true,
    sourceMap: false,
    omitSourceMapUrl: false,
  },
  files: ['sass-import-resolver.js'],
  links: {
    sass: 'http://sass-lang.com/',
    'node-sass': 'https://github.com/sass/node-sass',
  },
}
