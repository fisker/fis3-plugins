'use strict'

var posthtml = require('posthtml')
var beautify = require('posthtml-beautify')
var sync = require('promise-synchronizer')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {default: e}
}

var posthtml__default = /*#__PURE__*/ _interopDefaultLegacy(posthtml)
var beautify__default = /*#__PURE__*/ _interopDefaultLegacy(beautify)
var sync__default = /*#__PURE__*/ _interopDefaultLegacy(sync)

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

var global$h = // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  (function () {
    return this
  })() ||
  Function('return this')()

var objectGetOwnPropertyDescriptor = {}

var fails$b = function (exec) {
  try {
    return !!exec()
  } catch (error) {
    return true
  }
}

var fails$a = fails$b // Detect IE8's incomplete defineProperty implementation

var descriptors = !fails$a(function () {
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
    1,
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

var toString$5 = {}.toString

var classofRaw$1 = function (it) {
  return toString$5.call(it).slice(8, -1)
}

var fails$9 = fails$b
var classof$5 = classofRaw$1
var split = ''.split // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails$9(function () {
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

var IndexedObject = indexedObject
var requireObjectCoercible$3 = requireObjectCoercible$4

var toIndexedObject$3 = function (it) {
  return IndexedObject(requireObjectCoercible$3(it))
}

var isObject$8 = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function'
}

var global$g = global$h

var aFunction$5 = function (variable) {
  return typeof variable == 'function' ? variable : undefined
}

var getBuiltIn$6 = function (namespace, method) {
  return arguments.length < 2
    ? aFunction$5(global$g[namespace])
    : global$g[namespace] && global$g[namespace][method]
}

var getBuiltIn$5 = getBuiltIn$6
var engineUserAgent = getBuiltIn$5('navigator', 'userAgent') || ''

var global$f = global$h
var userAgent$2 = engineUserAgent
var process$4 = global$f.process
var Deno = global$f.Deno
var versions = (process$4 && process$4.versions) || (Deno && Deno.version)
var v8 = versions && versions.v8
var match, version

if (v8) {
  match = v8.split('.')
  version = match[0] < 4 ? 1 : match[0] + match[1]
} else if (userAgent$2) {
  match = userAgent$2.match(/Edge\/(\d+)/)

  if (!match || match[1] >= 74) {
    match = userAgent$2.match(/Chrome\/(\d+)/)
    if (match) version = match[1]
  }
}

var engineV8Version = version && +version

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION$1 = engineV8Version
var fails$8 = fails$b // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

var nativeSymbol =
  !!Object.getOwnPropertySymbols &&
  !fails$8(function () {
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

var getBuiltIn$4 = getBuiltIn$6
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid
var isSymbol$3 = USE_SYMBOL_AS_UID$1
  ? function (it) {
      return typeof it == 'symbol'
    }
  : function (it) {
      var $Symbol = getBuiltIn$4('Symbol')
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

var global$e = global$h

var setGlobal$3 = function (key, value) {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty(global$e, key, {
      value: value,
      configurable: true,
      writable: true,
    })
  } catch (error) {
    global$e[key] = value
  }

  return value
}

var global$d = global$h
var setGlobal$2 = setGlobal$3
var SHARED = '__core-js_shared__'
var store$3 = global$d[SHARED] || setGlobal$2(SHARED, {})
var sharedStore = store$3

var store$2 = sharedStore
;(shared$4.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {})
})('versions', []).push({
  version: '3.16.0',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)',
})

var requireObjectCoercible$2 = requireObjectCoercible$4 // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

var toObject$2 = function (argument) {
  return Object(requireObjectCoercible$2(argument))
}

var toObject$1 = toObject$2
var hasOwnProperty = {}.hasOwnProperty

