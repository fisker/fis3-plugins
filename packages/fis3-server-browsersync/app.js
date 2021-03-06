'use strict'

var path$4 = require('path')
var browserSync = require('browser-sync')
var yargs = require('yargs')
var merge = require('lodash.merge')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var require$$1$2 = require('fs')
var require$$0 = require('url')
var require$$1 = require('util')
var require$$0$3 = require('http')
var require$$1$1 = require('https')
var require$$3 = require('stream')
var require$$4 = require('assert')
var require$$0$2 = require('tty')
var require$$0$1 = require('os')
var serveDirectory = require('serve-directory')
var serveDirectoryThemeOcticons = require('serve-directory-theme-octicons')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {default: e}
}

var path__default = /*#__PURE__*/ _interopDefaultLegacy(path$4)
var browserSync__default = /*#__PURE__*/ _interopDefaultLegacy(browserSync)
var yargs__default = /*#__PURE__*/ _interopDefaultLegacy(yargs)
var merge__default = /*#__PURE__*/ _interopDefaultLegacy(merge)
var morgan__default = /*#__PURE__*/ _interopDefaultLegacy(morgan)
var bodyParser__default = /*#__PURE__*/ _interopDefaultLegacy(bodyParser)
var require$$1__default$2 = /*#__PURE__*/ _interopDefaultLegacy(require$$1$2)
var require$$0__default = /*#__PURE__*/ _interopDefaultLegacy(require$$0)
var require$$1__default = /*#__PURE__*/ _interopDefaultLegacy(require$$1)
var require$$0__default$3 = /*#__PURE__*/ _interopDefaultLegacy(require$$0$3)
var require$$1__default$1 = /*#__PURE__*/ _interopDefaultLegacy(require$$1$1)
var require$$3__default = /*#__PURE__*/ _interopDefaultLegacy(require$$3)
var require$$4__default = /*#__PURE__*/ _interopDefaultLegacy(require$$4)
var require$$0__default$2 = /*#__PURE__*/ _interopDefaultLegacy(require$$0$2)
var require$$0__default$1 = /*#__PURE__*/ _interopDefaultLegacy(require$$0$1)
var serveDirectory__default =
  /*#__PURE__*/ _interopDefaultLegacy(serveDirectory)
var serveDirectoryThemeOcticons__default = /*#__PURE__*/ _interopDefaultLegacy(
  serveDirectoryThemeOcticons
)

var commonjsGlobal =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : typeof self !== 'undefined'
    ? self
    : {}

function commonjsRequire(path) {
  throw new Error(
    'Could not dynamically require "' +
      path +
      '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.'
  )
}

var check = function (it) {
  return it && it.Math == Math && it
} // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028

var global$d = // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  (function () {
    return this
  })() ||
  Function('return this')()

var objectGetOwnPropertyDescriptor = {}

var fails$9 = function (exec) {
  try {
    return !!exec()
  } catch (error) {
    return true
  }
}

var fails$8 = fails$9 // Detect IE8's incomplete defineProperty implementation

var descriptors = !fails$8(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return (
    Object.defineProperty({}, 1, {
      get: function () {
        return 7
      },
    })[1] != 7
  )
})

var objectPropertyIsEnumerable = {}

var $propertyIsEnumerable = {}.propertyIsEnumerable // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor // Nashorn ~ JDK8 bug

var NASHORN_BUG =
  getOwnPropertyDescriptor$1 &&
  !$propertyIsEnumerable.call(
    {
      1: 2,
    },
    1
  ) // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

objectPropertyIsEnumerable.f = NASHORN_BUG
  ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor$1(this, V)
      return !!descriptor && descriptor.enumerable
    }
  : $propertyIsEnumerable

var createPropertyDescriptor$3 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value,
  }
}

var toString$1 = {}.toString

var classofRaw$1 = function (it) {
  return toString$1.call(it).slice(8, -1)
}

var fails$7 = fails$9
var classof$5 = classofRaw$1
var split = ''.split // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails$7(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0)
})
  ? function (it) {
      return classof$5(it) == 'String' ? split.call(it, '') : Object(it)
    }
  : Object

// https://tc39.es/ecma262/#sec-requireobjectcoercible

var requireObjectCoercible$4 = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it)
  return it
}

var IndexedObject$2 = indexedObject
var requireObjectCoercible$3 = requireObjectCoercible$4

var toIndexedObject$5 = function (it) {
  return IndexedObject$2(requireObjectCoercible$3(it))
}

var isObject$5 = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function'
}

var isObject$4 = isObject$5 // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string

var toPrimitive$3 = function (input, PREFERRED_STRING) {
  if (!isObject$4(input)) return input
  var fn, val
  if (
    PREFERRED_STRING &&
    typeof (fn = input.toString) == 'function' &&
    !isObject$4((val = fn.call(input)))
  )
    return val
  if (
    typeof (fn = input.valueOf) == 'function' &&
    !isObject$4((val = fn.call(input)))
  )
    return val
  if (
    !PREFERRED_STRING &&
    typeof (fn = input.toString) == 'function' &&
    !isObject$4((val = fn.call(input)))
  )
    return val
  throw TypeError("Can't convert object to primitive value")
}

var requireObjectCoercible$2 = requireObjectCoercible$4 // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

var toObject$3 = function (argument) {
  return Object(requireObjectCoercible$2(argument))
}

var toObject$2 = toObject$3
var hasOwnProperty = {}.hasOwnProperty

var has$6 =
  Object.hasOwn ||
  function hasOwn(it, key) {
    return hasOwnProperty.call(toObject$2(it), key)
  }

var global$c = global$d
var isObject$3 = isObject$5
var document$1 = global$c.document // typeof document.createElement is 'object' in old IE

var EXISTS = isObject$3(document$1) && isObject$3(document$1.createElement)

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {}
}

var DESCRIPTORS$3 = descriptors
var fails$6 = fails$9
var createElement = documentCreateElement // Thank's IE8 for his funny defineProperty

var ie8DomDefine =
  !DESCRIPTORS$3 &&
  !fails$6(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return (
      Object.defineProperty(createElement('div'), 'a', {
        get: function () {
          return 7
        },
      }).a != 7
    )
  })

var DESCRIPTORS$2 = descriptors
var propertyIsEnumerableModule = objectPropertyIsEnumerable
var createPropertyDescriptor$2 = createPropertyDescriptor$3
var toIndexedObject$4 = toIndexedObject$5
var toPrimitive$2 = toPrimitive$3
var has$5 = has$6
var IE8_DOM_DEFINE$1 = ie8DomDefine // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

objectGetOwnPropertyDescriptor.f = DESCRIPTORS$2
  ? $getOwnPropertyDescriptor
  : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject$4(O)
      P = toPrimitive$2(P, true)
      if (IE8_DOM_DEFINE$1)
        try {
          return $getOwnPropertyDescriptor(O, P)
        } catch (error) {
          /* empty */
        }
      if (has$5(O, P))
        return createPropertyDescriptor$2(
          !propertyIsEnumerableModule.f.call(O, P),
          O[P]
        )
    }

var objectDefineProperty = {}

var isObject$2 = isObject$5

var anObject$4 = function (it) {
  if (!isObject$2(it)) {
    throw TypeError(String(it) + ' is not an object')
  }

  return it
}

var DESCRIPTORS$1 = descriptors
var IE8_DOM_DEFINE = ie8DomDefine
var anObject$3 = anObject$4
var toPrimitive$1 = toPrimitive$3 // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

objectDefineProperty.f = DESCRIPTORS$1
  ? $defineProperty
  : function defineProperty(O, P, Attributes) {
      anObject$3(O)
      P = toPrimitive$1(P, true)
      anObject$3(Attributes)
      if (IE8_DOM_DEFINE)
        try {
          return $defineProperty(O, P, Attributes)
        } catch (error) {
          /* empty */
        }
      if ('get' in Attributes || 'set' in Attributes)
        throw TypeError('Accessors not supported')
      if ('value' in Attributes) O[P] = Attributes.value
      return O
    }

var DESCRIPTORS = descriptors
var definePropertyModule$2 = objectDefineProperty
var createPropertyDescriptor$1 = createPropertyDescriptor$3
var createNonEnumerableProperty$5 = DESCRIPTORS
  ? function (object, key, value) {
      return definePropertyModule$2.f(
        object,
        key,
        createPropertyDescriptor$1(1, value)
      )
    }
  : function (object, key, value) {
      object[key] = value
      return object
    }

var redefine$3 = {exports: {}}

var global$b = global$d
var createNonEnumerableProperty$4 = createNonEnumerableProperty$5

var setGlobal$3 = function (key, value) {
  try {
    createNonEnumerableProperty$4(global$b, key, value)
  } catch (error) {
    global$b[key] = value
  }

  return value
}

var global$a = global$d
var setGlobal$2 = setGlobal$3
var SHARED = '__core-js_shared__'
var store$3 = global$a[SHARED] || setGlobal$2(SHARED, {})
var sharedStore = store$3

var store$2 = sharedStore
var functionToString = Function.toString // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (typeof store$2.inspectSource != 'function') {
  store$2.inspectSource = function (it) {
    return functionToString.call(it)
  }
}

var inspectSource$2 = store$2.inspectSource

var global$9 = global$d
var inspectSource$1 = inspectSource$2
var WeakMap$1 = global$9.WeakMap
var nativeWeakMap =
  typeof WeakMap$1 === 'function' &&
  /native code/.test(inspectSource$1(WeakMap$1))

var shared$4 = {exports: {}}

var store$1 = sharedStore
;(shared$4.exports = function (key, value) {
  return store$1[key] || (store$1[key] = value !== undefined ? value : {})
})('versions', []).push({
  version: '3.13.1',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)',
})

var id = 0
var postfix = Math.random()

var uid$2 = function (key) {
  return (
    'Symbol(' +
    String(key === undefined ? '' : key) +
    ')_' +
    (++id + postfix).toString(36)
  )
}

var shared$3 = shared$4.exports
var uid$1 = uid$2
var keys = shared$3('keys')

var sharedKey$1 = function (key) {
  return keys[key] || (keys[key] = uid$1(key))
}

var hiddenKeys$3 = {}

var NATIVE_WEAK_MAP = nativeWeakMap
var global$8 = global$d
var isObject$1 = isObject$5
var createNonEnumerableProperty$3 = createNonEnumerableProperty$5
var objectHas = has$6
var shared$2 = sharedStore
var sharedKey = sharedKey$1
var hiddenKeys$2 = hiddenKeys$3
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized'
var WeakMap = global$8.WeakMap
var set, get, has$4

var enforce = function (it) {
  return has$4(it) ? get(it) : set(it, {})
}

var getterFor = function (TYPE) {
  return function (it) {
    var state

    if (!isObject$1(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required')
    }

    return state
  }
}

if (NATIVE_WEAK_MAP || shared$2.state) {
  var store = shared$2.state || (shared$2.state = new WeakMap())
  var wmget = store.get
  var wmhas = store.has
  var wmset = store.set

  set = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED)
    metadata.facade = it
    wmset.call(store, it, metadata)
    return metadata
  }

  get = function (it) {
    return wmget.call(store, it) || {}
  }

  has$4 = function (it) {
    return wmhas.call(store, it)
  }
} else {
  var STATE = sharedKey('state')
  hiddenKeys$2[STATE] = true

  set = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED)
    metadata.facade = it
    createNonEnumerableProperty$3(it, STATE, metadata)
    return metadata
  }

  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {}
  }

  has$4 = function (it) {
    return objectHas(it, STATE)
  }
}

var internalState = {
  set: set,
  get: get,
  has: has$4,
  enforce: enforce,
  getterFor: getterFor,
}

var global$7 = global$d
var createNonEnumerableProperty$2 = createNonEnumerableProperty$5
var has$3 = has$6
var setGlobal$1 = setGlobal$3
var inspectSource = inspectSource$2
var InternalStateModule = internalState
var getInternalState = InternalStateModule.get
var enforceInternalState = InternalStateModule.enforce
var TEMPLATE = String(String).split('String')
;(redefine$3.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false
  var simple = options ? !!options.enumerable : false
  var noTargetGet = options ? !!options.noTargetGet : false
  var state

  if (typeof value == 'function') {
    if (typeof key == 'string' && !has$3(value, 'name')) {
      createNonEnumerableProperty$2(value, 'name', key)
    }

    state = enforceInternalState(value)

    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '')
    }
  }

  if (O === global$7) {
    if (simple) O[key] = value
    else setGlobal$1(key, value)
    return
  } else if (!unsafe) {
    delete O[key]
  } else if (!noTargetGet && O[key]) {
    simple = true
  }

  if (simple) O[key] = value
  else createNonEnumerableProperty$2(O, key, value) // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return (
    (typeof this == 'function' && getInternalState(this).source) ||
    inspectSource(this)
  )
})

var global$6 = global$d
var path$3 = global$6

var path$2 = path$3
var global$5 = global$d

var aFunction$2 = function (variable) {
  return typeof variable == 'function' ? variable : undefined
}

var getBuiltIn$2 = function (namespace, method) {
  return arguments.length < 2
    ? aFunction$2(path$2[namespace]) || aFunction$2(global$5[namespace])
    : (path$2[namespace] && path$2[namespace][method]) ||
        (global$5[namespace] && global$5[namespace][method])
}

var objectGetOwnPropertyNames = {}

var ceil = Math.ceil
var floor$1 = Math.floor // `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger

var toInteger$4 = function (argument) {
  return isNaN((argument = +argument))
    ? 0
    : (argument > 0 ? floor$1 : ceil)(argument)
}

var toInteger$3 = toInteger$4
var min$2 = Math.min // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

var toLength$4 = function (argument) {
  return argument > 0 ? min$2(toInteger$3(argument), 0x1fffffffffffff) : 0 // 2 ** 53 - 1 == 9007199254740991
}

var toInteger$2 = toInteger$4
var max$2 = Math.max
var min$1 = Math.min // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex$2 = function (index, length) {
  var integer = toInteger$2(index)
  return integer < 0 ? max$2(integer + length, 0) : min$1(integer, length)
}

var toIndexedObject$3 = toIndexedObject$5
var toLength$3 = toLength$4
var toAbsoluteIndex$1 = toAbsoluteIndex$2 // `Array.prototype.{ indexOf, includes }` methods implementation

var createMethod$2 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$3($this)
    var length = toLength$3(O.length)
    var index = toAbsoluteIndex$1(fromIndex, length)
    var value // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check

    if (IS_INCLUDES && el != el)
      while (length > index) {
        value = O[index++] // eslint-disable-next-line no-self-compare -- NaN check

        if (value != value) return true // Array#indexOf ignores holes, Array#includes - not
      }
    else
      for (; length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el)
          return IS_INCLUDES || index || 0
      }
    return !IS_INCLUDES && -1
  }
}

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$2(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$2(false),
}

var has$2 = has$6
var toIndexedObject$2 = toIndexedObject$5
var indexOf = arrayIncludes.indexOf
var hiddenKeys$1 = hiddenKeys$3

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$2(object)
  var i = 0
  var result = []
  var key

  for (key in O) !has$2(hiddenKeys$1, key) && has$2(O, key) && result.push(key) // Don't enum bug & hidden keys

  while (names.length > i)
    if (has$2(O, (key = names[i++]))) {
      ~indexOf(result, key) || result.push(key)
    }

  return result
}

var enumBugKeys$1 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf',
]

var internalObjectKeys = objectKeysInternal
var enumBugKeys = enumBugKeys$1
var hiddenKeys = enumBugKeys.concat('length', 'prototype') // `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe

objectGetOwnPropertyNames.f =
  Object.getOwnPropertyNames ||
  function getOwnPropertyNames(O) {
    return internalObjectKeys(O, hiddenKeys)
  }

var objectGetOwnPropertySymbols = {}

objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols

var getBuiltIn$1 = getBuiltIn$2
var getOwnPropertyNamesModule = objectGetOwnPropertyNames
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols
var anObject$2 = anObject$4 // all object keys, includes non-enumerable and symbols

var ownKeys$1 =
  getBuiltIn$1('Reflect', 'ownKeys') ||
  function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$2(it))
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys
  }

var has$1 = has$6
var ownKeys = ownKeys$1
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor
var definePropertyModule$1 = objectDefineProperty

