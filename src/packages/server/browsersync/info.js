module.exports = {
  version: '1.10.1',
  description: 'a browser sync server for fis3.',
  keywords: ['browser-sync', 'livereload'],
  dependencies: [
    'body-parser',
    'browser-sync',
    'lodash.merge',
    'morgan',
    'serve-directory',
    'serve-directory-theme-octicons',
    'yargs',
    'yog-devtools',
    'execa',
  ],
  options: {},
  links: {
    browsersync: 'https://browsersync.io/',
  },
  files: [
    'app.js',
    'lib/browser-sync-config.js',
    'lib/middleware.js',
    'templates/script-tags.tmpl',
  ],
}
