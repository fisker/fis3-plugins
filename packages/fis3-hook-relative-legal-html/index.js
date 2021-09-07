'use strict'

var path = require('path')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {default: e}
}

var path__default = /*#__PURE__*/ _interopDefaultLegacy(path)

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

var fails$d = function (exec) {
  try {
    return !!exec()
  } catch (error) {
    return true
  }
}

var fails$c = fails$d // Detect IE8's incomplete defineProperty implementation

var descriptors = !fails$c(function () {
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
    1,
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

var toString$5 = {}.toString

var classofRaw = function (it) {
  return toString$5.call(it).slice(8, -1)
}

var fails$b = fails$d
var classof$3 = classofRaw
var split = ''.split // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails$b(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0)
})
  ? function (it) {
      return classof$3(it) == 'String' ? split.call(it, '') : Object(it)
    }
  : Object

// https://tc39.es/ecma262/#sec-requireobjectcoercible

var requireObjectCoercible$5 = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it)
  return it
}

var IndexedObject = indexedObject
var requireObjectCoercible$4 = requireObjectCoercible$5

var toIndexedObject$3 = function (it) {
  return IndexedObject(requireObjectCoercible$4(it))
}

var isObject$8 = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function'
}

var global$a = global$b

var aFunction$2 = function (variable) {
  return typeof variable == 'function' ? variable : undefined
}

var getBuiltIn$4 = function (namespace, method) {
  return arguments.length < 2
    ? aFunction$2(global$a[namespace])
    : global$a[namespace] && global$a[namespace][method]
}

var getBuiltIn$3 = getBuiltIn$4
var engineUserAgent = getBuiltIn$3('navigator', 'userAgent') || ''

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
var V8_VERSION$2 = engineV8Version
var fails$a = fails$d // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

var nativeSymbol =
  !!Object.getOwnPropertySymbols &&
  !fails$a(function () {
    var symbol = Symbol() // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

    return (
      !String(symbol) ||
      !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      (!Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41)
    )
  })

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL$1 = nativeSymbol
var useSymbolAsUid =
  NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == 'symbol'

var getBuiltIn$2 = getBuiltIn$4
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid
var isSymbol$3 = USE_SYMBOL_AS_UID$1
  ? function (it) {
      return typeof it == 'symbol'
    }
  : function (it) {
      var $Symbol = getBuiltIn$2('Symbol')
      return typeof $Symbol == 'function' && Object(it) instanceof $Symbol
    }

var isObject$7 = isObject$8 // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val
  if (
    pref === 'string' &&
    typeof (fn = input.toString) == 'function' &&
    !isObject$7((val = fn.call(input)))
  )
    return val
  if (
    typeof (fn = input.valueOf) == 'function' &&
    !isObject$7((val = fn.call(input)))
  )
    return val
  if (
    pref !== 'string' &&
    typeof (fn = input.toString) == 'function' &&
    !isObject$7((val = fn.call(input)))
  )
    return val
  throw TypeError("Can't convert object to primitive value")
}

var shared$4 = {exports: {}}

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
;(shared$4.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {})
})('versions', []).push({
  version: '3.16.0',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)',
})

var requireObjectCoercible$3 = requireObjectCoercible$5 // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