var has$7 =
  Object.hasOwn ||
  function hasOwn(it, key) {
    return hasOwnProperty.call(toObject$1(it), key)
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

var global$c = global$h
var shared$3 = shared$4.exports
var has$6 = has$7
var uid$1 = uid$2
var NATIVE_SYMBOL = nativeSymbol
var USE_SYMBOL_AS_UID = useSymbolAsUid
var WellKnownSymbolsStore = shared$3('wks')
var Symbol$1 = global$c.Symbol
var createWellKnownSymbol = USE_SYMBOL_AS_UID
  ? Symbol$1
  : (Symbol$1 && Symbol$1.withoutSetter) || uid$1

var wellKnownSymbol$c = function (name) {
  if (
    !has$6(WellKnownSymbolsStore, name) ||
    !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')
  ) {
    if (NATIVE_SYMBOL && has$6(Symbol$1, name)) {
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
var wellKnownSymbol$b = wellKnownSymbol$c
var TO_PRIMITIVE = wellKnownSymbol$b('toPrimitive') // `ToPrimitive` abstract operation
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

var toPropertyKey$2 = function (argument) {
  var key = toPrimitive(argument, 'string')
  return isSymbol$1(key) ? key : String(key)
}

var global$b = global$h
var isObject$5 = isObject$8
var document$3 = global$b.document // typeof document.createElement is 'object' in old IE

var EXISTS = isObject$5(document$3) && isObject$5(document$3.createElement)

var documentCreateElement$1 = function (it) {
  return EXISTS ? document$3.createElement(it) : {}
}

var DESCRIPTORS$5 = descriptors
var fails$7 = fails$b
var createElement$1 = documentCreateElement$1 // Thank's IE8 for his funny defineProperty

var ie8DomDefine =
  !DESCRIPTORS$5 &&
  !fails$7(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return (
      Object.defineProperty(createElement$1('div'), 'a', {
        get: function () {
          return 7
        },
      }).a != 7
    )
  })

var DESCRIPTORS$4 = descriptors
var propertyIsEnumerableModule = objectPropertyIsEnumerable
var createPropertyDescriptor$1 = createPropertyDescriptor$2
var toIndexedObject$2 = toIndexedObject$3
var toPropertyKey$1 = toPropertyKey$2
var has$5 = has$7
var IE8_DOM_DEFINE$1 = ie8DomDefine // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

objectGetOwnPropertyDescriptor.f = DESCRIPTORS$4
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
      if (has$5(O, P))
        return createPropertyDescriptor$1(
          !propertyIsEnumerableModule.f.call(O, P),
          O[P],
        )
    }

var objectDefineProperty = {}

var isObject$4 = isObject$8

var anObject$b = function (it) {
  if (!isObject$4(it)) {
    throw TypeError(String(it) + ' is not an object')
  }

  return it
}

var DESCRIPTORS$3 = descriptors
var IE8_DOM_DEFINE = ie8DomDefine
var anObject$a = anObject$b
var toPropertyKey = toPropertyKey$2 // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

objectDefineProperty.f = DESCRIPTORS$3
  ? $defineProperty
  : function defineProperty(O, P, Attributes) {
      anObject$a(O)
      P = toPropertyKey(P)
      anObject$a(Attributes)
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

var DESCRIPTORS$2 = descriptors
var definePropertyModule$3 = objectDefineProperty
var createPropertyDescriptor = createPropertyDescriptor$2
var createNonEnumerableProperty$4 = DESCRIPTORS$2
  ? function (object, key, value) {
      return definePropertyModule$3.f(
        object,
        key,
        createPropertyDescriptor(1, value),
      )
    }
  : function (object, key, value) {
      object[key] = value
      return object
    }

var redefine$5 = {exports: {}}

var store$1 = sharedStore
var functionToString = Function.toString // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (typeof store$1.inspectSource != 'function') {
  store$1.inspectSource = function (it) {
    return functionToString.call(it)
  }
}

var inspectSource$3 = store$1.inspectSource

var global$a = global$h
var inspectSource$2 = inspectSource$3
var WeakMap$1 = global$a.WeakMap
var nativeWeakMap =
  typeof WeakMap$1 === 'function' &&
  /native code/.test(inspectSource$2(WeakMap$1))

var shared$2 = shared$4.exports
var uid = uid$2
var keys = shared$2('keys')

var sharedKey$2 = function (key) {
  return keys[key] || (keys[key] = uid(key))
}

var hiddenKeys$4 = {}

var NATIVE_WEAK_MAP = nativeWeakMap
var global$9 = global$h
var isObject$3 = isObject$8
var createNonEnumerableProperty$3 = createNonEnumerableProperty$4
var objectHas = has$7
var shared$1 = sharedStore
var sharedKey$1 = sharedKey$2
var hiddenKeys$3 = hiddenKeys$4
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized'
var WeakMap = global$9.WeakMap
var set$1, get, has$4

var enforce = function (it) {
  return has$4(it) ? get(it) : set$1(it, {})
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

  set$1 = function (it, metadata) {
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
  var STATE = sharedKey$1('state')
  hiddenKeys$3[STATE] = true

  set$1 = function (it, metadata) {
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
  set: set$1,
  get: get,
  has: has$4,
  enforce: enforce,
  getterFor: getterFor,
}

var global$8 = global$h
var createNonEnumerableProperty$2 = createNonEnumerableProperty$4
var has$3 = has$7
var setGlobal$1 = setGlobal$3
var inspectSource$1 = inspectSource$3
var InternalStateModule$1 = internalState
var getInternalState$2 = InternalStateModule$1.get
var enforceInternalState = InternalStateModule$1.enforce
var TEMPLATE = String(String).split('String')
;(redefine$5.exports = function (O, key, value, options) {
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

  if (O === global$8) {
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
    (typeof this == 'function' && getInternalState$2(this).source) ||
    inspectSource$1(this)
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
var min$2 = Math.min // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

var toLength$3 = function (argument) {
  return argument > 0 ? min$2(toInteger$3(argument), 0x1fffffffffffff) : 0 // 2 ** 53 - 1 == 9007199254740991
}

var toInteger$2 = toInteger$4
var max$1 = Math.max
var min$1 = Math.min // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex$1 = function (index, length) {
  var integer = toInteger$2(index)
  return integer < 0 ? max$1(integer + length, 0) : min$1(integer, length)
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

var has$2 = has$7
var toIndexedObject = toIndexedObject$3
var indexOf = arrayIncludes.indexOf
var hiddenKeys$2 = hiddenKeys$4

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object)
  var i = 0
  var result = []
  var key

  for (key in O) !has$2(hiddenKeys$2, key) && has$2(O, key) && result.push(key) // Don't enum bug & hidden keys

  while (names.length > i)
    if (has$2(O, (key = names[i++]))) {
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

var getBuiltIn$3 = getBuiltIn$6
var getOwnPropertyNamesModule = objectGetOwnPropertyNames
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols
var anObject$9 = anObject$b // all object keys, includes non-enumerable and symbols

var ownKeys$1 =
  getBuiltIn$3('Reflect', 'ownKeys') ||
  function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$9(it))
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys
  }

var has$1 = has$7
var ownKeys = ownKeys$1
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor
var definePropertyModule$2 = objectDefineProperty

var copyConstructorProperties$1 = function (target, source) {
  var keys = ownKeys(source)
  var defineProperty = definePropertyModule$2.f
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    if (!has$1(target, key))
      defineProperty(target, key, getOwnPropertyDescriptor(source, key))
  }
}

var fails$6 = fails$b
var replacement = /#|\.prototype\./

var isForced$2 = function (feature, detection) {
  var value = data[normalize(feature)]
  return value == POLYFILL
    ? true
    : value == NATIVE
    ? false
    : typeof detection == 'function'
    ? fails$6(detection)
    : !!detection
}

var normalize = (isForced$2.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase()
})

var data = (isForced$2.data = {})
var NATIVE = (isForced$2.NATIVE = 'N')
var POLYFILL = (isForced$2.POLYFILL = 'P')
var isForced_1 = isForced$2

var global$7 = global$h
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f
var createNonEnumerableProperty$1 = createNonEnumerableProperty$4
var redefine$4 = redefine$5.exports
var setGlobal = setGlobal$3
var copyConstructorProperties = copyConstructorProperties$1
var isForced$1 = isForced_1
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
    target = global$7
  } else if (STATIC) {
    target = global$7[TARGET] || setGlobal(TARGET, {})
  } else {
    target = (global$7[TARGET] || {}).prototype
  }

  if (target)
    for (key in source) {
      sourceProperty = source[key]

      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key)
        targetProperty = descriptor && descriptor.value
      } else targetProperty = target[key]

      FORCED = isForced$1(
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

      redefine$4(target, key, sourceProperty, options)
    }
}

