import fs from 'fs'
import path from 'path'
import Package from './package'

const SOURCE_DIR = path.join(__dirname, '..', 'src')

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

export default packages.reduce((all, packages) => [...all, ...packages], [])
