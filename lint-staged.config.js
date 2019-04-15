/*!
 * config file for `lint-staged`
 *
 * update: wget -O lint-staged.config.js https://git.io/fhNpr
 * document: https://git.io/fhNpF
 *
 */

const CMD_PRETTIER = 'prettier --write'
// eslint-disable-next-line no-unused-vars
const CMD_ESLINT = 'eslint'
const CMD_ESLINT_FIX = 'eslint --fix'
const CMD_STYLELINT_FIX = 'stylelint --fix'
const CMD_MARKDOWNLINT = 'markdownlint'
const CMD_GIT_ADD = 'git add'

const config = {
  // markdown files
  // first prettier then lint
  'md,markdown': [CMD_PRETTIER, CMD_MARKDOWNLINT],

  // js files
  // eslint then prettier
  'js,jsx,mjs': [CMD_ESLINT_FIX],

  // vue files
  // eslint then prettier
  vue: [CMD_ESLINT_FIX, CMD_PRETTIER],

  // typescript files
  // tslint(eslint) then prettier
  // 'ts,tsx': [CMD_ESLINT_FIX, CMD_PRETTIER],

  // css files
  // prettier
  'scss,css,less': [CMD_STYLELINT_FIX],

  // html files
  // TODO: htmlhint
  // prettier
  'html,htm': CMD_PRETTIER,

  // json files
  // prettier
  json: CMD_PRETTIER,

  // json files
  // prettier
  json5: CMD_PRETTIER,

  // json files
  // prettier
  'yaml,yml': CMD_PRETTIER,

  // json files
  // prettier
  'gql,graphql': CMD_PRETTIER,
}

// export

function toArray(x) {
  x = Array.isArray(x) ? x : x.split(',')
  return x.map(s => s.trim())
}

function reduceByCommand(grouped, {exts, cmds}) {
  if (!grouped[cmds]) {
    grouped[cmds] = [cmds]
  }
  grouped[cmds] = grouped[cmds].concat(exts)

  return grouped
}

function groupByCommand(config) {
  return Object.keys(config)
    .map(key => ({
      exts: toArray(key),
      cmds: toArray(config[key]),
    }))
    .reduce(reduceByCommand, {})
}

function reduceByGlob(config, {exts, cmds}) {
  const glob = exts.length > 1 ? `*.{${exts}}` : `*.${exts}`

  config[glob] = (Array.isArray(cmds) ? cmds : [cmds]).concat([CMD_GIT_ADD])

  return config
}

function groupByGlob(grouped) {
  return Object.keys(grouped)
    .map(key => {
      const [cmds, ...extensions] = grouped[key]

      return {
        cmds,
        exts: extensions,
      }
    })
    .reduce(reduceByGlob, {})
}

function parseConfig(config) {
  const grouped = groupByCommand(config)
  const globed = groupByGlob(grouped)

  return globed
}

module.exports = parseConfig(config)
