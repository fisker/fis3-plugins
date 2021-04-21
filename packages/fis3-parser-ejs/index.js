'use strict'

var ejs = require('ejs')
var path$1 = require('path')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {default: e}
}

var ejs__default = /*#__PURE__*/ _interopDefaultLegacy(ejs)
var path__default = /*#__PURE__*/ _interopDefaultLegacy(path$1)

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }

  return obj
}

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object)

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object)
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })
    keys.push.apply(keys, symbols)
  }

  return keys
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}

    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key])
      })
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
    } else {
      ownKeys$1(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        )
      })
    }
  }

  return target
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen)
  var n = Object.prototype.toString.call(o).slice(8, -1)
  if (n === 'Object' && o.constructor) n = o.constructor.name
  if (n === 'Map' || n === 'Set') return Array.from(o)
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen)
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]

  return arr2
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it =
    (typeof Symbol !== 'undefined' && o[Symbol.iterator]) || o['@@iterator']

  if (!it) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === 'number')
    ) {
      if (it) o = it
      var i = 0

      var F = function () {}

      return {
        s: F,
        n: function () {
          if (i >= o.length)
            return {
              done: true,
            }
          return {
            done: false,
            value: o[i++],
          }
        },
        e: function (e) {
          throw e
        },
        f: F,
      }
    }

    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    )
  }

  var normalCompletion = true,
    didErr = false,
    err
  return {
    s: function () {
      it = it.call(o)
    },
    n: function () {
      var step = it.next()
      normalCompletion = step.done
      return step
    },
    e: function (e) {
      didErr = true
      err = e
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return()
      } finally {
        if (didErr) throw err
      }
    },
  }
}

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

function createCommonjsModule(fn) {
  var module = {exports: {}}
  return fn(module, module.exports), module.exports
}

var check = function (it) {
  return it && it.Math == Math && it
} // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028

var global$1 = // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  (function () {
    return this
  })() ||
  Function('return this')()

var fails = function (exec) {
  try {
    return !!exec()
  } catch (error) {
    return true
  }
}

var descriptors = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return (
    Object.defineProperty({}, 1, {
      get: function () {
        return 7
      },
    })[1] != 7
  )
})

var $propertyIsEnumerable = {}.propertyIsEnumerable // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor // Nashorn ~ JDK8 bug

var NASHORN_BUG =
  getOwnPropertyDescriptor$2 &&
  !$propertyIsEnumerable.call(
    {
      1: 2,
    },
    1
  ) // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

var f$4 = NASHORN_BUG
  ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor$2(this, V)
      return !!descriptor && descriptor.enumerable
    }
  : $propertyIsEnumerable
var objectPropertyIsEnumerable = {
  f: f$4,
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
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0)
})
  ? function (it) {
      return classofRaw(it) == 'String' ? split.call(it, '') : Object(it)
    }
  : Object

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
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

// https://tc39.es/ecma262/#sec-toprimitive
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

var has$1 = function (it, key) {
  return hasOwnProperty.call(it, key)
}

var document = global$1.document // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement)

var documentCreateElement = function (it) {
  return EXISTS ? document.createElement(it) : {}
}

var ie8DomDefine =
  !descriptors &&
  !fails(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return (
      Object.defineProperty(documentCreateElement('div'), 'a', {
        get: function () {
          return 7
        },
      }).a != 7
    )
  })

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

var f$3 = descriptors
  ? $getOwnPropertyDescriptor
  : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject(O)
      P = toPrimitive(P, true)
      if (ie8DomDefine)
        try {
          return $getOwnPropertyDescriptor(O, P)
        } catch (error) {
          /* empty */
        }
      if (has$1(O, P))
        return createPropertyDescriptor(
          !objectPropertyIsEnumerable.f.call(O, P),
          O[P]
        )
    }
var objectGetOwnPropertyDescriptor = {
  f: f$3,
}

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object')
  }

  return it
}

var $defineProperty = Object.defineProperty // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

