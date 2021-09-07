import execa from 'execa'
import latestVersion from 'latest-version'
import packages from './packages.mjs'

function npm(command, arguments_, options) {
  const {stdout} = execa.sync(
    'npm',
    [command, ...arguments_, '--registry=https://registry.npmjs.org/'],
    options,
  )
  console.log(stdout)
}

function deprecate(package_, message) {
  const {name} = package_.info
  console.log(`[${name}] deprecate,\n message: ${message}`)
  return npm('deprecate', [name, JSON.stringify(message)])
}

async function publish(package_) {
  const {dest: destination, info} = package_
  const {name, version} = info
  const publishedVersion = await latestVersion(name)

  if (publishedVersion !== version) {
    console.log(`[${name}] publishing, ${publishedVersion} -> ${version}`)
    return npm('publish', [], {
      cwd: destination,
    })
  }

  console.log(`[${name}] skip`)
}

;(async () => {
  for (const package_ of packages) {
    // eslint-disable-next-line no-await-in-loop
    const info = await package_.getInfo()
    const {deprecated = false} = info

    if (deprecated) {
      deprecate(package_, deprecated)
    } else {
      publish(package_)
    }
  }
})()
