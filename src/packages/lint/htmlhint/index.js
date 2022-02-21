import fs from 'fs'
import path from 'path'
import process from 'process'
import {HTMLHint} from 'htmlhint'
import exportPlugin from '../../../shared/export-plugin.js'
import info from './info.js'

const {fis = {}} = global
const {log = console.log} = fis

function readConfig(filename) {
  let currentFolder = process.cwd()
  let currentFile = ''
  let parentFolder = ''

  do {
    currentFolder = parentFolder || currentFolder
    currentFile = path.join(currentFolder, filename)

    if (fs.existsSync(currentFile)) {
      try {
        return JSON.parse(fs.readFileSync(currentFile))
      } catch {
        return {}
      }
    }

    parentFolder = path.join(currentFolder, '..')
  } while (parentFolder !== currentFolder)

  return {}
}

let htmlhintrcConfig

function mainProcess(content, file, config) {
  if (!content) {
    return
  }

  let {rules} = config

  if (!rules) {
    if (!htmlhintrcConfig) {
      htmlhintrcConfig = readConfig('.htmlhintrc')
    }
    rules = htmlhintrcConfig
  }

  const results = HTMLHint.verify(content, rules)
  const errorType = results.some(({type}) => type === 'error')
    ? 'error'
    : 'warning'

  if (results.length !== 0) {
    log.warn(
      '[%s] lint failed with %s: \n\n %s',
      file.id,
      errorType,
      HTMLHint.format(results, {indent: 2}).join('\n'),
    )
    if (errorType === 'error') {
      process.exitCode = 1
      throw new Error('htmlhint error.')
    }
  }
}

module.exports = exportPlugin(mainProcess, info)
