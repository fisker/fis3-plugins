import fs from 'fs'
import path from 'path'
import babel from 'rollup-plugin-babel'

const rollupPlugins = [babel()]
const pluginPrefix = 'fis3'
const sourceRoot = path.join(__dirname, 'src/packages')
const destRoot = path.join(__dirname, 'packages')

function readSource(sourceRoot) {
  const types = fs.readdirSync(sourceRoot)

  const plugins = types.reduce((all, type) => {
    const typeDir = path.join(sourceRoot, type)
    const plugins = fs.readdirSync(typeDir).map(name => {
      const pluginDir = path.join(typeDir, name)
      return {
        packageName: [pluginPrefix, type, name].join('-'),
        source: pluginDir,
        entry: path.join(pluginDir, 'index.js'),
      }
    })

    return [...all, ...plugins]
  }, [])

  return plugins
}

const pkgs = readSource(sourceRoot)

export default pkgs.map(({packageName, source, entry}) => ({
  input: entry,
  output: {
    file: path.join(destRoot, packageName, 'index.js'),
    format: 'cjs',
  },
  treeshake: true,
  plugins: rollupPlugins,
}))
