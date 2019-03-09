/*!
 * config file for `husky`
 *
 * update: wget https://git.io/fhNpR
 * document: https://git.io/fhNph
 */

// hooks
const HOOK_COMMIT_MSG = 'commit-msg'
const HOOK_PRE_COMMIT = 'pre-commit'

// commands
const CMD_COMMITLINT = 'commitlint -E HUSKY_GIT_PARAMS'
const CMD_LINT_STAGED = 'lint-staged'

const hooks = {
  [HOOK_COMMIT_MSG]: [CMD_COMMITLINT],
  [HOOK_PRE_COMMIT]: [CMD_LINT_STAGED],
}

// export

const tasks = arr => arr.join(' && ')

function parseHooks(hooks) {
  const keys = Object.keys(hooks)
  for (const hook of keys) {
    const cmds = hooks[hook]

    if (Array.isArray(cmds)) {
      hooks[hook] = tasks(cmds)
    }
  }

  return hooks
}

module.exports = {
  hooks: parseHooks(hooks),
}
