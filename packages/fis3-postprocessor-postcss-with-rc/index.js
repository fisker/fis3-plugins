'use strict'

var postcss = require('postcss')
var postcssrc = require('postcss-load-config')
var sync = require('promise-synchronizer')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {default: e}
}

var postcss__default = /*#__PURE__*/ _interopDefaultLegacy(postcss)
var postcssrc__default = /*#__PURE__*/ _interopDefaultLegacy(postcssrc)
var sync__default = /*#__PURE__*/ _interopDefaultLegacy(sync)

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

var global$i = // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  (function () {
    return this
  })() ||
  Function('return this')()

var shared$3 = {exports: {}}

var fails$6 = function (exec) {
  try {
    return !!exec()
  } catch (error) {
    return true
  }
}

var fails$5 = fails$6 // Detect IE8's incomplete defineProperty implementation

var descriptors = !fails$5(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return (
    Object.defineProperty({}, 1, {
      get: function () {
        return 7
      },
    })[1] != 7
  )
})

var objectDefineProperty = {}

var isObject$7 = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function'
}

var global$h = global$i
var isObject$6 = isObject$7
var document$2 = global$h.document // typeof document.createElement is 'object' in old IE

var EXISTS = isObject$6(document$2) && isObject$6(document$2.createElement)

var documentCreateElement = function (it) {
  return EXISTS ? document$2.createElement(it) : {}
}

var DESCRIPTORS$4 = descriptors
var fails$4 = fails$6
var createElement$1 = documentCreateElement // Thank's IE8 for his funny defineProperty

var ie8DomDefine =
  !DESCRIPTORS$4 &&
  !fails$4(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return (
      Object.defineProperty(createElement$1('div'), 'a', {
        get: function () {
          return 7
        },
      }).a != 7
    )
  })

var isObject$5 = isObject$7

var anObject$7 = function (it) {
  if (!isObject$5(it)) {
    throw TypeError(String(it) + ' is not an object')
  }

  return it
}

var isObject$4 = isObject$7 // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string

var toPrimitive$2 = function (input, PREFERRED_STRING) {
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

var DESCRIPTORS$3 = descriptors
var IE8_DOM_DEFINE$1 = ie8DomDefine
var anObject$6 = anObject$7
var toPrimitive$1 = toPrimitive$2 // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

objectDefineProperty.f = DESCRIPTORS$3
  ? $defineProperty
  : function defineProperty(O, P, Attributes) {
      anObject$6(O)
      P = toPrimitive$1(P, true)
      anObject$6(Attributes)
      if (IE8_DOM_DEFINE$1)
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

var createPropertyDescriptor$2 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value,
  }
}

var DESCRIPTORS$2 = descriptors
var definePropertyModule$2 = objectDefineProperty
var createPropertyDescriptor$1 = createPropertyDescriptor$2
var createNonEnumerableProperty$4 = DESCRIPTORS$2
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

var global$g = global$i
var createNonEnumerableProperty$3 = createNonEnumerableProperty$4

var setGlobal$3 = function (key, value) {
  try {
    createNonEnumerableProperty$3(global$g, key, value)
  } catch (error) {
    global$g[key] = value
  }

  return value
}

var global$f = global$i
var setGlobal$2 = setGlobal$3
var SHARED = '__core-js_shared__'
var store$3 = global$f[SHARED] || setGlobal$2(SHARED, {})
var sharedStore = store$3

var store$2 = sharedStore
;(shared$3.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {})
})('versions', []).push({
  version: '3.13.1',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)',
})

// https://tc39.es/ecma262/#sec-requireobjectcoercible

var requireObjectCoercible$2 = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it)
  return it
}

var requireObjectCoercible$1 = requireObjectCoercible$2 // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

var toObject$1 = function (argument) {
  return Object(requireObjectCoercible$1(argument))
}

var toObject = toObject$1
var hasOwnProperty = {}.hasOwnProperty

