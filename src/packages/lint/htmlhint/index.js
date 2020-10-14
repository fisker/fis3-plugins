/*
 * fis3-lint-htmlhint
 * fisker Cheung<lionkay@gmail.com>
 */

import {HTMLHint} from 'htmlhint'
import fs from 'fs'
import path from 'path'
import * as info from './info'
import exportPlugin from '../../../shared/export-plugin'

const {fis = {}} = global
const {log = console.log} = fis

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
      } catch {
        return {}
      }
    }

    parentFolder = path.resolve(currentFolder, '../')
  } while (parentFolder !== currentFolder)

  return {}
}

let htmlhintrcConfig

function process(content, file, config) {
  if (!content) {
    return
  }

  let {rules} = config

  if (!rules) {
    if (!htmlhintrcConfig) {
      htmlhintrcConfig = readConfig('.htmlhintrc') || {}
    }
    rules = htmlhintrcConfig
  }

  const results = HTMLHint.verify(content, rules)
  let errorType = 'warning'

  results.forEach(function (message) {
    if (message.type === 'error') {
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
      process.exitCode = 1
      throw new Error('htmlhint error.')
    }
  }
}

module.exports = exportPlugin(process, info)
