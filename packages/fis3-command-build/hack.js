'use strict'

var fs = require('fs')
var path = require('path')
var file = path.join(
  path.dirname(require.resolve('fis3-command-release')),
  'lib',
  'watch.js'
)

var source = fs.readFileSync(file, 'utf-8')
source = source.replace(' && safePathReg.test(path)', '')
fs.writeFileSync(file, source)