var copyConstructorProperties$1 = function (target, source) {
  var keys = ownKeys(source)
  var defineProperty = definePropertyModule$1.f
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    if (!has$1(target, key))
      defineProperty(target, key, getOwnPropertyDescriptor(source, key))
  }
}

var fails$5 = fails$9
var replacement = /#|\.prototype\./

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)]
  return value == POLYFILL
    ? true
    : value == NATIVE
    ? false
    : typeof detection == 'function'
    ? fails$5(detection)
    : !!detection
}

var normalize = (isForced$1.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase()
})

var data = (isForced$1.data = {})
var NATIVE = (isForced$1.NATIVE = 'N')
var POLYFILL = (isForced$1.POLYFILL = 'P')
var isForced_1 = isForced$1

var global$4 = global$d
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f
var createNonEnumerableProperty$1 = createNonEnumerableProperty$5
var redefine$2 = redefine$3.exports
var setGlobal = setGlobal$3
var copyConstructorProperties = copyConstructorProperties$1
var isForced = isForced_1
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/

var _export = function (options, source) {
  var TARGET = options.target
  var GLOBAL = options.global
  var STATIC = options.stat
  var FORCED, target, key, targetProperty, sourceProperty, descriptor

  if (GLOBAL) {
    target = global$4
  } else if (STATIC) {
    target = global$4[TARGET] || setGlobal(TARGET, {})
  } else {
    target = (global$4[TARGET] || {}).prototype
  }

  if (target)
    for (key in source) {
      sourceProperty = source[key]

      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor(target, key)
        targetProperty = descriptor && descriptor.value
      } else targetProperty = target[key]

      FORCED = isForced(
        GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key,
        options.forced
      ) // contained in target

      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue
        copyConstructorProperties(sourceProperty, targetProperty)
      } // add a flag to not completely full polyfills

      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$1(sourceProperty, 'sham', true)
      } // extend global

      redefine$2(target, key, sourceProperty, options)
    }
}

var anObject$1 = anObject$4 // `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags

var regexpFlags$1 = function () {
  var that = anObject$1(this)
  var result = ''
  if (that.global) result += 'g'
  if (that.ignoreCase) result += 'i'
  if (that.multiline) result += 'm'
  if (that.dotAll) result += 's'
  if (that.unicode) result += 'u'
  if (that.sticky) result += 'y'
  return result
}

var regexpStickyHelpers = {}

var fails$4 = fails$9 // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.

function RE(s, f) {
  return RegExp(s, f)
}

regexpStickyHelpers.UNSUPPORTED_Y = fails$4(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y')
  re.lastIndex = 2
  return re.exec('abcd') != null
})
regexpStickyHelpers.BROKEN_CARET = fails$4(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy')
  re.lastIndex = 2
  return re.exec('str') != null
})

/* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */

/* eslint-disable regexp/no-useless-quantifier -- testing */

var regexpFlags = regexpFlags$1
var stickyHelpers = regexpStickyHelpers
var shared$1 = shared$4.exports
var nativeExec = RegExp.prototype.exec
var nativeReplace = shared$1('native-string-replace', String.prototype.replace)
var patchedExec = nativeExec

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/
  var re2 = /b*/g
  nativeExec.call(re1, 'a')
  nativeExec.call(re2, 'a')
  return re1.lastIndex !== 0 || re2.lastIndex !== 0
})()

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET // nonparticipating capturing group, copied from es5-shim's String#split patch.

var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined
var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this
    var lastIndex, reCopy, match, i
    var sticky = UNSUPPORTED_Y && re.sticky
    var flags = regexpFlags.call(re)
    var source = re.source
    var charsAdded = 0
    var strCopy = str

    if (sticky) {
      flags = flags.replace('y', '')

      if (flags.indexOf('g') === -1) {
        flags += 'g'
      }

      strCopy = String(str).slice(re.lastIndex) // Support anchored sticky behavior.

      if (
        re.lastIndex > 0 &&
        (!re.multiline || (re.multiline && str[re.lastIndex - 1] !== '\n'))
      ) {
        source = '(?: ' + source + ')'
        strCopy = ' ' + strCopy
        charsAdded++
      } // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.

      reCopy = new RegExp('^(?:' + source + ')', flags)
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags)
    }

    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex
    match = nativeExec.call(sticky ? reCopy : re, strCopy)

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded)
        match[0] = match[0].slice(charsAdded)
        match.index = re.lastIndex
        re.lastIndex += match[0].length
      } else re.lastIndex = 0
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex
    }

    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined
        }
      })
    }

    return match
  }
}

var regexpExec$2 = patchedExec

var $$3 = _export
var exec = regexpExec$2 // `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec

$$3(
  {
    target: 'RegExp',
    proto: true,
    forced: /./.exec !== exec,
  },
  {
    exec: exec,
  }
)

var getBuiltIn = getBuiltIn$2
var engineUserAgent = getBuiltIn('navigator', 'userAgent') || ''

var global$3 = global$d
var userAgent = engineUserAgent
var process$1 = global$3.process
var versions = process$1 && process$1.versions
var v8 = versions && versions.v8
var match, version

if (v8) {
  match = v8.split('.')
  version = match[0] < 4 ? 1 : match[0] + match[1]
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/)

  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/)
    if (match) version = match[1]
  }
}

var engineV8Version = version && +version

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION$1 = engineV8Version
var fails$3 = fails$9 // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

var nativeSymbol =
  !!Object.getOwnPropertySymbols &&
  !fails$3(function () {
    var symbol = Symbol() // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

    return (
      !String(symbol) ||
      !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      (!Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41)
    )
  })

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL$1 = nativeSymbol
var useSymbolAsUid =
  NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == 'symbol'

var global$2 = global$d
var shared = shared$4.exports
var has = has$6
var uid = uid$2
var NATIVE_SYMBOL = nativeSymbol
var USE_SYMBOL_AS_UID = useSymbolAsUid
var WellKnownSymbolsStore = shared('wks')
var Symbol$1 = global$2.Symbol
var createWellKnownSymbol = USE_SYMBOL_AS_UID
  ? Symbol$1
  : (Symbol$1 && Symbol$1.withoutSetter) || uid

var wellKnownSymbol$5 = function (name) {
  if (
    !has(WellKnownSymbolsStore, name) ||
    !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')
  ) {
    if (NATIVE_SYMBOL && has(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name]
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name)
    }
  }

  return WellKnownSymbolsStore[name]
}

var redefine$1 = redefine$3.exports
var regexpExec$1 = regexpExec$2
var fails$2 = fails$9
var wellKnownSymbol$4 = wellKnownSymbol$5
var createNonEnumerableProperty = createNonEnumerableProperty$5
var SPECIES$2 = wellKnownSymbol$4('species')
var RegExpPrototype = RegExp.prototype
var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$2(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./

  re.exec = function () {
    var result = []
    result.groups = {
      a: '7',
    }
    return result
  }

  return ''.replace(re, '$<a>') !== '7'
}) // IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0

var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0'
})()

var REPLACE = wellKnownSymbol$4('replace') // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string

var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === ''
  }

  return false
})() // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$2(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/
  var originalExec = re.exec

  re.exec = function () {
    return originalExec.apply(this, arguments)
  }

  var result = 'ab'.split(re)
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b'
})

var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol$4(KEY)
  var DELEGATES_TO_SYMBOL = !fails$2(function () {
    // String methods call symbol-named RegEp methods
    var O = {}

    O[SYMBOL] = function () {
      return 7
    }

    return ''[KEY](O) != 7
  })
  var DELEGATES_TO_EXEC =
    DELEGATES_TO_SYMBOL &&
    !fails$2(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false
      var re = /a/

      if (KEY === 'split') {
        // We can't use real regex here since it causes deoptimization
        // and serious performance degradation in V8
        // https://github.com/zloirock/core-js/issues/306
        re = {} // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.

        re.constructor = {}

        re.constructor[SPECIES$2] = function () {
          return re
        }

        re.flags = ''
        re[SYMBOL] = /./[SYMBOL]
      }

      re.exec = function () {
        execCalled = true
        return null
      }

      re[SYMBOL]('')
      return !execCalled
    })

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' &&
      !(
        REPLACE_SUPPORTS_NAMED_GROUPS &&
        REPLACE_KEEPS_$0 &&
        !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
      )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL]
    var methods = exec(
      SYMBOL,
      ''[KEY],
      function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var $exec = regexp.exec

        if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return {
              done: true,
              value: nativeRegExpMethod.call(regexp, str, arg2),
            }
          }

          return {
            done: true,
            value: nativeMethod.call(str, regexp, arg2),
          }
        }

        return {
          done: false,
        }
      },
      {
        REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
        REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:
          REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,
      }
    )
    var stringMethod = methods[0]
    var regexMethod = methods[1]
    redefine$1(String.prototype, KEY, stringMethod)
    redefine$1(
      RegExpPrototype,
      SYMBOL,
      length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
        ? // 21.2.5.11 RegExp.prototype[@@split](string, limit)
          function (string, arg) {
            return regexMethod.call(string, this, arg)
          } // 21.2.5.6 RegExp.prototype[@@match](string)
        : // 21.2.5.9 RegExp.prototype[@@search](string)
          function (string) {
            return regexMethod.call(string, this)
          }
    )
  }

  if (sham) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true)
}

var toInteger$1 = toInteger$4
var requireObjectCoercible$1 = requireObjectCoercible$4 // `String.prototype.{ codePointAt, at }` methods implementation

var createMethod$1 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible$1($this))
    var position = toInteger$1(pos)
    var size = S.length
    var first, second
    if (position < 0 || position >= size)
      return CONVERT_TO_STRING ? '' : undefined
    first = S.charCodeAt(position)
    return first < 0xd800 ||
      first > 0xdbff ||
      position + 1 === size ||
      (second = S.charCodeAt(position + 1)) < 0xdc00 ||
      second > 0xdfff
      ? CONVERT_TO_STRING
        ? S.charAt(position)
        : first
      : CONVERT_TO_STRING
      ? S.slice(position, position + 2)
      : ((first - 0xd800) << 10) + (second - 0xdc00) + 0x10000
  }
}

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$1(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$1(true),
}

var charAt = stringMultibyte.charAt // `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex

var advanceStringIndex$1 = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1)
}

var toObject$1 = toObject$3
var floor = Math.floor
var replace = ''.replace
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g // `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution

var getSubstitution$1 = function (
  matched,
  str,
  position,
  captures,
  namedCaptures,
  replacement
) {
  var tailPos = position + matched.length
  var m = captures.length
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED

  if (namedCaptures !== undefined) {
    namedCaptures = toObject$1(namedCaptures)
    symbols = SUBSTITUTION_SYMBOLS
  }

  return replace.call(replacement, symbols, function (match, ch) {
    var capture

    switch (ch.charAt(0)) {
      case '$':
        return '$'

      case '&':
        return matched

      case '`':
        return str.slice(0, position)

      case "'":
        return str.slice(tailPos)

      case '<':
        capture = namedCaptures[ch.slice(1, -1)]
        break

      default:
        // \d\d?
        var n = +ch
        if (n === 0) return match

        if (n > m) {
          var f = floor(n / 10)
          if (f === 0) return match
          if (f <= m)
            return captures[f - 1] === undefined
              ? ch.charAt(1)
              : captures[f - 1] + ch.charAt(1)
          return match
        }

        capture = captures[n - 1]
    }

    return capture === undefined ? '' : capture
  })
}

var classof$4 = classofRaw$1
var regexpExec = regexpExec$2 // `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec

var regexpExecAbstract = function (R, S) {
  var exec = R.exec

  if (typeof exec === 'function') {
    var result = exec.call(R, S)

    if (typeof result !== 'object') {
      throw TypeError(
        'RegExp exec method returned something other than an Object or null'
      )
    }

    return result
  }

  if (classof$4(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver')
  }

  return regexpExec.call(R, S)
}

var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic
var anObject = anObject$4
var toLength$2 = toLength$4
var toInteger = toInteger$4
var requireObjectCoercible = requireObjectCoercible$4
var advanceStringIndex = advanceStringIndex$1
var getSubstitution = getSubstitution$1
var regExpExec = regexpExecAbstract
var max$1 = Math.max
var min = Math.min

var maybeToString = function (it) {
  return it === undefined ? it : String(it)
} // @@replace logic

fixRegExpWellKnownSymbolLogic(
  'replace',
  2,
  function (REPLACE, nativeReplace, maybeCallNative, reason) {
    var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE =
      reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
      ? '$'
      : '$0'
    return [
      // `String.prototype.replace` method
      // https://tc39.es/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible(this)
        var replacer =
          searchValue == undefined ? undefined : searchValue[REPLACE]
        return replacer !== undefined
          ? replacer.call(searchValue, O, replaceValue)
          : nativeReplace.call(String(O), searchValue, replaceValue)
      }, // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (regexp, replaceValue) {
        if (
          (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
          (typeof replaceValue === 'string' &&
            replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
        ) {
          var res = maybeCallNative(nativeReplace, regexp, this, replaceValue)
          if (res.done) return res.value
        }

        var rx = anObject(regexp)
        var S = String(this)
        var functionalReplace = typeof replaceValue === 'function'
        if (!functionalReplace) replaceValue = String(replaceValue)
        var global = rx.global

        if (global) {
          var fullUnicode = rx.unicode
          rx.lastIndex = 0
        }

        var results = []

        while (true) {
          var result = regExpExec(rx, S)
          if (result === null) break
          results.push(result)
          if (!global) break
          var matchStr = String(result[0])
          if (matchStr === '')
            rx.lastIndex = advanceStringIndex(
              S,
              toLength$2(rx.lastIndex),
              fullUnicode
            )
        }

        var accumulatedResult = ''
        var nextSourcePosition = 0

        for (var i = 0; i < results.length; i++) {
          result = results[i]
          var matched = String(result[0])
          var position = max$1(min(toInteger(result.index), S.length), 0)
          var captures = [] // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

          for (var j = 1; j < result.length; j++)
            captures.push(maybeToString(result[j]))

          var namedCaptures = result.groups

          if (functionalReplace) {
            var replacerArgs = [matched].concat(captures, position, S)
            if (namedCaptures !== undefined) replacerArgs.push(namedCaptures)
            var replacement = String(
              replaceValue.apply(undefined, replacerArgs)
            )
          } else {
            replacement = getSubstitution(
              matched,
              S,
              position,
              captures,
              namedCaptures,
              replaceValue
            )
          }

          if (position >= nextSourcePosition) {
            accumulatedResult +=
              S.slice(nextSourcePosition, position) + replacement
            nextSourcePosition = position + matched.length
          }
        }

        return accumulatedResult + S.slice(nextSourcePosition)
      },
    ]
  }
)

var fails$1 = fails$9

var arrayMethodIsStrict$2 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME]
  return (
    !!method &&
    fails$1(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
      method.call(
        null,
        argument ||
          function () {
            throw 1
          },
        1
      )
    })
  )
}

var $$2 = _export
var IndexedObject$1 = indexedObject
var toIndexedObject$1 = toIndexedObject$5
var arrayMethodIsStrict$1 = arrayMethodIsStrict$2
var nativeJoin = [].join
var ES3_STRINGS = IndexedObject$1 != Object
var STRICT_METHOD$1 = arrayMethodIsStrict$1('join', ',') // `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join

$$2(
  {
    target: 'Array',
    proto: true,
    forced: ES3_STRINGS || !STRICT_METHOD$1,
  },
  {
    join: function join(separator) {
      return nativeJoin.call(
        toIndexedObject$1(this),
        separator === undefined ? ',' : separator
      )
    },
  }
)

var classof$3 = classofRaw$1 // `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe

var isArray$1 =
  Array.isArray ||
  function isArray(arg) {
    return classof$3(arg) == 'Array'
  }

var toPrimitive = toPrimitive$3
var definePropertyModule = objectDefineProperty
var createPropertyDescriptor = createPropertyDescriptor$3

var createProperty$1 = function (object, key, value) {
  var propertyKey = toPrimitive(key)
  if (propertyKey in object)
    definePropertyModule.f(
      object,
      propertyKey,
      createPropertyDescriptor(0, value)
    )
  else object[propertyKey] = value
}

var fails = fails$9
var wellKnownSymbol$3 = wellKnownSymbol$5
var V8_VERSION = engineV8Version
var SPECIES$1 = wellKnownSymbol$3('species')

