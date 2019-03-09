/*!
 * config file for `commitlint`
 *
 * update: wget https://git.io/fhAJV
 * document: https://git.io/fhAJa
 */

// conventional commits https://www.conventionalcommits.org/en/v1.0.0-beta.2/
const COMMITLINT_CONFIG_CONVENTIONAL = '@commitlint/config-conventional'

module.exports = {
  extends: [COMMITLINT_CONFIG_CONVENTIONAL],
}
