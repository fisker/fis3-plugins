const execa = require('execa')
const latestVersion = require('latest-version')
const path = require('path')

const packages = require('./packages')

function npm(command, arguments_, options) {
  const {stdout} = execa.sync(
    'npm',
    [command, ...arguments_, '--registry=https://registry.npmjs.org/'],
    options
  )
  console.log(stdout)
}

function deprecate(package_, message) {
  const {name} = package_.info
  console.log(`[${name}] deprecate,\n message: ${message}`)
  return npm('deprecate', [name, JSON.stringify(message)])
}

async function publish(package_) {
  const {dest, info} = package_
  const {name, version} = info
  const publishedVersion = await latestVersion(name)

  if (publishedVersion !== version) {
    console.log(`[${name}] publishing, ${publishedVersion} -> ${version}`)
    return npm('publish', [], {
      cwd: dest,
    })
  }

  console.log(`[${name}] skip`)
}

;(async () => {
  for await (const package_ of packages) {
    const {deprecated = false} = package_.info

    if (deprecated) {
      deprecate(package_, deprecated)
    } else {
      publish(package_)
    }
  }
})()