var has$7 =
  Object.hasOwn ||
  function hasOwn(it, key) {
    return hasOwnProperty.call(toObject(it), key)
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

var global$e = global$i
var path$1 = global$e

var path = path$1
var global$d = global$i

var aFunction$5 = function (variable) {
  return typeof variable == 'function' ? variable : undefined
}

var getBuiltIn$5 = function (namespace, method) {
  return arguments.length < 2
    ? aFunction$5(path[namespace]) || aFunction$5(global$d[namespace])
    : (path[namespace] && path[namespace][method]) ||
        (global$d[namespace] && global$d[namespace][method])
}

var getBuiltIn$4 = getBuiltIn$5
var engineUserAgent = getBuiltIn$4('navigator', 'userAgent') || ''

var global$c = global$i
var userAgent$2 = engineUserAgent
var process$4 = global$c.process
var versions = process$4 && process$4.versions
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
var fails$3 = fails$6 // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

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

var global$b = global$i
var shared$2 = shared$3.exports
var has$6 = has$7
var uid$1 = uid$2
var NATIVE_SYMBOL = nativeSymbol
var USE_SYMBOL_AS_UID = useSymbolAsUid
var WellKnownSymbolsStore = shared$2('wks')
var Symbol$1 = global$b.Symbol
var createWellKnownSymbol = USE_SYMBOL_AS_UID
  ? Symbol$1
  : (Symbol$1 && Symbol$1.withoutSetter) || uid$1

var wellKnownSymbol$9 = function (name) {
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

var wellKnownSymbol$8 = wellKnownSymbol$9
var TO_STRING_TAG$2 = wellKnownSymbol$8('toStringTag')
var test = {}
test[TO_STRING_TAG$2] = 'z'
var toStringTagSupport = String(test) === '[object z]'

var redefine$4 = {exports: {}}

var store$1 = sharedStore
var functionToString = Function.toString // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (typeof store$1.inspectSource != 'function') {
  store$1.inspectSource = function (it) {
    return functionToString.call(it)
  }
}

var inspectSource$3 = store$1.inspectSource

var global$a = global$i
var inspectSource$2 = inspectSource$3
var WeakMap$1 = global$a.WeakMap
var nativeWeakMap =
  typeof WeakMap$1 === 'function' &&
  /native code/.test(inspectSource$2(WeakMap$1))

var shared$1 = shared$3.exports
var uid = uid$2
var keys = shared$1('keys')

var sharedKey$1 = function (key) {
  return keys[key] || (keys[key] = uid(key))
}

var hiddenKeys$3 = {}

var NATIVE_WEAK_MAP = nativeWeakMap
var global$9 = global$i
var isObject$3 = isObject$7
var createNonEnumerableProperty$2 = createNonEnumerableProperty$4
var objectHas = has$7
var shared = sharedStore
var sharedKey = sharedKey$1
var hiddenKeys$2 = hiddenKeys$3
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized'
var WeakMap = global$9.WeakMap
var set$1, get, has$5

var enforce = function (it) {
  return has$5(it) ? get(it) : set$1(it, {})
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

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap())
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

  has$5 = function (it) {
    return wmhas.call(store, it)
  }
} else {
  var STATE = sharedKey('state')
  hiddenKeys$2[STATE] = true

  set$1 = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED)
    metadata.facade = it
    createNonEnumerableProperty$2(it, STATE, metadata)
    return metadata
  }

  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {}
  }

  has$5 = function (it) {
    return objectHas(it, STATE)
  }
}

var internalState = {
  set: set$1,
  get: get,
  has: has$5,
  enforce: enforce,
  getterFor: getterFor,
}

var global$8 = global$i
var createNonEnumerableProperty$1 = createNonEnumerableProperty$4
var has$4 = has$7
var setGlobal$1 = setGlobal$3
var inspectSource$1 = inspectSource$3
var InternalStateModule$1 = internalState
var getInternalState$1 = InternalStateModule$1.get
var enforceInternalState = InternalStateModule$1.enforce
var TEMPLATE = String(String).split('String')
;(redefine$4.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false
  var simple = options ? !!options.enumerable : false
  var noTargetGet = options ? !!options.noTargetGet : false
  var state

  if (typeof value == 'function') {
    if (typeof key == 'string' && !has$4(value, 'name')) {
      createNonEnumerableProperty$1(value, 'name', key)
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
  else createNonEnumerableProperty$1(O, key, value) // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return (
    (typeof this == 'function' && getInternalState$1(this).source) ||
    inspectSource$1(this)
  )
})

