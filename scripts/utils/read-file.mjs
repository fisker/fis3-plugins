import {readFileSync} from 'fs'

function readFile(file) {
  return readFileSync(file, 'utf8')
}

export default readFile