var isSymbol = isSymbol$3

var toString$4 = function (argument) {
  if (isSymbol(argument))
    throw TypeError('Cannot convert a Symbol value to a string')
  return String(argument)
}

var anObject$8 = anObject$b // `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags

var regexpFlags$1 = function () {
  var that = anObject$8(this)
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

var fails$5 = fails$b // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,

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

var DESCRIPTORS$1 = descriptors
var definePropertyModule$1 = objectDefineProperty
var anObject$7 = anObject$b
var objectKeys = objectKeys$1 // `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe

var objectDefineProperties = DESCRIPTORS$1
  ? Object.defineProperties
  : function defineProperties(O, Properties) {
      anObject$7(O)
      var keys = objectKeys(Properties)
      var length = keys.length
      var index = 0
      var key

      while (length > index)
        definePropertyModule$1.f(O, (key = keys[index++]), Properties[key])

      return O
    }

var getBuiltIn$2 = getBuiltIn$6
var html$2 = getBuiltIn$2('document', 'documentElement')

/* global ActiveXObject -- old IE, WSH */
var anObject$6 = anObject$b
var defineProperties = objectDefineProperties
var enumBugKeys = enumBugKeys$3
var hiddenKeys = hiddenKeys$4
var html$1 = html$2
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
    html$1.appendChild(iframe) // https://github.com/zloirock/core-js/issues/475

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
      EmptyConstructor[PROTOTYPE] = anObject$6(O)
      result = new EmptyConstructor()
      EmptyConstructor[PROTOTYPE] = null // add "__proto__" for Object.getPrototypeOf polyfill

      result[IE_PROTO] = O
    } else result = NullProtoObject()

    return Properties === undefined
      ? result
      : defineProperties(result, Properties)
  }

var fails$4 = fails$b
var regexpUnsupportedDotAll = fails$4(function () {
  // babel-minify transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var re = RegExp('.', (typeof '').charAt(0))
  return !(re.dotAll && re.exec('\n') && re.flags === 's')
})

var fails$3 = fails$b
var regexpUnsupportedNcg = fails$3(function () {
  // babel-minify transpiles RegExp('.', 'g') -> /./g and it causes SyntaxError
  var re = RegExp('(?<a>b)', (typeof '').charAt(5))
  return re.exec('b').groups.a !== 'b' || 'b'.replace(re, '$<a>c') !== 'bc'
})

/* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */

/* eslint-disable regexp/no-useless-quantifier -- testing */

var toString$3 = toString$4
var regexpFlags = regexpFlags$1
var stickyHelpers = regexpStickyHelpers
var shared = shared$4.exports
var create = objectCreate
var getInternalState$1 = internalState.get
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

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET // nonparticipating capturing group, copied from es5-shim's String#split patch.

var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined
var PATCH =
  UPDATES_LAST_INDEX_WRONG ||
  NPCG_INCLUDED ||
  UNSUPPORTED_Y ||
  UNSUPPORTED_DOT_ALL ||
  UNSUPPORTED_NCG

if (PATCH) {
  // eslint-disable-next-line max-statements -- TODO
  patchedExec = function exec(string) {
    var re = this
    var state = getInternalState$1(re)
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

var regexpExec$2 = patchedExec

var $$1 = _export
var exec = regexpExec$2 // `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec

$$1(
  {
    target: 'RegExp',
    proto: true,
    forced: /./.exec !== exec,
  },
  {
    exec: exec,
  },
)

var redefine$3 = redefine$5.exports
var regexpExec$1 = regexpExec$2
var fails$2 = fails$b
var wellKnownSymbol$a = wellKnownSymbol$c
var createNonEnumerableProperty = createNonEnumerableProperty$4
var SPECIES$3 = wellKnownSymbol$a('species')
var RegExpPrototype = RegExp.prototype

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$a(KEY)
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

        re.constructor[SPECIES$3] = function () {
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
    )
    redefine$3(String.prototype, KEY, methods[0])
    redefine$3(RegExpPrototype, SYMBOL, methods[1])
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true)
}

var toInteger$1 = toInteger$4
var toString$2 = toString$4
var requireObjectCoercible$1 = requireObjectCoercible$4 // `String.prototype.codePointAt` methods implementation

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$2(requireObjectCoercible$1($this))
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

