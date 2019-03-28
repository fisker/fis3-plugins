const _ejs = _interopRequireDefault(require('ejs'))

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
  if (file.filename[0] === '_') {
    return content
  }

  const {filename} = conf

  const dirname = _path.default.dirname(filename)

  const data = _objectSpread(
    {
      require: makeRequireFunction(dirname),
      __dirname: dirname,
      __filename: filename,
    },
    conf.data
  )

  const {options} = conf
  options.root = PROJECT_ROOT
  options.filename = file.realpath
  options.cache = false
  content = _ejs.default.render(content, data, options)
  return content
}
