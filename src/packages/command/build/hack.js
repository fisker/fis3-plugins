const fs = require('fs')
const path = require('path')
const file = path.join(
  path.dirname(require.resolve('fis3-command-release')),
  'lib',
  'watch.js'
)

let source = fs.readFileSync(file, 'utf-8')
source = source.replace(' && safePathReg.test(path)', '')
fs.writeFileSync(file, source)
