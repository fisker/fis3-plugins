module.exports = {
  version: '1.0.0',
  description: 'fis3 build command.',
  keywords: ['release'],
  dependencies: ['fis3-command-release'],
  files: ['hack.js'],
  scripts: {
    postinstall: 'node hack.js'
  },
  links: {
    'fis3-command-release': 'https://github.com/fex-team/fis3-command-release'
  }
}
