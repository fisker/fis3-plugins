import prettier from 'prettier'
import isUndefined from './is-undefined'
import readFile from './read-file'
import writeFile from './write-file'
import identity from './identity'

function prettierFile({
  file,
  content,
  options = {},
  write = true,
  process = identity,
}) {
  if (isUndefined(content)) {
    content = readFile(file)
  }

  options = {
    ...prettier.resolveConfig.sync(file),
    ...options,
  }

  content = process(content)
  content = prettier.format(content, options)

  if (write) {
    writeFile(file, content)
  }

  return content
}

export default prettierFile