var arrayMethodHasSpeciesSupport$1 = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return (
    V8_VERSION >= 51 ||
    !fails(function () {
      var array = []
      var constructor = (array.constructor = {})

      constructor[SPECIES$1] = function () {
        return {
          foo: 1,
        }
      }

      return array[METHOD_NAME](Boolean).foo !== 1
    })
  )
}

var $$1 = _export
var isObject = isObject$5
var isArray = isArray$1
var toAbsoluteIndex = toAbsoluteIndex$2
var toLength$1 = toLength$4
var toIndexedObject = toIndexedObject$5
var createProperty = createProperty$1
var wellKnownSymbol$2 = wellKnownSymbol$5
var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$1
var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice')
var SPECIES = wellKnownSymbol$2('species')
var nativeSlice = [].slice
var max = Math.max // `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects

$$1(
  {
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT,
  },
  {
    slice: function slice(start, end) {
      var O = toIndexedObject(this)
      var length = toLength$1(O.length)
      var k = toAbsoluteIndex(start, length)
      var fin = toAbsoluteIndex(end === undefined ? length : end, length) // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

      var Constructor, result, n

      if (isArray(O)) {
        Constructor = O.constructor // cross-realm fallback

        if (
          typeof Constructor == 'function' &&
          (Constructor === Array || isArray(Constructor.prototype))
        ) {
          Constructor = undefined
        } else if (isObject(Constructor)) {
          Constructor = Constructor[SPECIES]
          if (Constructor === null) Constructor = undefined
        }

        if (Constructor === Array || Constructor === undefined) {
          return nativeSlice.call(O, k, fin)
        }
      }

      result = new (Constructor === undefined ? Array : Constructor)(
        max(fin - k, 0)
      )

      for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k])

      result.length = n
      return result
    },
  }
)

var wellKnownSymbol$1 = wellKnownSymbol$5
var TO_STRING_TAG$1 = wellKnownSymbol$1('toStringTag')
var test = {}
test[TO_STRING_TAG$1] = 'z'
var toStringTagSupport = String(test) === '[object z]'

var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport
var classofRaw = classofRaw$1
var wellKnownSymbol = wellKnownSymbol$5
var TO_STRING_TAG = wellKnownSymbol('toStringTag') // ES3 wrong here

var CORRECT_ARGUMENTS =
  classofRaw(
    (function () {
      return arguments
    })()
  ) == 'Arguments' // fallback for IE11 Script Access Denied error

var tryGet = function (it, key) {
  try {
    return it[key]
  } catch (error) {
    /* empty */
  }
} // getting tag from ES6+ `Object.prototype.toString`

var classof$2 = TO_STRING_TAG_SUPPORT$2
  ? classofRaw
  : function (it) {
      var O, tag, result
      return it === undefined
        ? 'Undefined'
        : it === null
        ? 'Null' // @@toStringTag case
        : typeof (tag = tryGet((O = Object(it)), TO_STRING_TAG)) == 'string'
        ? tag // builtinTag case
        : CORRECT_ARGUMENTS
        ? classofRaw(O) // ES3 arguments fallback
        : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function'
        ? 'Arguments'
        : result
    }

var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport
var classof$1 = classof$2 // `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring

var objectToString = TO_STRING_TAG_SUPPORT$1
  ? {}.toString
  : function toString() {
      return '[object ' + classof$1(this) + ']'
    }

var TO_STRING_TAG_SUPPORT = toStringTagSupport
var redefine = redefine$3.exports
var toString = objectToString // `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring

if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, {
    unsafe: true,
  })
}

/**
 * @module BrowserSync.options
 */
var defaultConfig = {
  /**
   * Browsersync includes a user-interface that is accessed via a separate port.
   * The UI allows to controls all devices, push sync updates and much more.
   * @property ui
   * @type Object
   * @param {Number} [port=3001]
   * @since 2.0.0
   * @default false
   */
  ui: {
    port: 3001,
  },

  /**
   * Browsersync can watch your files as you work. Changes you make will either
   * be injected into the page (CSS & images) or will cause all browsers to do
   * a full-page refresh.
   * @property files
   * @type Array|String
   * @default false
   */
  files: false,

  /**
   * Specify which file events to respond to.
   * Available events: `add`, `change`, `unlink`, `addDir`, `unlinkDir`
   * @property watchEvents
   * @type Array
   * @default ["change"]
   * @since 2.18.8
   */
  watchEvents: ['change'],

  /**
   * Watch files automatically - this should be used as an
   * alternative to the `files` option. When this option is used, some directories
   * will be ignored automatically such as `node_modules` `bower_components` `.sass-cache`
   * `.vscode` `.git` `.idea`
   *
   * @property watch
   * @type Boolean
   * @default false
   * @since 2.23.0
   */
  watch: false,

  /**
   * Patterns for any watchers to ignore. Anything provided here
   * will end up inside `watchOptions.ignored`
   * @property ignore
   * @type Array
   * @default []
   * @since 2.23.0
   */
  ignore: [],

  /**
   * Serve an index.html file for all non-asset routes. Useful
   * when using client-routers
   * @property single
   * @type Boolean
   * @default false
   * @since 2.23.0
   */
  single: false,

  /**
   * File watching options that get passed along to [Chokidar](https://github.com/paulmillr/chokidar).
   * Check their docs for available options
   * @property watchOptions
   * @type Object
   * @default undefined
   * @since 2.6.0
   */
  watchOptions: {
    ignoreInitial: true,
    /*
     persistent: true,
      ignored: '*.txt',
     followSymlinks: true,
     cwd: '.',
      usePolling: true,
     alwaysStat: false,
     depth: undefined,
     interval: 100,
      ignorePermissionErrors: false,
     atomic: true
     */
  },

  /**
   * Use the built-in static server for basic HTML/JS/CSS websites.
   * @property server
   * @type Object|Boolean
   * @default false
   */
  server: false,

  /**
   * Proxy an EXISTING vhost. Browsersync will wrap your vhost with a proxy URL to view your site.
   * @property proxy
   * @type String|Object|Boolean
   * @param {String} [target]
   * @param {Boolean} [ws] - Enable websocket proxying
   * @param {Function|Array} [middleware]
   * @param {Function} [reqHeaders]
   * @param {Array} [proxyReq]
   * @param {Array} [proxyRes]
   * @default false
   */
  proxy: false,

  /**
   * @property port
   * @type Number
   * @default 3000
   */
  port: 3000,

  /**
   * @property middleware
   * @type Function|Array
   * @default false
   */
  middleware: false,

  /**
   * Add additional directories from which static
   * files should be served. Should only be used in `proxy` or `snippet`
   * mode.
   * @property serveStatic
   * @type Array
   * @default []
   * @since 2.8.0
   */
  serveStatic: [],

  /**
   * Options that are passed to the serve-static middleware
   * when you use the string[] syntax: eg: `serveStatic: ['./app']`. Please see
   * [serve-static](https://github.com/expressjs/serve-static) for details
   *
   * @property serveStaticOptions
   * @type Object
   * @since 2.17.0
   */

  /**
   * Enable https for localhost development. **Note** - this is not needed for proxy
   * option as it will be inferred from your target url.
   * @property https
   * @type Boolean
   * @default undefined
   * @since 1.3.0
   */

  /**
   * Override http module to allow using 3rd party server modules (such as http2)
   * *Note*: these modules are not included in the Browsersync package - you need
   * to 'npm install' any that you'd like to use.
   * @property httpModule
   * @type string
   * @default undefined
   * @since 2.18.0
   */

  /**
   * Current working directory
   * @property cwd
   * @type String
   * @since 2.23.0
   */

  /**
   * Register callbacks via a regular option - this can be used
   * to get access the Browsersync instance in situations where you
   * cannot provide a callback via the normal API (for example, in a Gruntfile)
   *
   * **Note**: Only the `ready` callback is currently supported here.
   *
   * @property callbacks
   * @type Object
   * @param {Function} ready
   */

  /**
   * Clicks, Scrolls & Form inputs on any device will be mirrored to all others.
   * @property ghostMode
   * @param {Boolean} [clicks=true]
   * @param {Boolean} [scroll=true]
   * @param {Boolean} [location=true]
   * @param {Boolean} [forms=true]
   * @param {Boolean} [forms.submit=true]
   * @param {Boolean} [forms.inputs=true]
   * @param {Boolean} [forms.toggles=true]
   * @type Object
   */
  ghostMode: {
    clicks: true,
    scroll: true,
    location: true,
    forms: {
      submit: true,
      inputs: true,
      toggles: true,
    },
  },

  /**
   * Can be either "info", "debug", "warn", or "silent"
   * @property logLevel
   * @type String
   * @default info
   */
  logLevel: 'info',

  /**
   * Change the console logging prefix. Useful if you're creating your
   * own project based on Browsersync
   * @property logPrefix
   * @type String
   * @default Browsersync
   * @since 1.5.1
   */
  logPrefix: 'Browsersync',

  /**
   * @property logConnections
   * @type Boolean
   * @default false
   */
  logConnections: false,

  /**
   * @property logFileChanges
   * @type Boolean
   * @default true
   */
  logFileChanges: true,

  /**
   * Log the snippet to the console when you're in snippet mode (no proxy/server)
   * @property logSnippet
   * @type: Boolean
   * @default true
   * @since 1.5.2
   */
  logSnippet: true,

  /**
   * You can control how the snippet is injected
   * onto each page via a custom regex + function.
   * You can also provide patterns for certain urls
   * that should be ignored from the snippet injection.
   * @property snippetOptions
   * @since 2.0.0
   * @param {Boolean} [async] - should the script tags have the async attribute?
   * @param {Array} [blacklist]
   * @param {Array} [whitelist]
   * @param {RegExp} [rule.match=/$/]
   * @param {Function} [rule.fn=Function]
   * @type Object
   */
  snippetOptions: {
    async: true,
    whitelist: [],
    blacklist: [],
    rule: {
      match: /<body[^>]*>/i,
      fn: function (snippet, match) {
        return match + snippet
      },
    },
  },

  /**
   * Add additional HTML rewriting rules.
   * @property rewriteRules
   * @since 2.4.0
   * @type Array
   * @default false
   */
  rewriteRules: [],

  /**
   * @property tunnel
   * @type String|Boolean
   * @default null
   */

  /**
   * Some features of Browsersync (such as `xip` & `tunnel`) require an internet connection, but if you're
   * working offline, you can reduce start-up time by setting this option to `false`
   * @property online
   * @type Boolean
   * @default undefined
   */

  /**
   * Decide which URL to open automatically when Browsersync starts. Defaults to "local" if none set.
   * Can be `true`, `local`, `external`, `ui`, `ui-external`, `tunnel` or `false`
   * @property open
   * @type Boolean|String
   * @default true
   */
  open: 'local',

  /**
   * @property browser
   * @type String|Array
   * @default default
   */
  browser: 'default',

  /**
   * Add HTTP access control (CORS) headers to assets served by Browsersync.
   * @property cors
   * @type boolean
   * @default false
   * @since 2.16.0
   */
  cors: false,

  /**
   * Requires an internet connection - useful for services such as [Typekit](https://typekit.com/)
   * as it allows you to configure domains such as `*.xip.io` in your kit settings
   * @property xip
   * @type Boolean
   * @default false
   */
  xip: false,
  hostnameSuffix: false,

  /**
   * Reload each browser when Browsersync is restarted.
   * @property reloadOnRestart
   * @type Boolean
   * @default false
   */
  reloadOnRestart: false,

  /**
   * The small pop-over notifications in the browser are not always needed/wanted.
   * @property notify
   * @type Boolean
   * @default true
   */
  notify: true,

  /**
   * @property scrollProportionally
   * @type Boolean
   * @default true
   */
  scrollProportionally: true,

  /**
   * @property scrollThrottle
   * @type Number
   * @default 0
   */
  scrollThrottle: 0,

  /**
   * Decide which technique should be used to restore
   * scroll position following a reload.
   * Can be `window.name` or `cookie`
   * @property scrollRestoreTechnique
   * @type String
   * @default 'window.name'
   */
  scrollRestoreTechnique: 'window.name',

  /**
   * Sync the scroll position of any element
   * on the page. Add any amount of CSS selectors
   * @property scrollElements
   * @type Array
   * @default []
   * @since 2.9.0
   */
  scrollElements: [],

  /**
   * Sync the scroll position of any element
   * on the page - where any scrolled element
   * will cause all others to match scroll position.
   * This is helpful when a breakpoint alters which element
   * is actually scrolling
   * @property scrollElementMapping
   * @type Array
   * @default []
   * @since 2.9.0
   */
  scrollElementMapping: [],

  /**
   * Time, in milliseconds, to wait before
   * instructing the browser to reload/inject following a
   * file change event
   * @property reloadDelay
   * @type Number
   * @default 0
   */
  reloadDelay: 0,

  /**
   * Wait for a specified window of event-silence before
   * sending any reload events.
   * @property reloadDebounce
   * @type Number
   * @default 0
   * @since 2.6.0
   */
  reloadDebounce: 500,

  /**
   * Emit only the first event during sequential time windows
   * of a specified duration.
   * @property reloadThrottle
   * @type Number
   * @default 0
   * @since 2.13.0
   */
  reloadThrottle: 0,

  /**
   * User provided plugins
   * @property plugins
   * @type Array
   * @default []
   * @since 2.6.0
   */
  plugins: [],

  /**
   * @property injectChanges
   * @type Boolean
   * @default true
   */
  injectChanges: true,

  /**
   * @property startPath
   * @type String|Null
   * @default null
   */
  startPath: null,

  /**
   * Whether to minify client script, or not.
   * @property minify
   * @type Boolean
   * @default true
   */
  minify: true,

  /**
   * @property host
   * @type String
   * @default null
   */
  host: null,

  /**
   * Specify a host to listen on. Use this if you want to
   * prevent binding to all interfaces.
   *
   * Note: When you specify this option, it overrides the 'host' option
   * @property listen
   * @type String
   * @default undefined
   */

  /**
   * Support environments where dynamic hostnames are not required
   * (ie: electron)
   * @property localOnly
   * @type Boolean
   * @default false
   * @since 2.14.0
   */
  localOnly: false,

  /**
   * @property codeSync
   * @type Boolean
   * @default true
   */
  codeSync: true,

  /**
   * @property timestamps
   * @type Boolean
   * @default true
   */
  timestamps: true,
  clientEvents: [
    'scroll',
    'scroll:element',
    'input:text',
    'input:toggles',
    'form:submit',
    'form:reset',
    'click',
  ],

  /**
   * Alter the script path for complete control over where the Browsersync
   * Javascript is served from. Whatever you return from this function
   * will be used as the script path.
   * @property scriptPath
   * @default undefined
   * @since 1.5.0
   * @type Function
   */

  /**
   * Configure the Socket.IO path and namespace & domain to avoid collisions.
   * @property socket
   * @param {String} [path="/browser-sync/socket.io"]
   * @param {String} [clientPath="/browser-sync"]
   * @param {String|Function} [namespace="/browser-sync"]
   * @param {String|Function} [domain=undefined]
   * @param {String|Function} [port=undefined]
   * @param {Object} [clients.heartbeatTimeout=5000]
   * @since 1.6.2
   * @type Object
   */
  socket: {
    socketIoOptions: {
      log: false,
    },
    socketIoClientConfig: {
      reconnectionAttempts: 50,
    },
    path: '/browser-sync/socket.io',
    clientPath: '/browser-sync',
    namespace: '/browser-sync',
    clients: {
      heartbeatTimeout: 5000,
    },
  },

  /**
   * Configure the script domain
   * @property script
   * @param {String|Function} [domain=undefined]
   * @since 2.14.0
   * @type Object
   */
  tagNames: {
    less: 'link',
    scss: 'link',
    css: 'link',
    jpg: 'img',
    jpeg: 'img',
    png: 'img',
    svg: 'img',
    gif: 'img',
    js: 'script',
  },
  injectFileTypes: ['css', 'png', 'jpg', 'jpeg', 'svg', 'gif', 'webp', 'map'],
  injectNotification: false,
  excludedFileTypes: [
    'js',
    'css',
    'pdf',
    'map',
    'svg',
    'ico',
    'woff',
    'json',
    'eot',
    'ttf',
    'png',
    'jpg',
    'jpeg',
    'webp',
    'gif',
    'mp4',
    'mp3',
    '3gp',
    'ogg',
    'ogv',
    'webm',
    'm4a',
    'flv',
    'wmv',
    'avi',
    'swf',
    'scss',
  ],
}