var advanceStringIndex$1 = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1)
}

var toObject = toObject$2
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

var classof$4 = classofRaw$1
var regexpExec = regexpExec$2 // `RegExpExec` abstract operation
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

  if (classof$4(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver')
  }

  return regexpExec.call(R, S)
}

var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic
var fails$1 = fails$b
var anObject$5 = anObject$b
var toInteger = toInteger$4
var toLength$1 = toLength$3
var toString$1 = toString$4
var requireObjectCoercible = requireObjectCoercible$4
var advanceStringIndex = advanceStringIndex$1
var getSubstitution = getSubstitution$1
var regExpExec = regexpExecAbstract
var wellKnownSymbol$9 = wellKnownSymbol$c
var REPLACE = wellKnownSymbol$9('replace')
var max = Math.max
var min = Math.min

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

fixRegExpWellKnownSymbolLogic(
  'replace',
  function (_, nativeReplace, maybeCallNative) {
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
          : nativeReplace.call(toString$1(O), searchValue, replaceValue)
      }, // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (string, replaceValue) {
        var rx = anObject$5(this)
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
            rx.lastIndex = advanceStringIndex(
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
          var position = max(min(toInteger(result.index), S.length), 0)
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

var wellKnownSymbol$8 = wellKnownSymbol$c
var TO_STRING_TAG$2 = wellKnownSymbol$8('toStringTag')
var test = {}
test[TO_STRING_TAG$2] = 'z'
var toStringTagSupport = String(test) === '[object z]'

var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport
var classofRaw = classofRaw$1
var wellKnownSymbol$7 = wellKnownSymbol$c
var TO_STRING_TAG$1 = wellKnownSymbol$7('toStringTag') // ES3 wrong here

var CORRECT_ARGUMENTS =
  classofRaw(
    (function () {
      return arguments
    })(),
  ) == 'Arguments' // fallback for IE11 Script Access Denied error

var tryGet = function (it, key) {
  try {
    return it[key]
  } catch (error) {
    /* empty */
  }
} // getting tag from ES6+ `Object.prototype.toString`

var classof$3 = TO_STRING_TAG_SUPPORT$2
  ? classofRaw
  : function (it) {
      var O, tag, result
      return it === undefined
        ? 'Undefined'
        : it === null
        ? 'Null' // @@toStringTag case
        : typeof (tag = tryGet((O = Object(it)), TO_STRING_TAG$1)) == 'string'
        ? tag // builtinTag case
        : CORRECT_ARGUMENTS
        ? classofRaw(O) // ES3 arguments fallback
        : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function'
        ? 'Arguments'
        : result
    }

var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport
var classof$2 = classof$3 // `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring

var objectToString = TO_STRING_TAG_SUPPORT$1
  ? {}.toString
  : function toString() {
      return '[object ' + classof$2(this) + ']'
    }

var TO_STRING_TAG_SUPPORT = toStringTagSupport
var redefine$2 = redefine$5.exports
var toString = objectToString // `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring

if (!TO_STRING_TAG_SUPPORT) {
  redefine$2(Object.prototype, 'toString', toString, {
    unsafe: true,
  })
}

var global$6 = global$h
var nativePromiseConstructor = global$6.Promise

var redefine$1 = redefine$5.exports

var redefineAll$1 = function (target, src, options) {
  for (var key in src) redefine$1(target, key, src[key], options)

  return target
}

var isObject$2 = isObject$8

var aPossiblePrototype$1 = function (it) {
  if (!isObject$2(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype')
  }

  return it
}

/* eslint-disable no-proto -- safe */
var anObject$4 = anObject$b
var aPossiblePrototype = aPossiblePrototype$1 // `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe

var objectSetPrototypeOf =
  Object.setPrototypeOf ||
  ('__proto__' in {}
    ? (function () {
        var CORRECT_SETTER = false
        var test = {}
        var setter

        try {
          // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
          setter = Object.getOwnPropertyDescriptor(
            Object.prototype,
            '__proto__',
          ).set
          setter.call(test, [])
          CORRECT_SETTER = test instanceof Array
        } catch (error) {
          /* empty */
        }

        return function setPrototypeOf(O, proto) {
          anObject$4(O)
          aPossiblePrototype(proto)
          if (CORRECT_SETTER) setter.call(O, proto)
          else O.__proto__ = proto
          return O
        }
      })()
    : undefined)

var defineProperty = objectDefineProperty.f
var has = has$7
var wellKnownSymbol$6 = wellKnownSymbol$c
var TO_STRING_TAG = wellKnownSymbol$6('toStringTag')

var setToStringTag$1 = function (it, TAG, STATIC) {
  if (it && !has((it = STATIC ? it : it.prototype), TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, {
      configurable: true,
      value: TAG,
    })
  }
}

var getBuiltIn$1 = getBuiltIn$6
var definePropertyModule = objectDefineProperty
var wellKnownSymbol$5 = wellKnownSymbol$c
var DESCRIPTORS = descriptors
var SPECIES$2 = wellKnownSymbol$5('species')

var setSpecies$1 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$1(CONSTRUCTOR_NAME)
  var defineProperty = definePropertyModule.f

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES$2]) {
    defineProperty(Constructor, SPECIES$2, {
      configurable: true,
      get: function () {
        return this
      },
    })
  }
}

var aFunction$4 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function')
  }

  return it
}

var anInstance$1 = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation')
  }

  return it
}

var iterators = {}

var wellKnownSymbol$4 = wellKnownSymbol$c
var Iterators$1 = iterators
var ITERATOR$2 = wellKnownSymbol$4('iterator')
var ArrayPrototype = Array.prototype // check on default Array iterator

