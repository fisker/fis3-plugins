const fs = require('fs')
const path = require('path')

const Package = require('./package.js')

const SOURCE_DIR = path.join(__dirname, '..', 'src')

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

const packages = pluginTypes.map(type => {
  let directory
  try {
    directory = fs.readdirSync(path.join(SOURCE_DIR, 'packages', type))
  } catch (error) {
    return []
  }

  return directory.map(name => new Package(type, name))
})

module.exports = packages.reduce((all, packages) => [...all, ...packages], [])