var toObject$3 = function (argument) {
  return Object(requireObjectCoercible$3(argument))
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
var shared$3 = shared$4.exports
var has$5 = has$6
var uid$1 = uid$2
var NATIVE_SYMBOL = nativeSymbol
var USE_SYMBOL_AS_UID = useSymbolAsUid
var WellKnownSymbolsStore = shared$3('wks')
var Symbol$1 = global$6.Symbol
var createWellKnownSymbol = USE_SYMBOL_AS_UID
  ? Symbol$1
  : (Symbol$1 && Symbol$1.withoutSetter) || uid$1

var wellKnownSymbol$8 = function (name) {
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

var isObject$6 = isObject$8
var isSymbol$2 = isSymbol$3
var ordinaryToPrimitive = ordinaryToPrimitive$1
var wellKnownSymbol$7 = wellKnownSymbol$8
var TO_PRIMITIVE = wellKnownSymbol$7('toPrimitive') // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

var toPrimitive$1 = function (input, pref) {
  if (!isObject$6(input) || isSymbol$2(input)) return input
  var exoticToPrim = input[TO_PRIMITIVE]
  var result

  if (exoticToPrim !== undefined) {
    if (pref === undefined) pref = 'default'
    result = exoticToPrim.call(input, pref)
    if (!isObject$6(result) || isSymbol$2(result)) return result
    throw TypeError("Can't convert object to primitive value")
  }

  if (pref === undefined) pref = 'number'
  return ordinaryToPrimitive(input, pref)
}

var toPrimitive = toPrimitive$1
var isSymbol$1 = isSymbol$3 // `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey

var toPropertyKey$3 = function (argument) {
  var key = toPrimitive(argument, 'string')
  return isSymbol$1(key) ? key : String(key)
}

var global$5 = global$b
var isObject$5 = isObject$8
var document$1 = global$5.document // typeof document.createElement is 'object' in old IE

var EXISTS = isObject$5(document$1) && isObject$5(document$1.createElement)

var documentCreateElement$1 = function (it) {
  return EXISTS ? document$1.createElement(it) : {}
}

var DESCRIPTORS$4 = descriptors
var fails$9 = fails$d
var createElement = documentCreateElement$1 // Thank's IE8 for his funny defineProperty

var ie8DomDefine =
  !DESCRIPTORS$4 &&
  !fails$9(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return (
      Object.defineProperty(createElement('div'), 'a', {
        get: function () {
          return 7
        },
      }).a != 7
    )
  })

var DESCRIPTORS$3 = descriptors
var propertyIsEnumerableModule = objectPropertyIsEnumerable
var createPropertyDescriptor$2 = createPropertyDescriptor$3
var toIndexedObject$2 = toIndexedObject$3
var toPropertyKey$2 = toPropertyKey$3
var has$4 = has$6
var IE8_DOM_DEFINE$1 = ie8DomDefine // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

objectGetOwnPropertyDescriptor.f = DESCRIPTORS$3
  ? $getOwnPropertyDescriptor
  : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject$2(O)
      P = toPropertyKey$2(P)
      if (IE8_DOM_DEFINE$1)
        try {
          return $getOwnPropertyDescriptor(O, P)
        } catch (error) {
          /* empty */
        }
      if (has$4(O, P))
        return createPropertyDescriptor$2(
          !propertyIsEnumerableModule.f.call(O, P),
          O[P],
        )
    }

var objectDefineProperty = {}

var isObject$4 = isObject$8

var anObject$8 = function (it) {
  if (!isObject$4(it)) {
    throw TypeError(String(it) + ' is not an object')
  }

  return it
}

var DESCRIPTORS$2 = descriptors
var IE8_DOM_DEFINE = ie8DomDefine
var anObject$7 = anObject$8
var toPropertyKey$1 = toPropertyKey$3 // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

objectDefineProperty.f = DESCRIPTORS$2
  ? $defineProperty
  : function defineProperty(O, P, Attributes) {
      anObject$7(O)
      P = toPropertyKey$1(P)
      anObject$7(Attributes)
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

var DESCRIPTORS$1 = descriptors
var definePropertyModule$3 = objectDefineProperty
var createPropertyDescriptor$1 = createPropertyDescriptor$3
var createNonEnumerableProperty$4 = DESCRIPTORS$1
  ? function (object, key, value) {
      return definePropertyModule$3.f(
        object,
        key,
        createPropertyDescriptor$1(1, value),
      )
    }
  : function (object, key, value) {
      object[key] = value
      return object
    }

var redefine$2 = {exports: {}}

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

var shared$2 = shared$4.exports
var uid = uid$2
var keys = shared$2('keys')

var sharedKey$2 = function (key) {
  return keys[key] || (keys[key] = uid(key))
}

var hiddenKeys$4 = {}

var NATIVE_WEAK_MAP = nativeWeakMap
var global$3 = global$b
var isObject$3 = isObject$8
var createNonEnumerableProperty$3 = createNonEnumerableProperty$4
var objectHas = has$6
var shared$1 = sharedStore
var sharedKey$1 = sharedKey$2
var hiddenKeys$3 = hiddenKeys$4
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized'
var WeakMap = global$3.WeakMap
var set, get, has$3

var enforce = function (it) {
  return has$3(it) ? get(it) : set(it, {})
}

var getterFor = function (TYPE) {
  return function (it) {
    var state

    if (!isObject$3(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required')
    }

    return state
  }
}

if (NATIVE_WEAK_MAP || shared$1.state) {
  var store = shared$1.state || (shared$1.state = new WeakMap())
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
  var STATE = sharedKey$1('state')
  hiddenKeys$3[STATE] = true

  set = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED)
    metadata.facade = it
    createNonEnumerableProperty$3(it, STATE, metadata)
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
var createNonEnumerableProperty$2 = createNonEnumerableProperty$4
var has$2 = has$6
var setGlobal$1 = setGlobal$3
var inspectSource = inspectSource$2
var InternalStateModule = internalState
var getInternalState$1 = InternalStateModule.get
var enforceInternalState = InternalStateModule.enforce
var TEMPLATE = String(String).split('String')
;(redefine$2.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false
  var simple = options ? !!options.enumerable : false
  var noTargetGet = options ? !!options.noTargetGet : false
  var state

  if (typeof value == 'function') {
    if (typeof key == 'string' && !has$2(value, 'name')) {
      createNonEnumerableProperty$2(value, 'name', key)
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
  else createNonEnumerableProperty$2(O, key, value) // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return (
    (typeof this == 'function' && getInternalState$1(this).source) ||
    inspectSource(this)
  )
})

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
var min$3 = Math.min // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

var toLength$4 = function (argument) {
  return argument > 0 ? min$3(toInteger$3(argument), 0x1fffffffffffff) : 0 // 2 ** 53 - 1 == 9007199254740991
}

var toInteger$2 = toInteger$4
var max$1 = Math.max
var min$2 = Math.min // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex$1 = function (index, length) {
  var integer = toInteger$2(index)
  return integer < 0 ? max$1(integer + length, 0) : min$2(integer, length)
}

var toIndexedObject$1 = toIndexedObject$3
var toLength$3 = toLength$4
var toAbsoluteIndex = toAbsoluteIndex$1 // `Array.prototype.{ indexOf, includes }` methods implementation

var createMethod$1 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$1($this)
    var length = toLength$3(O.length)
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
var hiddenKeys$2 = hiddenKeys$4

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object)
  var i = 0
  var result = []
  var key

  for (key in O) !has$1(hiddenKeys$2, key) && has$1(O, key) && result.push(key) // Don't enum bug & hidden keys

  while (names.length > i)
    if (has$1(O, (key = names[i++]))) {
      ~indexOf(result, key) || result.push(key)
    }

  return result
}