var isArrayIteratorMethod$1 = function (it) {
  return (
    it !== undefined &&
    (Iterators$1.Array === it || ArrayPrototype[ITERATOR$2] === it)
  )
}

var aFunction$3 = aFunction$4 // optional / simple context binding

var functionBindContext = function (fn, that, length) {
  aFunction$3(fn)
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

var classof$1 = classof$3
var Iterators = iterators
var wellKnownSymbol$3 = wellKnownSymbol$c
var ITERATOR$1 = wellKnownSymbol$3('iterator')

var getIteratorMethod$1 = function (it) {
  if (it != undefined)
    return it[ITERATOR$1] || it['@@iterator'] || Iterators[classof$1(it)]
}

var anObject$3 = anObject$b

var iteratorClose$1 = function (iterator) {
  var returnMethod = iterator['return']

  if (returnMethod !== undefined) {
    return anObject$3(returnMethod.call(iterator)).value
  }
}

var anObject$2 = anObject$b
var isArrayIteratorMethod = isArrayIteratorMethod$1
var toLength = toLength$3
var bind$2 = functionBindContext
var getIteratorMethod = getIteratorMethod$1
var iteratorClose = iteratorClose$1

var Result = function (stopped, result) {
  this.stopped = stopped
  this.result = result
}

var iterate$1 = function (iterable, unboundFunction, options) {
  var that = options && options.that
  var AS_ENTRIES = !!(options && options.AS_ENTRIES)
  var IS_ITERATOR = !!(options && options.IS_ITERATOR)
  var INTERRUPTED = !!(options && options.INTERRUPTED)
  var fn = bind$2(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED)
  var iterator, iterFn, index, length, result, next, step

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator)
    return new Result(true, condition)
  }

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject$2(value)
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1])
    }

    return INTERRUPTED ? fn(value, stop) : fn(value)
  }

  if (IS_ITERATOR) {
    iterator = iterable
  } else {
    iterFn = getIteratorMethod(iterable)
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable') // optimisation for array iterators

    if (isArrayIteratorMethod(iterFn)) {
      for (
        index = 0, length = toLength(iterable.length);
        length > index;
        index++
      ) {
        result = callFn(iterable[index])
        if (result && result instanceof Result) return result
      }

      return new Result(false)
    }

    iterator = iterFn.call(iterable)
  }

  next = iterator.next

  while (!(step = next.call(iterator)).done) {
    try {
      result = callFn(step.value)
    } catch (error) {
      iteratorClose(iterator)
      throw error
    }

    if (typeof result == 'object' && result && result instanceof Result)
      return result
  }

  return new Result(false)
}

var wellKnownSymbol$2 = wellKnownSymbol$c
var ITERATOR = wellKnownSymbol$2('iterator')
var SAFE_CLOSING = false

try {
  var called = 0
  var iteratorWithReturn = {
    next: function () {
      return {
        done: !!called++,
      }
    },
    return: function () {
      SAFE_CLOSING = true
    },
  }

  iteratorWithReturn[ITERATOR] = function () {
    return this
  } // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing

  Array.from(iteratorWithReturn, function () {
    throw 2
  })
} catch (error) {
  /* empty */
}

var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false
  var ITERATION_SUPPORT = false

  try {
    var object = {}

    object[ITERATOR] = function () {
      return {
        next: function () {
          return {
            done: (ITERATION_SUPPORT = true),
          }
        },
      }
    }

    exec(object)
  } catch (error) {
    /* empty */
  }

  return ITERATION_SUPPORT
}

var anObject$1 = anObject$b
var aFunction$2 = aFunction$4
var wellKnownSymbol$1 = wellKnownSymbol$c
var SPECIES$1 = wellKnownSymbol$1('species') // `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor

var speciesConstructor$1 = function (O, defaultConstructor) {
  var C = anObject$1(O).constructor
  var S
  return C === undefined || (S = anObject$1(C)[SPECIES$1]) == undefined
    ? defaultConstructor
    : aFunction$2(S)
}

var userAgent$1 = engineUserAgent
var engineIsIos = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent$1)

var classof = classofRaw$1
var global$5 = global$h
var engineIsNode = classof(global$5.process) == 'process'

var global$4 = global$h
var fails = fails$b
var bind$1 = functionBindContext
var html = html$2
var createElement = documentCreateElement$1
var IS_IOS$1 = engineIsIos
var IS_NODE$2 = engineIsNode
var set = global$4.setImmediate
var clear = global$4.clearImmediate
var process$3 = global$4.process
var MessageChannel = global$4.MessageChannel
var Dispatch = global$4.Dispatch
var counter = 0
var queue = {}
var ONREADYSTATECHANGE = 'onreadystatechange'
var location, defer, channel, port

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location = global$4.location
} catch (error) {
  /* empty */
}

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins -- safe
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id]
    delete queue[id]
    fn()
  }
}

var runner = function (id) {
  return function () {
    run(id)
  }
}

var listener = function (event) {
  run(event.data)
}

var post = function (id) {
  // old engines have not location.origin
  global$4.postMessage(String(id), location.protocol + '//' + location.host)
} // Node.js 0.9+ & IE10+ has setImmediate, otherwise:

