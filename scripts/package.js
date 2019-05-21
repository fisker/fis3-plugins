import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import {sync as mkdirp} from 'mkdirp'
import stringify from 'fast-json-stable-stringify'
import {transform} from '@babel/core'
import globalPackage from '../package.json'
import babelConfig from '../babel.config'
import writeFile from './utils/write-file'
import prettierFile from './utils/prettier-file'

const SOURCE_DIR = path.join(__dirname, '..', 'src')
const DEST_DIR = path.join(__dirname, '..', 'packages')
const CHARSET = 'utf-8'
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

const template = _.memoize(function(file) {
  file = path.join(SOURCE_DIR, 'templates', file)
  const source = fs.readFileSync(file, 'utf-8')
  return _.template(source)
})

function parseDependencies(pkgs) {
  const dependencies = {}
  _.forEach(pkgs || [], function(package_) {
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
  })

  return dependencies
}

class Package {
  constructor(type, name) {
    const packageName = `fis3-${type}-${name}`

    this.src = path.join(SOURCE_DIR, 'packages', type, name)
    this.dest = path.join(DEST_DIR, packageName)

    this.type = type
    this.name = name
    this.info = require(path.join(this.src, 'info.js'))
    try {
      _.assign(this.info, {
        name: packageName,
        readme: this.readFile('readme.md'),
        links: _.assign({}, links, this.info.links),
        options: this.info.options || {},
        keywords: this.info.keywords || [],
        files: this.info.files || [],
        dependencies: parseDependencies(this.info.dependencies),
        version: VERSIONS[packageName] || '0.0.0',
      })
    } catch (error) {
      throw new Error(`${packageName} build error: ${error}`)
    }

    this.pkg = this.getPackageInfo()
  }

  getPackageInfo() {
    const {info} = this

    const keywords = _.uniq(
      _.concat(
        globalPackage.keywords,
        [this.type, this.name, this.info.name],
        info.keywords
      )
    )

    let {repository} = globalPackage

    if (typeof repository === 'string') {
      repository += `/tree/master/packages/${info.name}`
    } else {
      repository = {
        ...repository,
        url: `${repository.url}/tree/master/packages/${info.name}`,
      }
    }

    const package_ = _.assign(
      _.pick(globalPackage, [
        'main',
        'author',
        'license',
        'bugs',
        'publishConfig',
      ]),
      _.pick(info, ['name', 'version', 'description', 'dependencies']),
      {
        repository,
        keywords: _.uniq(keywords.sort()),
        scripts: info.scripts,
        files: _.uniq(files.concat(info.files).sort()),
      }
    )
    return package_
  }

  writeFile(file, content) {
    file = path.join(this.dest, file)
    if (/\.js$/.test(file)) {
      content = transform(content, babelConfig).code
    }
    if (/.(js|json|md)$/.test(file)) {
      prettierFile({
        file,
        content,
      })
    } else {
      writeFile(file, content)
    }
  }

  readFile(file) {
    let content = ''

    try {
      content = fs.readFileSync(path.join(this.src, file), CHARSET)
    } catch {}

    if (/\.md$/.test(file)) {
      content = content.replace('<!-- markdownlint-disable MD002 MD041 -->', '')
    }

    return content
  }

  copyFile(sourceFile, distFile = sourceFile) {
    if (/\.js$/.test(distFile)) {
      return this.writeFile(distFile, this.readFile(sourceFile))
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

  build() {
    if (_.isEmpty(this.info.options)) {
      this.copyFile('index.js')
    } else {
      let code = this.readFile('index.js')
      code += '\n'
      code += `module.exports.defaultOptions = ${JSON.stringify(
        this.info.options,
        null,
        2
      )}`
      this.writeFile('index.js', code)
    }

    this.info.files.forEach(file => {
      this.copyFile(file)
    })
    this.writeFile('readme.md', template('readme.ejs')(this))

    // this.copyFile('../../../../license', 'license')

    this.writeFile(
      'package.json',
      stringify(this.pkg, {
        space: 2,
      })
    )
  }
}

export default Package