var enumBugKeys$3 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf',
]

var internalObjectKeys$1 = objectKeysInternal
var enumBugKeys$2 = enumBugKeys$3
var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype') // `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe

objectGetOwnPropertyNames.f =
  Object.getOwnPropertyNames ||
  function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$1)
  }

var objectGetOwnPropertySymbols = {}

objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols

var getBuiltIn$1 = getBuiltIn$4
var getOwnPropertyNamesModule = objectGetOwnPropertyNames
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols
var anObject$6 = anObject$8 // all object keys, includes non-enumerable and symbols

var ownKeys$1 =
  getBuiltIn$1('Reflect', 'ownKeys') ||
  function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$6(it))
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys
  }

var has = has$6
var ownKeys = ownKeys$1
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor
var definePropertyModule$2 = objectDefineProperty

var copyConstructorProperties$1 = function (target, source) {
  var keys = ownKeys(source)
  var defineProperty = definePropertyModule$2.f
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    if (!has(target, key))
      defineProperty(target, key, getOwnPropertyDescriptor(source, key))
  }
}

var fails$8 = fails$d
var replacement = /#|\.prototype\./

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)]
  return value == POLYFILL
    ? true
    : value == NATIVE
    ? false
    : typeof detection == 'function'
    ? fails$8(detection)
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
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f
var createNonEnumerableProperty$1 = createNonEnumerableProperty$4
var redefine$1 = redefine$2.exports
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
        descriptor = getOwnPropertyDescriptor(target, key)
        targetProperty = descriptor && descriptor.value
      } else targetProperty = target[key]

      FORCED = isForced(
        GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key,
        options.forced,
      ) // contained in target

      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue
        copyConstructorProperties(sourceProperty, targetProperty)
      } // add a flag to not completely full polyfills

      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$1(sourceProperty, 'sham', true)
      } // extend global

      redefine$1(target, key, sourceProperty, options)
    }
}

var classof$2 = classofRaw // `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe

var isArray$2 =
  Array.isArray ||
  function isArray(arg) {
    return classof$2(arg) == 'Array'
  }

var toPropertyKey = toPropertyKey$3
var definePropertyModule$1 = objectDefineProperty
var createPropertyDescriptor = createPropertyDescriptor$3

var createProperty$1 = function (object, key, value) {
  var propertyKey = toPropertyKey(key)
  if (propertyKey in object)
    definePropertyModule$1.f(
      object,
      propertyKey,
      createPropertyDescriptor(0, value),
    )
  else object[propertyKey] = value
}

var isObject$2 = isObject$8
var isArray$1 = isArray$2
var wellKnownSymbol$6 = wellKnownSymbol$8
var SPECIES$3 = wellKnownSymbol$6('species') // a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

