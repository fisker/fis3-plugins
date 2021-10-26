'use strict'

var fs = require('fs')
var path = require('path')
var process$1 = require('process')
var htmlhint = require('htmlhint')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {default: e}
}

var fs__default = /*#__PURE__*/ _interopDefaultLegacy(fs)
var path__default = /*#__PURE__*/ _interopDefaultLegacy(path)
var process__default = /*#__PURE__*/ _interopDefaultLegacy(process$1)

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

var global$n = // eslint-disable-next-line es/no-global-this -- safe
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

var call$4 = Function.prototype.call
var functionCall = call$4.bind
  ? call$4.bind(call$4)
  : function () {
      return call$4.apply(call$4, arguments)
    }

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

var createPropertyDescriptor$2 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value,
  }
}

var FunctionPrototype$1 = Function.prototype
var bind$2 = FunctionPrototype$1.bind
var call$3 = FunctionPrototype$1.call
var callBind = bind$2 && bind$2.bind(call$3)
var functionUncurryThis = bind$2
  ? function (fn) {
      return fn && callBind(call$3, fn)
    }
  : function (fn) {
      return (
        fn &&
        function () {
          return call$3.apply(fn, arguments)
        }
      )
    }

var uncurryThis$c = functionUncurryThis
var toString$1 = uncurryThis$c({}.toString)
var stringSlice = uncurryThis$c(''.slice)

var classofRaw$1 = function (it) {
  return stringSlice(toString$1(it), 8, -1)
}

var global$m = global$n
var uncurryThis$b = functionUncurryThis
var fails$5 = fails$7
var classof$3 = classofRaw$1
var Object$4 = global$m.Object
var split = uncurryThis$b(''.split) // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails$5(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object$4('z').propertyIsEnumerable(0)
})
  ? function (it) {
      return classof$3(it) == 'String' ? split(it, '') : Object$4(it)
    }
  : Object$4

var global$l = global$n
var TypeError$6 = global$l.TypeError // `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible

var requireObjectCoercible$2 = function (it) {
  if (it == undefined) throw TypeError$6("Can't call method on " + it)
  return it
}

var IndexedObject$2 = indexedObject
var requireObjectCoercible$1 = requireObjectCoercible$2

var toIndexedObject$4 = function (it) {
  return IndexedObject$2(requireObjectCoercible$1(it))
}

// https://tc39.es/ecma262/#sec-iscallable

var isCallable$b = function (argument) {
  return typeof argument == 'function'
}

var isCallable$a = isCallable$b

var isObject$6 = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$a(it)
}

var global$k = global$n
var isCallable$9 = isCallable$b

var aFunction = function (argument) {
  return isCallable$9(argument) ? argument : undefined
}

var getBuiltIn$4 = function (namespace, method) {
  return arguments.length < 2
    ? aFunction(global$k[namespace])
    : global$k[namespace] && global$k[namespace][method]
}

var uncurryThis$a = functionUncurryThis
var objectIsPrototypeOf = uncurryThis$a({}.isPrototypeOf)

var getBuiltIn$3 = getBuiltIn$4
var engineUserAgent = getBuiltIn$3('navigator', 'userAgent') || ''

var global$j = global$n
var userAgent = engineUserAgent
var process = global$j.process
var Deno = global$j.Deno
var versions = (process && process.versions) || (Deno && Deno.version)
var v8 = versions && versions.v8
var match, version

if (v8) {
  match = v8.split('.') // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us

  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1])
} // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0

if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/)

  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/)
    if (match) version = +match[1]
  }
}

var engineV8Version = version

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = engineV8Version
var fails$4 = fails$7 // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

var nativeSymbol =
  !!Object.getOwnPropertySymbols &&
  !fails$4(function () {
    var symbol = Symbol() // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

    return (
      !String(symbol) ||
      !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      (!Symbol.sham && V8_VERSION && V8_VERSION < 41)
    )
  })

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL$1 = nativeSymbol
var useSymbolAsUid =
  NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == 'symbol'

