import {join} from 'path'
import latestVersion from 'latest-version'
import stringify from 'fast-json-stable-stringify'
import writePrettierFile from 'write-prettier-file'
import pkgs from './packages'
import readFile from './utils/read-file'

const versionsFile = join(__dirname, '..', 'versions.json')

for (const package_ of pkgs) {
  const {name} = package_.info
  const version = getVersion(name)

  // if (version === '0.0.0') {
  latestVersion(name).then(
    version => updateVersion(name, version),
    () => updateVersion(name, version)
  )
  // } else {
  //   updateVersion(name, version)
  // }
}

function getVersion(name) {
  let content = '{}'
  try {
    content = readFile(join(__dirname, '..', 'packages', name, 'package.json'))
  } catch (_) {}

  return JSON.parse(content.trim()).version
}

function updateVersion(name, version) {
  let content = '{}'
  try {
    content = readFile(versionsFile)
  } catch (_) {}

  const versions = JSON.parse(content.trim())
  versions[name] = version

  writePrettierFile.sync(versionsFile, stringify(versions))
}