var arraySpeciesConstructor$1 = function (originalArray) {
  var C

  if (isArray$1(originalArray)) {
    C = originalArray.constructor // cross-realm fallback

    if (typeof C == 'function' && (C === Array || isArray$1(C.prototype)))
      C = undefined
    else if (isObject$2(C)) {
      C = C[SPECIES$3]
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

var fails$7 = fails$d
var wellKnownSymbol$5 = wellKnownSymbol$8
var V8_VERSION$1 = engineV8Version
var SPECIES$2 = wellKnownSymbol$5('species')

var arrayMethodHasSpeciesSupport$1 = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return (
    V8_VERSION$1 >= 51 ||
    !fails$7(function () {
      var array = []
      var constructor = (array.constructor = {})

      constructor[SPECIES$2] = function () {
        return {
          foo: 1,
        }
      }

      return array[METHOD_NAME](Boolean).foo !== 1
    })
  )
}

var $$1 = _export
var fails$6 = fails$d
var isArray = isArray$2
var isObject$1 = isObject$8
var toObject$1 = toObject$3
var toLength$2 = toLength$4
var createProperty = createProperty$1
var arraySpeciesCreate = arraySpeciesCreate$1
var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$1
var wellKnownSymbol$4 = wellKnownSymbol$8
var V8_VERSION = engineV8Version
var IS_CONCAT_SPREADABLE = wellKnownSymbol$4('isConcatSpreadable')
var MAX_SAFE_INTEGER = 0x1fffffffffffff
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded' // We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679

var IS_CONCAT_SPREADABLE_SUPPORT =
  V8_VERSION >= 51 ||
  !fails$6(function () {
    var array = []
    array[IS_CONCAT_SPREADABLE] = false
    return array.concat()[0] !== array
  })
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat')

var isConcatSpreadable = function (O) {
  if (!isObject$1(O)) return false
  var spreadable = O[IS_CONCAT_SPREADABLE]
  return spreadable !== undefined ? !!spreadable : isArray(O)
}

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT // `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species

$$1(
  {
    target: 'Array',
    proto: true,
    forced: FORCED,
  },
  {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject$1(this)
      var A = arraySpeciesCreate(O, 0)
      var n = 0
      var i, k, length, len, E

      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i]

        if (isConcatSpreadable(E)) {
          len = toLength$2(E.length)
          if (n + len > MAX_SAFE_INTEGER)
            throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED)

          for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k])
        } else {
          if (n >= MAX_SAFE_INTEGER)
            throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED)
          createProperty(A, n++, E)
        }
      }

      A.length = n
      return A
    },
  },
)

var isSymbol = isSymbol$3

var toString$4 = function (argument) {
  if (isSymbol(argument))
    throw TypeError('Cannot convert a Symbol value to a string')
  return String(argument)
}

var anObject$5 = anObject$8 // `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags

var regexpFlags$1 = function () {
  var that = anObject$5(this)
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

var fails$5 = fails$d // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,

var RE = function (s, f) {
  return RegExp(s, f)
}

regexpStickyHelpers.UNSUPPORTED_Y = fails$5(function () {
  var re = RE('a', 'y')
  re.lastIndex = 2
  return re.exec('abcd') != null
})
regexpStickyHelpers.BROKEN_CARET = fails$5(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy')
  re.lastIndex = 2
  return re.exec('str') != null
})

var internalObjectKeys = objectKeysInternal
var enumBugKeys$1 = enumBugKeys$3 // `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe

var objectKeys$1 =
  Object.keys ||
  function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1)
  }

var DESCRIPTORS = descriptors
var definePropertyModule = objectDefineProperty
var anObject$4 = anObject$8
var objectKeys = objectKeys$1 // `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe

var objectDefineProperties = DESCRIPTORS
  ? Object.defineProperties
  : function defineProperties(O, Properties) {
      anObject$4(O)
      var keys = objectKeys(Properties)
      var length = keys.length
      var index = 0
      var key

      while (length > index)
        definePropertyModule.f(O, (key = keys[index++]), Properties[key])

      return O
    }

var getBuiltIn = getBuiltIn$4
var html$1 = getBuiltIn('document', 'documentElement')

/* global ActiveXObject -- old IE, WSH */
var anObject$3 = anObject$8
var defineProperties = objectDefineProperties
var enumBugKeys = enumBugKeys$3
var hiddenKeys = hiddenKeys$4
var html = html$1
var documentCreateElement = documentCreateElement$1
var sharedKey = sharedKey$2
var GT = '>'
var LT = '<'
var PROTOTYPE = 'prototype'
var SCRIPT = 'script'
var IE_PROTO = sharedKey('IE_PROTO')

var EmptyConstructor = function () {
  /* empty */
}

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT
} // Create object with fake `null` prototype: use ActiveX Object with cleared prototype

var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''))
  activeXDocument.close()
  var temp = activeXDocument.parentWindow.Object
  activeXDocument = null // avoid memory leak

  return temp
} // Create object with fake `null` prototype: use iframe Object with cleared prototype