var aFunction$1 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function')
  }

  return it
}

var aFunction = aFunction$1
var toObject = toObject$3
var IndexedObject = indexedObject
var toLength = toLength$4 // `Array.prototype.{ reduce, reduceRight }` methods implementation

var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn)
    var O = toObject(that)
    var self = IndexedObject(O)
    var length = toLength(O.length)
    var index = IS_RIGHT ? length - 1 : 0
    var i = IS_RIGHT ? -1 : 1
    if (argumentsLength < 2)
      while (true) {
        if (index in self) {
          memo = self[index]
          index += i
          break
        }

        index += i

        if (IS_RIGHT ? index < 0 : length <= index) {
          throw TypeError('Reduce of empty array with no initial value')
        }
      }

    for (; IS_RIGHT ? index >= 0 : length > index; index += i)
      if (index in self) {
        memo = callbackfn(memo, self[index], index, O)
      }

    return memo
  }
}

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true),
}

var classof = classofRaw$1
var global$1 = global$d
var engineIsNode = classof(global$1.process) == 'process'

var $ = _export
var $reduceRight = arrayReduce.right
var arrayMethodIsStrict = arrayMethodIsStrict$2
var CHROME_VERSION = engineV8Version
var IS_NODE = engineIsNode
var STRICT_METHOD = arrayMethodIsStrict('reduceRight') // Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982

var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83 // `Array.prototype.reduceRight` method
// https://tc39.es/ecma262/#sec-array.prototype.reduceright

$(
  {
    target: 'Array',
    proto: true,
    forced: !STRICT_METHOD || CHROME_BUG,
  },
  {
    reduceRight: function reduceRight(
      callbackfn
      /* , initialValue */
    ) {
      return $reduceRight(
        this,
        callbackfn,
        arguments.length,
        arguments.length > 1 ? arguments[1] : undefined
      )
    },
  }
)

var httpProxy$3 = {exports: {}}

var eventemitter3 = {exports: {}}

;(function (module) {
  var has = Object.prototype.hasOwnProperty,
    prefix = '~'
  /**
   * Constructor to create a storage for our `EE` objects.
   * An `Events` instance is a plain object whose properties are event names.
   *
   * @constructor
   * @private
   */

  function Events() {} //
  // We try to not inherit from `Object.prototype`. In some engines creating an
  // instance in this way is faster than calling `Object.create(null)` directly.
  // If `Object.create(null)` is not supported we prefix the event names with a
  // character to make sure that the built-in object properties are not
  // overridden or used as an attack vector.
  //

  if (Object.create) {
    Events.prototype = Object.create(null) //
    // This hack is needed because the `__proto__` property is still inherited in
    // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
    //

    if (!new Events().__proto__) prefix = false
  }
  /**
   * Representation of a single event listener.
   *
   * @param {Function} fn The listener function.
   * @param {*} context The context to invoke the listener with.
   * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
   * @constructor
   * @private
   */

  function EE(fn, context, once) {
    this.fn = fn
    this.context = context
    this.once = once || false
  }
  /**
   * Add a listener for a given event.
   *
   * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} context The context to invoke the listener with.
   * @param {Boolean} once Specify if the listener is a one-time listener.
   * @returns {EventEmitter}
   * @private
   */

  function addListener(emitter, event, fn, context, once) {
    if (typeof fn !== 'function') {
      throw new TypeError('The listener must be a function')
    }

    var listener = new EE(fn, context || emitter, once),
      evt = prefix ? prefix + event : event
    if (!emitter._events[evt])
      (emitter._events[evt] = listener), emitter._eventsCount++
    else if (!emitter._events[evt].fn) emitter._events[evt].push(listener)
    else emitter._events[evt] = [emitter._events[evt], listener]
    return emitter
  }
  /**
   * Clear event by name.
   *
   * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
   * @param {(String|Symbol)} evt The Event name.
   * @private
   */

  function clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0) emitter._events = new Events()
    else delete emitter._events[evt]
  }
  /**
   * Minimal `EventEmitter` interface that is molded against the Node.js
   * `EventEmitter` interface.
   *
   * @constructor
   * @public
   */

  function EventEmitter() {
    this._events = new Events()
    this._eventsCount = 0
  }
  /**
   * Return an array listing the events for which the emitter has registered
   * listeners.
   *
   * @returns {Array}
   * @public
   */

  EventEmitter.prototype.eventNames = function eventNames() {
    var names = [],
      events,
      name
    if (this._eventsCount === 0) return names

    for (name in (events = this._events)) {
      if (has.call(events, name)) names.push(prefix ? name.slice(1) : name)
    }

    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events))
    }

    return names
  }
  /**
   * Return the listeners registered for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Array} The registered listeners.
   * @public
   */

  EventEmitter.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event,
      handlers = this._events[evt]
    if (!handlers) return []
    if (handlers.fn) return [handlers.fn]

    for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
      ee[i] = handlers[i].fn
    }

    return ee
  }
  /**
   * Return the number of listeners listening to a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Number} The number of listeners.
   * @public
   */

  EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event,
      listeners = this._events[evt]
    if (!listeners) return 0
    if (listeners.fn) return 1
    return listeners.length
  }
  /**
   * Calls each of the listeners registered for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Boolean} `true` if the event had listeners, else `false`.
   * @public
   */

  EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event
    if (!this._events[evt]) return false
    var listeners = this._events[evt],
      len = arguments.length,
      args,
      i

    if (listeners.fn) {
      if (listeners.once)
        this.removeListener(event, listeners.fn, undefined, true)

      switch (len) {
        case 1:
          return listeners.fn.call(listeners.context), true

        case 2:
          return listeners.fn.call(listeners.context, a1), true

        case 3:
          return listeners.fn.call(listeners.context, a1, a2), true

        case 4:
          return listeners.fn.call(listeners.context, a1, a2, a3), true

        case 5:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4), true

        case 6:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true
      }

      for (i = 1, args = new Array(len - 1); i < len; i++) {
        args[i - 1] = arguments[i]
      }

      listeners.fn.apply(listeners.context, args)
    } else {
      var length = listeners.length,
        j

      for (i = 0; i < length; i++) {
        if (listeners[i].once)
          this.removeListener(event, listeners[i].fn, undefined, true)

        switch (len) {
          case 1:
            listeners[i].fn.call(listeners[i].context)
            break

          case 2:
            listeners[i].fn.call(listeners[i].context, a1)
            break

          case 3:
            listeners[i].fn.call(listeners[i].context, a1, a2)
            break

          case 4:
            listeners[i].fn.call(listeners[i].context, a1, a2, a3)
            break

          default:
            if (!args)
              for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j]
              }
            listeners[i].fn.apply(listeners[i].context, args)
        }
      }
    }

    return true
  }
  /**
   * Add a listener for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} [context=this] The context to invoke the listener with.
   * @returns {EventEmitter} `this`.
   * @public
   */

  EventEmitter.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false)
  }
  /**
   * Add a one-time listener for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} [context=this] The context to invoke the listener with.
   * @returns {EventEmitter} `this`.
   * @public
   */

  EventEmitter.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true)
  }
  /**
   * Remove the listeners of a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn Only remove the listeners that match this function.
   * @param {*} context Only remove the listeners that have this context.
   * @param {Boolean} once Only remove one-time listeners.
   * @returns {EventEmitter} `this`.
   * @public
   */

  EventEmitter.prototype.removeListener = function removeListener(
    event,
    fn,
    context,
    once
  ) {
    var evt = prefix ? prefix + event : event
    if (!this._events[evt]) return this

    if (!fn) {
      clearEvent(this, evt)
      return this
    }

    var listeners = this._events[evt]

    if (listeners.fn) {
      if (
        listeners.fn === fn &&
        (!once || listeners.once) &&
        (!context || listeners.context === context)
      ) {
        clearEvent(this, evt)
      }
    } else {
      for (var i = 0, events = [], length = listeners.length; i < length; i++) {
        if (
          listeners[i].fn !== fn ||
          (once && !listeners[i].once) ||
          (context && listeners[i].context !== context)
        ) {
          events.push(listeners[i])
        }
      } //
      // Reset the array, or remove it completely if we have no more listeners.
      //

      if (events.length)
        this._events[evt] = events.length === 1 ? events[0] : events
      else clearEvent(this, evt)
    }

    return this
  }
  /**
   * Remove all listeners, or those of the specified event.
   *
   * @param {(String|Symbol)} [event] The event name.
   * @returns {EventEmitter} `this`.
   * @public
   */

  EventEmitter.prototype.removeAllListeners = function removeAllListeners(
    event
  ) {
    var evt

    if (event) {
      evt = prefix ? prefix + event : event
      if (this._events[evt]) clearEvent(this, evt)
    } else {
      this._events = new Events()
      this._eventsCount = 0
    }

    return this
  } //
  // Alias methods names because people roll like that.
  //

  EventEmitter.prototype.off = EventEmitter.prototype.removeListener
  EventEmitter.prototype.addListener = EventEmitter.prototype.on //
  // Expose the prefix.
  //

  EventEmitter.prefixed = prefix //
  // Allow `EventEmitter` to be imported as module namespace.
  //

  EventEmitter.EventEmitter = EventEmitter //
  // Expose the module.
  //

  {
    module.exports = EventEmitter
  }
})(eventemitter3)

var common$4 = {}

/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */

var requiresPort = function required(port, protocol) {
  protocol = protocol.split(':')[0]
  port = +port
  if (!port) return false

  switch (protocol) {
    case 'http':
    case 'ws':
      return port !== 80

    case 'https':
    case 'wss':
      return port !== 443

    case 'ftp':
      return port !== 21

    case 'gopher':
      return port !== 70

    case 'file':
      return false
  }

  return port !== 0
}

;(function (exports) {
  var common = exports,
    url = require$$0__default['default'],
    extend = require$$1__default['default']._extend,
    required = requiresPort
  var upgradeHeader = /(^|,)\s*upgrade\s*($|,)/i,
    isSSL = /^https|wss/
  /**
   * Simple Regex for testing if protocol is https
   */

  common.isSSL = isSSL
  /**
   * Copies the right headers from `options` and `req` to
   * `outgoing` which is then used to fire the proxied
   * request.
   *
   * Examples:
   *
   *    common.setupOutgoing(outgoing, options, req)
   *    // => { host: ..., hostname: ...}
   *
   * @param {Object} Outgoing Base object to be filled with required properties
   * @param {Object} Options Config object passed to the proxy
   * @param {ClientRequest} Req Request Object
   * @param {String} Forward String to select forward or target
   *
   * @return {Object} Outgoing Object with all required properties set
   *
   * @api private
   */

  common.setupOutgoing = function (outgoing, options, req, forward) {
    outgoing.port =
      options[forward || 'target'].port ||
      (isSSL.test(options[forward || 'target'].protocol) ? 443 : 80)
    ;[
      'host',
      'hostname',
      'socketPath',
      'pfx',
      'key',
      'passphrase',
      'cert',
      'ca',
      'ciphers',
      'secureProtocol',
    ].forEach(function (e) {
      outgoing[e] = options[forward || 'target'][e]
    })
    outgoing.method = options.method || req.method
    outgoing.headers = extend({}, req.headers)

    if (options.headers) {
      extend(outgoing.headers, options.headers)
    }

    if (options.auth) {
      outgoing.auth = options.auth
    }

    if (options.ca) {
      outgoing.ca = options.ca
    }

    if (isSSL.test(options[forward || 'target'].protocol)) {
      outgoing.rejectUnauthorized =
        typeof options.secure === 'undefined' ? true : options.secure
    }

    outgoing.agent = options.agent || false
    outgoing.localAddress = options.localAddress //
    // Remark: If we are false and not upgrading, set the connection: close. This is the right thing to do
    // as node core doesn't handle this COMPLETELY properly yet.
    //

    if (!outgoing.agent) {
      outgoing.headers = outgoing.headers || {}

      if (
        typeof outgoing.headers.connection !== 'string' ||
        !upgradeHeader.test(outgoing.headers.connection)
      ) {
        outgoing.headers.connection = 'close'
      }
    } // the final path is target path + relative path requested by user:

    var target = options[forward || 'target']
    var targetPath =
      target && options.prependPath !== false ? target.path || '' : '' //
    // Remark: Can we somehow not use url.parse as a perf optimization?
    //

    var outgoingPath = !options.toProxy
      ? url.parse(req.url).path || ''
      : req.url //
    // Remark: ignorePath will just straight up ignore whatever the request's
    // path is. This can be labeled as FOOT-GUN material if you do not know what
    // you are doing and are using conflicting options.
    //

    outgoingPath = !options.ignorePath ? outgoingPath : ''
    outgoing.path = common.urlJoin(targetPath, outgoingPath)

    if (options.changeOrigin) {
      outgoing.headers.host =
        required(outgoing.port, options[forward || 'target'].protocol) &&
        !hasPort(outgoing.host)
          ? outgoing.host + ':' + outgoing.port
          : outgoing.host
    }

    return outgoing
  }
  /**
   * Set the proper configuration for sockets,
   * set no delay and set keep alive, also set
   * the timeout to 0.
   *
   * Examples:
   *
   *    common.setupSocket(socket)
   *    // => Socket
   *
   * @param {Socket} Socket instance to setup
   *
   * @return {Socket} Return the configured socket.
   *
   * @api private
   */

  common.setupSocket = function (socket) {
    socket.setTimeout(0)
    socket.setNoDelay(true)
    socket.setKeepAlive(true, 0)
    return socket
  }
  /**
   * Get the port number from the host. Or guess it based on the connection type.
   *
   * @param {Request} req Incoming HTTP request.
   *
   * @return {String} The port number.
   *
   * @api private
   */

  common.getPort = function (req) {
    var res = req.headers.host ? req.headers.host.match(/:(\d+)/) : ''
    return res ? res[1] : common.hasEncryptedConnection(req) ? '443' : '80'
  }
  /**
   * Check if the request has an encrypted connection.
   *
   * @param {Request} req Incoming HTTP request.
   *
   * @return {Boolean} Whether the connection is encrypted or not.
   *
   * @api private
   */

  common.hasEncryptedConnection = function (req) {
    return Boolean(req.connection.encrypted || req.connection.pair)
  }
  /**
   * OS-agnostic join (doesn't break on URLs like path.join does on Windows)>
   *
   * @return {String} The generated path.
   *
   * @api private
   */

  common.urlJoin = function () {
    //
    // We do not want to mess with the query string. All we want to touch is the path.
    //
    var args = Array.prototype.slice.call(arguments),
      lastIndex = args.length - 1,
      last = args[lastIndex],
      lastSegs = last.split('?'),
      retSegs
    args[lastIndex] = lastSegs.shift() //
    // Join all strings, but remove empty strings so we don't get extra slashes from
    // joining e.g. ['', 'am']
    //

    retSegs = [
      args
        .filter(Boolean)
        .join('/')
        .replace(/\/+/g, '/')
        .replace('http:/', 'http://')
        .replace('https:/', 'https://'),
    ] // Only join the query string if it exists so we don't have trailing a '?'
    // on every request
    // Handle case where there could be multiple ? in the URL.

    retSegs.push.apply(retSegs, lastSegs)
    return retSegs.join('?')
  }
  /**
   * Rewrites or removes the domain of a cookie header
   *
   * @param {String|Array} Header
   * @param {Object} Config, mapping of domain to rewritten domain.
   *                 '*' key to match any domain, null value to remove the domain.
   *
   * @api private
   */

  common.rewriteCookieProperty = function rewriteCookieProperty(
    header,
    config,
    property
  ) {
    if (Array.isArray(header)) {
      return header.map(function (headerElement) {
        return rewriteCookieProperty(headerElement, config, property)
      })
    }

    return header.replace(
      new RegExp('(;\\s*' + property + '=)([^;]+)', 'i'),
      function (match, prefix, previousValue) {
        var newValue

        if (previousValue in config) {
          newValue = config[previousValue]
        } else if ('*' in config) {
          newValue = config['*']
        } else {
          //no match, return previous value
          return match
        }

        if (newValue) {
          //replace value
          return prefix + newValue
        } else {
          //remove value
          return ''
        }
      }
    )
  }
  /**
   * Check the host and see if it potentially has a port in it (keep it simple)
   *
   * @returns {Boolean} Whether we have one or not
   *
   * @api private
   */

  function hasPort(host) {
    return !!~host.indexOf(':')
  }
})(common$4)

