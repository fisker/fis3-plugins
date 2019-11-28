export default {
  description: 'a js linter plugin of fis3 based on eslint.',
  keywords: ['eslint', 'linter'],
  dependencies: ['eslint'],
  options: {
    envs: ['browser'],
    fix: true,
    useEslintrc: true,
  },
  links: {
    eslint: 'http://eslint.org/',
  },
}