var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe')
  var JS = 'java' + SCRIPT + ':'
  var iframeDocument

  if (iframe.style) {
    iframe.style.display = 'none'
    html.appendChild(iframe) // https://github.com/zloirock/core-js/issues/475

    iframe.src = String(JS)
    iframeDocument = iframe.contentWindow.document
    iframeDocument.open()
    iframeDocument.write(scriptTag('document.F=Object'))
    iframeDocument.close()
    return iframeDocument.F
  }
} // Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug

var activeXDocument

var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile')
  } catch (error) {
    /* ignore */
  }

  NullProtoObject =
    document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame() || NullProtoObjectViaActiveX(activeXDocument) // WSH

  var length = enumBugKeys.length

  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]]

  return NullProtoObject()
}

hiddenKeys[IE_PROTO] = true // `Object.create` method
// https://tc39.es/ecma262/#sec-object.create

var objectCreate =
  Object.create ||
  function create(O, Properties) {
    var result

    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject$3(O)
      result = new EmptyConstructor()
      EmptyConstructor[PROTOTYPE] = null // add "__proto__" for Object.getPrototypeOf polyfill

      result[IE_PROTO] = O
    } else result = NullProtoObject()

    return Properties === undefined
      ? result
      : defineProperties(result, Properties)
  }

var fails$4 = fails$d
var regexpUnsupportedDotAll = fails$4(function () {
  // babel-minify transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var re = RegExp('.', (typeof '').charAt(0))
  return !(re.dotAll && re.exec('\n') && re.flags === 's')
})

var fails$3 = fails$d
var regexpUnsupportedNcg = fails$3(function () {
  // babel-minify transpiles RegExp('.', 'g') -> /./g and it causes SyntaxError
  var re = RegExp('(?<a>b)', (typeof '').charAt(5))
  return re.exec('b').groups.a !== 'b' || 'b'.replace(re, '$<a>c') !== 'bc'
})

/* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */

/* eslint-disable regexp/no-useless-quantifier -- testing */

var toString$3 = toString$4
var regexpFlags = regexpFlags$1
var stickyHelpers$1 = regexpStickyHelpers
var shared = shared$4.exports
var create = objectCreate
var getInternalState = internalState.get
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll
var UNSUPPORTED_NCG = regexpUnsupportedNcg
var nativeExec = RegExp.prototype.exec
var nativeReplace = shared('native-string-replace', String.prototype.replace)
var patchedExec = nativeExec

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/
  var re2 = /b*/g
  nativeExec.call(re1, 'a')
  nativeExec.call(re2, 'a')
  return re1.lastIndex !== 0 || re2.lastIndex !== 0
})()

var UNSUPPORTED_Y$1 =
  stickyHelpers$1.UNSUPPORTED_Y || stickyHelpers$1.BROKEN_CARET // nonparticipating capturing group, copied from es5-shim's String#split patch.

var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined
var PATCH =
  UPDATES_LAST_INDEX_WRONG ||
  NPCG_INCLUDED ||
  UNSUPPORTED_Y$1 ||
  UNSUPPORTED_DOT_ALL ||
  UNSUPPORTED_NCG

if (PATCH) {
  // eslint-disable-next-line max-statements -- TODO
  patchedExec = function exec(string) {
    var re = this
    var state = getInternalState(re)
    var str = toString$3(string)
    var raw = state.raw
    var result, reCopy, lastIndex, match, i, object, group

    if (raw) {
      raw.lastIndex = re.lastIndex
      result = patchedExec.call(raw, str)
      re.lastIndex = raw.lastIndex
      return result
    }

    var groups = state.groups
    var sticky = UNSUPPORTED_Y$1 && re.sticky
    var flags = regexpFlags.call(re)
    var source = re.source
    var charsAdded = 0
    var strCopy = str

    if (sticky) {
      flags = flags.replace('y', '')

      if (flags.indexOf('g') === -1) {
        flags += 'g'
      }

      strCopy = str.slice(re.lastIndex) // Support anchored sticky behavior.

      if (
        re.lastIndex > 0 &&
        (!re.multiline ||
          (re.multiline && str.charAt(re.lastIndex - 1) !== '\n'))
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

    if (match && groups) {
      match.groups = object = create(null)

      for (i = 0; i < groups.length; i++) {
        group = groups[i]
        object[group[0]] = match[group[1]]
      }
    }

    return match
  }
}

var regexpExec$3 = patchedExec

var $ = _export
var exec = regexpExec$3 // `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec

$(
  {
    target: 'RegExp',
    proto: true,
    forced: /./.exec !== exec,
  },
  {
    exec: exec,
  },
)

var redefine = redefine$2.exports
var regexpExec$2 = regexpExec$3
var fails$2 = fails$d
var wellKnownSymbol$3 = wellKnownSymbol$8
var createNonEnumerableProperty = createNonEnumerableProperty$4
var SPECIES$1 = wellKnownSymbol$3('species')
var RegExpPrototype = RegExp.prototype

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$3(KEY)
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

        re.constructor[SPECIES$1] = function () {
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

  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED) {
    var nativeRegExpMethod = /./[SYMBOL]
    var methods = exec(
      SYMBOL,
      ''[KEY],
      function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var $exec = regexp.exec

        if ($exec === regexpExec$2 || $exec === RegExpPrototype.exec) {
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
    )
    redefine(String.prototype, KEY, methods[0])
    redefine(RegExpPrototype, SYMBOL, methods[1])
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true)
}

var toInteger$1 = toInteger$4
var toString$2 = toString$4
var requireObjectCoercible$2 = requireObjectCoercible$5 // `String.prototype.codePointAt` methods implementation

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$2(requireObjectCoercible$2($this))
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
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true),
}