var toString$1 = {}.toString

var classofRaw$1 = function (it) {
  return toString$1.call(it).slice(8, -1)
}

var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport
var classofRaw = classofRaw$1
var wellKnownSymbol$7 = wellKnownSymbol$9
var TO_STRING_TAG$1 = wellKnownSymbol$7('toStringTag') // ES3 wrong here

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

var classof$4 = TO_STRING_TAG_SUPPORT$2
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
var classof$3 = classof$4 // `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring

var objectToString = TO_STRING_TAG_SUPPORT$1
  ? {}.toString
  : function toString() {
      return '[object ' + classof$3(this) + ']'
    }

var TO_STRING_TAG_SUPPORT = toStringTagSupport
var redefine$3 = redefine$4.exports
var toString = objectToString // `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring

if (!TO_STRING_TAG_SUPPORT) {
  redefine$3(Object.prototype, 'toString', toString, {
    unsafe: true,
  })
}

var objectGetOwnPropertyDescriptor = {}

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

var fails$2 = fails$6
var classof$2 = classofRaw$1
var split = ''.split // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails$2(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0)
})
  ? function (it) {
      return classof$2(it) == 'String' ? split.call(it, '') : Object(it)
    }
  : Object

var IndexedObject = indexedObject
var requireObjectCoercible = requireObjectCoercible$2

var toIndexedObject$3 = function (it) {
  return IndexedObject(requireObjectCoercible(it))
}

var DESCRIPTORS$1 = descriptors
var propertyIsEnumerableModule = objectPropertyIsEnumerable
var createPropertyDescriptor = createPropertyDescriptor$2
var toIndexedObject$2 = toIndexedObject$3
var toPrimitive = toPrimitive$2
var has$3 = has$7
var IE8_DOM_DEFINE = ie8DomDefine // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

objectGetOwnPropertyDescriptor.f = DESCRIPTORS$1
  ? $getOwnPropertyDescriptor
  : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject$2(O)
      P = toPrimitive(P, true)
      if (IE8_DOM_DEFINE)
        try {
          return $getOwnPropertyDescriptor(O, P)
        } catch (error) {
          /* empty */
        }
      if (has$3(O, P))
        return createPropertyDescriptor(
          !propertyIsEnumerableModule.f.call(O, P),
          O[P]
        )
    }

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
var min$1 = Math.min // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

var toLength$2 = function (argument) {
  return argument > 0 ? min$1(toInteger$1(argument), 0x1fffffffffffff) : 0 // 2 ** 53 - 1 == 9007199254740991
}

var toInteger = toInteger$2
var max = Math.max
var min = Math.min // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex$1 = function (index, length) {
  var integer = toInteger(index)
  return integer < 0 ? max(integer + length, 0) : min(integer, length)
}

var toIndexedObject$1 = toIndexedObject$3
var toLength$1 = toLength$2
var toAbsoluteIndex = toAbsoluteIndex$1 // `Array.prototype.{ indexOf, includes }` methods implementation

var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$1($this)
    var length = toLength$1(O.length)
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
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false),
}

var has$2 = has$7
var toIndexedObject = toIndexedObject$3
var indexOf = arrayIncludes.indexOf
var hiddenKeys$1 = hiddenKeys$3

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object)
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

var getBuiltIn$3 = getBuiltIn$5
var getOwnPropertyNamesModule = objectGetOwnPropertyNames
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols
var anObject$5 = anObject$7 // all object keys, includes non-enumerable and symbols

var ownKeys$1 =
  getBuiltIn$3('Reflect', 'ownKeys') ||
  function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$5(it))
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys
  }

var has$1 = has$7
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

var fails$1 = fails$6
var replacement = /#|\.prototype\./

var isForced$2 = function (feature, detection) {
  var value = data[normalize(feature)]
  return value == POLYFILL
    ? true
    : value == NATIVE
    ? false
    : typeof detection == 'function'
    ? fails$1(detection)
    : !!detection
}

