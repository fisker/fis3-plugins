import {rollup} from 'rollup'
import babel from 'rollup-plugin-babel'
import cjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import prettier from 'rollup-plugin-prettier'
// eslint-disable-next-line import/no-unresolved
import json from '@rollup/plugin-json'

import {
  dependencies,
  devDependencies as developmentDependencies,
} from '../package.json'

const external = [
  ...Object.keys(dependencies),
  ...Object.keys(developmentDependencies),
]

const plugins = [
  cjs(),
  resolve({
    preferBuiltins: true,
  }),
  json(),
  babel(),
  prettier({
    parser: 'babel',
  }),
]

const ignoreImportModules = new Set([
  'path',
  'util',
  'fs',
  'url',
  'http',
  'os',
  'https',
  'assert',
  'stream',
  'tty',
])

function onwarn(warning) {
  const {code} = warning

  if (code === 'MIXED_EXPORTS' || code === 'INPUT_HOOK_IN_OUTPUT_PLUGIN') {
    return
  }

  if (
    code === 'CIRCULAR_DEPENDENCY' &&
    warning.importer.startsWith('node_modules')
  ) {
    return
  }

  if (
    code === 'UNRESOLVED_IMPORT' &&
    (warning.importer.startsWith('\0') ||
      ignoreImportModules.has(warning.source))
  ) {
    return
  }

  console.warn(warning.toString())
}

async function bundle(input, output) {
  const bundle = await rollup({
    external,
    input,
    plugins,
    onwarn,
  })

  await bundle.write({
    file: output,
    format: 'cjs',
    plugins,
  })
}

export default bundle