var charAt = stringMultibyte.charAt // `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex

var advanceStringIndex$2 = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1)
}

var toObject = toObject$3
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
  replacement,
) {
  var tailPos = position + matched.length
  var m = captures.length
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED

  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures)
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

var classof$1 = classofRaw
var regexpExec$1 = regexpExec$3 // `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec

var regexpExecAbstract = function (R, S) {
  var exec = R.exec

  if (typeof exec === 'function') {
    var result = exec.call(R, S)

    if (typeof result !== 'object') {
      throw TypeError(
        'RegExp exec method returned something other than an Object or null',
      )
    }

    return result
  }

  if (classof$1(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver')
  }

  return regexpExec$1.call(R, S)
}

var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic
var fails$1 = fails$d
var anObject$2 = anObject$8
var toInteger = toInteger$4
var toLength$1 = toLength$4
var toString$1 = toString$4
var requireObjectCoercible$1 = requireObjectCoercible$5
var advanceStringIndex$1 = advanceStringIndex$2
var getSubstitution = getSubstitution$1
var regExpExec = regexpExecAbstract
var wellKnownSymbol$2 = wellKnownSymbol$8
var REPLACE = wellKnownSymbol$2('replace')
var max = Math.max
var min$1 = Math.min

var maybeToString = function (it) {
  return it === undefined ? it : String(it)
} // IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0

var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0'
})() // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string

var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === ''
  }

  return false
})()

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$1(function () {
  var re = /./

  re.exec = function () {
    var result = []
    result.groups = {
      a: '7',
    }
    return result
  }

  return ''.replace(re, '$<a>') !== '7'
}) // @@replace logic

fixRegExpWellKnownSymbolLogic$1(
  'replace',
  function (_, nativeReplace, maybeCallNative) {
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
      ? '$'
      : '$0'
    return [
      // `String.prototype.replace` method
      // https://tc39.es/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible$1(this)
        var replacer =
          searchValue == undefined ? undefined : searchValue[REPLACE]
        return replacer !== undefined
          ? replacer.call(searchValue, O, replaceValue)
          : nativeReplace.call(toString$1(O), searchValue, replaceValue)
      }, // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (string, replaceValue) {
        var rx = anObject$2(this)
        var S = toString$1(string)

        if (
          typeof replaceValue === 'string' &&
          replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1 &&
          replaceValue.indexOf('$<') === -1
        ) {
          var res = maybeCallNative(nativeReplace, rx, S, replaceValue)
          if (res.done) return res.value
        }

        var functionalReplace = typeof replaceValue === 'function'
        if (!functionalReplace) replaceValue = toString$1(replaceValue)
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
          var matchStr = toString$1(result[0])
          if (matchStr === '')
            rx.lastIndex = advanceStringIndex$1(
              S,
              toLength$1(rx.lastIndex),
              fullUnicode,
            )
        }

        var accumulatedResult = ''
        var nextSourcePosition = 0

        for (var i = 0; i < results.length; i++) {
          result = results[i]
          var matched = toString$1(result[0])
          var position = max(min$1(toInteger(result.index), S.length), 0)
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
            var replacement = toString$1(
              replaceValue.apply(undefined, replacerArgs),
            )
          } else {
            replacement = getSubstitution(
              matched,
              S,
              position,
              captures,
              namedCaptures,
              replaceValue,
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
  },
  !REPLACE_SUPPORTS_NAMED_GROUPS ||
    !REPLACE_KEEPS_$0 ||
    REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,
)

var isObject = isObject$8
var classof = classofRaw
var wellKnownSymbol$1 = wellKnownSymbol$8
var MATCH = wellKnownSymbol$1('match') // `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp

var isRegexp = function (it) {
  var isRegExp
  return (
    isObject(it) &&
    ((isRegExp = it[MATCH]) !== undefined
      ? !!isRegExp
      : classof(it) == 'RegExp')
  )
}

var aFunction$1 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function')
  }

  return it
}

