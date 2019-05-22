import {dirname} from 'path'
import {mkdirSync, writeFileSync} from 'fs'

function writeFile(file, content) {
  const directory = dirname(file)

  try {
    mkdirSync(directory, {
      recursive: true,
    })
  } catch (_) {}

  writeFileSync(file, content)
}

export default writeFile