var global$i = global$n
var getBuiltIn$2 = getBuiltIn$4
var isCallable$8 = isCallable$b
var isPrototypeOf = objectIsPrototypeOf
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid
var Object$3 = global$i.Object
var isSymbol$2 = USE_SYMBOL_AS_UID$1
  ? function (it) {
      return typeof it == 'symbol'
    }
  : function (it) {
      var $Symbol = getBuiltIn$2('Symbol')
      return (
        isCallable$8($Symbol) && isPrototypeOf($Symbol.prototype, Object$3(it))
      )
    }

var global$h = global$n
var String$2 = global$h.String

var tryToString$1 = function (argument) {
  try {
    return String$2(argument)
  } catch (error) {
    return 'Object'
  }
}

var global$g = global$n
var isCallable$7 = isCallable$b
var tryToString = tryToString$1
var TypeError$5 = global$g.TypeError // `Assert: IsCallable(argument) is true`

var aCallable$2 = function (argument) {
  if (isCallable$7(argument)) return argument
  throw TypeError$5(tryToString(argument) + ' is not a function')
}

var aCallable$1 = aCallable$2 // `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod

var getMethod$1 = function (V, P) {
  var func = V[P]
  return func == null ? undefined : aCallable$1(func)
}

var global$f = global$n
var call$2 = functionCall
var isCallable$6 = isCallable$b
var isObject$5 = isObject$6
var TypeError$4 = global$f.TypeError // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val
  if (
    pref === 'string' &&
    isCallable$6((fn = input.toString)) &&
    !isObject$5((val = call$2(fn, input)))
  )
    return val
  if (
    isCallable$6((fn = input.valueOf)) &&
    !isObject$5((val = call$2(fn, input)))
  )
    return val
  if (
    pref !== 'string' &&
    isCallable$6((fn = input.toString)) &&
    !isObject$5((val = call$2(fn, input)))
  )
    return val
  throw TypeError$4("Can't convert object to primitive value")
}

var shared$3 = {exports: {}}

var global$e = global$n // eslint-disable-next-line es/no-object-defineproperty -- safe

var defineProperty = Object.defineProperty

var setGlobal$3 = function (key, value) {
  try {
    defineProperty(global$e, key, {
      value: value,
      configurable: true,
      writable: true,
    })
  } catch (error) {
    global$e[key] = value
  }

  return value
}

var global$d = global$n
var setGlobal$2 = setGlobal$3
var SHARED = '__core-js_shared__'
var store$3 = global$d[SHARED] || setGlobal$2(SHARED, {})
var sharedStore = store$3

var store$2 = sharedStore
;(shared$3.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {})
})('versions', []).push({
  version: '3.19.0',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)',
})

var global$c = global$n
var requireObjectCoercible = requireObjectCoercible$2
var Object$2 = global$c.Object // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

var toObject$2 = function (argument) {
  return Object$2(requireObjectCoercible(argument))
}

var uncurryThis$9 = functionUncurryThis
var toObject$1 = toObject$2
var hasOwnProperty = uncurryThis$9({}.hasOwnProperty) // `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty

var hasOwnProperty_1 =
  Object.hasOwn ||
  function hasOwn(it, key) {
    return hasOwnProperty(toObject$1(it), key)
  }

var uncurryThis$8 = functionUncurryThis
var id = 0
var postfix = Math.random()
var toString = uncurryThis$8((1.0).toString)

var uid$2 = function (key) {
  return (
    'Symbol(' +
    (key === undefined ? '' : key) +
    ')_' +
    toString(++id + postfix, 36)
  )
}

var global$b = global$n
var shared$2 = shared$3.exports
var hasOwn$6 = hasOwnProperty_1
var uid$1 = uid$2
var NATIVE_SYMBOL = nativeSymbol
var USE_SYMBOL_AS_UID = useSymbolAsUid
var WellKnownSymbolsStore = shared$2('wks')
var Symbol$1 = global$b.Symbol
var symbolFor = Symbol$1 && Symbol$1['for']
var createWellKnownSymbol = USE_SYMBOL_AS_UID
  ? Symbol$1
  : (Symbol$1 && Symbol$1.withoutSetter) || uid$1

