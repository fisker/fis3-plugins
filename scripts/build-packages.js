const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const SOURCE_DIR = path.join(__dirname, '..', 'src')
const Package = require('./package.js')
const pluginTypes = [
  'lint',
  'hook',
  'optimizer',
  'postprocessor',
  'server',
  'parser',
  'command'
]

const packages = []

pluginTypes.forEach(function (type) {
  try {
    fs
      .readdirSync(path.join(SOURCE_DIR, 'packages', type))
      .forEach(function (name) {
        const pkg = new Package(type, name)
        pkg.build()
        packages.push(pkg.pkg)
      })
  } catch (err) {}
})

;(function (packages) {
  const template = fs.readFileSync(path.join(SOURCE_DIR, 'templates', 'npm-status.ejs'), 'utf-8')
  const render = _.template(template)
  fs.writeFileSync(path.join(__dirname, '..', 'packages', 'README.md'), render({packages: packages}).trim())
})(packages)
