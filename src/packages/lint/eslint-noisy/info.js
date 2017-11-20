module.exports = {
  version: '2.0.4',
  description: 'a js linter plugin of fis3 based on eslint.',
  keywords: ['eslint', 'linter'],
  dependencies: {
    eslint: '^4.11.0'
  },
  options: {
    envs: ['browser'],
    fix: false,
    useEslintrc: true
  },
  links: {
    eslint: 'http://eslint.org/'
  }
}