var wellKnownSymbol$4 = function (name) {
  if (
    !hasOwn$6(WellKnownSymbolsStore, name) ||
    !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')
  ) {
    var description = 'Symbol.' + name

    if (NATIVE_SYMBOL && hasOwn$6(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name]
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description)
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description)
    }
  }

  return WellKnownSymbolsStore[name]
}

var global$a = global$n
var call$1 = functionCall
var isObject$4 = isObject$6
var isSymbol$1 = isSymbol$2
var getMethod = getMethod$1
var ordinaryToPrimitive = ordinaryToPrimitive$1
var wellKnownSymbol$3 = wellKnownSymbol$4
var TypeError$3 = global$a.TypeError
var TO_PRIMITIVE = wellKnownSymbol$3('toPrimitive') // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

var toPrimitive$1 = function (input, pref) {
  if (!isObject$4(input) || isSymbol$1(input)) return input
  var exoticToPrim = getMethod(input, TO_PRIMITIVE)
  var result

  if (exoticToPrim) {
    if (pref === undefined) pref = 'default'
    result = call$1(exoticToPrim, input, pref)
    if (!isObject$4(result) || isSymbol$1(result)) return result
    throw TypeError$3("Can't convert object to primitive value")
  }

  if (pref === undefined) pref = 'number'
  return ordinaryToPrimitive(input, pref)
}

var toPrimitive = toPrimitive$1
var isSymbol = isSymbol$2 // `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey

var toPropertyKey$2 = function (argument) {
  var key = toPrimitive(argument, 'string')
  return isSymbol(key) ? key : key + ''
}

var global$9 = global$n
var isObject$3 = isObject$6
var document = global$9.document // typeof document.createElement is 'object' in old IE

var EXISTS$1 = isObject$3(document) && isObject$3(document.createElement)

var documentCreateElement = function (it) {
  return EXISTS$1 ? document.createElement(it) : {}
}

var DESCRIPTORS$4 = descriptors
var fails$3 = fails$7
var createElement = documentCreateElement // Thank's IE8 for his funny defineProperty

var ie8DomDefine =
  !DESCRIPTORS$4 &&
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

var DESCRIPTORS$3 = descriptors
var call = functionCall
var propertyIsEnumerableModule = objectPropertyIsEnumerable
var createPropertyDescriptor$1 = createPropertyDescriptor$2
var toIndexedObject$3 = toIndexedObject$4
var toPropertyKey$1 = toPropertyKey$2
var hasOwn$5 = hasOwnProperty_1
var IE8_DOM_DEFINE$1 = ie8DomDefine // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

objectGetOwnPropertyDescriptor.f = DESCRIPTORS$3
  ? $getOwnPropertyDescriptor
  : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject$3(O)
      P = toPropertyKey$1(P)
      if (IE8_DOM_DEFINE$1)
        try {
          return $getOwnPropertyDescriptor(O, P)
        } catch (error) {
          /* empty */
        }
      if (hasOwn$5(O, P))
        return createPropertyDescriptor$1(
          !call(propertyIsEnumerableModule.f, O, P),
          O[P],
        )
    }

var objectDefineProperty = {}

var global$8 = global$n
var isObject$2 = isObject$6
var String$1 = global$8.String
var TypeError$2 = global$8.TypeError // `Assert: Type(argument) is Object`

var anObject$2 = function (argument) {
  if (isObject$2(argument)) return argument
  throw TypeError$2(String$1(argument) + ' is not an object')
}

var global$7 = global$n
var DESCRIPTORS$2 = descriptors
var IE8_DOM_DEFINE = ie8DomDefine
var anObject$1 = anObject$2
var toPropertyKey = toPropertyKey$2
var TypeError$1 = global$7.TypeError // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

objectDefineProperty.f = DESCRIPTORS$2
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
        throw TypeError$1('Accessors not supported')
      if ('value' in Attributes) O[P] = Attributes.value
      return O
    }

