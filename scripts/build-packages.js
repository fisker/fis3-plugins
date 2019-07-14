import {join} from 'path'
import {template} from 'lodash'
import writePrettierFile from 'write-prettier-file'
import packages from './packages'
import readFile from './utils/read-file'

const SOURCE_DIR = join(__dirname, '..', 'src')

for (const package_ of packages.filter(
  ({info: {deprecated = false}}) => !deprecated
)) {
  package_.build()
}

const templateFile = readFile(join(SOURCE_DIR, 'templates', 'npm-status.ejs'))
const render = template(templateFile)

writePrettierFile(
  join(__dirname, '..', 'packages', 'readme.md'),
  render({packages}).trim()
)
