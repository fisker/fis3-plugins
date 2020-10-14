'use strict'

var htmlhint = require('htmlhint')
var fs = require('fs')
var path$1 = require('path')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {default: e}
}

var fs__default = /*#__PURE__*/ _interopDefaultLegacy(fs)
var path__default = /*#__PURE__*/ _interopDefaultLegacy(path$1)

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

function createCommonjsModule(fn, basedir, module) {
  return (
    (module = {
      path: basedir,
      exports: {},
      require: function (path, base) {
        return commonjsRequire(
          path,
          base === undefined || base === null ? module.path : base
        )
      },
    }),
    fn(module, module.exports),
    module.exports
  )
}

function commonjsRequire() {
  throw new Error(
    'Dynamic requires are not currently supported by @rollup/plugin-commonjs'
  )
}

var check = function (it) {
  return it && it.Math == Math && it
} // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028

var global_1 = // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func
  Function('return this')()

var fails = function (exec) {
  try {
    return !!exec()
  } catch (error) {
    return true
  }
}

var descriptors = !fails(function () {
  return (
    Object.defineProperty({}, 1, {
      get: function () {
        return 7
      },
    })[1] != 7
  )
})

var nativePropertyIsEnumerable = {}.propertyIsEnumerable
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor // Nashorn ~ JDK8 bug

var NASHORN_BUG =
  getOwnPropertyDescriptor &&
  !nativePropertyIsEnumerable.call(
    {
      1: 2,
    },
    1
  ) // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

var f = NASHORN_BUG
  ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor(this, V)
      return !!descriptor && descriptor.enumerable
    }
  : nativePropertyIsEnumerable
var objectPropertyIsEnumerable = {
  f: f,
}

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value,
  }
}

var toString = {}.toString

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1)
}

var split = ''.split // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0)
})
  ? function (it) {
      return classofRaw(it) == 'String' ? split.call(it, '') : Object(it)
    }
  : Object

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it)
  return it
}

var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it))
}

var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function'
}

// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string

var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input
  var fn, val
  if (
    PREFERRED_STRING &&
    typeof (fn = input.toString) == 'function' &&
    !isObject((val = fn.call(input)))
  )
    return val
  if (
    typeof (fn = input.valueOf) == 'function' &&
    !isObject((val = fn.call(input)))
  )
    return val
  if (
    !PREFERRED_STRING &&
    typeof (fn = input.toString) == 'function' &&
    !isObject((val = fn.call(input)))
  )
    return val
  throw TypeError("Can't convert object to primitive value")
}

var hasOwnProperty = {}.hasOwnProperty

var has = function (it, key) {
  return hasOwnProperty.call(it, key)
}

var document = global_1.document // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement)

var documentCreateElement = function (it) {
  return EXISTS ? document.createElement(it) : {}
}

var ie8DomDefine =
  !descriptors &&
  !fails(function () {
    return (
      Object.defineProperty(documentCreateElement('div'), 'a', {
        get: function () {
          return 7
        },
      }).a != 7
    )
  })

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

var f$1 = descriptors
  ? nativeGetOwnPropertyDescriptor
  : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject(O)
      P = toPrimitive(P, true)
      if (ie8DomDefine)
        try {
          return nativeGetOwnPropertyDescriptor(O, P)
        } catch (error) {
          /* empty */
        }
      if (has(O, P))
        return createPropertyDescriptor(
          !objectPropertyIsEnumerable.f.call(O, P),
          O[P]
        )
    }
var objectGetOwnPropertyDescriptor = {
  f: f$1,
}

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object')
  }

  return it
}

var nativeDefineProperty = Object.defineProperty // `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty

var f$2 = descriptors
  ? nativeDefineProperty
  : function defineProperty(O, P, Attributes) {
      anObject(O)
      P = toPrimitive(P, true)
      anObject(Attributes)
      if (ie8DomDefine)
        try {
          return nativeDefineProperty(O, P, Attributes)
        } catch (error) {
          /* empty */
        }
      if ('get' in Attributes || 'set' in Attributes)
        throw TypeError('Accessors not supported')
      if ('value' in Attributes) O[P] = Attributes.value
      return O
    }
var objectDefineProperty = {
  f: f$2,
}

var createNonEnumerableProperty = descriptors
  ? function (object, key, value) {
      return objectDefineProperty.f(
        object,
        key,
        createPropertyDescriptor(1, value)
      )
    }
  : function (object, key, value) {
      object[key] = value
      return object
    }