var DESCRIPTORS$1 = descriptors
var definePropertyModule$1 = objectDefineProperty
var createPropertyDescriptor = createPropertyDescriptor$2
var createNonEnumerableProperty$3 = DESCRIPTORS$1
  ? function (object, key, value) {
      return definePropertyModule$1.f(
        object,
        key,
        createPropertyDescriptor(1, value),
      )
    }
  : function (object, key, value) {
      object[key] = value
      return object
    }

var redefine$1 = {exports: {}}

var uncurryThis$7 = functionUncurryThis
var isCallable$5 = isCallable$b
var store$1 = sharedStore
var functionToString = uncurryThis$7(Function.toString) // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (!isCallable$5(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it)
  }
}

var inspectSource$3 = store$1.inspectSource

var global$6 = global$n
var isCallable$4 = isCallable$b
var inspectSource$2 = inspectSource$3
var WeakMap$1 = global$6.WeakMap
var nativeWeakMap =
  isCallable$4(WeakMap$1) && /native code/.test(inspectSource$2(WeakMap$1))

var shared$1 = shared$3.exports
var uid = uid$2
var keys = shared$1('keys')

var sharedKey$1 = function (key) {
  return keys[key] || (keys[key] = uid(key))
}

var hiddenKeys$3 = {}

var NATIVE_WEAK_MAP = nativeWeakMap
var global$5 = global$n
var uncurryThis$6 = functionUncurryThis
var isObject$1 = isObject$6
var createNonEnumerableProperty$2 = createNonEnumerableProperty$3
var hasOwn$4 = hasOwnProperty_1
var shared = sharedStore
var sharedKey = sharedKey$1
var hiddenKeys$2 = hiddenKeys$3
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized'
var TypeError = global$5.TypeError
var WeakMap = global$5.WeakMap
var set, get, has

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {})
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

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap())
  var wmget = uncurryThis$6(store.get)
  var wmhas = uncurryThis$6(store.has)
  var wmset = uncurryThis$6(store.set)

  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED)
    metadata.facade = it
    wmset(store, it, metadata)
    return metadata
  }

  get = function (it) {
    return wmget(store, it) || {}
  }

  has = function (it) {
    return wmhas(store, it)
  }
} else {
  var STATE = sharedKey('state')
  hiddenKeys$2[STATE] = true

  set = function (it, metadata) {
    if (hasOwn$4(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED)
    metadata.facade = it
    createNonEnumerableProperty$2(it, STATE, metadata)
    return metadata
  }

  get = function (it) {
    return hasOwn$4(it, STATE) ? it[STATE] : {}
  }

  has = function (it) {
    return hasOwn$4(it, STATE)
  }
}

var internalState = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor,
}

var DESCRIPTORS = descriptors
var hasOwn$3 = hasOwnProperty_1
var FunctionPrototype = Function.prototype // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor
var EXISTS = hasOwn$3(FunctionPrototype, 'name') // additional protection from minified / mangled / dropped function names

var PROPER =
  EXISTS &&
  function something() {
    /* empty */
  }.name === 'something'

var CONFIGURABLE =
  EXISTS &&
  (!DESCRIPTORS ||
    (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable))
var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE,
}

var global$4 = global$n
var isCallable$3 = isCallable$b
var hasOwn$2 = hasOwnProperty_1
var createNonEnumerableProperty$1 = createNonEnumerableProperty$3
var setGlobal$1 = setGlobal$3
var inspectSource$1 = inspectSource$3
var InternalStateModule = internalState
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE
var getInternalState = InternalStateModule.get
var enforceInternalState = InternalStateModule.enforce
var TEMPLATE = String(String).split('String')
;(redefine$1.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false
  var simple = options ? !!options.enumerable : false
  var noTargetGet = options ? !!options.noTargetGet : false
  var name = options && options.name !== undefined ? options.name : key
  var state

  if (isCallable$3(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']'
    }

    if (
      !hasOwn$2(value, 'name') ||
      (CONFIGURABLE_FUNCTION_NAME && value.name !== name)
    ) {
      createNonEnumerableProperty$1(value, 'name', name)
    }

    state = enforceInternalState(value)

    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '')
    }
  }

  if (O === global$4) {
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
    (isCallable$3(this) && getInternalState(this).source) ||
    inspectSource$1(this)
  )
})

