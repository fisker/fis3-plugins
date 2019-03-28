const _lodash = _interopRequireDefault(require('lodash'))

const _path = _interopRequireDefault(require('path'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

function _objectSpread(target) {
  for (let i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}
    let ownKeys = Object.keys(source)
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable
        })
      )
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key])
    })
  }
  return target
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }
  return obj
}

const _global = global
const {fis} = _global
const PROJECT_ROOT = fis.project.getProjectPath()

const root = _path.default.normalize(PROJECT_ROOT)

const re = /^[.\\/]/i

function cleanRequireCache() {
  Object.keys(require.cache)
    .filter(function(id) {
      return _path.default.normalize(id).startsWith(root)
    })
    .forEach(function(id) {
      delete require.cache[id]
    })
}

function makeRequireFunction(context) {
  return function(mod) {
    cleanRequireCache()

    if (re.test(mod)) {
      mod = _path.default.resolve(context, mod)
    }

    return require(mod)
  }
}

module.exports = function(content, file, conf) {
  const {data} = conf
  const {options} = conf
  const {filename} = conf

  const dirname = _path.default.dirname(filename)

  options.imports = _objectSpread(
    {
      require: makeRequireFunction(dirname),
      __dirname: dirname,
      __filename: filename,
    },
    options.imports
  )

  const compiled = _lodash.default.template(content, options)

  content = compiled(data)
  return content
}

module.exports.lodash = _lodash.default
