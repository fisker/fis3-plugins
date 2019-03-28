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
  let directory
  try {
    directory = fs.readdirSync(path.join(SOURCE_DIR, 'packages', type))
  } catch (error) {
    return
  }

  directory.forEach(function(name) {
    const package_ = new Package(type, name)
    package_.build()
    packages.push(package_.pkg)
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
