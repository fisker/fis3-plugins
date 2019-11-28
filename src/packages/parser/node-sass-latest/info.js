export default {
  description: 'A fis plugin to parse sass with latest node-sass.',
  keywords: ['scss', 'sass', 'node-sass'],
  dependencies: ['node-sass', 'fast-cartesian-product'],
  options: {
    outputStyle: 'expanded',
    sourceMapContents: true,
    sourceMap: false,
    omitSourceMapUrl: false,
  },
  links: {
    sass: 'http://sass-lang.com/',
    'node-sass': 'https://github.com/sass/node-sass',
  },
}