var objectGetOwnPropertyNames = {}

var ceil = Math.ceil
var floor = Math.floor // `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity

var toIntegerOrInfinity$2 = function (argument) {
  var number = +argument // eslint-disable-next-line no-self-compare -- safe

  return number !== number || number === 0
    ? 0
    : (number > 0 ? floor : ceil)(number)
}

var toIntegerOrInfinity$1 = toIntegerOrInfinity$2
var max = Math.max
var min$1 = Math.min // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex$1 = function (index, length) {
  var integer = toIntegerOrInfinity$1(index)
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length)
}

var toIntegerOrInfinity = toIntegerOrInfinity$2
var min = Math.min // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

var toLength$1 = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1fffffffffffff) : 0 // 2 ** 53 - 1 == 9007199254740991
}

var toLength = toLength$1 // `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike

var lengthOfArrayLike$2 = function (obj) {
  return toLength(obj.length)
}

var toIndexedObject$2 = toIndexedObject$4
var toAbsoluteIndex = toAbsoluteIndex$1
var lengthOfArrayLike$1 = lengthOfArrayLike$2 // `Array.prototype.{ indexOf, includes }` methods implementation

var createMethod$1 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$2($this)
    var length = lengthOfArrayLike$1(O)
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

var uncurryThis$5 = functionUncurryThis
var hasOwn$1 = hasOwnProperty_1
var toIndexedObject$1 = toIndexedObject$4
var indexOf = arrayIncludes.indexOf
var hiddenKeys$1 = hiddenKeys$3
var push$1 = uncurryThis$5([].push)

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$1(object)
  var i = 0
  var result = []
  var key

  for (key in O)
    !hasOwn$1(hiddenKeys$1, key) && hasOwn$1(O, key) && push$1(result, key) // Don't enum bug & hidden keys

  while (names.length > i)
    if (hasOwn$1(O, (key = names[i++]))) {
      ~indexOf(result, key) || push$1(result, key)
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

var getBuiltIn$1 = getBuiltIn$4
var uncurryThis$4 = functionUncurryThis
var getOwnPropertyNamesModule = objectGetOwnPropertyNames
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols
var anObject = anObject$2
var concat = uncurryThis$4([].concat) // all object keys, includes non-enumerable and symbols

var ownKeys$1 =
  getBuiltIn$1('Reflect', 'ownKeys') ||
  function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject(it))
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f
    return getOwnPropertySymbols
      ? concat(keys, getOwnPropertySymbols(it))
      : keys
  }

var hasOwn = hasOwnProperty_1
var ownKeys = ownKeys$1
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor
var definePropertyModule = objectDefineProperty

var copyConstructorProperties$1 = function (target, source) {
  var keys = ownKeys(source)
  var defineProperty = definePropertyModule.f
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    if (!hasOwn(target, key))
      defineProperty(target, key, getOwnPropertyDescriptor(source, key))
  }
}

var fails$2 = fails$7
var isCallable$2 = isCallable$b
var replacement = /#|\.prototype\./

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)]
  return value == POLYFILL
    ? true
    : value == NATIVE
    ? false
    : isCallable$2(detection)
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

var global$3 = global$n
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f
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
  options.name        - the .name of the function if it does not match the key
*/

var _export = function (options, source) {
  var TARGET = options.target
  var GLOBAL = options.global
  var STATIC = options.stat
  var FORCED, target, key, targetProperty, sourceProperty, descriptor

  if (GLOBAL) {
    target = global$3
  } else if (STATIC) {
    target = global$3[TARGET] || setGlobal(TARGET, {})
  } else {
    target = (global$3[TARGET] || {}).prototype
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
        if (typeof sourceProperty == typeof targetProperty) continue
        copyConstructorProperties(sourceProperty, targetProperty)
      } // add a flag to not completely full polyfills

      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty(sourceProperty, 'sham', true)
      } // extend global

      redefine(target, key, sourceProperty, options)
    }
}

var fails$1 = fails$7

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
        1,
      )
    })
  )
}