var f$2 = descriptors
  ? $defineProperty
  : function defineProperty(O, P, Attributes) {
      anObject(O)
      P = toPrimitive(P, true)
      anObject(Attributes)
      if (ie8DomDefine)
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
    createNonEnumerableProperty(global$1, key, value)
  } catch (error) {
    global$1[key] = value
  }

  return value
}

var SHARED = '__core-js_shared__'
var store$1 = global$1[SHARED] || setGlobal(SHARED, {})
var sharedStore = store$1

var functionToString = Function.toString // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

if (typeof sharedStore.inspectSource != 'function') {
  sharedStore.inspectSource = function (it) {
    return functionToString.call(it)
  }
}

var inspectSource = sharedStore.inspectSource

var WeakMap$1 = global$1.WeakMap
var nativeWeakMap =
  typeof WeakMap$1 === 'function' &&
  /native code/.test(inspectSource(WeakMap$1))

var shared = createCommonjsModule(function (module) {
  ;(module.exports = function (key, value) {
    return (
      sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {})
    )
  })('versions', []).push({
    version: '3.10.2',
    mode: 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)',
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

var hiddenKeys$1 = {}

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized'
var WeakMap = global$1.WeakMap
var set, get, has

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {})
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
  var store = sharedStore.state || (sharedStore.state = new WeakMap())
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

  has = function (it) {
    return wmhas.call(store, it)
  }
} else {
  var STATE = sharedKey('state')
  hiddenKeys$1[STATE] = true

  set = function (it, metadata) {
    if (has$1(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED)
    metadata.facade = it
    createNonEnumerableProperty(it, STATE, metadata)
    return metadata
  }

  get = function (it) {
    return has$1(it, STATE) ? it[STATE] : {}
  }

  has = function (it) {
    return has$1(it, STATE)
  }
}

var internalState = {
  set: set,
  get: get,
  has: has,
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
    var state

    if (typeof value == 'function') {
      if (typeof key == 'string' && !has$1(value, 'name')) {
        createNonEnumerableProperty(value, 'name', key)
      }

      state = enforceInternalState(value)

      if (!state.source) {
        state.source = TEMPLATE.join(typeof key == 'string' ? key : '')
      }
    }

    if (O === global$1) {
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

var path = global$1

var aFunction$1 = function (variable) {
  return typeof variable == 'function' ? variable : undefined
}

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2
    ? aFunction$1(path[namespace]) || aFunction$1(global$1[namespace])
    : (path[namespace] && path[namespace][method]) ||
        (global$1[namespace] && global$1[namespace][method])
}

var ceil = Math.ceil
var floor = Math.floor // `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger

var toInteger = function (argument) {
  return isNaN((argument = +argument))
    ? 0
    : (argument > 0 ? floor : ceil)(argument)
}

var min$2 = Math.min // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

var toLength = function (argument) {
  return argument > 0 ? min$2(toInteger(argument), 0x1fffffffffffff) : 0 // 2 ** 53 - 1 == 9007199254740991
}

var max = Math.max
var min$1 = Math.min // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index)
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length)
}

var createMethod$1 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this)
    var length = toLength(O.length)
    var index = toAbsoluteIndex(fromIndex, length)
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
  includes: createMethod$1(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$1(false),
}

var indexOf = arrayIncludes.indexOf

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object)
  var i = 0
  var result = []
  var key

  for (key in O) !has$1(hiddenKeys$1, key) && has$1(O, key) && result.push(key) // Don't enum bug & hidden keys

  while (names.length > i)
    if (has$1(O, (key = names[i++]))) {
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

var hiddenKeys = enumBugKeys.concat('length', 'prototype') // `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe

var f$1 =
  Object.getOwnPropertyNames ||
  function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys)
  }

var objectGetOwnPropertyNames = {
  f: f$1,
}

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
var f = Object.getOwnPropertySymbols
var objectGetOwnPropertySymbols = {
  f: f,
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
    if (!has$1(target, key))
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
    target = global$1
  } else if (STATIC) {
    target = global$1[TARGET] || setGlobal(TARGET, {})
  } else {
    target = (global$1[TARGET] || {}).prototype
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

var aFunction = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function')
  }

  return it
}

