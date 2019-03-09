/*!
 * config file for `prettier`
 *
 * update: wget https://git.io/fhNjs
 * document: https://prettier.io/docs/en/options.html
 */

/* eslint-disable no-unused-vars */

// default options
const DEAULT_CONFIG = {
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
  vue: {
    singleQuote: false,
  },
  json: {
    singleQuote: false,
  },
  json5: {
    singleQuote: true,
  },
  mdx: {},
}

// custom config
const overrides = [
  // {
  //   files: '*.ext',
  //   options: {
  //     parser: 'some-parser',
  //     singleQuote: false,
  //   }
  // }
]

// export

const SUPPORTED_OPTIONS = [
  'singleQuote',
  'semi',
  'singleQuote',
  'bracketSpacing',
  'htmlWhitespaceSensitivity',
]

function toArray(x) {
  x = Array.isArray(x) ? x : x.split(',')
  return x.filter(Boolean).map(s => s.trim())
}

function isUndefined(x) {
  return typeof x === 'undefined'
}

function isNotDefault(config, option) {
  const configValue = config[option]
  const defaultValue = DEAULT_CONFIG[option]

  // console.log({option, configValue, defaultValue})

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
  ...DEAULT_CONFIG,

  // overrides
  overrides: [...langOverrides(LANG_CONFIG), ...overrides],
}