var normalize = (isForced$2.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase()
})

var data = (isForced$2.data = {})
var NATIVE = (isForced$2.NATIVE = 'N')
var POLYFILL = (isForced$2.POLYFILL = 'P')
var isForced_1 = isForced$2

var global$7 = global$i
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f
var createNonEnumerableProperty = createNonEnumerableProperty$4
var redefine$2 = redefine$4.exports
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
        options.forced
      ) // contained in target

      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue
        copyConstructorProperties(sourceProperty, targetProperty)
      } // add a flag to not completely full polyfills

      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty(sourceProperty, 'sham', true)
      } // extend global

      redefine$2(target, key, sourceProperty, options)
    }
}

var global$6 = global$i
var nativePromiseConstructor = global$6.Promise

var redefine$1 = redefine$4.exports

var redefineAll$1 = function (target, src, options) {
  for (var key in src) redefine$1(target, key, src[key], options)

  return target
}

var isObject$2 = isObject$7

var aPossiblePrototype$1 = function (it) {
  if (!isObject$2(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype')
  }

  return it
}

/* eslint-disable no-proto -- safe */
var anObject$4 = anObject$7
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
            '__proto__'
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
var wellKnownSymbol$6 = wellKnownSymbol$9
var TO_STRING_TAG = wellKnownSymbol$6('toStringTag')

var setToStringTag$1 = function (it, TAG, STATIC) {
  if (it && !has((it = STATIC ? it : it.prototype), TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, {
      configurable: true,
      value: TAG,
    })
  }
}

var getBuiltIn$2 = getBuiltIn$5
var definePropertyModule = objectDefineProperty
var wellKnownSymbol$5 = wellKnownSymbol$9
var DESCRIPTORS = descriptors
var SPECIES$2 = wellKnownSymbol$5('species')

var setSpecies$1 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$2(CONSTRUCTOR_NAME)
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

var wellKnownSymbol$4 = wellKnownSymbol$9
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

  return function () /* ...args */
  {
    return fn.apply(that, arguments)
  }
}

var classof$1 = classof$4
var Iterators = iterators
var wellKnownSymbol$3 = wellKnownSymbol$9
var ITERATOR$1 = wellKnownSymbol$3('iterator')

var getIteratorMethod$1 = function (it) {
  if (it != undefined)
    return it[ITERATOR$1] || it['@@iterator'] || Iterators[classof$1(it)]
}

var anObject$3 = anObject$7

var iteratorClose$1 = function (iterator) {
  var returnMethod = iterator['return']

  if (returnMethod !== undefined) {
    return anObject$3(returnMethod.call(iterator)).value
  }
}

var anObject$2 = anObject$7
var isArrayIteratorMethod = isArrayIteratorMethod$1
var toLength = toLength$2
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

var wellKnownSymbol$2 = wellKnownSymbol$9
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

var anObject$1 = anObject$7
var aFunction$2 = aFunction$4
var wellKnownSymbol$1 = wellKnownSymbol$9
var SPECIES$1 = wellKnownSymbol$1('species') // `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor

var speciesConstructor$1 = function (O, defaultConstructor) {
  var C = anObject$1(O).constructor
  var S
  return C === undefined || (S = anObject$1(C)[SPECIES$1]) == undefined
    ? defaultConstructor
    : aFunction$2(S)
}

var getBuiltIn$1 = getBuiltIn$5
var html$1 = getBuiltIn$1('document', 'documentElement')

var userAgent$1 = engineUserAgent
var engineIsIos = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent$1)

var classof = classofRaw$1
var global$5 = global$i
var engineIsNode = classof(global$5.process) == 'process'

var global$4 = global$i
var fails = fails$6
var bind$1 = functionBindContext
var html = html$1
var createElement = documentCreateElement
var IS_IOS$1 = engineIsIos
var IS_NODE$2 = engineIsNode
var location = global$4.location
var set = global$4.setImmediate
var clear = global$4.clearImmediate
var process$3 = global$4.process
var MessageChannel = global$4.MessageChannel
var Dispatch = global$4.Dispatch
var counter = 0
var queue = {}
var ONREADYSTATECHANGE = 'onreadystatechange'
var defer, channel, port

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
  global$4.postMessage(id + '', location.protocol + '//' + location.host)
} // Node.js 0.9+ & IE10+ has setImmediate, otherwise:

