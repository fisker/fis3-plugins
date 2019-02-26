/*!
 * config file for prettier
 * project https://github.com/xwtec/dotfiles
 * primary link https://raw.githubusercontent.com/xwtec/dotfiles/master/prettier/prettier.config.js
 *
 * options https://prettier.io/docs/en/options.html
 *
 */

module.exports = {
  // options for all files
  trailingComma: 'es5',
  semi: false,
  singleQuote: true,
  bracketSpacing: false,
  htmlWhitespaceSensitivity: 'ignore',

  // overrides
  overrides: [
    {
      files: '*.{js,jsx,mjs}',
      options: {
        parser: 'babel',
      },
    },
    {
      files: '*.{ts,tsx}',
      options: {
        parser: 'typescript',
      },
    },
    {
      files: '*.css',
      options: {
        parser: 'css',
        singleQuote: false,
      },
    },
    {
      files: '*.scss',
      options: {
        parser: 'scss',
        singleQuote: false,
      },
    },
    {
      files: '*.less',
      options: {
        parser: 'less',
        singleQuote: false,
      },
    },
    {
      files: '*.vue',
      options: {
        parser: 'vue',
      },
    },
    {
      files: '*.{html,htm}',
      options: {
        parser: 'html',
      },
    },
    {
      files: '*.json',
      options: {
        parser: 'json',
      },
    },
    {
      files: '*.json5',
      options: {
        parser: 'json5',
      },
    },
    {
      // more ext: mdown,mdwn,mkd,mkdn,mkdown
      files: '*.{md,markdown}',
      options: {
        parser: 'markdown',
        singleQuote: false,
      },
    },
    {
      files: '*.mdx',
      options: {
        parser: 'mdx',
      },
    },
    {
      files: '*.{yaml,yml}',
      options: {
        parser: 'yaml',
        singleQuote: false,
      },
    },
    {
      files: '*.{gql,graphql}',
      options: {
        parser: 'graphql',
      },
    },
  ],
}
