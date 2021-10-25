import process from 'node:process'
import path from 'node:path'
import lodash from 'lodash'
import writePrettierFile from 'write-prettier-file'
import Listr from 'listr'
import createEsmUtils from 'esm-utils'
import packages from './packages.mjs'
import readFile from './utils/read-file.mjs'

const {dirname} = createEsmUtils(import.meta)
const SOURCE_DIR = path.join(dirname, '../src')

await Promise.all(packages.map((package_) => package_.getInfo()))
await new Listr([
  ...packages.map((package_) => ({
    title: `building package ${package_.info.name}`,
    task: () => package_.build(),
    skip: () => package_.info.deprecated,
  })),
  {
    title: 'miscellaneous',
    task() {
      const templateFile = readFile(
        path.join(SOURCE_DIR, 'templates/npm-status.ejs'),
      )
      const render = lodash.template(templateFile)

      return writePrettierFile(
        path.join(dirname, '../packages/readme.md'),
        render({packages}).trim(),
      )
    },
  },
]).run()
