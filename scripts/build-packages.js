import path from 'path'
import {template} from 'lodash'
import writePrettierFile from 'write-prettier-file'
import Listr from 'listr'
import packages from './packages'
import readFile from './utils/read-file'

const SOURCE_DIR = path.join(__dirname, '../src')

new Listr([
  ...packages.map((package_) => ({
    title: `building package ${package_.info.name}`,
    task: () => package_.build(),
    skip: () => package_.info.deprecated,
  })),
  {
    title: 'miscellaneous',
    task() {
      const templateFile = readFile(
        path.join(SOURCE_DIR, 'templates/npm-status.ejs')
      )
      const render = template(templateFile)

      return writePrettierFile(
        path.join(__dirname, '../packages/readme.md'),
        render({packages}).trim()
      )
    },
  },
])
  .run()
  .catch(() => process.exit(1))
