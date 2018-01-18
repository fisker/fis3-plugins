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

const readmeTemplate = _.template(`
## <%= pkg.name %>
[![npm](https://img.shields.io/npm/v/<%= pkg.name %>.svg?style=flat-square)](https://www.npmjs.com/package/<%= pkg.name %>)
[![npm](https://img.shields.io/npm/dt/<%= pkg.name %>.svg?style=flat-square)](https://www.npmjs.com/package/<%= pkg.name %>)
[![npm](https://img.shields.io/npm/dm/<%= pkg.name %>.svg?style=flat-square)](https://www.npmjs.com/package/<%= pkg.name %>)
`.trim())
let readmeText = '# status\n\n'

pluginTypes.forEach(function(type) {
  try {
    fs
      .readdirSync(path.join(SOURCE_DIR, 'packages', type))
      .forEach(function(name) {
        const pkg = new Package(type, name)
        pkg.build()
        readmeText += readmeTemplate(pkg) + '\n\n'
      })
  } catch (err) {}

  fs.writeFileSync(path.join(__dirname, '..', 'packages', 'README.md'), readmeText.trim())
})