if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = []
    var argumentsLength = arguments.length
    var i = 1

    while (argumentsLength > i) args.push(arguments[i++])

    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      ;(typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args)
    }

    defer(counter)
    return counter
  }

  clear = function clearImmediate(id) {
    delete queue[id]
  } // Node.js 0.8-

  if (IS_NODE$2) {
    defer = function (id) {
      process$3.nextTick(runner(id))
    } // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id))
    } // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS$1) {
    channel = new MessageChannel()
    port = channel.port2
    channel.port1.onmessage = listener
    defer = bind$1(port.postMessage, port, 1) // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global$4.addEventListener &&
    typeof postMessage == 'function' &&
    !global$4.importScripts &&
    location &&
    location.protocol !== 'file:' &&
    !fails(post)
  ) {
    defer = post
    global$4.addEventListener('message', listener, false) // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] =
        function () {
          html.removeChild(this)
          run(id)
        }
    } // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0)
    }
  }
}

var task$1 = {
  set: set,
  clear: clear,
}

var userAgent = engineUserAgent
var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent)

var global$3 = global$h
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f
var macrotask = task$1.set
var IS_IOS = engineIsIos
var IS_WEBOS_WEBKIT = engineIsWebosWebkit
var IS_NODE$1 = engineIsNode
var MutationObserver =
  global$3.MutationObserver || global$3.WebKitMutationObserver
var document$2 = global$3.document
var process$2 = global$3.process
var Promise$1 = global$3.Promise // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`

var queueMicrotaskDescriptor = getOwnPropertyDescriptor(
  global$3,
  'queueMicrotask',
)
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value
var flush, head, last, notify$1, toggle, node, promise, then // modern engines have queueMicrotask method

if (!queueMicrotask) {
  flush = function () {
    var parent, fn
    if (IS_NODE$1 && (parent = process$2.domain)) parent.exit()

    while (head) {
      fn = head.fn
      head = head.next

      try {
        fn()
      } catch (error) {
        if (head) notify$1()
        else last = undefined
        throw error
      }
    }

    last = undefined
    if (parent) parent.enter()
  } // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898

  if (
    !IS_IOS &&
    !IS_NODE$1 &&
    !IS_WEBOS_WEBKIT &&
    MutationObserver &&
    document$2
  ) {
    toggle = true
    node = document$2.createTextNode('')
    new MutationObserver(flush).observe(node, {
      characterData: true,
    })

    notify$1 = function () {
      node.data = toggle = !toggle
    } // environments with maybe non-completely correct, but existent Promise
  } else if (Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise$1.resolve(undefined) // workaround of WebKit ~ iOS Safari 10.1 bug

    promise.constructor = Promise$1
    then = promise.then

    notify$1 = function () {
      then.call(promise, flush)
    } // Node.js without promises
  } else if (IS_NODE$1) {
    notify$1 = function () {
      process$2.nextTick(flush)
    } // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout
  } else {
    notify$1 = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global$3, flush)
    }
  }
}

var microtask$1 =
  queueMicrotask ||
  function (fn) {
    var task = {
      fn: fn,
      next: undefined,
    }
    if (last) last.next = task

    if (!head) {
      head = task
      notify$1()
    }

    last = task
  }

var newPromiseCapability$2 = {}

var aFunction$1 = aFunction$4

var PromiseCapability = function (C) {
  var resolve, reject
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined)
      throw TypeError('Bad Promise constructor')
    resolve = $$resolve
    reject = $$reject
  })
  this.resolve = aFunction$1(resolve)
  this.reject = aFunction$1(reject)
} // `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability

newPromiseCapability$2.f = function (C) {
  return new PromiseCapability(C)
}

var anObject = anObject$b
var isObject$1 = isObject$8
var newPromiseCapability$1 = newPromiseCapability$2

var promiseResolve$1 = function (C, x) {
  anObject(C)
  if (isObject$1(x) && x.constructor === C) return x
  var promiseCapability = newPromiseCapability$1.f(C)
  var resolve = promiseCapability.resolve
  resolve(x)
  return promiseCapability.promise
}

var global$2 = global$h

var hostReportErrors$1 = function (a, b) {
  var console = global$2.console

  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b)
  }
}

var perform$1 = function (exec) {
  try {
    return {
      error: false,
      value: exec(),
    }
  } catch (error) {
    return {
      error: true,
      value: error,
    }
  }
}

var engineIsBrowser = typeof window == 'object'

var $ = _export
var global$1 = global$h
var getBuiltIn = getBuiltIn$6
var NativePromise = nativePromiseConstructor
var redefine = redefine$5.exports
var redefineAll = redefineAll$1
var setPrototypeOf = objectSetPrototypeOf
var setToStringTag = setToStringTag$1
var setSpecies = setSpecies$1
var isObject = isObject$8
var aFunction = aFunction$4
var anInstance = anInstance$1
var inspectSource = inspectSource$3
var iterate = iterate$1
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1
var speciesConstructor = speciesConstructor$1
var task = task$1.set
var microtask = microtask$1
var promiseResolve = promiseResolve$1
var hostReportErrors = hostReportErrors$1
var newPromiseCapabilityModule = newPromiseCapability$2
var perform = perform$1
var InternalStateModule = internalState
var isForced = isForced_1
var wellKnownSymbol = wellKnownSymbol$c
var IS_BROWSER = engineIsBrowser
var IS_NODE = engineIsNode
var V8_VERSION = engineV8Version
var SPECIES = wellKnownSymbol('species')
var PROMISE = 'Promise'
var getInternalState = InternalStateModule.get
var setInternalState = InternalStateModule.set
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE)
var NativePromisePrototype = NativePromise && NativePromise.prototype
var PromiseConstructor = NativePromise
var PromiseConstructorPrototype = NativePromisePrototype
var TypeError$1 = global$1.TypeError
var document$1 = global$1.document
var process$1 = global$1.process
var newPromiseCapability = newPromiseCapabilityModule.f
var newGenericPromiseCapability = newPromiseCapability
var DISPATCH_EVENT = !!(
  document$1 &&
  document$1.createEvent &&
  global$1.dispatchEvent
)
var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function'
var UNHANDLED_REJECTION = 'unhandledrejection'
var REJECTION_HANDLED = 'rejectionhandled'
var PENDING = 0
var FULFILLED = 1
var REJECTED = 2
var HANDLED = 1
var UNHANDLED = 2
var SUBCLASSING = false
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen
var FORCED = isForced(PROMISE, function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor)
  var GLOBAL_CORE_JS_PROMISE =
    PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor) // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions

  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true // We need Promise#finally in the pure version for preventing prototype pollution
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679

  if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE))
    return false // Detect correctness of subclassing with @@species support

  var promise = new PromiseConstructor(function (resolve) {
    resolve(1)
  })

  var FakePromise = function (exec) {
    exec(
      function () {
        /* empty */
      },
      function () {
        /* empty */
      },
    )
  }

  var constructor = (promise.constructor = {})
  constructor[SPECIES] = FakePromise
  SUBCLASSING =
    promise.then(function () {
      /* empty */
    }) instanceof FakePromise
  if (!SUBCLASSING) return true // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test

  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT
})
var INCORRECT_ITERATION =
  FORCED ||
  !checkCorrectnessOfIteration(function (iterable) {
    PromiseConstructor.all(iterable)['catch'](function () {
      /* empty */
    })
  }) // helpers

