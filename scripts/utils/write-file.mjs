import path from 'path'
import fs from 'fs'
import {sync as makeDirectory} from 'make-dir'

function writeFile(file, content) {
  makeDirectory(path.dirname(file))
  fs.writeFileSync(file, content)
}

export default writeFile
