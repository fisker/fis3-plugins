module.exports = {
  version: '1.4.1',
  description: 'a browser sync server for fis3.',
  keywords: ['browser-sync', 'livereload'],
  dependencies: {
    'browser-sync': '^2.18.13',
    filesize: '^3.5.11',
    'lodash.merge': '^4.6.0',
    'serve-directory': '^1.2.4'
  },
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
