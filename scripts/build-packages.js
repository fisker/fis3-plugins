const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const SOURCE_DIR = path.join(__dirname, '..', 'src')
const Package = require('./package.js')
const pluginTypes = [
  'lint',
  'hook',
  'optimizer',
  'preprocessor',
  'postprocessor',
  'server',
  'parser',
  'command',
]

const packages = []

pluginTypes.forEach(function(type) {
  let dir
  try {
    dir = fs.readdirSync(path.join(SOURCE_DIR, 'packages', type))
  } catch (error) {
    return
  }

  dir.forEach(function(name) {
    const pkg = new Package(type, name)
    pkg.build()
    packages.push(pkg.pkg)
  })
})
;(function(packages) {
  const template = fs.readFileSync(
    path.join(SOURCE_DIR, 'templates', 'npm-status.ejs'),
    'utf-8'
  )
  const render = _.template(template)
  fs.writeFileSync(
    path.join(__dirname, '..', 'packages', 'readme.md'),
    render({packages}).trim()
  )
})(packages)
