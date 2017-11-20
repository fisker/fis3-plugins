const fs = require('fs')
const path = require('path')
const SOURCE_DIR = path.join(__dirname, '..', 'src')
const DEST_DIR = path.join(__dirname, '..', 'packages')
const globalPackage = require('../package.json')
const _ = require('lodash')
const mkdirp = require('mkdirp').sync
const prettier = require('prettier')
const prettierConfig = require('../prettier.config.js')
const stringify = require('json-stable-stringify')
const babel = require('babel-core')
const files = ['LICENSE', 'README.md', 'index.js', 'package.json']
const links = {
  fis3: 'http://fis.baidu.com/'
}

const template = _.memoize(function(file) {
  file = path.join(SOURCE_DIR, 'templates', file)
  let source = fs.readFileSync(file, 'utf-8')
  return _.template(source)
})

class Package {
  constructor(type, name) {
    const packageName = `fis3-${type}-${name}`

    this.src = path.join(SOURCE_DIR, 'packages', type, name)
    this.dest = path.join(DEST_DIR, packageName)

    this.type = type
    this.name = name
    this.info = require(path.join(this.src, 'info.js'))
    _.assign(this.info, {
      name: packageName,
      readme: this.readFile('README.md'),
      links: _.assign({}, links, this.info.links),
      options: this.info.options || {},
      keywords: this.info.keywords || [],
      files: this.info.files || []
    })

    this.pkg = this.getPackageInfo()
  }

  getPackageInfo() {
    const info = this.info

    const keywords = _.uniq(
      _.concat(
        globalPackage.keywords,
        [this.type, this.name, this.info.name],
        info.keywords
      )
    )

    const repository = `${globalPackage.repository}/tree/master/packages/${
      info.name
    }`

    return _.assign(
      _.pick(globalPackage, [
        'main',
        'author',
        'license',
        'bugs',
        'readmeFilename'
      ]),
      _.pick(info, ['name', 'version', 'description', 'dependencies']),
      {
        repository: repository,
        keywords: _.uniq(keywords.sort()),
        files: _.uniq(files.concat(info.files).sort())
      }
    )
  }

  writeFile(file, content) {
    file = path.join(this.dest, file)
    mkdirp(path.dirname(file))
    if (/\.js$/.test(file)) {
      content = babel.transform(content, {
        presets: ['env']
      }).code
      content = prettier.format(content, prettierConfig)
    }
    try {
      return fs.writeFileSync(file, content)
    } catch (err) {
      return false
    }
  }

  readFile(file) {
    try {
      return fs.readFileSync(path.join(this.src, file), 'utf-8')
    } catch (err) {
      return ''
    }
  }

  copyFile(srcFile, distFile = srcFile) {
    if (/\.js$/.test(distFile)) {
      return this.writeFile(distFile, this.readFile(srcFile))
    }
    distFile = path.join(this.dest, distFile)
    srcFile = path.join(this.src, srcFile)
    mkdirp(path.dirname(distFile))

    try {
      return fs.writeFileSync(distFile, fs.readFileSync(srcFile))
    } catch (err) {
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

    this.writeFile('README.md', template('readme.tmpl')(this))
    this.copyFile('../../../../LICENSE', 'LICENSE')

    this.info.files.forEach(file => {
      this.copyFile(file)
    })

    this.writeFile('package.json', stringify(this.pkg, {space: 2}))
  }
}

module.exports = Package