var setGlobal = function (key, value) {
  try {
    createNonEnumerableProperty(global_1, key, value)
  } catch (error) {
    global_1[key] = value
  }

  return value
}

var SHARED = '__core-js_shared__'
var store = global_1[SHARED] || setGlobal(SHARED, {})
var sharedStore = store

var functionToString = Function.toString // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

if (typeof sharedStore.inspectSource != 'function') {
  sharedStore.inspectSource = function (it) {
    return functionToString.call(it)
  }
}

var inspectSource = sharedStore.inspectSource

var WeakMap = global_1.WeakMap
var nativeWeakMap =
  typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap))

var shared = createCommonjsModule(function (module) {
  ;(module.exports = function (key, value) {
    return (
      sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {})
    )
  })('versions', []).push({
    version: '3.6.5',
    mode: 'global',
    copyright: '© 2020 Denis Pushkarev (zloirock.ru)',
  })
})

var id = 0
var postfix = Math.random()

var uid = function (key) {
  return (
    'Symbol(' +
    String(key === undefined ? '' : key) +
    ')_' +
    (++id + postfix).toString(36)
  )
}

var keys = shared('keys')

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key))
}

var hiddenKeys = {}

var WeakMap$1 = global_1.WeakMap
var set, get, has$1

var enforce = function (it) {
  return has$1(it) ? get(it) : set(it, {})
}

var getterFor = function (TYPE) {
  return function (it) {
    var state

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required')
    }

    return state
  }
}

if (nativeWeakMap) {
  var store$1 = new WeakMap$1()
  var wmget = store$1.get
  var wmhas = store$1.has
  var wmset = store$1.set

  set = function (it, metadata) {
    wmset.call(store$1, it, metadata)
    return metadata
  }

  get = function (it) {
    return wmget.call(store$1, it) || {}
  }

  has$1 = function (it) {
    return wmhas.call(store$1, it)
  }
} else {
  var STATE = sharedKey('state')
  hiddenKeys[STATE] = true

  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata)
    return metadata
  }

  get = function (it) {
    return has(it, STATE) ? it[STATE] : {}
  }

  has$1 = function (it) {
    return has(it, STATE)
  }
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor,
}

var redefine = createCommonjsModule(function (module) {
  var getInternalState = internalState.get
  var enforceInternalState = internalState.enforce
  var TEMPLATE = String(String).split('String')
  ;(module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false
    var simple = options ? !!options.enumerable : false
    var noTargetGet = options ? !!options.noTargetGet : false

    if (typeof value == 'function') {
      if (typeof key == 'string' && !has(value, 'name'))
        createNonEnumerableProperty(value, 'name', key)
      enforceInternalState(value).source = TEMPLATE.join(
        typeof key == 'string' ? key : ''
      )
    }

    if (O === global_1) {
      if (simple) O[key] = value
      else setGlobal(key, value)
      return
    } else if (!unsafe) {
      delete O[key]
    } else if (!noTargetGet && O[key]) {
      simple = true
    }

    if (simple) O[key] = value
    else createNonEnumerableProperty(O, key, value) // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return (
      (typeof this == 'function' && getInternalState(this).source) ||
      inspectSource(this)
    )
  })
})

var path = global_1

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined
}

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2
    ? aFunction(path[namespace]) || aFunction(global_1[namespace])
    : (path[namespace] && path[namespace][method]) ||
        (global_1[namespace] && global_1[namespace][method])
}

var ceil = Math.ceil
var floor = Math.floor // `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger

var toInteger = function (argument) {
  return isNaN((argument = +argument))
    ? 0
    : (argument > 0 ? floor : ceil)(argument)
}

var min = Math.min // `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength

var toLength = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1fffffffffffff) : 0 // 2 ** 53 - 1 == 9007199254740991
}

var max = Math.max
var min$1 = Math.min // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index)
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length)
}

var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this)
    var length = toLength(O.length)
    var index = toAbsoluteIndex(fromIndex, length)
    var value // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare

    if (IS_INCLUDES && el != el)
      while (length > index) {
        value = O[index++] // eslint-disable-next-line no-self-compare

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
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false),
}

var indexOf = arrayIncludes.indexOf

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object)
  var i = 0
  var result = []
  var key

  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key) // Don't enum bug & hidden keys

  while (names.length > i)
    if (has(O, (key = names[i++]))) {
      ~indexOf(result, key) || result.push(key)
    }

  return result
}

// IE8- don't enum bug keys
var enumBugKeys = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf',
]

var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype') // `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

var f$3 =
  Object.getOwnPropertyNames ||
  function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1)
  }