if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = []
    var i = 1

    while (arguments.length > i) args.push(arguments[i++])

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

var global$3 = global$i
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f
var macrotask = task$1.set
var IS_IOS = engineIsIos
var IS_WEBOS_WEBKIT = engineIsWebosWebkit
var IS_NODE$1 = engineIsNode
var MutationObserver =
  global$3.MutationObserver || global$3.WebKitMutationObserver
var document$1 = global$3.document
var process$2 = global$3.process
var Promise$1 = global$3.Promise // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`

var queueMicrotaskDescriptor = getOwnPropertyDescriptor(
  global$3,
  'queueMicrotask'
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
    document$1
  ) {
    toggle = true
    node = document$1.createTextNode('')
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

var anObject = anObject$7
var isObject$1 = isObject$7
var newPromiseCapability$1 = newPromiseCapability$2

var promiseResolve$1 = function (C, x) {
  anObject(C)
  if (isObject$1(x) && x.constructor === C) return x
  var promiseCapability = newPromiseCapability$1.f(C)
  var resolve = promiseCapability.resolve
  resolve(x)
  return promiseCapability.promise
}

var global$2 = global$i

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
var global$1 = global$i
var getBuiltIn = getBuiltIn$5
var NativePromise = nativePromiseConstructor
var redefine = redefine$4.exports
var redefineAll = redefineAll$1
var setPrototypeOf = objectSetPrototypeOf
var setToStringTag = setToStringTag$1
var setSpecies = setSpecies$1
var isObject = isObject$7
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
var wellKnownSymbol = wellKnownSymbol$9
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
var document = global$1.document
var process$1 = global$1.process
var newPromiseCapability = newPromiseCapabilityModule.f
var newGenericPromiseCapability = newPromiseCapability
var DISPATCH_EVENT = !!(
  document &&
  document.createEvent &&
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
  var GLOBAL_CORE_JS_PROMISE =
    inspectSource(PromiseConstructor) !== String(PromiseConstructor) // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions

  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true // We need Promise#finally in the pure version for preventing prototype pollution
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679

  if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false // Detect correctness of subclassing with @@species support

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
      }
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
    event = document.createEvent('Event')
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
            bind(internalReject, wrapper, state)
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
      state
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
        speciesConstructor(this, PromiseConstructor)
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
        }
      ) // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`

      redefine(
        NativePromisePrototype,
        'catch',
        PromiseConstructorPrototype['catch'],
        {
          unsafe: true,
        }
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
  }
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
  }
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
  }
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
  }
)

function exportPlugin(process, _ref) {
  var options = _ref.options
  process.defaultOptions = options
  return process
}

var info = {
  description: 'postcss for fis3.',
  keywords: ['postcss'],
  dependencies: ['postcss', 'postcss-load-config', 'promise-synchronizer'],
  options: {},
  links: {},
}

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value
  }

  if (!value || !value.then) {
    value = Promise.resolve(value)
  }

  return then ? value.then(then) : value
}

var postcssProcess = sync__default['default'](function (content, file, config) {
  return _call(postcssrc__default['default'], function (_ref) {
    var plugins = _ref.plugins,
      options = _ref.options
    return _await(
      postcss__default['default'](plugins).process(
        content,
        _objectSpread2(
          _objectSpread2(_objectSpread2({}, config), options),
          {},
          {
            from: config.filename,
          }
        )
      ),
      function (_ref2) {
        var css = _ref2.css
        return css
      }
    )
  })
})

function _call(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body()
  }

  try {
    var result = Promise.resolve(body())
    return then ? result.then(then) : result
  } catch (e) {
    return Promise.reject(e)
  }
}

function process(content, file, config) {
  return postcssProcess(content, file, config)
}

module.exports = exportPlugin(process, info)