var functionBindContext = function (fn, that, length) {
  aFunction(fn)
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

// https://tc39.es/ecma262/#sec-toobject

var toObject = function (argument) {
  return Object(requireObjectCoercible(argument))
}

// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe

var isArray =
  Array.isArray ||
  function isArray(arg) {
    return classofRaw(arg) == 'Array'
  }

var engineIsNode = classofRaw(global$1.process) == 'process'

var engineUserAgent = getBuiltIn('navigator', 'userAgent') || ''

var process$1 = global$1.process
var versions = process$1 && process$1.versions
var v8 = versions && versions.v8
var match, version

if (v8) {
  match = v8.split('.')
  version = match[0] + match[1]
} else if (engineUserAgent) {
  match = engineUserAgent.match(/Edge\/(\d+)/)

  if (!match || match[1] >= 74) {
    match = engineUserAgent.match(/Chrome\/(\d+)/)
    if (match) version = match[1]
  }
}

var engineV8Version = version && +version

var nativeSymbol =
  !!Object.getOwnPropertySymbols &&
  !fails(function () {
    // eslint-disable-next-line es/no-symbol -- required for testing
    return (
      !Symbol.sham && // Chrome 38 Symbol has incorrect toString conversion
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      (engineIsNode
        ? engineV8Version === 38
        : engineV8Version > 37 && engineV8Version < 41)
    )
  })

/* eslint-disable es/no-symbol -- required for testing */
var useSymbolAsUid =
  nativeSymbol && !Symbol.sham && typeof Symbol.iterator == 'symbol'

var WellKnownSymbolsStore = shared('wks')
var Symbol$1 = global$1.Symbol
var createWellKnownSymbol = useSymbolAsUid
  ? Symbol$1
  : (Symbol$1 && Symbol$1.withoutSetter) || uid

var wellKnownSymbol = function (name) {
  if (
    !has$1(WellKnownSymbolsStore, name) ||
    !(nativeSymbol || typeof WellKnownSymbolsStore[name] == 'string')
  ) {
    if (nativeSymbol && has$1(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name]
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name)
    }
  }

  return WellKnownSymbolsStore[name]
}

var SPECIES$1 = wellKnownSymbol('species') // `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

var arraySpeciesCreate = function (originalArray, length) {
  var C

  if (isArray(originalArray)) {
    C = originalArray.constructor // cross-realm fallback

    if (typeof C == 'function' && (C === Array || isArray(C.prototype)))
      C = undefined
    else if (isObject(C)) {
      C = C[SPECIES$1]
      if (C === null) C = undefined
    }
  }

  return new (C === undefined ? Array : C)(length === 0 ? 0 : length)
}

var push = [].push // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation

var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1
  var IS_FILTER = TYPE == 2
  var IS_SOME = TYPE == 3
  var IS_EVERY = TYPE == 4
  var IS_FIND_INDEX = TYPE == 6
  var IS_FILTER_OUT = TYPE == 7
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
      : IS_FILTER || IS_FILTER_OUT
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
          else
            switch (TYPE) {
              case 4:
                return false
              // every

              case 7:
                push.call(target, value)
              // filterOut
            }
        }
      }

    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target
  }
}

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterOut` method
  // https://github.com/tc39/proposal-array-filtering
  filterOut: createMethod(7),
}

var SPECIES = wellKnownSymbol('species')

var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return (
    engineV8Version >= 51 ||
    !fails(function () {
      var array = []
      var constructor = (array.constructor = {})

      constructor[SPECIES] = function () {
        return {
          foo: 1,
        }
      }

      return array[METHOD_NAME](Boolean).foo !== 1
    })
  )
}

var $filter = arrayIteration.filter
var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter') // `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species

_export(
  {
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT,
  },
  {
    filter: function filter(
      callbackfn
      /* , thisArg */
    ) {
      return $filter(
        this,
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined
      )
    },
  }
)

// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe

