module.exports = {
  '*.{js,mjs}': ['eslint --fix', 'prettier --write', 'git add'],
  '*.md': ['prettier --write', 'markdownlint', 'git add'],
  '*.json': ['prettier --write', 'git add'],
}
