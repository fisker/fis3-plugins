module.exports = {
  version: '1.6.5',
  description: 'a browser sync server for fis3.',
  keywords: ['browser-sync', 'livereload'],
  dependencies: [
    'browser-sync',
    'lodash.merge',
    'serve-directory',
    'serve-directory-theme-octicons'
  ],
  options: {},
  links: {
    browsersync: 'https://browsersync.io/'
  },
  files: [
    'app.js',
    'lib/browser-sync-config.js',
    'lib/serve-directory.js',
    'templates/script-tags.tmpl'
  ]
}
