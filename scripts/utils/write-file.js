import {dirname} from 'path'
import {mkdirSync, writeFileSync} from 'fs'

function writeFile(file, content) {
  const directory = dirname(file)

  mkdirSync(directory, {
    recursive: true,
  })

  writeFileSync(file, content)
}

export default writeFile
