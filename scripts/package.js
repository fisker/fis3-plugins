import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import {sync as mkdirp} from 'mkdirp'
import sortPackageJson from 'sort-package-json'
import writePrettierFile from 'write-prettier-file'
import globalPackage from '../package.json'
import readFile from './utils/read-file'
import writeFile from './utils/write-file'
import bundle from './bundle'

const SOURCE_DIR = path.join(__dirname, '..', 'src')
const DEST_DIR = path.join(__dirname, '..', 'packages')
const VERSIONS = (() => {
  try {
    // eslint-disable-next-line import/no-unresolved
    return require('../versions.json')
  } catch {
    return {}
  }
})()

const files = ['index.js']
const links = {
  fis3: 'http://fis.baidu.com/',
}

const template = _.memoize((file) =>
  _.template(readFile(path.join(SOURCE_DIR, 'templates', file)))
)

function parseDependencies(pkgs) {
  const dependencies = {}
  for (const package_ of pkgs || []) {
    const packageArray = package_.split('@')
    let packageName
    let packageVersion
    if (packageArray[0] === '') {
      packageName = packageArray.slice(0, 2).join('@')
      packageVersion = packageArray[2]
    } else {
      packageName = packageArray[0]
      packageVersion = packageArray[1]
    }

    if (!packageVersion) {
      packageVersion = globalPackage.dependencies[packageName]
    }

    if (!packageVersion) {
      throw new Error(`dependency [${packageName}] is not in package.json.`)
    }

    dependencies[packageName] = packageVersion
  }

  return _.isEmpty(dependencies) ? undefined : dependencies
}

class Package {
  constructor(type, name) {
    const packageName = `fis3-${type}-${name}`

    this.src = path.join(SOURCE_DIR, 'packages', type, name)
    this.dest = path.join(DEST_DIR, packageName)

    this.type = type
    this.name = name
    this.info = require(path.join(this.src, 'info.js')).default
    try {
      _.assign(this.info, {
        name: packageName,
        readme: this.readFile('readme.md'),
        links: _.assign({}, links, this.info.links),
        options: this.info.options || {},
        keywords: this.info.keywords || [],
        files: this.info.files || [],
        dependencies: this.info.deprecated
          ? undefined
          : parseDependencies(this.info.dependencies),
        version: VERSIONS[packageName] && VERSIONS[packageName].version,
        // gitHead: VERSIONS[packageName].gitHead,
      })
    } catch (error) {
      throw new Error(`${packageName} build error: ${error}`)
    }

    this.pkg = this.getPackageInfo()
  }

  getPackageInfo() {
    const {info} = this

    const keywords = _.uniq([
      ...globalPackage.keywords,
      this.type,
      this.name,
      this.info.name,
      ...info.keywords,
    ])

    let {repository, funding} = globalPackage

    if (typeof repository === 'string') {
      if (repository.split('/').length === 2) {
        repository = `https://github.com/${repository}`
      }
      repository += `/tree/master/packages/${info.name}`
    } else {
      repository = {
        ...repository,
        url: `${repository.url}/tree/master/packages/${info.name}`,
      }
    }

    funding = funding.replace(
      '?sponsor=1',
      `/tree/master/packages/${info.name}?sponsor=1`
    )

    const package_ = _.assign(
      _.pick(globalPackage, [
        'main',
        'author',
        'license',
        'bugs',
        'publishConfig',
      ]),
      _.pick(info, ['name', 'description', 'dependencies']),
      {
        repository,
        funding,
        keywords: _.uniq(keywords).sort(),
        scripts: info.scripts,
        files: _.uniq([...files, ...info.files]).sort(),
      },
      _.pick(info, ['version', 'gitHead'])
    )
    return package_
  }

  async writeFile(file, content) {
    file = path.join(this.dest, file)
    if (/.(js|json|md)$/.test(file)) {
      writePrettierFile(file, content)
    } else {
      writeFile(file, content)
    }
  }

  readFile(file) {
    let content = ''

    try {
      content = readFile(path.join(this.src, file))
    } catch {}

    if (/\.md$/.test(file)) {
      content = content.replace('<!-- markdownlint-disable MD002 MD041 -->', '')
    }

    return content
  }

  async copyFile(sourceFile, distFile = sourceFile) {
    if (/\.js$/.test(distFile)) {
      return bundle(
        path.join(this.src, sourceFile),
        path.join(this.dest, distFile)
      )
    }

    distFile = path.join(this.dest, distFile)
    sourceFile = path.join(this.src, sourceFile)
    mkdirp(path.dirname(distFile))

    try {
      return fs.writeFileSync(distFile, fs.readFileSync(sourceFile))
    } catch {
      return false
    }
  }

  async build() {
    await Promise.all(
      ['index.js', ...this.info.files].map((file) => this.copyFile(file))
    )

    this.writeFile('readme.md', template('readme.ejs')(this))
    this.writeFile('license', readFile(path.join(__dirname, '..', 'license')))

    this.writeFile(
      'package.json',
      JSON.stringify(sortPackageJson(this.pkg), null, 2)
    )
  }
}

export default Package
