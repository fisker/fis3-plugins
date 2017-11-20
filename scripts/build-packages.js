const fs = require('fs')
const path = require('path')
const SOURCE_DIR = path.join(__dirname, '..', 'src')
const Package = require('./package.js')
const pluginTypes = [
  'lint',
  'hook',
  'optimizer',
  'postprocessor',
  'server',
  'parser'
]

pluginTypes.forEach(function(type) {
  try {
    fs
      .readdirSync(path.join(SOURCE_DIR, 'packages', type))
      .forEach(function(name) {
        new Package(type, name).build()
      })
  } catch (err) {}
})