var objectGetOwnPropertyNames = {
  f: f$3,
}

var f$4 = Object.getOwnPropertySymbols
var objectGetOwnPropertySymbols = {
  f: f$4,
}

var ownKeys =
  getBuiltIn('Reflect', 'ownKeys') ||
  function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it))
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys
  }

var copyConstructorProperties = function (target, source) {
  var keys = ownKeys(source)
  var defineProperty = objectDefineProperty.f
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    if (!has(target, key))
      defineProperty(target, key, getOwnPropertyDescriptor(source, key))
  }
}

var replacement = /#|\.prototype\./

var isForced = function (feature, detection) {
  var value = data[normalize(feature)]
  return value == POLYFILL
    ? true
    : value == NATIVE
    ? false
    : typeof detection == 'function'
    ? fails(detection)
    : !!detection
}

var normalize = (isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase()
})

var data = (isForced.data = {})
var NATIVE = (isForced.NATIVE = 'N')
var POLYFILL = (isForced.POLYFILL = 'P')
var isForced_1 = isForced

var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f
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
    target = global_1
  } else if (STATIC) {
    target = global_1[TARGET] || setGlobal(TARGET, {})
  } else {
    target = (global_1[TARGET] || {}).prototype
  }

  if (target)
    for (key in source) {
      sourceProperty = source[key]

      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key)
        targetProperty = descriptor && descriptor.value
      } else targetProperty = target[key]

      FORCED = isForced_1(
        GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key,
        options.forced
      ) // contained in target

      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue
        copyConstructorProperties(sourceProperty, targetProperty)
      } // add a flag to not completely full polyfills

      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty(sourceProperty, 'sham', true)
      } // extend global

      redefine(target, key, sourceProperty, options)
    }
}

var aFunction$1 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function')
  }

  return it
}

var functionBindContext = function (fn, that, length) {
  aFunction$1(fn)
  if (that === undefined) return fn

  switch (length) {
    case 0:
      return function () {
        return fn.call(that)
      }

    case 1:
      return function (a) {
        return fn.call(that, a)
      }

    case 2:
      return function (a, b) {
        return fn.call(that, a, b)
      }

    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c)
      }
  }

  return function () /* ...args */
  {
    return fn.apply(that, arguments)
  }
}

// https://tc39.github.io/ecma262/#sec-toobject

var toObject = function (argument) {
  return Object(requireObjectCoercible(argument))
}

// https://tc39.github.io/ecma262/#sec-isarray

var isArray =
  Array.isArray ||
  function isArray(arg) {
    return classofRaw(arg) == 'Array'
  }

var nativeSymbol =
  !!Object.getOwnPropertySymbols &&
  !fails(function () {
    // Chrome 38 Symbol has incorrect toString conversion
    // eslint-disable-next-line no-undef
    return !String(Symbol())
  })

var useSymbolAsUid =
  nativeSymbol && // eslint-disable-next-line no-undef
  !Symbol.sham && // eslint-disable-next-line no-undef
  typeof Symbol.iterator == 'symbol'

var WellKnownSymbolsStore = shared('wks')
var Symbol$1 = global_1.Symbol
var createWellKnownSymbol = useSymbolAsUid
  ? Symbol$1
  : (Symbol$1 && Symbol$1.withoutSetter) || uid

var wellKnownSymbol = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (nativeSymbol && has(Symbol$1, name))
      WellKnownSymbolsStore[name] = Symbol$1[name]
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name)
  }

  return WellKnownSymbolsStore[name]
}

var SPECIES = wellKnownSymbol('species') // `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate

var arraySpeciesCreate = function (originalArray, length) {
  var C

  if (isArray(originalArray)) {
    C = originalArray.constructor // cross-realm fallback

    if (typeof C == 'function' && (C === Array || isArray(C.prototype)))
      C = undefined
    else if (isObject(C)) {
      C = C[SPECIES]
      if (C === null) C = undefined
    }
  }

  return new (C === undefined ? Array : C)(length === 0 ? 0 : length)
}

var push = [].push // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation

var createMethod$1 = function (TYPE) {
  var IS_MAP = TYPE == 1
  var IS_FILTER = TYPE == 2
  var IS_SOME = TYPE == 3
  var IS_EVERY = TYPE == 4
  var IS_FIND_INDEX = TYPE == 6
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this)
    var self = indexedObject(O)
    var boundFunction = functionBindContext(callbackfn, that, 3)
    var length = toLength(self.length)
    var index = 0
    var create = specificCreate || arraySpeciesCreate
    var target = IS_MAP
      ? create($this, length)
      : IS_FILTER
      ? create($this, 0)
      : undefined
    var value, result

    for (; length > index; index++)
      if (NO_HOLES || index in self) {
        value = self[index]
        result = boundFunction(value, index, O)

        if (TYPE) {
          if (IS_MAP) target[index] = result
          // map
          else if (result)
            switch (TYPE) {
              case 3:
                return true
              // some

              case 5:
                return value
              // find

              case 6:
                return index
              // findIndex

              case 2:
                push.call(target, value)
              // filter
            }
          else if (IS_EVERY) return false // every
        }
      }

    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target
  }
}

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$1(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod$1(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod$1(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod$1(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod$1(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod$1(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$1(6),
}

var arrayMethodIsStrict = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME]
  return (
    !!method &&
    fails(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal
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

var defineProperty = Object.defineProperty
var cache = {}

var thrower = function (it) {
  throw it
}

var arrayMethodUsesToLength = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME]
  if (!options) options = {}
  var method = [][METHOD_NAME]
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false
  var argument0 = has(options, 0) ? options[0] : thrower
  var argument1 = has(options, 1) ? options[1] : undefined
  return (cache[METHOD_NAME] =
    !!method &&
    !fails(function () {
      if (ACCESSORS && !descriptors) return true
      var O = {
        length: -1,
      }
      if (ACCESSORS)
        defineProperty(O, 1, {
          enumerable: true,
          get: thrower,
        })
      else O[1] = 1
      method.call(O, argument0, argument1)
    }))
}

var $forEach = arrayIteration.forEach
var STRICT_METHOD = arrayMethodIsStrict('forEach')
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach') // `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach

var arrayForEach =
  !STRICT_METHOD || !USES_TO_LENGTH
    ? function forEach(
        callbackfn
        /* , thisArg */
      ) {
        return $forEach(
          this,
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined
        )
      }
    : [].forEach

// https://tc39.github.io/ecma262/#sec-array.prototype.foreach

_export(
  {
    target: 'Array',
    proto: true,
    forced: [].forEach != arrayForEach,
  },
  {
    forEach: arrayForEach,
  }
)

var nativeJoin = [].join
var ES3_STRINGS = indexedObject != Object
var STRICT_METHOD$1 = arrayMethodIsStrict('join', ',') // `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join

_export(
  {
    target: 'Array',
    proto: true,
    forced: ES3_STRINGS || !STRICT_METHOD$1,
  },
  {
    join: function join(separator) {
      return nativeJoin.call(
        toIndexedObject(this),
        separator === undefined ? ',' : separator
      )
    },
  }
)

var info = {
  description: 'a html linter plugin of fis3 based on htmlhint.',
  keywords: ['linter', 'html'],
  dependencies: ['htmlhint'],
  options: {},
  links: {
    htmlhint: 'http://htmlhint.com/',
  },
}

var info$1 = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  default: info,
})

function exportPlugin(process, _ref) {
  var options = _ref.options
  process.defaultOptions = options
  return process
}

var _global = global,
  _global$fis = _global.fis,
  fis = _global$fis === void 0 ? {} : _global$fis
var _fis$log = fis.log,
  log = _fis$log === void 0 ? console.log : _fis$log

function readConfig(filename) {
  var currentFolder = process.cwd()
  var currentFile = ''
  var parentFolder = ''

  do {
    currentFolder = parentFolder || currentFolder
    currentFile = path__default['default'].normalize(
      path__default['default'].join(currentFolder, filename)
    )

    if (fs__default['default'].existsSync(currentFile)) {
      try {
        return JSON.parse(
          fs__default['default'].readFileSync(currentFile, 'utf8')
        )
      } catch (_unused) {
        return {}
      }
    }

    parentFolder = path__default['default'].resolve(currentFolder, '../')
  } while (parentFolder !== currentFolder)

  return {}
}

var htmlhintrcConfig

function process(content, file, config) {
  if (!content) {
    return
  }

  var rules = config.rules

  if (!rules) {
    if (!htmlhintrcConfig) {
      htmlhintrcConfig = readConfig('.htmlhintrc') || {}
    }

    rules = htmlhintrcConfig
  }

  var results = htmlhint.HTMLHint.verify(content, rules)
  var errorType = 'warning'
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
      htmlhint.HTMLHint.format(results, {
        indent: 2,
      }).join('\n')
    )

    if (errorType === 'error') {
      process.exitCode = 1
      throw new Error('htmlhint error.')
    }
  }
}

module.exports = exportPlugin(process, info$1)