var url$1 = require$$0__default['default'],
  common$3 = common$4
var redirectRegex = /^201|30(1|2|7|8)$/
/*!
 * Array of passes.
 *
 * A `pass` is just a function that is executed on `req, res, options`
 * so that you can easily add new checks while still keeping the base
 * flexible.
 */

var webOutgoing = {
  // <--

  /**
   * If is a HTTP 1.0 request, remove chunk headers
   *
   * @param {ClientRequest} Req Request object
   * @param {IncomingMessage} Res Response object
   * @param {proxyResponse} Res Response object from the proxy request
   *
   * @api private
   */
  removeChunked: function removeChunked(req, res, proxyRes) {
    if (req.httpVersion === '1.0') {
      delete proxyRes.headers['transfer-encoding']
    }
  },

  /**
   * If is a HTTP 1.0 request, set the correct connection header
   * or if connection header not present, then use `keep-alive`
   *
   * @param {ClientRequest} Req Request object
   * @param {IncomingMessage} Res Response object
   * @param {proxyResponse} Res Response object from the proxy request
   *
   * @api private
   */
  setConnection: function setConnection(req, res, proxyRes) {
    if (req.httpVersion === '1.0') {
      proxyRes.headers.connection = req.headers.connection || 'close'
    } else if (req.httpVersion !== '2.0' && !proxyRes.headers.connection) {
      proxyRes.headers.connection = req.headers.connection || 'keep-alive'
    }
  },
  setRedirectHostRewrite: function setRedirectHostRewrite(
    req,
    res,
    proxyRes,
    options
  ) {
    if (
      (options.hostRewrite || options.autoRewrite || options.protocolRewrite) &&
      proxyRes.headers['location'] &&
      redirectRegex.test(proxyRes.statusCode)
    ) {
      var target = url$1.parse(options.target)
      var u = url$1.parse(proxyRes.headers['location']) // make sure the redirected host matches the target host before rewriting

      if (target.host != u.host) {
        return
      }

      if (options.hostRewrite) {
        u.host = options.hostRewrite
      } else if (options.autoRewrite) {
        u.host = req.headers['host']
      }

      if (options.protocolRewrite) {
        u.protocol = options.protocolRewrite
      }

      proxyRes.headers['location'] = u.format()
    }
  },

  /**
   * Copy headers from proxyResponse to response
   * set each header in response object.
   *
   * @param {ClientRequest} Req Request object
   * @param {IncomingMessage} Res Response object
   * @param {proxyResponse} Res Response object from the proxy request
   * @param {Object} Options options.cookieDomainRewrite: Config to rewrite cookie domain
   *
   * @api private
   */
  writeHeaders: function writeHeaders(req, res, proxyRes, options) {
    var rewriteCookieDomainConfig = options.cookieDomainRewrite,
      rewriteCookiePathConfig = options.cookiePathRewrite,
      preserveHeaderKeyCase = options.preserveHeaderKeyCase,
      rawHeaderKeyMap,
      setHeader = function (key, header) {
        if (header == undefined) return

        if (rewriteCookieDomainConfig && key.toLowerCase() === 'set-cookie') {
          header = common$3.rewriteCookieProperty(
            header,
            rewriteCookieDomainConfig,
            'domain'
          )
        }

        if (rewriteCookiePathConfig && key.toLowerCase() === 'set-cookie') {
          header = common$3.rewriteCookieProperty(
            header,
            rewriteCookiePathConfig,
            'path'
          )
        }

        res.setHeader(String(key).trim(), header)
      }

    if (typeof rewriteCookieDomainConfig === 'string') {
      //also test for ''
      rewriteCookieDomainConfig = {
        '*': rewriteCookieDomainConfig,
      }
    }

    if (typeof rewriteCookiePathConfig === 'string') {
      //also test for ''
      rewriteCookiePathConfig = {
        '*': rewriteCookiePathConfig,
      }
    } // message.rawHeaders is added in: v0.11.6
    // https://nodejs.org/api/http.html#http_message_rawheaders

    if (preserveHeaderKeyCase && proxyRes.rawHeaders != undefined) {
      rawHeaderKeyMap = {}

      for (var i = 0; i < proxyRes.rawHeaders.length; i += 2) {
        var key = proxyRes.rawHeaders[i]
        rawHeaderKeyMap[key.toLowerCase()] = key
      }
    }

    Object.keys(proxyRes.headers).forEach(function (key) {
      var header = proxyRes.headers[key]

      if (preserveHeaderKeyCase && rawHeaderKeyMap) {
        key = rawHeaderKeyMap[key] || key
      }

      setHeader(key, header)
    })
  },

  /**
   * Set the statusCode from the proxyResponse
   *
   * @param {ClientRequest} Req Request object
   * @param {IncomingMessage} Res Response object
   * @param {proxyResponse} Res Response object from the proxy request
   *
   * @api private
   */
  writeStatusCode: function writeStatusCode(req, res, proxyRes) {
    // From Node.js docs: response.writeHead(statusCode[, statusMessage][, headers])
    if (proxyRes.statusMessage) {
      res.statusCode = proxyRes.statusCode
      res.statusMessage = proxyRes.statusMessage
    } else {
      res.statusCode = proxyRes.statusCode
    }
  },
}

var followRedirects$1 = {exports: {}}

var src = {exports: {}}

var browser = {exports: {}}

/**
 * Helpers.
 */
var s = 1000
var m = s * 60
var h = m * 60
var d = h * 24
var w = d * 7
var y = d * 365.25
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

var ms = function (val, options) {
  options = options || {}
  var type = typeof val

  if (type === 'string' && val.length > 0) {
    return parse(val)
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val)
  }

  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  )
}
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str)

  if (str.length > 100) {
    return
  }

  var match =
    /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
      str
    )

  if (!match) {
    return
  }

  var n = parseFloat(match[1])
  var type = (match[2] || 'ms').toLowerCase()

  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y

    case 'weeks':
    case 'week':
    case 'w':
      return n * w

    case 'days':
    case 'day':
    case 'd':
      return n * d

    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h

    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m

    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s

    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n

    default:
      return undefined
  }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms)

  if (msAbs >= d) {
    return Math.round(ms / d) + 'd'
  }

  if (msAbs >= h) {
    return Math.round(ms / h) + 'h'
  }

  if (msAbs >= m) {
    return Math.round(ms / m) + 'm'
  }

  if (msAbs >= s) {
    return Math.round(ms / s) + 's'
  }

  return ms + 'ms'
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms)

  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day')
  }

  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour')
  }

  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute')
  }

  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second')
  }

  return ms + ' ms'
}
/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '')
}

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
  createDebug.debug = createDebug
  createDebug.default = createDebug
  createDebug.coerce = coerce
  createDebug.disable = disable
  createDebug.enable = enable
  createDebug.enabled = enabled
  createDebug.humanize = ms
  createDebug.destroy = destroy
  Object.keys(env).forEach((key) => {
    createDebug[key] = env[key]
  })
  /**
   * The currently active debug mode names, and names to skip.
   */

  createDebug.names = []
  createDebug.skips = []
  /**
   * Map of special "%n" handling functions, for the debug "format" argument.
   *
   * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
   */

  createDebug.formatters = {}
  /**
   * Selects a color for a debug namespace
   * @param {String} namespace The namespace string for the for the debug instance to be colored
   * @return {Number|String} An ANSI color code for the given namespace
   * @api private
   */

  function selectColor(namespace) {
    let hash = 0

    for (let i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i)
      hash |= 0 // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length]
  }

  createDebug.selectColor = selectColor
  /**
   * Create a debugger with the given `namespace`.
   *
   * @param {String} namespace
   * @return {Function}
   * @api public
   */

  function createDebug(namespace) {
    let prevTime
    let enableOverride = null

    function debug(...args) {
      // Disabled?
      if (!debug.enabled) {
        return
      }

      const self = debug // Set `diff` timestamp

      const curr = Number(new Date())
      const ms = curr - (prevTime || curr)
      self.diff = ms
      self.prev = prevTime
      self.curr = curr
      prevTime = curr
      args[0] = createDebug.coerce(args[0])

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O')
      } // Apply any `formatters` transformations

      let index = 0
      args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return '%'
        }

        index++
        const formatter = createDebug.formatters[format]

        if (typeof formatter === 'function') {
          const val = args[index]
          match = formatter.call(self, val) // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1)
          index--
        }

        return match
      }) // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args)
      const logFn = self.log || createDebug.log
      logFn.apply(self, args)
    }

    debug.namespace = namespace
    debug.useColors = createDebug.useColors()
    debug.color = createDebug.selectColor(namespace)
    debug.extend = extend
    debug.destroy = createDebug.destroy // XXX Temporary. Will be removed in the next major release.

    Object.defineProperty(debug, 'enabled', {
      enumerable: true,
      configurable: false,
      get: () =>
        enableOverride === null
          ? createDebug.enabled(namespace)
          : enableOverride,
      set: (v) => {
        enableOverride = v
      },
    }) // Env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug)
    }

    return debug
  }

  function extend(namespace, delimiter) {
    const newDebug = createDebug(
      this.namespace +
        (typeof delimiter === 'undefined' ? ':' : delimiter) +
        namespace
    )
    newDebug.log = this.log
    return newDebug
  }
  /**
   * Enables a debug mode by namespaces. This can include modes
   * separated by a colon and wildcards.
   *
   * @param {String} namespaces
   * @api public
   */

  function enable(namespaces) {
    createDebug.save(namespaces)
    createDebug.names = []
    createDebug.skips = []
    let i
    const split = (typeof namespaces === 'string' ? namespaces : '').split(
      /[\s,]+/
    )
    const len = split.length

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue
      }

      namespaces = split[i].replace(/\*/g, '.*?')

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'))
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'))
      }
    }
  }
  /**
   * Disable debug output.
   *
   * @return {String} namespaces
   * @api public
   */

  function disable() {
    const namespaces = [
      ...createDebug.names.map(toNamespace),
      ...createDebug.skips.map(toNamespace).map((namespace) => '-' + namespace),
    ].join(',')
    createDebug.enable('')
    return namespaces
  }
  /**
   * Returns true if the given mode name is enabled, false otherwise.
   *
   * @param {String} name
   * @return {Boolean}
   * @api public
   */

  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true
    }

    let i
    let len

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true
      }
    }

    return false
  }
  /**
   * Convert regexp to namespace
   *
   * @param {RegExp} regxep
   * @return {String} namespace
   * @api private
   */

  function toNamespace(regexp) {
    return regexp
      .toString()
      .substring(2, regexp.toString().length - 2)
      .replace(/\.\*\?$/, '*')
  }
  /**
   * Coerce `val`.
   *
   * @param {Mixed} val
   * @return {Mixed}
   * @api private
   */

  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message
    }

    return val
  }
  /**
   * XXX DO NOT USE. This is a temporary stub function.
   * XXX It WILL be removed in the next major release.
   */

  function destroy() {
    console.warn(
      'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
    )
  }

  createDebug.enable(createDebug.load())
  return createDebug
}

var common$2 = setup

/* eslint-env browser */

;(function (module, exports) {
  /**
   * This is the web browser implementation of `debug()`.
   */
  exports.formatArgs = formatArgs
  exports.save = save
  exports.load = load
  exports.useColors = useColors
  exports.storage = localstorage()

  exports.destroy = (() => {
    let warned = false
    return () => {
      if (!warned) {
        warned = true
        console.warn(
          'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
        )
      }
    }
  })()
  /**
   * Colors.
   */

  exports.colors = [
    '#0000CC',
    '#0000FF',
    '#0033CC',
    '#0033FF',
    '#0066CC',
    '#0066FF',
    '#0099CC',
    '#0099FF',
    '#00CC00',
    '#00CC33',
    '#00CC66',
    '#00CC99',
    '#00CCCC',
    '#00CCFF',
    '#3300CC',
    '#3300FF',
    '#3333CC',
    '#3333FF',
    '#3366CC',
    '#3366FF',
    '#3399CC',
    '#3399FF',
    '#33CC00',
    '#33CC33',
    '#33CC66',
    '#33CC99',
    '#33CCCC',
    '#33CCFF',
    '#6600CC',
    '#6600FF',
    '#6633CC',
    '#6633FF',
    '#66CC00',
    '#66CC33',
    '#9900CC',
    '#9900FF',
    '#9933CC',
    '#9933FF',
    '#99CC00',
    '#99CC33',
    '#CC0000',
    '#CC0033',
    '#CC0066',
    '#CC0099',
    '#CC00CC',
    '#CC00FF',
    '#CC3300',
    '#CC3333',
    '#CC3366',
    '#CC3399',
    '#CC33CC',
    '#CC33FF',
    '#CC6600',
    '#CC6633',
    '#CC9900',
    '#CC9933',
    '#CCCC00',
    '#CCCC33',
    '#FF0000',
    '#FF0033',
    '#FF0066',
    '#FF0099',
    '#FF00CC',
    '#FF00FF',
    '#FF3300',
    '#FF3333',
    '#FF3366',
    '#FF3399',
    '#FF33CC',
    '#FF33FF',
    '#FF6600',
    '#FF6633',
    '#FF9900',
    '#FF9933',
    '#FFCC00',
    '#FFCC33',
  ]
  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */
  // eslint-disable-next-line complexity

  function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if (
      typeof window !== 'undefined' &&
      window.process &&
      (window.process.type === 'renderer' || window.process.__nwjs)
    ) {
      return true
    } // Internet Explorer and Edge do not support colors.

    if (
      typeof navigator !== 'undefined' &&
      navigator.userAgent &&
      navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
    ) {
      return false
    } // Is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632

    return (
      (typeof document !== 'undefined' &&
        document.documentElement &&
        document.documentElement.style &&
        document.documentElement.style.WebkitAppearance) || // Is firebug? http://stackoverflow.com/a/398120/376773
      (typeof window !== 'undefined' &&
        window.console &&
        (window.console.firebug ||
          (window.console.exception && window.console.table))) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      (typeof navigator !== 'undefined' &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
        parseInt(RegExp.$1, 10) >= 31) || // Double check webkit in userAgent just in case we are in a worker
      (typeof navigator !== 'undefined' &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
    )
  }
  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
    args[0] =
      (this.useColors ? '%c' : '') +
      this.namespace +
      (this.useColors ? ' %c' : ' ') +
      args[0] +
      (this.useColors ? '%c ' : ' ') +
      '+' +
      module.exports.humanize(this.diff)

    if (!this.useColors) {
      return
    }

    const c = 'color: ' + this.color
    args.splice(1, 0, c, 'color: inherit') // The final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into

    let index = 0
    let lastC = 0
    args[0].replace(/%[a-zA-Z%]/g, (match) => {
      if (match === '%%') {
        return
      }

      index++

      if (match === '%c') {
        // We only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index
      }
    })
    args.splice(lastC, 0, c)
  }
  /**
   * Invokes `console.debug()` when available.
   * No-op when `console.debug` is not a "function".
   * If `console.debug` is not available, falls back
   * to `console.log`.
   *
   * @api public
   */

  exports.log = console.debug || console.log || (() => {})
  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */

  function save(namespaces) {
    try {
      if (namespaces) {
        exports.storage.setItem('debug', namespaces)
      } else {
        exports.storage.removeItem('debug')
      }
    } catch (error) {
      // Swallow
      // XXX (@Qix-) should we be logging these?
    }
  }
  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
    let r

    try {
      r = exports.storage.getItem('debug')
    } catch (error) {
      // Swallow
      // XXX (@Qix-) should we be logging these?
    } // If debug isn't set in LS, and we're in Electron, try to load $DEBUG

    if (!r && typeof process !== 'undefined' && 'env' in process) {
      r = process.env.DEBUG
    }

    return r
  }
  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */

  function localstorage() {
    try {
      // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
      // The Browser also has localStorage in the global context.
      return localStorage
    } catch (error) {
      // Swallow
      // XXX (@Qix-) should we be logging these?
    }
  }

  module.exports = common$2(exports)
  const {formatters} = module.exports
  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */

  formatters.j = function (v) {
    try {
      return JSON.stringify(v)
    } catch (error) {
      return '[UnexpectedJSONParseError]: ' + error.message
    }
  }
})(browser, browser.exports)

var node = {exports: {}}