var objectKeys =
  Object.keys ||
  function keys(O) {
    return objectKeysInternal(O, enumBugKeys)
  }

var FAILS_ON_PRIMITIVES = fails(function () {
  objectKeys(1)
}) // `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys

_export(
  {
    target: 'Object',
    stat: true,
    forced: FAILS_ON_PRIMITIVES,
  },
  {
    keys: function keys(it) {
      return objectKeys(toObject(it))
    },
  }
)

var MATCH$1 = wellKnownSymbol('match') // `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp

var isRegexp = function (it) {
  var isRegExp
  return (
    isObject(it) &&
    ((isRegExp = it[MATCH$1]) !== undefined
      ? !!isRegExp
      : classofRaw(it) == 'RegExp')
  )
}

var notARegexp = function (it) {
  if (isRegexp(it)) {
    throw TypeError("The method doesn't accept regular expressions")
  }

  return it
}

var MATCH = wellKnownSymbol('match')

var correctIsRegexpLogic = function (METHOD_NAME) {
  var regexp = /./

  try {
    '/./'[METHOD_NAME](regexp)
  } catch (error1) {
    try {
      regexp[MATCH] = false
      return '/./'[METHOD_NAME](regexp)
    } catch (error2) {
      /* empty */
    }
  }

  return false
}

var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f // eslint-disable-next-line es/no-string-prototype-startswith -- safe

var $startsWith = ''.startsWith
var min = Math.min
var CORRECT_IS_REGEXP_LOGIC = correctIsRegexpLogic('startsWith') // https://github.com/zloirock/core-js/pull/702

var MDN_POLYFILL_BUG =
  !CORRECT_IS_REGEXP_LOGIC &&
  !!(function () {
    var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith')
    return descriptor && !descriptor.writable
  })() // `String.prototype.startsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.startswith

_export(
  {
    target: 'String',
    proto: true,
    forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC,
  },
  {
    startsWith: function startsWith(
      searchString
      /* , position = 0 */
    ) {
      var that = String(requireObjectCoercible(this))
      notARegexp(searchString)
      var index = toLength(
        min(arguments.length > 1 ? arguments[1] : undefined, that.length)
      )
      var search = String(searchString)
      return $startsWith
        ? $startsWith.call(that, search, index)
        : that.slice(index, index + search.length) === search
    },
  }
)

function exportPlugin(process, _ref) {
  var options = _ref.options
  process.defaultOptions = options
  return process
}

var info = {
  description: 'a fis plugin to parse ejs.',
  keywords: ['ejs', 'html'],
  dependencies: ['ejs'],
  links: {
    ejs: 'http://ejs.co/',
  },
  options: {},
}

var info$1 = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  default: info,
})

var _global = global,
  fis = _global.fis
var PROJECT_ROOT = fis.project.getProjectPath()
var root = path__default['default'].normalize(PROJECT_ROOT)
var re = /^[./\\]/i

function cleanRequireCache() {
  var _iterator = _createForOfIteratorHelper(
      Object.keys(require.cache).filter(function (id) {
        return path__default['default'].normalize(id).startsWith(root)
      })
    ),
    _step

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var id = _step.value
      delete require.cache[id]
    }
  } catch (err) {
    _iterator.e(err)
  } finally {
    _iterator.f()
  }
}

function makeRequireFunction(context) {
  return function (module_) {
    cleanRequireCache()

    if (re.test(module_)) {
      module_ = path__default['default'].resolve(context, module_)
    }

    return require(module_)
  }
}

function process(content, file, config) {
  if (file.filename[0] === '_') {
    return content
  }

  var filename = config.filename
  var dirname = path__default['default'].dirname(filename)

  var data = _objectSpread2(
    {
      require: makeRequireFunction(dirname),
      __dirname: dirname,
      __filename: filename,
    },
    config.data
  )

  var options = config.options
  options.root = PROJECT_ROOT
  options.filename = file.realpath
  options.cache = false
  content = ejs__default['default'].render(content, data, options)
  return content
}

module.exports = exportPlugin(process, info$1)
