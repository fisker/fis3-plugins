module.exports = {
  version: '1.4.1',
  description: 'a browser sync server for fis3.',
  keywords: ['browser-sync', 'livereload'],
  dependencies: ['browser-sync', 'filesize', 'lodash.merge', 'serve-directory'],
  options: {},
  links: {
    browsersync: 'https://browsersync.io/'
  },
  files: [
    'app.js',
    'lib/browser-sync-config.js',
    'lib/serve-directory.js',
    'public/directory.html',
    'public/style.css',
    'public/icon/directory.svg',
    'public/icon/file.svg',
    'public/icon/media.svg'
  ]
}