var hasFlag$1 = (flag, argv) => {
  argv = argv || process.argv
  const prefix = flag.startsWith('-') ? '' : flag.length === 1 ? '-' : '--'
  const pos = argv.indexOf(prefix + flag)
  const terminatorPos = argv.indexOf('--')
  return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos)
}

const os = require$$0__default$1['default']
const hasFlag = hasFlag$1
const env = process.env
let forceColor

if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false')) {
  forceColor = false
} else if (
  hasFlag('color') ||
  hasFlag('colors') ||
  hasFlag('color=true') ||
  hasFlag('color=always')
) {
  forceColor = true
}

if ('FORCE_COLOR' in env) {
  forceColor =
    env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0
}

function translateLevel(level) {
  if (level === 0) {
    return false
  }

  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3,
  }
}

function supportsColor(stream) {
  if (forceColor === false) {
    return 0
  }

  if (
    hasFlag('color=16m') ||
    hasFlag('color=full') ||
    hasFlag('color=truecolor')
  ) {
    return 3
  }

  if (hasFlag('color=256')) {
    return 2
  }

  if (stream && !stream.isTTY && forceColor !== true) {
    return 0
  }

  const min = forceColor ? 1 : 0

  if (process.platform === 'win32') {
    // Node.js 7.5.0 is the first version of Node.js to include a patch to
    // libuv that enables 256 color output on Windows. Anything earlier and it
    // won't work. However, here we target Node.js 8 at minimum as it is an LTS
    // release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
    // release that supports 256 colors. Windows 10 build 14931 is the first release
    // that supports 16m/TrueColor.
    const osRelease = os.release().split('.')

    if (
      Number(process.versions.node.split('.')[0]) >= 8 &&
      Number(osRelease[0]) >= 10 &&
      Number(osRelease[2]) >= 10586
    ) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2
    }

    return 1
  }

  if ('CI' in env) {
    if (
      ['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(
        (sign) => sign in env
      ) ||
      env.CI_NAME === 'codeship'
    ) {
      return 1
    }

    return min
  }

  if ('TEAMCITY_VERSION' in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0
  }

  if (env.COLORTERM === 'truecolor') {
    return 3
  }

  if ('TERM_PROGRAM' in env) {
    const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10)

    switch (env.TERM_PROGRAM) {
      case 'iTerm.app':
        return version >= 3 ? 3 : 2

      case 'Apple_Terminal':
        return 2
      // No default
    }
  }

  if (/-256(color)?$/i.test(env.TERM)) {
    return 2
  }

  if (
    /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)
  ) {
    return 1
  }

  if ('COLORTERM' in env) {
    return 1
  }

  if (env.TERM === 'dumb') {
    return min
  }

  return min
}

function getSupportLevel(stream) {
  const level = supportsColor(stream)
  return translateLevel(level)
}

var supportsColor_1 = {
  supportsColor: getSupportLevel,
  stdout: getSupportLevel(process.stdout),
  stderr: getSupportLevel(process.stderr),
}

/**
 * Module dependencies.
 */

;(function (module, exports) {
  const tty = require$$0__default$2['default']
  const util = require$$1__default['default']
  /**
   * This is the Node.js implementation of `debug()`.
   */

  exports.init = init
  exports.log = log
  exports.formatArgs = formatArgs
  exports.save = save
  exports.load = load
  exports.useColors = useColors
  exports.destroy = util.deprecate(() => {},
  'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.')
  /**
   * Colors.
   */

  exports.colors = [6, 2, 3, 4, 5, 1]

  try {
    // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
    // eslint-disable-next-line import/no-extraneous-dependencies
    const supportsColor = supportsColor_1

    if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
      exports.colors = [
        20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63,
        68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128,
        129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168,
        169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200,
        201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221,
      ]
    }
  } catch (error) {
    // Swallow - we only care if `supports-color` is available; it doesn't have to be.
  }
  /**
   * Build up the default `inspectOpts` object from the environment variables.
   *
   *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
   */

  exports.inspectOpts = Object.keys(process.env)
    .filter((key) => {
      return /^debug_/i.test(key)
    })
    .reduce((obj, key) => {
      // Camel-case
      const prop = key
        .substring(6)
        .toLowerCase()
        .replace(/_([a-z])/g, (_, k) => {
          return k.toUpperCase()
        }) // Coerce string value into JS value

      let val = process.env[key]

      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false
      } else if (val === 'null') {
        val = null
      } else {
        val = Number(val)
      }

      obj[prop] = val
      return obj
    }, {})
  /**
   * Is stdout a TTY? Colored output is enabled when `true`.
   */

  function useColors() {
    return 'colors' in exports.inspectOpts
      ? Boolean(exports.inspectOpts.colors)
      : tty.isatty(process.stderr.fd)
  }
  /**
   * Adds ANSI color escape codes if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
    const {namespace: name, useColors} = this

    if (useColors) {
      const c = this.color
      const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c)
      const prefix = `  ${colorCode};1m${name} \u001B[0m`
      args[0] = prefix + args[0].split('\n').join('\n' + prefix)
      args.push(
        colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m'
      )
    } else {
      args[0] = getDate() + name + ' ' + args[0]
    }
  }

  function getDate() {
    if (exports.inspectOpts.hideDate) {
      return ''
    }

    return new Date().toISOString() + ' '
  }
  /**
   * Invokes `util.format()` with the specified arguments and writes to stderr.
   */

  function log(...args) {
    return process.stderr.write(util.format(...args) + '\n')
  }
  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */

  function save(namespaces) {
    if (namespaces) {
      process.env.DEBUG = namespaces
    } else {
      // If you set a process.env field to null or undefined, it gets cast to the
      // string 'null' or 'undefined'. Just delete instead.
      delete process.env.DEBUG
    }
  }
  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
    return process.env.DEBUG
  }
  /**
   * Init logic for `debug` instances.
   *
   * Create a new `inspectOpts` object in case `useColors` is set
   * differently for a particular `debug` instance.
   */

  function init(debug) {
    debug.inspectOpts = {}
    const keys = Object.keys(exports.inspectOpts)

    for (let i = 0; i < keys.length; i++) {
      debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]]
    }
  }

  module.exports = common$2(exports)
  const {formatters} = module.exports
  /**
   * Map %o to `util.inspect()`, all on a single line.
   */

  formatters.o = function (v) {
    this.inspectOpts.colors = this.useColors
    return util
      .inspect(v, this.inspectOpts)
      .split('\n')
      .map((str) => str.trim())
      .join(' ')
  }
  /**
   * Map %O to `util.inspect()`, allowing multiple lines if needed.
   */

  formatters.O = function (v) {
    this.inspectOpts.colors = this.useColors
    return util.inspect(v, this.inspectOpts)
  }
})(node, node.exports)

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (
  typeof process === 'undefined' ||
  process.type === 'renderer' ||
  process.browser === true ||
  process.__nwjs
) {
  src.exports = browser.exports
} else {
  src.exports = node.exports
}

var debug$1

var debug_1 = function () {
  if (!debug$1) {
    try {
      /* eslint global-require: off */
      debug$1 = src.exports('follow-redirects')
    } catch (error) {
      debug$1 = function () {
        /* */
      }
    }
  }

  debug$1.apply(null, arguments)
}

var url = require$$0__default['default']
var URL = url.URL
var http$1 = require$$0__default$3['default']
var https$1 = require$$1__default$1['default']
var Writable = require$$3__default['default'].Writable
var assert = require$$4__default['default']
var debug = debug_1 // Create handlers that pass events from native requests

var eventHandlers = Object.create(null)
;['abort', 'aborted', 'connect', 'error', 'socket', 'timeout'].forEach(
  function (event) {
    eventHandlers[event] = function (arg1, arg2, arg3) {
      this._redirectable.emit(event, arg1, arg2, arg3)
    }
  }
) // Error types with codes

var RedirectionError = createErrorType('ERR_FR_REDIRECTION_FAILURE', '')
var TooManyRedirectsError = createErrorType(
  'ERR_FR_TOO_MANY_REDIRECTS',
  'Maximum number of redirects exceeded'
)
var MaxBodyLengthExceededError = createErrorType(
  'ERR_FR_MAX_BODY_LENGTH_EXCEEDED',
  'Request body larger than maxBodyLength limit'
)
var WriteAfterEndError = createErrorType(
  'ERR_STREAM_WRITE_AFTER_END',
  'write after end'
) // An HTTP(S) request that can be redirected

function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this)

  this._sanitizeOptions(options)

  this._options = options
  this._ended = false
  this._ending = false
  this._redirectCount = 0
  this._redirects = []
  this._requestBodyLength = 0
  this._requestBodyBuffers = [] // Attach a callback if passed

  if (responseCallback) {
    this.on('response', responseCallback)
  } // React to responses of native requests

  var self = this

  this._onNativeResponse = function (response) {
    self._processResponse(response)
  } // Perform the first request

  this._performRequest()
}

RedirectableRequest.prototype = Object.create(Writable.prototype)

RedirectableRequest.prototype.abort = function () {
  // Abort the internal request
  this._currentRequest.removeAllListeners()

  this._currentRequest.on('error', noop)

  this._currentRequest.abort() // Abort this request

  this.emit('abort')
  this.removeAllListeners()
} // Writes buffered data to the current native request

RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Writing is not allowed if end has been called
  if (this._ending) {
    throw new WriteAfterEndError()
  } // Validate input and shift parameters if necessary

  if (
    !(
      typeof data === 'string' ||
      (typeof data === 'object' && 'length' in data)
    )
  ) {
    throw new TypeError('data should be a string, Buffer or Uint8Array')
  }

  if (typeof encoding === 'function') {
    callback = encoding
    encoding = null
  } // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066

  if (data.length === 0) {
    if (callback) {
      callback()
    }

    return
  } // Only write when we don't exceed the maximum body length

  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length

    this._requestBodyBuffers.push({
      data: data,
      encoding: encoding,
    })

    this._currentRequest.write(data, encoding, callback)
  } // Error when we exceed the maximum body length
  else {
    this.emit('error', new MaxBodyLengthExceededError())
    this.abort()
  }
} // Ends the current native request

RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (typeof data === 'function') {
    callback = data
    data = encoding = null
  } else if (typeof encoding === 'function') {
    callback = encoding
    encoding = null
  } // Write data if needed and end

  if (!data) {
    this._ended = this._ending = true

    this._currentRequest.end(null, null, callback)
  } else {
    var self = this
    var currentRequest = this._currentRequest
    this.write(data, encoding, function () {
      self._ended = true
      currentRequest.end(null, null, callback)
    })
    this._ending = true
  }
} // Sets a header value on the current native request

RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value

  this._currentRequest.setHeader(name, value)
} // Clears a header value on the current native request

RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name]

  this._currentRequest.removeHeader(name)
} // Global timeout for all underlying requests

RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
  var self = this

  if (callback) {
    this.on('timeout', callback)
  } // Sets up a timer to trigger a timeout event

  function startTimer() {
    if (self._timeout) {
      clearTimeout(self._timeout)
    }

    self._timeout = setTimeout(function () {
      self.emit('timeout')
      clearTimer()
    }, msecs)
  } // Prevent a timeout from triggering

  function clearTimer() {
    clearTimeout(this._timeout)

    if (callback) {
      self.removeListener('timeout', callback)
    }

    if (!this.socket) {
      self._currentRequest.removeListener('socket', startTimer)
    }
  } // Start the timer when the socket is opened

  if (this.socket) {
    startTimer()
  } else {
    this._currentRequest.once('socket', startTimer)
  }

  this.once('response', clearTimer)
  this.once('error', clearTimer)
  return this
} // Proxy all other public ClientRequest methods
;['flushHeaders', 'getHeader', 'setNoDelay', 'setSocketKeepAlive'].forEach(
  function (method) {
    RedirectableRequest.prototype[method] = function (a, b) {
      return this._currentRequest[method](a, b)
    }
  }
) // Proxy all public ClientRequest properties
;['aborted', 'connection', 'socket'].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () {
      return this._currentRequest[property]
    },
  })
})

RedirectableRequest.prototype._sanitizeOptions = function (options) {
  // Ensure headers are always present
  if (!options.headers) {
    options.headers = {}
  } // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.

  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host
    }

    delete options.host
  } // Complete the URL object when necessary

  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf('?')

    if (searchPos < 0) {
      options.pathname = options.path
    } else {
      options.pathname = options.path.substring(0, searchPos)
      options.search = options.path.substring(searchPos)
    }
  }
} // Executes the next native request (initial or redirect)

RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol
  var nativeProtocol = this._options.nativeProtocols[protocol]

  if (!nativeProtocol) {
    this.emit('error', new TypeError('Unsupported protocol ' + protocol))
    return
  } // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)

  if (this._options.agents) {
    var scheme = protocol.substr(0, protocol.length - 1)
    this._options.agent = this._options.agents[scheme]
  } // Create the native request

  var request = (this._currentRequest = nativeProtocol.request(
    this._options,
    this._onNativeResponse
  ))
  this._currentUrl = url.format(this._options) // Set up event handlers

  request._redirectable = this

  for (var event in eventHandlers) {
    /* istanbul ignore else */
    if (event) {
      request.on(event, eventHandlers[event])
    }
  } // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)

  if (this._isRedirect) {
    // Write the request entity and end.
    var i = 0
    var self = this
    var buffers = this._requestBodyBuffers

    ;(function writeNext(error) {
      // Only write if this request has not been redirected yet

      /* istanbul ignore else */
      if (request === self._currentRequest) {
        // Report any write errors

        /* istanbul ignore if */
        if (error) {
          self.emit('error', error)
        } // Write the next buffer if there are still left
        else if (i < buffers.length) {
          var buffer = buffers[i++]
          /* istanbul ignore else */

          if (!request.finished) {
            request.write(buffer.data, buffer.encoding, writeNext)
          }
        } // End the request if `end` has been called on us
        else if (self._ended) {
          request.end()
        }
      }
    })()
  }
} // Processes a response from the current native request

RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  var statusCode = response.statusCode

  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: statusCode,
    })
  } // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.

  var location = response.headers.location

  if (
    location &&
    this._options.followRedirects !== false &&
    statusCode >= 300 &&
    statusCode < 400
  ) {
    // Abort the current request
    this._currentRequest.removeAllListeners()

    this._currentRequest.on('error', noop)

    this._currentRequest.abort() // Discard the remainder of the response to avoid waiting for data

    response.destroy() // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).

    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit('error', new TooManyRedirectsError())
      return
    } // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe, […]
    // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
    // the request method from POST to GET for the subsequent request.

    if (
      ((statusCode === 301 || statusCode === 302) &&
        this._options.method === 'POST') || // RFC7231§6.4.4: The 303 (See Other) status code indicates that
      // the server is redirecting the user agent to a different resource […]
      // A user agent can perform a retrieval request targeting that URI
      // (a GET or HEAD request if using HTTP) […]
      (statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method))
    ) {
      this._options.method = 'GET' // Drop a possible entity and headers related to it

      this._requestBodyBuffers = []
      removeMatchingHeaders(/^content-/i, this._options.headers)
    } // Drop the Host header, as the redirect might lead to a different host

    var previousHostName =
      removeMatchingHeaders(/^host$/i, this._options.headers) ||
      url.parse(this._currentUrl).hostname // Create the redirected request

    var redirectUrl = url.resolve(this._currentUrl, location)
    debug('redirecting to', redirectUrl)
    this._isRedirect = true
    var redirectUrlParts = url.parse(redirectUrl)
    Object.assign(this._options, redirectUrlParts) // Drop the Authorization header if redirecting to another host

    if (redirectUrlParts.hostname !== previousHostName) {
      removeMatchingHeaders(/^authorization$/i, this._options.headers)
    } // Evaluate the beforeRedirect callback

    if (typeof this._options.beforeRedirect === 'function') {
      var responseDetails = {
        headers: response.headers,
      }

      try {
        this._options.beforeRedirect.call(null, this._options, responseDetails)
      } catch (err) {
        this.emit('error', err)
        return
      }

      this._sanitizeOptions(this._options)
    } // Perform the redirected request

    try {
      this._performRequest()
    } catch (cause) {
      var error = new RedirectionError(
        'Redirected request failed: ' + cause.message
      )
      error.cause = cause
      this.emit('error', error)
    }
  } else {
    // The response is not a redirect; return it as-is
    response.responseUrl = this._currentUrl
    response.redirects = this._redirects
    this.emit('response', response) // Clean up

    this._requestBodyBuffers = []
  }
} // Wraps the key/value object of protocols with redirect functionality