var anObject$1 = anObject$8
var aFunction = aFunction$1
var wellKnownSymbol = wellKnownSymbol$8
var SPECIES = wellKnownSymbol('species') // `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor

var speciesConstructor$1 = function (O, defaultConstructor) {
  var C = anObject$1(O).constructor
  var S
  return C === undefined || (S = anObject$1(C)[SPECIES]) == undefined
    ? defaultConstructor
    : aFunction(S)
}

var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic
var isRegExp = isRegexp
var anObject = anObject$8
var requireObjectCoercible = requireObjectCoercible$5
var speciesConstructor = speciesConstructor$1
var advanceStringIndex = advanceStringIndex$2
var toLength = toLength$4
var toString = toString$4
var callRegExpExec = regexpExecAbstract
var regexpExec = regexpExec$3
var stickyHelpers = regexpStickyHelpers
var fails = fails$d
var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y
var arrayPush = [].push
var min = Math.min
var MAX_UINT32 = 0xffffffff // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/
  var originalExec = re.exec

  re.exec = function () {
    return originalExec.apply(this, arguments)
  }

  var result = 'ab'.split(re)
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b'
}) // @@split logic

fixRegExpWellKnownSymbolLogic(
  'split',
  function (SPLIT, nativeSplit, maybeCallNative) {
    var internalSplit

    if (
      'abbc'.split(/(b)*/)[1] == 'c' || // eslint-disable-next-line regexp/no-empty-group -- required for testing
      'test'.split(/(?:)/, -1).length != 4 ||
      'ab'.split(/(?:ab)*/).length != 2 ||
      '.'.split(/(.?)(.?)/).length != 4 || // eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
      '.'.split(/()()/).length > 1 ||
      ''.split(/.?/).length
    ) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function (separator, limit) {
        var string = toString(requireObjectCoercible(this))
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0
        if (lim === 0) return []
        if (separator === undefined) return [string] // If `separator` is not a regex, use native split

        if (!isRegExp(separator)) {
          return nativeSplit.call(string, separator, lim)
        }

        var output = []
        var flags =
          (separator.ignoreCase ? 'i' : '') +
          (separator.multiline ? 'm' : '') +
          (separator.unicode ? 'u' : '') +
          (separator.sticky ? 'y' : '')
        var lastLastIndex = 0 // Make `global` and avoid `lastIndex` issues by working with a copy

        var separatorCopy = new RegExp(separator.source, flags + 'g')
        var match, lastIndex, lastLength

        while ((match = regexpExec.call(separatorCopy, string))) {
          lastIndex = separatorCopy.lastIndex

          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index))
            if (match.length > 1 && match.index < string.length)
              arrayPush.apply(output, match.slice(1))
            lastLength = match[0].length
            lastLastIndex = lastIndex
            if (output.length >= lim) break
          }

          if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++ // Avoid an infinite loop
        }

        if (lastLastIndex === string.length) {
          if (lastLength || !separatorCopy.test('')) output.push('')
        } else output.push(string.slice(lastLastIndex))

        return output.length > lim ? output.slice(0, lim) : output
      } // Chakra, V8
    } else if ('0'.split(undefined, 0).length) {
      internalSplit = function (separator, limit) {
        return separator === undefined && limit === 0
          ? []
          : nativeSplit.call(this, separator, limit)
      }
    } else internalSplit = nativeSplit

    return [
      // `String.prototype.split` method
      // https://tc39.es/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = requireObjectCoercible(this)
        var splitter = separator == undefined ? undefined : separator[SPLIT]
        return splitter !== undefined
          ? splitter.call(separator, O, limit)
          : internalSplit.call(toString(O), separator, limit)
      }, // `RegExp.prototype[@@split]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
      //
      // NOTE: This cannot be properly polyfilled in engines that don't support
      // the 'y' flag.
      function (string, limit) {
        var rx = anObject(this)
        var S = toString(string)
        var res = maybeCallNative(
          internalSplit,
          rx,
          S,
          limit,
          internalSplit !== nativeSplit,
        )
        if (res.done) return res.value
        var C = speciesConstructor(rx, RegExp)
        var unicodeMatching = rx.unicode
        var flags =
          (rx.ignoreCase ? 'i' : '') +
          (rx.multiline ? 'm' : '') +
          (rx.unicode ? 'u' : '') +
          (UNSUPPORTED_Y ? 'g' : 'y') // ^(? + rx + ) is needed, in combination with some S slicing, to
        // simulate the 'y' flag.

        var splitter = new C(
          UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx,
          flags,
        )
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0
        if (lim === 0) return []
        if (S.length === 0)
          return callRegExpExec(splitter, S) === null ? [S] : []
        var p = 0
        var q = 0
        var A = []

        while (q < S.length) {
          splitter.lastIndex = UNSUPPORTED_Y ? 0 : q
          var z = callRegExpExec(splitter, UNSUPPORTED_Y ? S.slice(q) : S)
          var e

          if (
            z === null ||
            (e = min(
              toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)),
              S.length,
            )) === p
          ) {
            q = advanceStringIndex(S, q, unicodeMatching)
          } else {
            A.push(S.slice(p, q))
            if (A.length === lim) return A

            for (var i = 1; i <= z.length - 1; i++) {
              A.push(z[i])
              if (A.length === lim) return A
            }

            q = p = e
          }
        }

        A.push(S.slice(p))
        return A
      },
    ]
  },
  !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC,
  UNSUPPORTED_Y,
)

