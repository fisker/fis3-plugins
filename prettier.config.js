/*!
 * config file for `prettier`
 *
 * update: wget https://git.io/fhNjs
 * document: https://prettier.io/docs/en/options.html
 */

/* eslint-disable no-unused-vars */

// https://prettier.io/docs/en/options.html
const SUPPORTED_OPTIONS = [
  'printWidth',
  'tabWidth',
  'useTabs',
  'semi',
  'singleQuote',
  'jsxSingleQuote',
  'trailingComma',
  'bracketSpacing',
  'jsxBracketSameLine',
  'arrowParens',
  'rangeStart',
  'rangeEnd',
  'parser',
  'filepath',
  'requirePragma',
  'insertPragma',
  'proseWrap',
  'htmlWhitespaceSensitivity',
  'endOfLine',
]

// default config
const DEFAULT_CONFIG = {
  bracketSpacing: false,
  htmlWhitespaceSensitivity: 'ignore',
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
}

// config for lang
const LANG_CONFIG = {
  javascript: {
    ext: 'js,jsx,mjs',
    parser: 'babel',
    singleQuote: true,
  },
  typescript: {
    ext: 'ts,tsx',
    singleQuote: true,
  },
  html: {
    ext: 'html,htm',
    // effect js in html
    singleQuote: true,
  },
  markdown: {
    // more ext: mdown,mdwn,mkd,mkdn,mkdown
    ext: 'md,markdown',
    singleQuote: false,
  },
  yaml: {
    ext: 'yaml,yml',
    singleQuote: false,
  },
  graphql: {
    ext: 'gql,graphql',
  },
  css: {
    singleQuote: false,
  },
  scss: {
    singleQuote: false,
  },
  less: {
    singleQuote: false,
  },
  vue: {},
  json: {
    singleQuote: false,
  },
  json5: {
    singleQuote: true,
  },
  mdx: {},
}

// custom overrides
const CUSTOM_OVERRIDES = [
  // {
  //   files: 'your glob',
  //   options: {
  //     [option key]: [option value],
  //   }
  // },
]

// export

function toArray(x) {
  x = Array.isArray(x) ? x : x.split(',')
  return x.filter(Boolean).map(s => s.trim())
}

function isUndefined(x) {
  return typeof x === 'undefined'
}

function isNotDefault(config, option) {
  const configValue = config[option]
  const defaultValue = DEFAULT_CONFIG[option]

  return (
    !isUndefined(configValue) &&
    (isUndefined(defaultValue) || configValue !== defaultValue)
  )
}

function toOverrides(config) {
  const {lang} = config

  const ext = toArray(config.ext || lang)
  const parser = config.parser || lang

  const files = ext.length > 1 ? `*.{${ext}}` : `*.${ext}`

  const options = {
    parser,
  }

  for (const option of SUPPORTED_OPTIONS) {
    if (isNotDefault(config, option)) {
      options[option] = config[option]
    }
  }

  return {
    files,
    options,
  }
}

function configParser({lang, config}) {
  if (Array.isArray(config)) {
    config = {
      ext: config,
    }
  }

  if (typeof config === 'string') {
    if (toArray(config).length === 1) {
      config = {
        parser: 'config',
      }
    } else {
      config = {
        ext: 'config',
      }
    }
  }

  return {
    ...config,
    lang,
  }
}

function langOverrides(config) {
  return Object.keys(config)
    .sort()
    .map(lang =>
      configParser({
        lang,
        config: config[lang],
      })
    )
    .map(toOverrides)
}

module.exports = {
  ...DEFAULT_CONFIG,

  // overrides
  overrides: [...langOverrides(LANG_CONFIG), ...CUSTOM_OVERRIDES],
}