function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024,
  } // Wrap each protocol

  var nativeProtocols = {}
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ':'
    var nativeProtocol = (nativeProtocols[protocol] = protocols[scheme])
    var wrappedProtocol = (exports[scheme] = Object.create(nativeProtocol)) // Executes a request, following redirects

    function request(input, options, callback) {
      // Parse parameters
      if (typeof input === 'string') {
        var urlStr = input

        try {
          input = urlToOptions(new URL(urlStr))
        } catch (err) {
          /* istanbul ignore next */
          input = url.parse(urlStr)
        }
      } else if (URL && input instanceof URL) {
        input = urlToOptions(input)
      } else {
        callback = options
        options = input
        input = {
          protocol: protocol,
        }
      }

      if (typeof options === 'function') {
        callback = options
        options = null
      } // Set defaults

      options = Object.assign(
        {
          maxRedirects: exports.maxRedirects,
          maxBodyLength: exports.maxBodyLength,
        },
        input,
        options
      )
      options.nativeProtocols = nativeProtocols
      assert.equal(options.protocol, protocol, 'protocol mismatch')
      debug('options', options)
      return new RedirectableRequest(options, callback)
    } // Executes a GET request, following redirects

    function get(input, options, callback) {
      var wrappedRequest = wrappedProtocol.request(input, options, callback)
      wrappedRequest.end()
      return wrappedRequest
    } // Expose the properties on the wrapped protocol

    Object.defineProperties(wrappedProtocol, {
      request: {
        value: request,
        configurable: true,
        enumerable: true,
        writable: true,
      },
      get: {
        value: get,
        configurable: true,
        enumerable: true,
        writable: true,
      },
    })
  })
  return exports
}
/* istanbul ignore next */

function noop() {
  /* empty */
} // from https://github.com/nodejs/node/blob/master/lib/internal/url.js

function urlToOptions(urlObject) {
  var options = {
    protocol: urlObject.protocol,
    hostname: urlObject.hostname.startsWith('[')
      ? /* istanbul ignore next */
        urlObject.hostname.slice(1, -1)
      : urlObject.hostname,
    hash: urlObject.hash,
    search: urlObject.search,
    pathname: urlObject.pathname,
    path: urlObject.pathname + urlObject.search,
    href: urlObject.href,
  }

  if (urlObject.port !== '') {
    options.port = Number(urlObject.port)
  }

  return options
}

function removeMatchingHeaders(regex, headers) {
  var lastValue

  for (var header in headers) {
    if (regex.test(header)) {
      lastValue = headers[header]
      delete headers[header]
    }
  }

  return lastValue
}

function createErrorType(code, defaultMessage) {
  function CustomError(message) {
    Error.captureStackTrace(this, this.constructor)
    this.message = message || defaultMessage
  }

  CustomError.prototype = new Error()
  CustomError.prototype.constructor = CustomError
  CustomError.prototype.name = 'Error [' + code + ']'
  CustomError.prototype.code = code
  return CustomError
} // Exports

followRedirects$1.exports = wrap({
  http: http$1,
  https: https$1,
})
followRedirects$1.exports.wrap = wrap

var httpNative = require$$0__default$3['default'],
  httpsNative = require$$1__default$1['default'],
  web_o = webOutgoing,
  common$1 = common$4,
  followRedirects = followRedirects$1.exports
web_o = Object.keys(web_o).map(function (pass) {
  return web_o[pass]
})
var nativeAgents = {
  http: httpNative,
  https: httpsNative,
}
/*!
 * Array of passes.
 *
 * A `pass` is just a function that is executed on `req, res, options`
 * so that you can easily add new checks while still keeping the base
 * flexible.
 */

var webIncoming = {
  /**
   * Sets `content-length` to '0' if request is of DELETE type.
   *
   * @param {ClientRequest} Req Request object
   * @param {IncomingMessage} Res Response object
   * @param {Object} Options Config object passed to the proxy
   *
   * @api private
   */
  deleteLength: function deleteLength(req, res, options) {
    if (
      (req.method === 'DELETE' || req.method === 'OPTIONS') &&
      !req.headers['content-length']
    ) {
      req.headers['content-length'] = '0'
      delete req.headers['transfer-encoding']
    }
  },

  /**
   * Sets timeout in request socket if it was specified in options.
   *
   * @param {ClientRequest} Req Request object
   * @param {IncomingMessage} Res Response object
   * @param {Object} Options Config object passed to the proxy
   *
   * @api private
   */
  timeout: function timeout(req, res, options) {
    if (options.timeout) {
      req.socket.setTimeout(options.timeout)
    }
  },

  /**
   * Sets `x-forwarded-*` headers if specified in config.
   *
   * @param {ClientRequest} Req Request object
   * @param {IncomingMessage} Res Response object
   * @param {Object} Options Config object passed to the proxy
   *
   * @api private
   */
  XHeaders: function XHeaders(req, res, options) {
    if (!options.xfwd) return
    var encrypted = req.isSpdy || common$1.hasEncryptedConnection(req)
    var values = {
      for: req.connection.remoteAddress || req.socket.remoteAddress,
      port: common$1.getPort(req),
      proto: encrypted ? 'https' : 'http',
    }
    ;['for', 'port', 'proto'].forEach(function (header) {
      req.headers['x-forwarded-' + header] =
        (req.headers['x-forwarded-' + header] || '') +
        (req.headers['x-forwarded-' + header] ? ',' : '') +
        values[header]
    })
    req.headers['x-forwarded-host'] =
      req.headers['x-forwarded-host'] || req.headers['host'] || ''
  },

  /**
   * Does the actual proxying. If `forward` is enabled fires up
   * a ForwardStream, same happens for ProxyStream. The request
   * just dies otherwise.
   *
   * @param {ClientRequest} Req Request object
   * @param {IncomingMessage} Res Response object
   * @param {Object} Options Config object passed to the proxy
   *
   * @api private
   */
  stream: function stream(req, res, options, _, server, clb) {
    // And we begin!
    server.emit('start', req, res, options.target || options.forward)
    var agents = options.followRedirects ? followRedirects : nativeAgents
    var http = agents.http
    var https = agents.https

    if (options.forward) {
      // If forward enable, so just pipe the request
      var forwardReq = (
        options.forward.protocol === 'https:' ? https : http
      ).request(
        common$1.setupOutgoing(options.ssl || {}, options, req, 'forward')
      ) // error handler (e.g. ECONNRESET, ECONNREFUSED)
      // Handle errors on incoming request as well as it makes sense to

      var forwardError = createErrorHandler(forwardReq, options.forward)
      req.on('error', forwardError)
      forwardReq.on('error', forwardError)
      ;(options.buffer || req).pipe(forwardReq)

      if (!options.target) {
        return res.end()
      }
    } // Request initalization

    var proxyReq = (
      options.target.protocol === 'https:' ? https : http
    ).request(common$1.setupOutgoing(options.ssl || {}, options, req)) // Enable developers to modify the proxyReq before headers are sent

    proxyReq.on('socket', function (socket) {
      if (server && !proxyReq.getHeader('expect')) {
        server.emit('proxyReq', proxyReq, req, res, options)
      }
    }) // allow outgoing socket to timeout so that we could
    // show an error page at the initial request

    if (options.proxyTimeout) {
      proxyReq.setTimeout(options.proxyTimeout, function () {
        proxyReq.abort()
      })
    } // Ensure we abort proxy if request is aborted

    req.on('aborted', function () {
      proxyReq.abort()
    }) // handle errors in proxy and incoming request, just like for forward proxy

    var proxyError = createErrorHandler(proxyReq, options.target)
    req.on('error', proxyError)
    proxyReq.on('error', proxyError)

    function createErrorHandler(proxyReq, url) {
      return function proxyError(err) {
        if (req.socket.destroyed && err.code === 'ECONNRESET') {
          server.emit('econnreset', err, req, res, url)
          return proxyReq.abort()
        }

        if (clb) {
          clb(err, req, res, url)
        } else {
          server.emit('error', err, req, res, url)
        }
      }
    }

    ;(options.buffer || req).pipe(proxyReq)
    proxyReq.on('response', function (proxyRes) {
      if (server) {
        server.emit('proxyRes', proxyRes, req, res)
      }

      if (!res.headersSent && !options.selfHandleResponse) {
        for (var i = 0; i < web_o.length; i++) {
          if (web_o[i](req, res, proxyRes, options)) {
            break
          }
        }
      }

      if (!res.finished) {
        // Allow us to listen when the proxy has completed
        proxyRes.on('end', function () {
          if (server) server.emit('end', req, res, proxyRes)
        }) // We pipe to the response unless its expected to be handled by the user

        if (!options.selfHandleResponse) proxyRes.pipe(res)
      } else {
        if (server) server.emit('end', req, res, proxyRes)
      }
    })
  },
}

var http = require$$0__default$3['default'],
  https = require$$1__default$1['default'],
  common = common$4
/*!
 * Array of passes.
 *
 * A `pass` is just a function that is executed on `req, socket, options`
 * so that you can easily add new checks while still keeping the base
 * flexible.
 */

/*
 * Websockets Passes
 *
 */

var wsIncoming = {
  /**
   * WebSocket requests must have the `GET` method and
   * the `upgrade:websocket` header
   *
   * @param {ClientRequest} Req Request object
   * @param {Socket} Websocket
   *
   * @api private
   */
  checkMethodAndHeader: function checkMethodAndHeader(req, socket) {
    if (req.method !== 'GET' || !req.headers.upgrade) {
      socket.destroy()
      return true
    }

    if (req.headers.upgrade.toLowerCase() !== 'websocket') {
      socket.destroy()
      return true
    }
  },

  /**
   * Sets `x-forwarded-*` headers if specified in config.
   *
   * @param {ClientRequest} Req Request object
   * @param {Socket} Websocket
   * @param {Object} Options Config object passed to the proxy
   *
   * @api private
   */
  XHeaders: function XHeaders(req, socket, options) {
    if (!options.xfwd) return
    var values = {
      for: req.connection.remoteAddress || req.socket.remoteAddress,
      port: common.getPort(req),
      proto: common.hasEncryptedConnection(req) ? 'wss' : 'ws',
    }
    ;['for', 'port', 'proto'].forEach(function (header) {
      req.headers['x-forwarded-' + header] =
        (req.headers['x-forwarded-' + header] || '') +
        (req.headers['x-forwarded-' + header] ? ',' : '') +
        values[header]
    })
  },

  /**
   * Does the actual proxying. Make the request and upgrade it
   * send the Switching Protocols request and pipe the sockets.
   *
   * @param {ClientRequest} Req Request object
   * @param {Socket} Websocket
   * @param {Object} Options Config object passed to the proxy
   *
   * @api private
   */
  stream: function stream(req, socket, options, head, server, clb) {
    var createHttpHeader = function (line, headers) {
      return (
        Object.keys(headers)
          .reduce(
            function (head, key) {
              var value = headers[key]

              if (!Array.isArray(value)) {
                head.push(key + ': ' + value)
                return head
              }

              for (var i = 0; i < value.length; i++) {
                head.push(key + ': ' + value[i])
              }

              return head
            },
            [line]
          )
          .join('\r\n') + '\r\n\r\n'
      )
    }

    common.setupSocket(socket)
    if (head && head.length) socket.unshift(head)
    var proxyReq = (
      common.isSSL.test(options.target.protocol) ? https : http
    ).request(common.setupOutgoing(options.ssl || {}, options, req)) // Enable developers to modify the proxyReq before headers are sent

    if (server) {
      server.emit('proxyReqWs', proxyReq, req, socket, options, head)
    } // Error Handler

    proxyReq.on('error', onOutgoingError)
    proxyReq.on('response', function (res) {
      // if upgrade event isn't going to happen, close the socket
      if (!res.upgrade) {
        socket.write(
          createHttpHeader(
            'HTTP/' +
              res.httpVersion +
              ' ' +
              res.statusCode +
              ' ' +
              res.statusMessage,
            res.headers
          )
        )
        res.pipe(socket)
      }
    })
    proxyReq.on('upgrade', function (proxyRes, proxySocket, proxyHead) {
      proxySocket.on('error', onOutgoingError) // Allow us to listen when the websocket has completed

      proxySocket.on('end', function () {
        server.emit('close', proxyRes, proxySocket, proxyHead)
      }) // The pipe below will end proxySocket if socket closes cleanly, but not
      // if it errors (eg, vanishes from the net and starts returning
      // EHOSTUNREACH). We need to do that explicitly.

      socket.on('error', function () {
        proxySocket.end()
      })
      common.setupSocket(proxySocket)
      if (proxyHead && proxyHead.length) proxySocket.unshift(proxyHead) //
      // Remark: Handle writing the headers to the socket when switching protocols
      // Also handles when a header is an array
      //

      socket.write(
        createHttpHeader('HTTP/1.1 101 Switching Protocols', proxyRes.headers)
      )
      proxySocket.pipe(socket).pipe(proxySocket)
      server.emit('open', proxySocket)
      server.emit('proxySocket', proxySocket) //DEPRECATED.
    })
    return proxyReq.end() // XXX: CHECK IF THIS IS THIS CORRECT

    function onOutgoingError(err) {
      if (clb) {
        clb(err, req, socket)
      } else {
        server.emit('error', err, req, socket)
      }

      socket.end()
    }
  },
}

;(function (module) {
  var httpProxy = module.exports,
    extend = require$$1__default['default']._extend,
    parse_url = require$$0__default['default'].parse,
    EE3 = eventemitter3.exports,
    http = require$$0__default$3['default'],
    https = require$$1__default$1['default'],
    web = webIncoming,
    ws = wsIncoming
  httpProxy.Server = ProxyServer
  /**
   * Returns a function that creates the loader for
   * either `ws` or `web`'s  passes.
   *
   * Examples:
   *
   *    httpProxy.createRightProxy('ws')
   *    // => [Function]
   *
   * @param {String} Type Either 'ws' or 'web'
   *
   * @return {Function} Loader Function that when called returns an iterator for the right passes
   *
   * @api private
   */

  function createRightProxy(type) {
    return function (options) {
      return function (
        req,
        res
        /*, [head], [opts] */
      ) {
        var passes = type === 'ws' ? this.wsPasses : this.webPasses,
          args = [].slice.call(arguments),
          cntr = args.length - 1,
          head,
          cbl
        /* optional args parse begin */

        if (typeof args[cntr] === 'function') {
          cbl = args[cntr]
          cntr--
        }

        var requestOptions = options

        if (!(args[cntr] instanceof Buffer) && args[cntr] !== res) {
          //Copy global options
          requestOptions = extend({}, options) //Overwrite with request options

          extend(requestOptions, args[cntr])
          cntr--
        }

        if (args[cntr] instanceof Buffer) {
          head = args[cntr]
        }
        /* optional args parse end */

        ;['target', 'forward'].forEach(function (e) {
          if (typeof requestOptions[e] === 'string')
            requestOptions[e] = parse_url(requestOptions[e])
        })

        if (!requestOptions.target && !requestOptions.forward) {
          return this.emit(
            'error',
            new Error('Must provide a proper URL as target')
          )
        }

        for (var i = 0; i < passes.length; i++) {
          /**
           * Call of passes functions
           * pass(req, res, options, head)
           *
           * In WebSockets case the `res` variable
           * refer to the connection socket
           * pass(req, socket, options, head)
           */
          if (passes[i](req, res, requestOptions, head, this, cbl)) {
            // passes can return a truthy value to halt the loop
            break
          }
        }
      }
    }
  }

  httpProxy.createRightProxy = createRightProxy

  function ProxyServer(options) {
    EE3.call(this)
    options = options || {}
    options.prependPath = options.prependPath === false ? false : true
    this.web = this.proxyRequest = createRightProxy('web')(options)
    this.ws = this.proxyWebsocketRequest = createRightProxy('ws')(options)
    this.options = options
    this.webPasses = Object.keys(web).map(function (pass) {
      return web[pass]
    })
    this.wsPasses = Object.keys(ws).map(function (pass) {
      return ws[pass]
    })
    this.on('error', this.onError, this)
  }

  require$$1__default['default'].inherits(ProxyServer, EE3)

  ProxyServer.prototype.onError = function (err) {
    //
    // Remark: Replicate node core behavior using EE3
    // so we force people to handle their own errors
    //
    if (this.listeners('error').length === 1) {
      throw err
    }
  }

  ProxyServer.prototype.listen = function (port, hostname) {
    var self = this,
      closure = function (req, res) {
        self.web(req, res)
      }

    this._server = this.options.ssl
      ? https.createServer(this.options.ssl, closure)
      : http.createServer(closure)

    if (this.options.ws) {
      this._server.on('upgrade', function (req, socket, head) {
        self.ws(req, socket, head)
      })
    }

    this._server.listen(port, hostname)

    return this
  }

  ProxyServer.prototype.close = function (callback) {
    var self = this

    if (this._server) {
      this._server.close(done)
    } // Wrap callback to nullify server after all open connections are closed.

    function done() {
      self._server = null

      if (callback) {
        callback.apply(null, arguments)
      }
    }
  }

  ProxyServer.prototype.before = function (type, passName, callback) {
    if (type !== 'ws' && type !== 'web') {
      throw new Error('type must be `web` or `ws`')
    }

    var passes = type === 'ws' ? this.wsPasses : this.webPasses,
      i = false
    passes.forEach(function (v, idx) {
      if (v.name === passName) i = idx
    })
    if (i === false) throw new Error('No such pass')
    passes.splice(i, 0, callback)
  }

  ProxyServer.prototype.after = function (type, passName, callback) {
    if (type !== 'ws' && type !== 'web') {
      throw new Error('type must be `web` or `ws`')
    }

    var passes = type === 'ws' ? this.wsPasses : this.webPasses,
      i = false
    passes.forEach(function (v, idx) {
      if (v.name === passName) i = idx
    })
    if (i === false) throw new Error('No such pass')
    passes.splice(i++, 0, callback)
  }
})(httpProxy$3)

