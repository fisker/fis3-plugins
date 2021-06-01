import path from 'node:path'
import fs from 'node:fs'
import {sync as makeDirectory} from 'make-dir'

function writeFile(file, content) {
  makeDirectory(path.dirname(file))
  fs.writeFileSync(file, content)
}

export default writeFile