var $$1 = _export
var uncurryThis$3 = functionUncurryThis
var IndexedObject$1 = indexedObject
var toIndexedObject = toIndexedObject$4
var arrayMethodIsStrict$1 = arrayMethodIsStrict$2
var un$Join = uncurryThis$3([].join)
var ES3_STRINGS = IndexedObject$1 != Object
var STRICT_METHOD$1 = arrayMethodIsStrict$1('join', ',') // `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join

$$1(
  {
    target: 'Array',
    proto: true,
    forced: ES3_STRINGS || !STRICT_METHOD$1,
  },
  {
    join: function join(separator) {
      return un$Join(
        toIndexedObject(this),
        separator === undefined ? ',' : separator,
      )
    },
  },
)

var uncurryThis$2 = functionUncurryThis
var aCallable = aCallable$2
var bind$1 = uncurryThis$2(uncurryThis$2.bind) // optional / simple context binding

var functionBindContext = function (fn, that) {
  aCallable(fn)
  return that === undefined
    ? fn
    : bind$1
    ? bind$1(fn, that)
    : function () {
        return fn.apply(that, arguments)
      }
}

var classof$2 = classofRaw$1 // `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe

var isArray$1 =
  Array.isArray ||
  function isArray(argument) {
    return classof$2(argument) == 'Array'
  }

var wellKnownSymbol$2 = wellKnownSymbol$4
var TO_STRING_TAG$1 = wellKnownSymbol$2('toStringTag')
var test = {}
test[TO_STRING_TAG$1] = 'z'
var toStringTagSupport = String(test) === '[object z]'

var global$2 = global$n
var TO_STRING_TAG_SUPPORT = toStringTagSupport
var isCallable$1 = isCallable$b
var classofRaw = classofRaw$1
var wellKnownSymbol$1 = wellKnownSymbol$4
var TO_STRING_TAG = wellKnownSymbol$1('toStringTag')
var Object$1 = global$2.Object // ES3 wrong here

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

var classof$1 = TO_STRING_TAG_SUPPORT
  ? classofRaw
  : function (it) {
      var O, tag, result
      return it === undefined
        ? 'Undefined'
        : it === null
        ? 'Null' // @@toStringTag case
        : typeof (tag = tryGet((O = Object$1(it)), TO_STRING_TAG)) == 'string'
        ? tag // builtinTag case
        : CORRECT_ARGUMENTS
        ? classofRaw(O) // ES3 arguments fallback
        : (result = classofRaw(O)) == 'Object' && isCallable$1(O.callee)
        ? 'Arguments'
        : result
    }

var uncurryThis$1 = functionUncurryThis
var fails = fails$7
var isCallable = isCallable$b
var classof = classof$1
var getBuiltIn = getBuiltIn$4
var inspectSource = inspectSource$3

var noop = function () {
  /* empty */
}

var empty = []
var construct = getBuiltIn('Reflect', 'construct')
var constructorRegExp = /^\s*(?:class|function)\b/
var exec = uncurryThis$1(constructorRegExp.exec)
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop)

var isConstructorModern = function (argument) {
  if (!isCallable(argument)) return false

  try {
    construct(noop, empty, argument)
    return true
  } catch (error) {
    return false
  }
}

var isConstructorLegacy = function (argument) {
  if (!isCallable(argument)) return false

  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction':
      return false
    // we can't check .prototype since constructors produced by .bind haven't it
  }

  return (
    INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument))
  )
} // `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor

var isConstructor$1 =
  !construct ||
  fails(function () {
    var called
    return (
      isConstructorModern(isConstructorModern.call) ||
      !isConstructorModern(Object) ||
      !isConstructorModern(function () {
        called = true
      }) ||
      called
    )
  })
    ? isConstructorLegacy
    : isConstructorModern

var global$1 = global$n
var isArray = isArray$1
var isConstructor = isConstructor$1
var isObject = isObject$6
var wellKnownSymbol = wellKnownSymbol$4
var SPECIES = wellKnownSymbol('species')
var Array$1 = global$1.Array // a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

