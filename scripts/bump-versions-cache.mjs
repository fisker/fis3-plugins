import path from 'node:path'
import writePrettierFile from 'write-prettier-file'
import sortObjectKeys from 'sort-object-keys'
import createEsmUtils from 'esm-utils'
import packages from './packages.mjs'
import readFile from './utils/read-file.mjs'

const {dirname} = createEsmUtils(import.meta)
const versionsFile = path.join(dirname, '../versions.json')

;(async () => {
  for (const package_ of packages) {
    // eslint-disable-next-line no-await-in-loop
    const info = await package_.getInfo()
    const {name} = info
    const {version, gitHead} = getVersion(name)

    updateVersion(name, {version, gitHead})
  }
})()

function getVersion(name) {
  let content = '{}'
  try {
    content = readFile(path.join(dirname, `../packages/${name}/package.json`))
  } catch {}

  const {version = '0.0.0', gitHead = '0'.repeat(40)} = JSON.parse(
    content.trim(),
  )

  return {
    version,
    gitHead,
  }
}

function updateVersion(name, {version}) {
  let content = '{}'
  try {
    content = readFile(versionsFile)
  } catch {}

  const versions = JSON.parse(content.trim())
  versions[name] = {version}

  writePrettierFile.sync(versionsFile, JSON.stringify(sortObjectKeys(versions)))
}
