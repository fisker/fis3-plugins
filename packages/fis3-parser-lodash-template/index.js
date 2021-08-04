'use strict'

var path = require('path')
var _ = require('lodash')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {default: e}
}

var path__default = /*#__PURE__*/ _interopDefaultLegacy(path)
var ___default = /*#__PURE__*/ _interopDefaultLegacy(_)

function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object)

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object)

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })
    }

    keys.push.apply(keys, symbols)
  }

  return keys
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}

    if (i % 2) {
      ownKeys$2(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key])
      })
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
    } else {
      ownKeys$2(Object(source)).forEach(function (key) {
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

var check = function (it) {
  return it && it.Math == Math && it
} // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028

var global$b = // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  (function () {
    return this
  })() ||
  Function('return this')()

var objectGetOwnPropertyDescriptor = {}

var fails$7 = function (exec) {
  try {
    return !!exec()
  } catch (error) {
    return true
  }
}

var fails$6 = fails$7 // Detect IE8's incomplete defineProperty implementation

var descriptors = !fails$6(function () {
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

objectPropertyIsEnumerable.f = NASHORN_BUG
  ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor$2(this, V)
      return !!descriptor && descriptor.enumerable
    }
  : $propertyIsEnumerable

var createPropertyDescriptor$2 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value,
  }
}

var toString$2 = {}.toString

var classofRaw = function (it) {
  return toString$2.call(it).slice(8, -1)
}

var fails$5 = fails$7
var classof$2 = classofRaw
var split = ''.split // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails$5(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0)
})
  ? function (it) {
      return classof$2(it) == 'String' ? split.call(it, '') : Object(it)
    }
  : Object

// https://tc39.es/ecma262/#sec-requireobjectcoercible

var requireObjectCoercible$3 = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it)
  return it
}

var IndexedObject$1 = indexedObject
var requireObjectCoercible$2 = requireObjectCoercible$3

var toIndexedObject$3 = function (it) {
  return IndexedObject$1(requireObjectCoercible$2(it))
}

var isObject$7 = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function'
}

var global$a = global$b

var aFunction$2 = function (variable) {
  return typeof variable == 'function' ? variable : undefined
}

var getBuiltIn$3 = function (namespace, method) {
  return arguments.length < 2
    ? aFunction$2(global$a[namespace])
    : global$a[namespace] && global$a[namespace][method]
}

var getBuiltIn$2 = getBuiltIn$3
var engineUserAgent = getBuiltIn$2('navigator', 'userAgent') || ''

var global$9 = global$b
var userAgent = engineUserAgent
var process$1 = global$9.process
var Deno = global$9.Deno
var versions = (process$1 && process$1.versions) || (Deno && Deno.version)
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
var fails$4 = fails$7 // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

var nativeSymbol =
  !!Object.getOwnPropertySymbols &&
  !fails$4(function () {
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

var getBuiltIn$1 = getBuiltIn$3
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid
var isSymbol$3 = USE_SYMBOL_AS_UID$1
  ? function (it) {
      return typeof it == 'symbol'
    }
  : function (it) {
      var $Symbol = getBuiltIn$1('Symbol')
      return typeof $Symbol == 'function' && Object(it) instanceof $Symbol
    }

var isObject$6 = isObject$7 // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val
  if (
    pref === 'string' &&
    typeof (fn = input.toString) == 'function' &&
    !isObject$6((val = fn.call(input)))
  )
    return val
  if (
    typeof (fn = input.valueOf) == 'function' &&
    !isObject$6((val = fn.call(input)))
  )
    return val
  if (
    pref !== 'string' &&
    typeof (fn = input.toString) == 'function' &&
    !isObject$6((val = fn.call(input)))
  )
    return val
  throw TypeError("Can't convert object to primitive value")
}

var shared$3 = {exports: {}}

var global$8 = global$b

var setGlobal$3 = function (key, value) {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty(global$8, key, {
      value: value,
      configurable: true,
      writable: true,
    })
  } catch (error) {
    global$8[key] = value
  }

  return value
}

var global$7 = global$b
var setGlobal$2 = setGlobal$3
var SHARED = '__core-js_shared__'
var store$3 = global$7[SHARED] || setGlobal$2(SHARED, {})
var sharedStore = store$3

