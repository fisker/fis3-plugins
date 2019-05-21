import {join} from 'path'
import latestVersion from 'latest-version'
import pkgs from './packages'
import readFile from './utils/read-file'
import writeFile from './utils/write-file'

const versionsFile = join(__dirname, '..', 'versions.json')

for (const package_ of pkgs) {
  const {name} = package_.info
  const version = getVersion(name)

  if (version === '0.0.0') {
    latestVersion(name).then(
      version => updateVersion(name, version),
      () => updateVersion(name, version)
    )
  } else {
    updateVersion(name, version)
  }
}

function getVersion(name) {
  let content = '{}'
  try {
    content = readFile(join(__dirname, '..', 'packages', name, 'package.json'))
  } catch {}

  return JSON.parse(content.trim()).version
}

function updateVersion(name, version) {
  let content = '{}'
  try {
    content = readFile(versionsFile)
  } catch {}

  const versions = JSON.parse(content.trim())
  versions[name] = version

  writeFile(versionsFile, JSON.stringify(versions, null, 2))
}
