/*
 * fis3-lint-htmlhint
 * fisker Cheung<lionkay@gmail.com>
 */

import {HTMLHint} from 'htmlhint'
import fs from 'fs'
import path from 'path'

const {log} = global.fis

function readConfig(filename) {
  let currentFolder = process.cwd()
  let currentFile = ''
  let parentFolder = ''

  do {
    currentFolder = parentFolder || currentFolder
    currentFile = path.normalize(path.join(currentFolder, filename))

    if (fs.existsSync(currentFile)) {
      try {
        return JSON.parse(fs.readFileSync(currentFile, 'utf8'))
      } catch (_) {
        return {}
      }
    }

    parentFolder = path.resolve(currentFolder, '../')
  } while (parentFolder !== currentFolder)

  return {}
}

let htmlhintrcConfig = {}

module.exports = function(content, file, conf) {
  if (!content) {
    return
  }

  const ruleset =
    conf.rules ||
    htmlhintrcConfig ||
    (htmlhintrcConfig = readConfig('.htmlhintrc'))

  const results = HTMLHint.verify(content, ruleset)
  let errorType = 'warning'

  results.forEach(function(msg) {
    if (msg.type === 'error') {
      errorType = 'error'
    }
  })

  if (results.length > 0) {
    log.warn(
      '[%s] lint failed with %s: \n\n %s',
      file.id,
      errorType,
      HTMLHint.format(results, {indent: 2}).join('\n')
    )
    if (errorType === 'error') {
      process.exit(1)
    }
  }
}