var store$2 = sharedStore
;(shared$3.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {})
})('versions', []).push({
  version: '3.16.0',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)',
})

var requireObjectCoercible$1 = requireObjectCoercible$3 // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

var toObject$3 = function (argument) {
  return Object(requireObjectCoercible$1(argument))
}

var toObject$2 = toObject$3
var hasOwnProperty = {}.hasOwnProperty

var has$6 =
  Object.hasOwn ||
  function hasOwn(it, key) {
    return hasOwnProperty.call(toObject$2(it), key)
  }

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

var global$6 = global$b
var shared$2 = shared$3.exports
var has$5 = has$6
var uid$1 = uid$2
var NATIVE_SYMBOL = nativeSymbol
var USE_SYMBOL_AS_UID = useSymbolAsUid
var WellKnownSymbolsStore = shared$2('wks')
var Symbol$1 = global$6.Symbol
var createWellKnownSymbol = USE_SYMBOL_AS_UID
  ? Symbol$1
  : (Symbol$1 && Symbol$1.withoutSetter) || uid$1

var wellKnownSymbol$5 = function (name) {
  if (
    !has$5(WellKnownSymbolsStore, name) ||
    !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')
  ) {
    if (NATIVE_SYMBOL && has$5(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name]
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name)
    }
  }

  return WellKnownSymbolsStore[name]
}

var isObject$5 = isObject$7
var isSymbol$2 = isSymbol$3
var ordinaryToPrimitive = ordinaryToPrimitive$1
var wellKnownSymbol$4 = wellKnownSymbol$5
var TO_PRIMITIVE = wellKnownSymbol$4('toPrimitive') // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

var toPrimitive$1 = function (input, pref) {
  if (!isObject$5(input) || isSymbol$2(input)) return input
  var exoticToPrim = input[TO_PRIMITIVE]
  var result

  if (exoticToPrim !== undefined) {
    if (pref === undefined) pref = 'default'
    result = exoticToPrim.call(input, pref)
    if (!isObject$5(result) || isSymbol$2(result)) return result
    throw TypeError("Can't convert object to primitive value")
  }

  if (pref === undefined) pref = 'number'
  return ordinaryToPrimitive(input, pref)
}

var toPrimitive = toPrimitive$1
var isSymbol$1 = isSymbol$3 // `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey

var toPropertyKey$2 = function (argument) {
  var key = toPrimitive(argument, 'string')
  return isSymbol$1(key) ? key : String(key)
}

var global$5 = global$b
var isObject$4 = isObject$7
var document = global$5.document // typeof document.createElement is 'object' in old IE

var EXISTS = isObject$4(document) && isObject$4(document.createElement)

var documentCreateElement = function (it) {
  return EXISTS ? document.createElement(it) : {}
}

var DESCRIPTORS$3 = descriptors
var fails$3 = fails$7
var createElement = documentCreateElement // Thank's IE8 for his funny defineProperty

