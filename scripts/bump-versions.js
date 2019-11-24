import {join} from 'path'
import writePrettierFile from 'write-prettier-file'
import pkgs from './packages'
import readFile from './utils/read-file'

const versionsFile = join(__dirname, '..', 'versions.json')

for (const package_ of pkgs) {
  const {name} = package_.info
  const {version, gitHead} = getVersion(name)

  updateVersion(name, {version, gitHead})
}

function getVersion(name) {
  let content = '{}'
  try {
    content = readFile(join(__dirname, '..', 'packages', name, 'package.json'))
  } catch {}

  const {
    version = '0.0.0',
    gitHead = '0000000000000000000000000000000000000000',
  } = JSON.parse(content.trim())

  return {
    version,
    gitHead,
  }
}

function updateVersion(name, {version, gitHead}) {
  let content = '{}'
  try {
    content = readFile(versionsFile)
  } catch {}

  const versions = JSON.parse(content.trim())
  versions[name] = {version, gitHead}

  writePrettierFile.sync(versionsFile, JSON.stringify(versions))
}
