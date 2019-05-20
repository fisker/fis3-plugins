import {join} from 'path'
import {template} from 'lodash'
import packages from './packages'
import prettierFile from './utils/prettier-file'
import readFile from './utils/read-file'

const SOURCE_DIR = join(__dirname, '..', 'src')

for (const package_ of packages.filter(
  ({info: {deprecated = false}}) => !deprecated
)) {
  package_.build()
}

const templateFile = readFile(join(SOURCE_DIR, 'templates', 'npm-status.ejs'))
const render = template(templateFile)

prettierFile({
  file: join(__dirname, '..', 'packages', 'readme.md'),
  content: render({packages}).trim(),
})