var ie8DomDefine =
  !DESCRIPTORS$3 &&
  !fails$3(function () {
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
var createPropertyDescriptor$1 = createPropertyDescriptor$2
var toIndexedObject$2 = toIndexedObject$3
var toPropertyKey$1 = toPropertyKey$2
var has$4 = has$6
var IE8_DOM_DEFINE$1 = ie8DomDefine // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

objectGetOwnPropertyDescriptor.f = DESCRIPTORS$2
  ? $getOwnPropertyDescriptor
  : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject$2(O)
      P = toPropertyKey$1(P)
      if (IE8_DOM_DEFINE$1)
        try {
          return $getOwnPropertyDescriptor(O, P)
        } catch (error) {
          /* empty */
        }
      if (has$4(O, P))
        return createPropertyDescriptor$1(
          !propertyIsEnumerableModule.f.call(O, P),
          O[P]
        )
    }

var objectDefineProperty = {}

var isObject$3 = isObject$7

var anObject$2 = function (it) {
  if (!isObject$3(it)) {
    throw TypeError(String(it) + ' is not an object')
  }

  return it
}

var DESCRIPTORS$1 = descriptors
var IE8_DOM_DEFINE = ie8DomDefine
var anObject$1 = anObject$2
var toPropertyKey = toPropertyKey$2 // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

objectDefineProperty.f = DESCRIPTORS$1
  ? $defineProperty
  : function defineProperty(O, P, Attributes) {
      anObject$1(O)
      P = toPropertyKey(P)
      anObject$1(Attributes)
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
var definePropertyModule$1 = objectDefineProperty
var createPropertyDescriptor = createPropertyDescriptor$2
var createNonEnumerableProperty$3 = DESCRIPTORS
  ? function (object, key, value) {
      return definePropertyModule$1.f(
        object,
        key,
        createPropertyDescriptor(1, value)
      )
    }
  : function (object, key, value) {
      object[key] = value
      return object
    }

var redefine$1 = {exports: {}}

var store$1 = sharedStore
var functionToString = Function.toString // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (typeof store$1.inspectSource != 'function') {
  store$1.inspectSource = function (it) {
    return functionToString.call(it)
  }
}

var inspectSource$2 = store$1.inspectSource

var global$4 = global$b
var inspectSource$1 = inspectSource$2
var WeakMap$1 = global$4.WeakMap
var nativeWeakMap =
  typeof WeakMap$1 === 'function' &&
  /native code/.test(inspectSource$1(WeakMap$1))

var shared$1 = shared$3.exports
var uid = uid$2
var keys = shared$1('keys')

var sharedKey$1 = function (key) {
  return keys[key] || (keys[key] = uid(key))
}

var hiddenKeys$3 = {}

var NATIVE_WEAK_MAP = nativeWeakMap
var global$3 = global$b
var isObject$2 = isObject$7
var createNonEnumerableProperty$2 = createNonEnumerableProperty$3
var objectHas = has$6
var shared = sharedStore
var sharedKey = sharedKey$1
var hiddenKeys$2 = hiddenKeys$3
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized'
var WeakMap = global$3.WeakMap
var set, get, has$3

var enforce = function (it) {
  return has$3(it) ? get(it) : set(it, {})
}

var getterFor = function (TYPE) {
  return function (it) {
    var state

    if (!isObject$2(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required')
    }

    return state
  }
}

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap())
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

  has$3 = function (it) {
    return wmhas.call(store, it)
  }
} else {
  var STATE = sharedKey('state')
  hiddenKeys$2[STATE] = true

  set = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED)
    metadata.facade = it
    createNonEnumerableProperty$2(it, STATE, metadata)
    return metadata
  }

  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {}
  }

  has$3 = function (it) {
    return objectHas(it, STATE)
  }
}

var internalState = {
  set: set,
  get: get,
  has: has$3,
  enforce: enforce,
  getterFor: getterFor,
}

var global$2 = global$b
var createNonEnumerableProperty$1 = createNonEnumerableProperty$3
var has$2 = has$6
var setGlobal$1 = setGlobal$3
var inspectSource = inspectSource$2
var InternalStateModule = internalState
var getInternalState = InternalStateModule.get
var enforceInternalState = InternalStateModule.enforce
var TEMPLATE = String(String).split('String')
;(redefine$1.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false
  var simple = options ? !!options.enumerable : false
  var noTargetGet = options ? !!options.noTargetGet : false
  var state

  if (typeof value == 'function') {
    if (typeof key == 'string' && !has$2(value, 'name')) {
      createNonEnumerableProperty$1(value, 'name', key)
    }

    state = enforceInternalState(value)

    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '')
    }
  }

  if (O === global$2) {
    if (simple) O[key] = value
    else setGlobal$1(key, value)
    return
  } else if (!unsafe) {
    delete O[key]
  } else if (!noTargetGet && O[key]) {
    simple = true
  }

  if (simple) O[key] = value
  else createNonEnumerableProperty$1(O, key, value) // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return (
    (typeof this == 'function' && getInternalState(this).source) ||
    inspectSource(this)
  )
})

var objectGetOwnPropertyNames = {}

var ceil = Math.ceil
var floor = Math.floor // `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger

var toInteger$2 = function (argument) {
  return isNaN((argument = +argument))
    ? 0
    : (argument > 0 ? floor : ceil)(argument)
}