function exportPlugin(process, _ref) {
  var options = _ref.options
  process.defaultOptions = options
  return process
}

var info = {
  description: 'fis3 relative path support',
  keywords: ['relative'],
  options: {},
}
var info$1 = info

var _global = global,
  fis = _global.fis
var quotes = {
  '': 'QUOTE_NONE',
  "'": 'QUOTE_SINGLE',
  '"': 'QUOTE_DOUBLE',
}
var rUrl = /(["']?)__relative___(QUOTE_(?:DOUBLE|NONE|SINGLE))-(.*?)___(\1)/g
var rFile = /\.[^.]+$/

function wrapPath(info) {
  var path = info.file.subpath + info.query + info.hash
  var quote = info.quote
  var quoteStyle = quotes[quote]
  return ''
    .concat(quote, '__relative___')
    .concat(quoteStyle, '-')
    .concat(path, '___')
    .concat(quote)
}

function getRelativeUrl(file, host) {
  var url = ''

  if (typeof file === 'string') {
    url = file
  } else {
    url = file.getUrl()

    if (file.domain) {
      return url
    }
  }

  var relativeFrom =
    typeof host.relative === 'string' ? host.relative : host.release

  if (rFile.test(relativeFrom)) {
    relativeFrom = path__default['default'].dirname(relativeFrom)
  }

  url = path__default['default'].relative(relativeFrom, url)
  url = url.replace(/\\/g, '/')

  if (url[0] !== '.') {
    url = './'.concat(url)
  }

  return url
}

function convert(content, file, host) {
  return content.replace(rUrl, function (all, _, quoteStyle, path) {
    var info = fis.project.lookup(path)

    if (!info.file) {
      return info.origin
    } // 再编译一遍，为了保证 hash 值是一样的。

    fis.compile(info.file)
    var query = info.query
    var hash = info.hash || info.file.hash
    var url = getRelativeUrl(info.file, host || file)
    var parts = url.split('?')

    if (parts.length > 1 && query) {
      url = ''.concat(parts[0] + query, '&amp;').concat(parts[1])
    } else if (query) {
      url += query
    }

    var quoteChr = ''

    for (var chr in quotes) {
      if (quotes[chr] === quoteStyle) {
        quoteChr = chr
        break
      }
    }

    return quoteChr + url + hash + quoteChr
  })
}

function onStandardRestoreUri(message) {
  var info = message.info,
    file = message.file // 没有配置，不开启。
  // 或者目标文件不存在

  if (!file.relative || !info.file) {
    return
  }

  message.ret = wrapPath(info)
}

function onProcessEnd(file) {
  // 没有配置，不开启。
  if (!file.relative || !file.isText() || file.isInline) {
    return
  }

  var content = file.getContent()
  file.relativeBody = content
  content = convert(content, file)
  file.setContent(content)
}

function onPackFile(message) {
  var file = message.file
  var package_ = message.pkg // 没有配置，不开启。

  if (!file.relative || !file.relativeBody) {
    return
  }

  message.content = convert(file.relativeBody, file, package_)
}

function onFetchRelativeUrl(message) {
  var target = message.target
  var host = message.file

  if (!host.relative) {
    return
  }

  message.ret = getRelativeUrl(target, host)
}

function process(fis) {
  fis.on('process:end', onProcessEnd)
  fis.on('standard:restore:uri', onStandardRestoreUri)
  fis.on('pack:file', onPackFile) // 给其他插件用的

  fis.on('plugin:relative:fetch', onFetchRelativeUrl)
}

module.exports = exportPlugin(process, info$1)
