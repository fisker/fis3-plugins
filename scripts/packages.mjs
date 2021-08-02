import fs from 'node:fs'
import path from 'node:path'
import createEsmUtils from 'esm-utils'
import Package from './package.mjs'

const {dirname} = createEsmUtils(import.meta)
const SOURCE_DIR = path.join(dirname, '..', 'src')

const pluginTypes = [
  'lint',
  'hook',
  'optimizer',
  'preprocessor',
  'postprocessor',
  'server',
  'parser',
  'command',
]

const packages = pluginTypes.map((type) => {
  let directory
  try {
    directory = fs.readdirSync(path.join(SOURCE_DIR, 'packages', type))
  } catch {
    return []
  }

  return directory.map((name) => new Package(type, name))
})

export default packages.flat()
