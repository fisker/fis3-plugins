import {dirname} from 'path'
import {writeFileSync} from 'fs'
import {sync as makeDirectory} from 'make-dir'

function writeFile(file, content) {
  makeDirectory(dirname(file))
  writeFileSync(file, content)
}

export default writeFile