var toInteger$1 = toInteger$2
var min$2 = Math.min // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

var toLength$3 = function (argument) {
  return argument > 0 ? min$2(toInteger$1(argument), 0x1fffffffffffff) : 0 // 2 ** 53 - 1 == 9007199254740991
}

var toInteger = toInteger$2
var max = Math.max
var min$1 = Math.min // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex$1 = function (index, length) {
  var integer = toInteger(index)
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length)
}

var toIndexedObject$1 = toIndexedObject$3
var toLength$2 = toLength$3
var toAbsoluteIndex = toAbsoluteIndex$1 // `Array.prototype.{ indexOf, includes }` methods implementation

var createMethod$1 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$1($this)
    var length = toLength$2(O.length)
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

var has$1 = has$6
var toIndexedObject = toIndexedObject$3
var indexOf = arrayIncludes.indexOf
var hiddenKeys$1 = hiddenKeys$3

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

var enumBugKeys$2 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf',
]

var internalObjectKeys$1 = objectKeysInternal
var enumBugKeys$1 = enumBugKeys$2
var hiddenKeys = enumBugKeys$1.concat('length', 'prototype') // `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe

objectGetOwnPropertyNames.f =
  Object.getOwnPropertyNames ||
  function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys)
  }

var objectGetOwnPropertySymbols = {}

objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols

var getBuiltIn = getBuiltIn$3
var getOwnPropertyNamesModule = objectGetOwnPropertyNames
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols
var anObject = anObject$2 // all object keys, includes non-enumerable and symbols

var ownKeys$1 =
  getBuiltIn('Reflect', 'ownKeys') ||
  function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject(it))
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys
  }

var has = has$6
var ownKeys = ownKeys$1
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor
var definePropertyModule = objectDefineProperty

var copyConstructorProperties$1 = function (target, source) {
  var keys = ownKeys(source)
  var defineProperty = definePropertyModule.f
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    if (!has(target, key))
      defineProperty(target, key, getOwnPropertyDescriptor(source, key))
  }
}

var fails$2 = fails$7
var replacement = /#|\.prototype\./

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)]
  return value == POLYFILL
    ? true
    : value == NATIVE
    ? false
    : typeof detection == 'function'
    ? fails$2(detection)
    : !!detection
}

var normalize = (isForced$1.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase()
})

var data = (isForced$1.data = {})
var NATIVE = (isForced$1.NATIVE = 'N')
var POLYFILL = (isForced$1.POLYFILL = 'P')
var isForced_1 = isForced$1

var global$1 = global$b
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f
var createNonEnumerableProperty = createNonEnumerableProperty$3
var redefine = redefine$1.exports
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

      FORCED = isForced(
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

var aFunction = aFunction$1 // optional / simple context binding

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

  return function () {
    return fn.apply(that, arguments)
  }
}

var classof$1 = classofRaw // `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe

var isArray$1 =
  Array.isArray ||
  function isArray(arg) {
    return classof$1(arg) == 'Array'
  }

var isObject$1 = isObject$7
var isArray = isArray$1
var wellKnownSymbol$3 = wellKnownSymbol$5
var SPECIES$1 = wellKnownSymbol$3('species') // a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

var arraySpeciesConstructor$1 = function (originalArray) {
  var C

  if (isArray(originalArray)) {
    C = originalArray.constructor // cross-realm fallback

    if (typeof C == 'function' && (C === Array || isArray(C.prototype)))
      C = undefined
    else if (isObject$1(C)) {
      C = C[SPECIES$1]
      if (C === null) C = undefined
    }
  }

  return C === undefined ? Array : C
}

var arraySpeciesConstructor = arraySpeciesConstructor$1 // `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

var arraySpeciesCreate$1 = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length)
}

var bind = functionBindContext
var IndexedObject = indexedObject
var toObject$1 = toObject$3
var toLength$1 = toLength$3
var arraySpeciesCreate = arraySpeciesCreate$1
var push = [].push // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation

var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1
  var IS_FILTER = TYPE == 2
  var IS_SOME = TYPE == 3
  var IS_EVERY = TYPE == 4
  var IS_FIND_INDEX = TYPE == 6
  var IS_FILTER_REJECT = TYPE == 7
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject$1($this)
    var self = IndexedObject(O)
    var boundFunction = bind(callbackfn, that, 3)
    var length = toLength$1(self.length)
    var index = 0
    var create = specificCreate || arraySpeciesCreate
    var target = IS_MAP
      ? create($this, length)
      : IS_FILTER || IS_FILTER_REJECT
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
              // filterReject
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
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7),
}

var fails$1 = fails$7
var wellKnownSymbol$2 = wellKnownSymbol$5
var V8_VERSION = engineV8Version
var SPECIES = wellKnownSymbol$2('species')

var arrayMethodHasSpeciesSupport$1 = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return (
    V8_VERSION >= 51 ||
    !fails$1(function () {
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

var $$2 = _export
var $filter = arrayIteration.filter
var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$1
var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter') // `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species

$$2(
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

var internalObjectKeys = objectKeysInternal
var enumBugKeys = enumBugKeys$2 // `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe

var objectKeys =
  Object.keys ||
  function keys(O) {
    return internalObjectKeys(O, enumBugKeys)
  }

var $$1 = _export
var toObject = toObject$3
var nativeKeys = objectKeys
var fails = fails$7
var FAILS_ON_PRIMITIVES = fails(function () {
  nativeKeys(1)
}) // `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys

$$1(
  {
    target: 'Object',
    stat: true,
    forced: FAILS_ON_PRIMITIVES,
  },
  {
    keys: function keys(it) {
      return nativeKeys(toObject(it))
    },
  }
)

var isSymbol = isSymbol$3

var toString$1 = function (argument) {
  if (isSymbol(argument))
    throw TypeError('Cannot convert a Symbol value to a string')
  return String(argument)
}

var isObject = isObject$7
var classof = classofRaw
var wellKnownSymbol$1 = wellKnownSymbol$5
var MATCH$1 = wellKnownSymbol$1('match') // `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp

var isRegexp = function (it) {
  var isRegExp
  return (
    isObject(it) &&
    ((isRegExp = it[MATCH$1]) !== undefined
      ? !!isRegExp
      : classof(it) == 'RegExp')
  )
}

var isRegExp = isRegexp

var notARegexp = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions")
  }

  return it
}

var wellKnownSymbol = wellKnownSymbol$5
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

var $ = _export
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f
var toLength = toLength$3
var toString = toString$1
var notARegExp = notARegexp
var requireObjectCoercible = requireObjectCoercible$3
var correctIsRegExpLogic = correctIsRegexpLogic

var $startsWith = ''.startsWith
var min = Math.min
var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith') // https://github.com/zloirock/core-js/pull/702

var MDN_POLYFILL_BUG =
  !CORRECT_IS_REGEXP_LOGIC &&
  !!(function () {
    var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith')
    return descriptor && !descriptor.writable
  })() // `String.prototype.startsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.startswith

$(
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
      var that = toString(requireObjectCoercible(this))
      notARegExp(searchString)
      var index = toLength(
        min(arguments.length > 1 ? arguments[1] : undefined, that.length)
      )
      var search = toString(searchString)
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
  description: 'a fis plugin to parse lodash template.',
  keywords: ['jst', 'html'],
  dependencies: ['lodash'],
  links: {
    'lodash.template': 'https://lodash.com/docs/#template',
  },
  options: {},
}
var info$1 = info

var _global = global,
  fis = _global.fis
var PROJECT_ROOT = fis.project.getProjectPath()
var root = path__default['default'].normalize(PROJECT_ROOT)
var re = /^[./\\]/

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
  var data = config.data
  var options = config.options
  var filename = config.filename
  var dirname = path__default['default'].dirname(filename)
  options.imports = _objectSpread2(
    {
      require: makeRequireFunction(dirname),
      __dirname: dirname,
      __filename: filename,
    },
    options.imports
  )

  var compiled = ___default['default'].template(content, options)

  content = compiled(data)
  return content
}

var plugin = exportPlugin(process, info$1)
plugin.lodash = ___default['default']
module.exports = plugin
