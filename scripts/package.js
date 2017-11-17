const fs = require('fs')
const path = require('path')
const SOURCE_DIR = path.join(__dirname, '..', 'src')
const DEST_DIR = path.join(__dirname, '..', 'dist')
const globalPackage = require('../package.json')
const _ = require('lodash')
const mkdirp = require('mkdirp').sync
const prettier = require('prettier')
const prettierConfig = require('../prettier.config.js')
const stringify = require('json-stable-stringify')
const babel = require('babel-core')
const files = [
  'LICENSE',
  'README.md',
  'index.js',
  'package.json',
  'processor.js'
]
const links = {
  fis3: 'http://fis.baidu.com/'
}

const template = _.memoize(function(file) {
  file = path.join(SOURCE_DIR, 'templates', file)
  let source = fs.readFileSync(file, 'utf-8')
  return _.template(source)
})

class Package {
  constructor(name) {
    this.src = path.join(SOURCE_DIR, 'packages', name)
    this.info = require(path.join(this.src, 'info.js'))
    _.assign(this.info, {
      name: `fis3-${this.info.type}-${name}`,
      readme: this.readFile('README.md'),
      links: _.assign({}, links, this.info.links)
    })

    this.pkg = this.getPackageInfo()
    this.dest = path.join(DEST_DIR, this.pkg.name)
  }

  getPackageInfo() {
    const info = this.info

    const keywords = _.uniq(
      _.concat(globalPackage.keywords, [info.name], info.keywords)
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
        keywords: keywords,
        files: files
      }
    )
  }

  writeFile(file, content) {
    if (/\.js$/.test(file)) {
      content = prettier.format(content, prettierConfig)
    }
    fs.writeFileSync(path.join(this.dest, file), content)
  }

  readFile(file) {
    return fs.readFileSync(path.join(this.src, file), 'utf-8')
  }

  copyFile(srcFile, distFile = srcFile) {
    fs.writeFileSync(
      path.join(this.dest, distFile),
      fs.readFileSync(path.join(this.src, srcFile))
    )
  }

  build() {
    mkdirp(this.dest)
    this.writeFile('package.json', stringify(this.pkg, {space: 2}))

    let code = this.readFile('processor.js')
    this.writeFile(
      'processor.js',
      babel.transform(code, {
        presets: ['env']
      }).code
    )

    this.writeFile('index.js', template('index.tmpl')(this))
    this.writeFile('README.md', template('readme.tmpl')(this))
    this.copyFile('../../../LICENSE', 'LICENSE')
  }
}

module.exports = Package