var ProxyServer = httpProxy$3.exports.Server
/**
 * Creates the proxy server.
 *
 * Examples:
 *
 *    httpProxy.createProxyServer({ .. }, 8000)
 *    // => '{ web: [Function], ws: [Function] ... }'
 *
 * @param {Object} Options Config object passed to the proxy
 *
 * @return {Object} Proxy Proxy object with handlers for `ws` and `web` requests
 *
 * @api public
 */

function createProxyServer(options) {
  /*
   *  `options` is needed and it must have the following layout:
   *
   *  {
   *    target : <url string to be parsed with the url module>
   *    forward: <url string to be parsed with the url module>
   *    agent  : <object to be passed to http(s).request>
   *    ssl    : <object to be passed to https.createServer()>
   *    ws     : <true/false, if you want to proxy websockets>
   *    xfwd   : <true/false, adds x-forward headers>
   *    secure : <true/false, verify SSL certificate>
   *    toProxy: <true/false, explicitly specify if we are proxying to another proxy>
   *    prependPath: <true/false, Default: true - specify whether you want to prepend the target's path to the proxy path>
   *    ignorePath: <true/false, Default: false - specify whether you want to ignore the proxy path of the incoming request>
   *    localAddress : <Local interface string to bind for outgoing connections>
   *    changeOrigin: <true/false, Default: false - changes the origin of the host header to the target URL>
   *    preserveHeaderKeyCase: <true/false, Default: false - specify whether you want to keep letter case of response header key >
   *    auth   : Basic authentication i.e. 'user:password' to compute an Authorization header.
   *    hostRewrite: rewrites the location hostname on (201/301/302/307/308) redirects, Default: null.
   *    autoRewrite: rewrites the location host/port on (201/301/302/307/308) redirects based on requested host/port. Default: false.
   *    protocolRewrite: rewrites the location protocol on (201/301/302/307/308) redirects to 'http' or 'https'. Default: null.
   *  }
   *
   *  NOTE: `options.ws` and `options.ssl` are optional.
   *    `options.target and `options.forward` cannot be
   *    both missing
   *  }
   */
  return new ProxyServer(options)
}

ProxyServer.createProxyServer = createProxyServer
ProxyServer.createServer = createProxyServer
ProxyServer.createProxy = createProxyServer
/**
 * Export the proxy "Server" as the main export.
 */

var httpProxy$2 = ProxyServer

/*!
 * Caron dimonio, con occhi di bragia
 * loro accennando, tutte le raccoglie;
 * batte col remo qualunque s’adagia
 *
 * Charon the demon, with the eyes of glede,
 * Beckoning to them, collects them all together,
 * Beats with his oar whoever lags behind
 *
 *          Dante - The Divine Comedy (Canto III)
 */
var httpProxy$1 = httpProxy$2

/**
 * @fileOverview 负责读取 server.conf 转发规则。
 *
 * 支持 rewrite redirect 两种重定向规则。
 *
 * ```
 * rewrite ^\/testpage /example/page/testpage
 *
 * rewrite ^\/ajaxHander /test/page/ajaxHandler.js
 * rewrite ^\/somejsonfile /test/page/data.json
 * ```
 */
var fs$2 = require$$1__default$2['default']
var parseUrl = require$$0__default['default'].parse
var httpProxy = httpProxy$1

function escapeHtml(html) {
  return String(html)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function rewriteParser(file) {
  var rules = []

  function Ruler(type, reg, to) {
    return {
      type: type,
      reg: reg,
      to: to,
    }
  }

  if (!Array.isArray(file)) {
    file = [file]
  }
  file.forEach(function (file) {
    if (!fs$2.existsSync(file)) {
      return null
    }

    var content = fs$2.readFileSync(file, 'utf-8')
    var lines = content.split(/\r\n|\n/)
    var rrule = /^(rewrite|redirect|proxy)\s+([^\s]+)\s+([^\s]+)$/i
    lines.forEach(function (line) {
      var m = rrule.exec(line)

      if (!m) {
        return
      }

      rules.push(new Ruler(m[1].toLowerCase(), new RegExp(m[2], 'i'), m[3]))
    })
  })
  return {
    match: function (url) {
      var found
      var arr = [url.path, url.pathname]
      rules.every(function (ruler) {
        arr.every(function (url) {
          var m = url.match(ruler.reg)

          if (m) {
            found = ruler
            found.match = m
            return false
          }

          return !found
        })
        return !found
      })
      return found
    },
  }
}

var rewrite = function (options) {
  var file = options.rewrite_file
  var parser // todo cache the file.

  function lazyload() {
    // 每次都加载好了，server.conf 有可能经常改动。
    parser =
      /*parser || */
      rewriteParser(file)
  }

  var proxy = httpProxy.createProxyServer({
    changeOrigin: true,
    autoRewrite: true,
  })
  proxy.on('error', function (error, req, res) {
    var json
    console.log('proxy error', error)

    if (!res.headersSent) {
      res.writeHead(500, {
        'content-type': 'application/json',
      })
    }

    json = {
      error: 'proxy_error',
      reason: error.message,
    }
    res.end(JSON.stringify(json))
  })
  return function (req, res, next) {
    lazyload()
    var url = parseUrl(req.url)
    var ruler = parser && parser.match(url)

    if (ruler) {
      var to = ruler.to.replace(/\$(\d+)/g, function (all, index) {
        return ruler.match[index] || ''
      })

      switch (ruler.type) {
        case 'rewrite':
          req.originalUrl = req.originalUrl || req.url
          req.url = to
          break

        case 'proxy':
          var target = parseUrl(to)
          req.originalUrl = req.originalUrl || req.url
          req.url =
            target.path +
            (target.search
              ? url.query
                ? '&' + url.query
                : ''
              : url.search || '')
          proxy.web(req, res, {
            target: target.protocol + '//' + target.host,
          })
          return

        case 'redirect':
        default:
          res.statusCode = 303
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.setHeader('Location', to)
          res.end(
            'Redirecting to <a href="' +
              escapeHtml(to) +
              '">' +
              escapeHtml(to) +
              '</a>\n'
          )
          return
      }
    }

    next()
  }
}

/**
 * @fileOverview 提供预览 tpl 页面功能
 * 数据自动关联 test/ns/xxx.json 文件。
 * 同时后续再关联 test/ns/xxx.js 文件进行动态补充。
 *
 * 比如: 预览 ns/page/index.tpl 页面时。
 * 数据来源自动读取自 test/ns/page/index.json
 * 同时 test/ns/page/index.js 脚本可以对数据进行进一步动态扩展。
 */
var path$1 = path__default['default']
var fs$1 = require$$1__default$2['default']

function mixin(a, b) {
  if (a && b) {
    for (var key in b) {
      a[key] = b[key]
    }
  }

  return a
}

var preview = function (options) {
  var rpage = /^\/([\w0-9_\-]+)\/page\/(.*)$/i
  var tplroot = path$1.resolve(options.view_path)
  var dirs = Array.isArray(options.data_path)
    ? options.data_path
    : [options.data_path]
  dirs = dirs.map(function (dir) {
    return path$1.resolve(dir)
  })

  function previewPage(ns, page, req, res, next) {
    var tplfile, jsonfile, jsfile, m
    var data = {}
    var rendered = false
    m = /^(.*)\.tpl$/i.exec(page)

    if (m) {
      page = m[1]
    }

    tplfile = path$1.join(tplroot, ns, page + '.tpl')

    if (!fs$1.existsSync(tplfile)) {
      return next()
    }

    dirs.every(function (dir) {
      var filepath = path$1.join(dir, ns, 'page', page + '.json')

      if (fs$1.existsSync(filepath)) {
        jsonfile = filepath
      }

      return !jsonfile
    })

    if (jsonfile) {
      try {
        delete require.cache[require.resolve(jsonfile)]
        data = commonjsRequire(jsonfile)
      } catch (err) {
        data = {}
      }
    }

    render = function (locals) {
      if (rendered) {
        return
      }

      rendered = true
      var tpl = ns + '/' + page + '.tpl'
      locals && mixin(data, locals)
      res.render(tpl, data)
    }

    jsfile = path$1.join(dataroot, ns, 'page', page + '.js')

    if (fs$1.existsSync(jsfile)) {
      delete require.cache[require.resolve(jsfile)]
      res.locals = res.locals || {}
      res.locals = mixin(res.locals, data)
      commonjsRequire(jsfile)(req, res, render)
    } else {
      render(data)
    }
  }

  return function (req, res, next) {
    var url = req.url
    var match = rpage.exec(url) // 如果页面满足  namespace/page/xxxx 这样的路径规则。

    if (match) {
      previewPage(match[1], match[2], req, res, next)
    } else {
      next()
    }
  }
}

/**
 * @fileOverview 添加 js 脚本页面功能。
 * 让 test 目录的 js 脚本能够想 jsp, php 脚本一样运行。
 */
var path = path__default['default']
var fs = require$$1__default$2['default']

var script = function (options) {
  var dataroot = options.data_path
  var rpage = /^\/(?:test|mock)\/(.*\.(js|json))(?:$|\?)/i

  function execScript(page, type, req, res, next) {
    var dirs = Array.isArray(dataroot) ? dataroot : [dataroot]
    var file
    dirs.every(function (dir) {
      var filepath = path.join(dir, page)

      if (fs.existsSync(filepath)) {
        file = filepath
      }

      return !file
    }) // 文件不存在，则跳过。

    if (!file) {
      return next()
    }

    if (type === 'js') {
      try {
        delete require.cache[require.resolve(file)]
        commonjsRequire(file)(req, res, next)
      } catch (err) {
        next(err)
      }
    } else {
      fs.readFile(file, function (err, buf) {
        if (err) return next(err)
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Content-Length': buf.length,
        })
        res.end(buf)
      })
    }
  }

  return function (req, res, next) {
    var url = req.url
    var match = rpage.exec(url)

    if (match) {
      execScript(match[1], match[2], req, res, next)
    } else {
      next()
    }
  }
}

function mock$1(root) {
  var options = {
    view_path: '',
    // 避免报错。
    rewrite_file: [
      path__default['default'].join(root, 'server.conf'),
      path__default['default'].join(root, 'config', 'server.conf'),
      path__default['default'].join(root, 'mock', 'server.conf'),
    ],
    data_path: [
      path__default['default'].join(root, 'test'),
      path__default['default'].join(root, 'mock'),
    ],
  }
  return function (request, response, next) {
    ;[
      rewrite(options),
      bodyParser__default['default'].urlencoded({
        extended: false,
      }),
      bodyParser__default['default'].json(),
      preview(options),
      script(options),
    ].reduceRight(function (next, middleware) {
      return function () {
        middleware(request, response, next)
      }
    }, next)()
  }
}

function getMiddleware(name, handler) {
  return function () {
    return {
      route: '',
      handle: handler.apply(void 0, arguments),
      id: 'Browsersync '.concat(name, ' Middleware'),
    }
  }
}

var middleware = {
  logger: getMiddleware('Logger', morgan__default['default']),
  mock: getMiddleware('Mock', mock$1),
  directory: function directory(root) {
    return getMiddleware(
      'Server Directory',
      serveDirectory__default['default']
    )(root, serveDirectoryThemeOcticons__default['default'])
  },
}

var mock = middleware.mock,
  logger = middleware.logger,
  directory = middleware.directory
var defaultOptions = merge__default['default']({}, defaultConfig, {
  server: {
    directory: true,
  },
  watchEvents: ['change', 'add', 'addDir', 'unlink', 'unlinkDir'],
  ghostMode: false,
  reloadDebounce: 500,
  notify: false,
  online: false,
})
var overrideOptions = {
  open: false,
  snippetOptions: {
    rule: {
      match: /<\/body>|<!--\s*browser-sync-script\s*-->/i,
      fn: function fn(snippet, match) {
        return snippet + match
      },
    },
  },
}

function getType(object) {
  return Object.prototype.toString.call(object).slice(8, -1)
}

function getUserConfig(path) {
  var config = {}

  try {
    config = require(path)

    if (!config.server || getType(config.server) === 'String') {
      config.server = {
        directory: true,
      }
    }

    delete config.port
  } catch (_unused) {}

  return config
}

function parseMiddleware(middleware) {
  var type = getType(middleware)

  if (type !== 'Array') {
    if (type === 'Boolean') {
      return []
    }

    return [middleware]
  }

  return middleware
}

function getConfig(bs, argv) {
  var userConfig = getUserConfig(
    path__default['default'].resolve(
      argv.context,
      argv.bsConfig || bs.instance.config.userFile
    )
  )
  var config = merge__default['default'](
    {},
    defaultOptions,
    userConfig,
    overrideOptions,
    {
      server: {
        baseDir: argv.root,
      },
      port: argv.port, // https: argv.https
    }
  )
  config.middleware = parseMiddleware(config.middleware)
  config.middleware.push(
    // logger
    logger('short'), // mock
    mock(argv.root)
  ) // serveDirectory

  if (config.server && config.server.directory) {
    config.middleware.push(directory(argv.root))
    config.server.directory = false
  }

  return config
}

var argv = yargs__default['default'].argv
startServer(argv)

function now() {
  var d = new Date()
  var string = [d.getHours(), d.getMinutes(), d.getSeconds()]
    .join(':')
    .replace(/\b\d\b/g, '0$&')
  string += '.'.concat('00'.concat(d.getMilliseconds()).slice(-3))
  return string
}

function logEvent(event, path) {
  console.log('%s %s: %s', now(), '         '.concat(event).slice(-9), path)
}

function onInit(config) {
  return function () {
    console.log(
      'Listening on %s://127.0.0.1:%d',
      config.https ? 'https' : 'http',
      config.port
    )
  }
}

function watch(bs, root) {
  return function (event, file) {
    var relativePath = path__default['default'].relative(root, file)

    if (
      !relativePath ||
      relativePath === 'server.log' ||
      /(^|[/\\])[._]./.test(relativePath)
    ) {
      return
    }

    bs.reload(file)
    logEvent(event, relativePath)
  }
}

function signalTerminate(bs) {
  process.on('SIGTERM', function () {
    console.log('Recive quit signal in worker %s.', process.pid)
    bs.exit()
  })
}

function replaceScriptTag(bs) {
  // replace scriptTag template with mine
  bs.instance.config.templates.scriptTag = path__default['default'].join(
    __dirname,
    'templates/script-tags.tmpl'
  )
}

function startServer(argv) {
  var bs = browserSync__default['default'].create()
  var bsConfig = getConfig(bs, argv)
  bs.exit()
  bs.init(bsConfig, onInit(bsConfig))
  bs.watch(argv.root, watch(bs, argv.root))
  replaceScriptTag(bs)
  signalTerminate(bs)
}
