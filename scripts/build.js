const fs = require('fs')
const path = require('path')
const SOURCE_DIR = path.join(__dirname, '..', 'src')
const Package = require('./package.js')

fs.readdirSync(path.join(SOURCE_DIR, 'packages')).forEach(function(name) {
  new Package(name).build()
})
