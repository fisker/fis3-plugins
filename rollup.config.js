import fs from 'fs'
import path from 'path'
import babel from 'rollup-plugin-babel'

const rollupPlugins = [babel()]
const pluginPrefix = 'fis3'
const sourceRoot = path.join(__dirname, 'src/packages')
const destinationRoot = path.join(__dirname, 'packages')

function readSource(sourceRoot) {
  const types = fs.readdirSync(sourceRoot)

  const plugins = types.reduce((all, type) => {
    const typeDirectory = path.join(sourceRoot, type)
    const plugins = fs.readdirSync(typeDirectory).map(name => {
      const pluginDirectory = path.join(typeDirectory, name)
      return {
        packageName: [pluginPrefix, type, name].join('-'),
        source: pluginDirectory,
        entry: path.join(pluginDirectory, 'index.js'),
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
    file: path.join(destinationRoot, packageName, 'index.js'),
    format: 'cjs',
  },
  plugins: rollupPlugins,
}))