var isThenable = function (it) {
  var then
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false
}

var notify = function (state, isReject) {
  if (state.notified) return
  state.notified = true
  var chain = state.reactions
  microtask(function () {
    var value = state.value
    var ok = state.state == FULFILLED
    var index = 0 // variable length - can't use forEach

    while (chain.length > index) {
      var reaction = chain[index++]
      var handler = ok ? reaction.ok : reaction.fail
      var resolve = reaction.resolve
      var reject = reaction.reject
      var domain = reaction.domain
      var result, then, exited

      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(state)
            state.rejection = HANDLED
          }

          if (handler === true) result = value
          else {
            if (domain) domain.enter()
            result = handler(value) // can throw

            if (domain) {
              domain.exit()
              exited = true
            }
          }

          if (result === reaction.promise) {
            reject(TypeError$1('Promise-chain cycle'))
          } else if ((then = isThenable(result))) {
            then.call(result, resolve, reject)
          } else resolve(result)
        } else reject(value)
      } catch (error) {
        if (domain && !exited) domain.exit()
        reject(error)
      }
    }

    state.reactions = []
    state.notified = false
    if (isReject && !state.rejection) onUnhandled(state)
  })
}

var dispatchEvent = function (name, promise, reason) {
  var event, handler

  if (DISPATCH_EVENT) {
    event = document$1.createEvent('Event')
    event.promise = promise
    event.reason = reason
    event.initEvent(name, false, true)
    global$1.dispatchEvent(event)
  } else
    event = {
      promise: promise,
      reason: reason,
    }

  if (!NATIVE_REJECTION_EVENT && (handler = global$1['on' + name]))
    handler(event)
  else if (name === UNHANDLED_REJECTION)
    hostReportErrors('Unhandled promise rejection', reason)
}

var onUnhandled = function (state) {
  task.call(global$1, function () {
    var promise = state.facade
    var value = state.value
    var IS_UNHANDLED = isUnhandled(state)
    var result

    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process$1.emit('unhandledRejection', value, promise)
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value)
      }) // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should

      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED
      if (result.error) throw result.value
    }
  })
}

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent
}

var onHandleUnhandled = function (state) {
  task.call(global$1, function () {
    var promise = state.facade

    if (IS_NODE) {
      process$1.emit('rejectionHandled', promise)
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value)
  })
}

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap)
  }
}

var internalReject = function (state, value, unwrap) {
  if (state.done) return
  state.done = true
  if (unwrap) state = unwrap
  state.value = value
  state.state = REJECTED
  notify(state, true)
}

var internalResolve = function (state, value, unwrap) {
  if (state.done) return
  state.done = true
  if (unwrap) state = unwrap

  try {
    if (state.facade === value)
      throw TypeError$1("Promise can't be resolved itself")
    var then = isThenable(value)

    if (then) {
      microtask(function () {
        var wrapper = {
          done: false,
        }

        try {
          then.call(
            value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state),
          )
        } catch (error) {
          internalReject(wrapper, error, state)
        }
      })
    } else {
      state.value = value
      state.state = FULFILLED
      notify(state, false)
    }
  } catch (error) {
    internalReject(
      {
        done: false,
      },
      error,
      state,
    )
  }
} // constructor polyfill

