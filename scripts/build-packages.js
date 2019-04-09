const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const packages = require('./packages')

const SOURCE_DIR = path.join(__dirname, '..', 'src')

for (const package_ of packages) {
  package_.build()
}

const template = fs.readFileSync(
  path.join(SOURCE_DIR, 'templates', 'npm-status.ejs'),
  'utf-8'
)
const render = _.template(template)
fs.writeFileSync(
  path.join(__dirname, '..', 'packages', 'readme.md'),
  render({packages}).trim()
)
