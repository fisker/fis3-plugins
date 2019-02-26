module.exports = {
  // markdown files
  // first prettier then lint
  '*.{md,markdown}': ['prettier --write', 'markdownlint', 'git add'],

  // js files
  // eslint then prettier
  '*.{js,jsx,mjs}': ['eslint --fix', 'prettier --write', 'git add'],

  // vue files
  // eslint then prettier
  '*.{vue}': ['eslint --fix', 'prettier --write', 'git add'],

  // typescript files
  // tslint(eslint) then prettier
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write', 'git add'],

  // css files
  // TODO: stylelint
  // prettier
  '*.{scss,css,less}': ['prettier --write', 'git add'],

  // html files
  // TODO: htmlhint
  // prettier
  '*.{html,htm}': ['prettier --write', 'git add'],

  // json files
  // prettier
  '*.json': ['prettier --write', 'git add'],

  // json files
  // prettier
  '*.json5': ['prettier --write', 'git add'],

  // json files
  // prettier
  '*.{yaml,yml}': ['prettier --write', 'git add'],

  // json files
  // prettier
  '*.{gql,graphql}': ['prettier --write', 'git add'],
}