var arraySpeciesConstructor$1 = function (originalArray) {
  var C

  if (isArray(originalArray)) {
    C = originalArray.constructor // cross-realm fallback

    if (isConstructor(C) && (C === Array$1 || isArray(C.prototype)))
      C = undefined
    else if (isObject(C)) {
      C = C[SPECIES]
      if (C === null) C = undefined
    }
  }

  return C === undefined ? Array$1 : C
}

var arraySpeciesConstructor = arraySpeciesConstructor$1 // `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

var arraySpeciesCreate$1 = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length)
}

var bind = functionBindContext
var uncurryThis = functionUncurryThis
var IndexedObject = indexedObject
var toObject = toObject$2
var lengthOfArrayLike = lengthOfArrayLike$2
var arraySpeciesCreate = arraySpeciesCreate$1
var push = uncurryThis([].push) // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation

var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1
  var IS_FILTER = TYPE == 2
  var IS_SOME = TYPE == 3
  var IS_EVERY = TYPE == 4
  var IS_FIND_INDEX = TYPE == 6
  var IS_FILTER_REJECT = TYPE == 7
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this)
    var self = IndexedObject(O)
    var boundFunction = bind(callbackfn, that)
    var length = lengthOfArrayLike(self)
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
                push(target, value)
              // filter
            }
          else
            switch (TYPE) {
              case 4:
                return false
              // every

              case 7:
                push(target, value)
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

var $ = _export
var $some = arrayIteration.some
var arrayMethodIsStrict = arrayMethodIsStrict$2
var STRICT_METHOD = arrayMethodIsStrict('some') // `Array.prototype.some` method
// https://tc39.es/ecma262/#sec-array.prototype.some

$(
  {
    target: 'Array',
    proto: true,
    forced: !STRICT_METHOD,
  },
  {
    some: function some(
      callbackfn,
      /* , thisArg */
    ) {
      return $some(
        this,
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined,
      )
    },
  },
)

function exportPlugin(process, _ref) {
  var options = _ref.options
  process.defaultOptions = options
  return process
}

var info = {
  description: 'a html linter plugin of fis3 based on htmlhint.',
  keywords: ['linter', 'html'],
  dependencies: ['htmlhint'],
  options: {},
  links: {
    htmlhint: 'http://htmlhint.com/',
  },
}
var info$1 = info

var _global = global,
  _global$fis = _global.fis,
  fis = _global$fis === void 0 ? {} : _global$fis
var _fis$log = fis.log,
  log = _fis$log === void 0 ? console.log : _fis$log

function readConfig(filename) {
  var currentFolder = process__default['default'].cwd()
  var currentFile = ''
  var parentFolder = ''

  do {
    currentFolder = parentFolder || currentFolder
    currentFile = path__default['default'].join(currentFolder, filename)

    if (fs__default['default'].existsSync(currentFile)) {
      try {
        return JSON.parse(
          fs__default['default'].readFileSync(currentFile, 'utf8'),
        )
      } catch (_unused) {
        return {}
      }
    }

    parentFolder = path__default['default'].join(currentFolder, '..')
  } while (parentFolder !== currentFolder)

  return {}
}

var htmlhintrcConfig

function mainProcess(content, file, config) {
  if (!content) {
    return
  }

  var rules = config.rules

  if (!rules) {
    if (!htmlhintrcConfig) {
      htmlhintrcConfig = readConfig('.htmlhintrc')
    }

    rules = htmlhintrcConfig
  }

  var results = htmlhint.HTMLHint.verify(content, rules)
  var errorType = results.some(function (_ref) {
    var type = _ref.type
    return type === 'error'
  })
    ? 'error'
    : 'warning'

  if (results.length !== 0) {
    log.warn(
      '[%s] lint failed with %s: \n\n %s',
      file.id,
      errorType,
      htmlhint.HTMLHint.format(results, {
        indent: 2,
      }).join('\n'),
    )

    if (errorType === 'error') {
      process__default['default'].exitCode = 1
      throw new Error('htmlhint error.')
    }
  }
}

module.exports = exportPlugin(mainProcess, info$1)