if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE)
    aFunction(executor)
    Internal.call(this)
    var state = getInternalState(this)

    try {
      executor(bind(internalResolve, state), bind(internalReject, state))
    } catch (error) {
      internalReject(state, error)
    }
  }

  PromiseConstructorPrototype = PromiseConstructor.prototype // eslint-disable-next-line no-unused-vars -- required for `.length`

  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined,
    })
  }

  Internal.prototype = redefineAll(PromiseConstructorPrototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this)
      var reaction = newPromiseCapability(
        speciesConstructor(this, PromiseConstructor),
      )
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true
      reaction.fail = typeof onRejected == 'function' && onRejected
      reaction.domain = IS_NODE ? process$1.domain : undefined
      state.parent = true
      state.reactions.push(reaction)
      if (state.state != PENDING) notify(state, false)
      return reaction.promise
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    catch: function (onRejected) {
      return this.then(undefined, onRejected)
    },
  })

  OwnPromiseCapability = function () {
    var promise = new Internal()
    var state = getInternalState(promise)
    this.promise = promise
    this.resolve = bind(internalResolve, state)
    this.reject = bind(internalReject, state)
  }

  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C)
  }

  if (
    typeof NativePromise == 'function' &&
    NativePromisePrototype !== Object.prototype
  ) {
    nativeThen = NativePromisePrototype.then

    if (!SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      redefine(
        NativePromisePrototype,
        'then',
        function then(onFulfilled, onRejected) {
          var that = this
          return new PromiseConstructor(function (resolve, reject) {
            nativeThen.call(that, resolve, reject)
          }).then(onFulfilled, onRejected) // https://github.com/zloirock/core-js/issues/640
        },
        {
          unsafe: true,
        },
      ) // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`

      redefine(
        NativePromisePrototype,
        'catch',
        PromiseConstructorPrototype['catch'],
        {
          unsafe: true,
        },
      )
    } // make `.constructor === Promise` work for native promise-based APIs

    try {
      delete NativePromisePrototype.constructor
    } catch (error) {
      /* empty */
    } // make `instanceof Promise` work for native promise-based APIs

    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromiseConstructorPrototype)
    }
  }
}

$(
  {
    global: true,
    wrap: true,
    forced: FORCED,
  },
  {
    Promise: PromiseConstructor,
  },
)
setToStringTag(PromiseConstructor, PROMISE, false)
setSpecies(PROMISE)
PromiseWrapper = getBuiltIn(PROMISE) // statics

$(
  {
    target: PROMISE,
    stat: true,
    forced: FORCED,
  },
  {
    // `Promise.reject` method
    // https://tc39.es/ecma262/#sec-promise.reject
    reject: function reject(r) {
      var capability = newPromiseCapability(this)
      capability.reject.call(undefined, r)
      return capability.promise
    },
  },
)
$(
  {
    target: PROMISE,
    stat: true,
    forced: FORCED,
  },
  {
    // `Promise.resolve` method
    // https://tc39.es/ecma262/#sec-promise.resolve
    resolve: function resolve(x) {
      return promiseResolve(this, x)
    },
  },
)
$(
  {
    target: PROMISE,
    stat: true,
    forced: INCORRECT_ITERATION,
  },
  {
    // `Promise.all` method
    // https://tc39.es/ecma262/#sec-promise.all
    all: function all(iterable) {
      var C = this
      var capability = newPromiseCapability(C)
      var resolve = capability.resolve
      var reject = capability.reject
      var result = perform(function () {
        var $promiseResolve = aFunction(C.resolve)
        var values = []
        var counter = 0
        var remaining = 1
        iterate(iterable, function (promise) {
          var index = counter++
          var alreadyCalled = false
          values.push(undefined)
          remaining++
          $promiseResolve.call(C, promise).then(function (value) {
            if (alreadyCalled) return
            alreadyCalled = true
            values[index] = value
            --remaining || resolve(values)
          }, reject)
        })
        --remaining || resolve(values)
      })
      if (result.error) reject(result.value)
      return capability.promise
    },
    // `Promise.race` method
    // https://tc39.es/ecma262/#sec-promise.race
    race: function race(iterable) {
      var C = this
      var capability = newPromiseCapability(C)
      var reject = capability.reject
      var result = perform(function () {
        var $promiseResolve = aFunction(C.resolve)
        iterate(iterable, function (promise) {
          $promiseResolve.call(C, promise).then(capability.resolve, reject)
        })
      })
      if (result.error) reject(result.value)
      return capability.promise
    },
  },
)

function exportPlugin(process, _ref) {
  var options = _ref.options
  process.defaultOptions = options
  return process
}

var info = {
  description: 'a html formatter of fis3 based on posthtml-beautify.',
  keywords: ['posthtml', 'beautify', 'html', 'format', 'formatter'],
  dependencies: ['posthtml', 'posthtml-beautify', 'promise-synchronizer'],
  options: {
    rules: {
      indent: 2,
      eol: '\n',
      eof: '\n',
    },
  },
  links: {
    'posthtml-beautify': 'https://github.com/gitscrum/posthtml-beautify',
  },
}
var info$1 = info

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value
  }

  if (!value || !value.then) {
    value = Promise.resolve(value)
  }

  return then ? value.then(then) : value
}

var log = global.fis.log

function _async(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i]
    }

    try {
      return Promise.resolve(f.apply(this, args))
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

var runBeautify = sync__default['default'](
  _async(function (html, rules) {
    return _await(
      posthtml__default['default']()
        .use(
          beautify__default['default']({
            rules: rules,
          }),
        )
        .process(html),
      function (data) {
        return data.html
      },
    )
  }),
)

function process(content, file, config) {
  content = content.replace(
    /__relative\("(.*?)"\)/g,
    '"__relative_fn1_start__$1__relative_fn1_end__"',
  )
  content = content.replace(
    /__relative<<<"(.*?)">>>/g,
    '"__relative_fn2_start__$1__relative_fn2_end__"',
  )

  try {
    content = runBeautify(content, config.rules)
  } catch (error) {
    log.warn('%s might not processed due to:\n %s', file.id, error)
    process.exitCode = 1
    throw new Error('posthtml-beautify error.')
  }

  content = content.replace(
    /"__relative_fn2_start__(.*?)__relative_fn2_end__"/g,
    '__relative<<<"$1">>>',
  )
  content = content.replace(
    /"__relative_fn1_start__(.*?)__relative_fn1_end__"/g,
    '__relative("$1")',
  )
  return content
}

module.exports = exportPlugin(process, info$1)
