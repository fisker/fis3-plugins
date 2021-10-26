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
          Object.getOwnPropertyDescriptor(source, key),
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
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
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

var global$p = // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  (function () {
    return this
  })() ||
  Function('return this')()

var objectGetOwnPropertyDescriptor = {}

var fails$8 = function (exec) {
  try {
    return !!exec()
  } catch (error) {
    return true
  }
}

var fails$7 = fails$8 // Detect IE8's incomplete defineProperty implementation

var descriptors = !fails$7(function () {
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
var toString$3 = uncurryThis$c({}.toString)
var stringSlice$1 = uncurryThis$c(''.slice)

var classofRaw$1 = function (it) {
  return stringSlice$1(toString$3(it), 8, -1)
}

var global$o = global$p
var uncurryThis$b = functionUncurryThis
var fails$6 = fails$8
var classof$5 = classofRaw$1
var Object$4 = global$o.Object
var split = uncurryThis$b(''.split) // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails$6(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object$4('z').propertyIsEnumerable(0)
})
  ? function (it) {
      return classof$5(it) == 'String' ? split(it, '') : Object$4(it)
    }
  : Object$4

var global$n = global$p
var TypeError$8 = global$n.TypeError // `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible

var requireObjectCoercible$3 = function (it) {
  if (it == undefined) throw TypeError$8("Can't call method on " + it)
  return it
}

var IndexedObject$1 = indexedObject
var requireObjectCoercible$2 = requireObjectCoercible$3

var toIndexedObject$3 = function (it) {
  return IndexedObject$1(requireObjectCoercible$2(it))
}

// https://tc39.es/ecma262/#sec-iscallable

var isCallable$b = function (argument) {
  return typeof argument == 'function'
}

var isCallable$a = isCallable$b

var isObject$7 = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$a(it)
}

var global$m = global$p
var isCallable$9 = isCallable$b

var aFunction = function (argument) {
  return isCallable$9(argument) ? argument : undefined
}

var getBuiltIn$4 = function (namespace, method) {
  return arguments.length < 2
    ? aFunction(global$m[namespace])
    : global$m[namespace] && global$m[namespace][method]
}

var uncurryThis$a = functionUncurryThis
var objectIsPrototypeOf = uncurryThis$a({}.isPrototypeOf)

var getBuiltIn$3 = getBuiltIn$4
var engineUserAgent = getBuiltIn$3('navigator', 'userAgent') || ''

var global$l = global$p
var userAgent = engineUserAgent
var process$1 = global$l.process
var Deno = global$l.Deno
var versions = (process$1 && process$1.versions) || (Deno && Deno.version)
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
var V8_VERSION$1 = engineV8Version
var fails$5 = fails$8 // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

var nativeSymbol =
  !!Object.getOwnPropertySymbols &&
  !fails$5(function () {
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

var global$k = global$p
var getBuiltIn$2 = getBuiltIn$4
var isCallable$8 = isCallable$b
var isPrototypeOf = objectIsPrototypeOf
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid
var Object$3 = global$k.Object
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

var global$j = global$p
var String$3 = global$j.String

var tryToString$1 = function (argument) {
  try {
    return String$3(argument)
  } catch (error) {
    return 'Object'
  }
}

var global$i = global$p
var isCallable$7 = isCallable$b
var tryToString = tryToString$1
var TypeError$7 = global$i.TypeError // `Assert: IsCallable(argument) is true`

var aCallable$2 = function (argument) {
  if (isCallable$7(argument)) return argument
  throw TypeError$7(tryToString(argument) + ' is not a function')
}

var aCallable$1 = aCallable$2 // `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod

var getMethod$1 = function (V, P) {
  var func = V[P]
  return func == null ? undefined : aCallable$1(func)
}

var global$h = global$p
var call$2 = functionCall
var isCallable$6 = isCallable$b
var isObject$6 = isObject$7
var TypeError$6 = global$h.TypeError // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val
  if (
    pref === 'string' &&
    isCallable$6((fn = input.toString)) &&
    !isObject$6((val = call$2(fn, input)))
  )
    return val
  if (
    isCallable$6((fn = input.valueOf)) &&
    !isObject$6((val = call$2(fn, input)))
  )
    return val
  if (
    pref !== 'string' &&
    isCallable$6((fn = input.toString)) &&
    !isObject$6((val = call$2(fn, input)))
  )
    return val
  throw TypeError$6("Can't convert object to primitive value")
}

var shared$3 = {exports: {}}

var global$g = global$p // eslint-disable-next-line es/no-object-defineproperty -- safe

var defineProperty = Object.defineProperty

var setGlobal$3 = function (key, value) {
  try {
    defineProperty(global$g, key, {
      value: value,
      configurable: true,
      writable: true,
    })
  } catch (error) {
    global$g[key] = value
  }

  return value
}

var global$f = global$p
var setGlobal$2 = setGlobal$3
var SHARED = '__core-js_shared__'
var store$3 = global$f[SHARED] || setGlobal$2(SHARED, {})
var sharedStore = store$3

var store$2 = sharedStore
;(shared$3.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {})
})('versions', []).push({
  version: '3.19.0',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)',
})

var global$e = global$p
var requireObjectCoercible$1 = requireObjectCoercible$3
var Object$2 = global$e.Object // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

var toObject$3 = function (argument) {
  return Object$2(requireObjectCoercible$1(argument))
}

var uncurryThis$9 = functionUncurryThis
var toObject$2 = toObject$3
var hasOwnProperty = uncurryThis$9({}.hasOwnProperty) // `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty

var hasOwnProperty_1 =
  Object.hasOwn ||
  function hasOwn(it, key) {
    return hasOwnProperty(toObject$2(it), key)
  }

var uncurryThis$8 = functionUncurryThis
var id = 0
var postfix = Math.random()
var toString$2 = uncurryThis$8((1.0).toString)

var uid$2 = function (key) {
  return (
    'Symbol(' +
    (key === undefined ? '' : key) +
    ')_' +
    toString$2(++id + postfix, 36)
  )
}

var global$d = global$p
var shared$2 = shared$3.exports
var hasOwn$6 = hasOwnProperty_1
var uid$1 = uid$2
var NATIVE_SYMBOL = nativeSymbol
var USE_SYMBOL_AS_UID = useSymbolAsUid
var WellKnownSymbolsStore = shared$2('wks')
var Symbol$1 = global$d.Symbol
var symbolFor = Symbol$1 && Symbol$1['for']
var createWellKnownSymbol = USE_SYMBOL_AS_UID
  ? Symbol$1
  : (Symbol$1 && Symbol$1.withoutSetter) || uid$1

var wellKnownSymbol$7 = function (name) {
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

var global$c = global$p
var call$1 = functionCall
var isObject$5 = isObject$7
var isSymbol$1 = isSymbol$2
var getMethod = getMethod$1
var ordinaryToPrimitive = ordinaryToPrimitive$1
var wellKnownSymbol$6 = wellKnownSymbol$7
var TypeError$5 = global$c.TypeError
var TO_PRIMITIVE = wellKnownSymbol$6('toPrimitive') // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

var toPrimitive$1 = function (input, pref) {
  if (!isObject$5(input) || isSymbol$1(input)) return input
  var exoticToPrim = getMethod(input, TO_PRIMITIVE)
  var result

  if (exoticToPrim) {
    if (pref === undefined) pref = 'default'
    result = call$1(exoticToPrim, input, pref)
    if (!isObject$5(result) || isSymbol$1(result)) return result
    throw TypeError$5("Can't convert object to primitive value")
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

var global$b = global$p
var isObject$4 = isObject$7
var document = global$b.document // typeof document.createElement is 'object' in old IE

var EXISTS$1 = isObject$4(document) && isObject$4(document.createElement)

var documentCreateElement = function (it) {
  return EXISTS$1 ? document.createElement(it) : {}
}

var DESCRIPTORS$4 = descriptors
var fails$4 = fails$8
var createElement = documentCreateElement // Thank's IE8 for his funny defineProperty

var ie8DomDefine =
  !DESCRIPTORS$4 &&
  !fails$4(function () {
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
var toIndexedObject$2 = toIndexedObject$3
var toPropertyKey$1 = toPropertyKey$2
var hasOwn$5 = hasOwnProperty_1
var IE8_DOM_DEFINE$1 = ie8DomDefine // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

objectGetOwnPropertyDescriptor.f = DESCRIPTORS$3
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
      if (hasOwn$5(O, P))
        return createPropertyDescriptor$1(
          !call(propertyIsEnumerableModule.f, O, P),
          O[P],
        )
    }

var objectDefineProperty = {}

var global$a = global$p
var isObject$3 = isObject$7
var String$2 = global$a.String
var TypeError$4 = global$a.TypeError // `Assert: Type(argument) is Object`

var anObject$2 = function (argument) {
  if (isObject$3(argument)) return argument
  throw TypeError$4(String$2(argument) + ' is not an object')
}

var global$9 = global$p
var DESCRIPTORS$2 = descriptors
var IE8_DOM_DEFINE = ie8DomDefine
var anObject$1 = anObject$2
var toPropertyKey = toPropertyKey$2
var TypeError$3 = global$9.TypeError // eslint-disable-next-line es/no-object-defineproperty -- safe

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
        throw TypeError$3('Accessors not supported')
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

var global$8 = global$p
var isCallable$4 = isCallable$b
var inspectSource$2 = inspectSource$3
var WeakMap$1 = global$8.WeakMap
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
var global$7 = global$p
var uncurryThis$6 = functionUncurryThis
var isObject$2 = isObject$7
var createNonEnumerableProperty$2 = createNonEnumerableProperty$3
var hasOwn$4 = hasOwnProperty_1
var shared = sharedStore
var sharedKey = sharedKey$1
var hiddenKeys$2 = hiddenKeys$3
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized'
var TypeError$2 = global$7.TypeError
var WeakMap = global$7.WeakMap
var set, get, has

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {})
}

var getterFor = function (TYPE) {
  return function (it) {
    var state

    if (!isObject$2(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$2('Incompatible receiver, ' + TYPE + ' required')
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
    if (wmhas(store, it)) throw new TypeError$2(OBJECT_ALREADY_INITIALIZED)
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
    if (hasOwn$4(it, STATE)) throw new TypeError$2(OBJECT_ALREADY_INITIALIZED)
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

var global$6 = global$p
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

  if (O === global$6) {
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
var min$2 = Math.min // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex$1 = function (index, length) {
  var integer = toIntegerOrInfinity$1(index)
  return integer < 0 ? max(integer + length, 0) : min$2(integer, length)
}

var toIntegerOrInfinity = toIntegerOrInfinity$2
var min$1 = Math.min // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

var toLength$2 = function (argument) {
  return argument > 0
    ? min$1(toIntegerOrInfinity(argument), 0x1fffffffffffff)
    : 0 // 2 ** 53 - 1 == 9007199254740991
}

var toLength$1 = toLength$2 // `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike

var lengthOfArrayLike$2 = function (obj) {
  return toLength$1(obj.length)
}

var toIndexedObject$1 = toIndexedObject$3
var toAbsoluteIndex = toAbsoluteIndex$1
var lengthOfArrayLike$1 = lengthOfArrayLike$2 // `Array.prototype.{ indexOf, includes }` methods implementation

var createMethod$1 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$1($this)
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
var toIndexedObject = toIndexedObject$3
var indexOf = arrayIncludes.indexOf
var hiddenKeys$1 = hiddenKeys$3
var push$1 = uncurryThis$5([].push)

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object)
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

var fails$3 = fails$8
var isCallable$2 = isCallable$b
var replacement = /#|\.prototype\./

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)]
  return value == POLYFILL
    ? true
    : value == NATIVE
    ? false
    : isCallable$2(detection)
    ? fails$3(detection)
    : !!detection
}

var normalize = (isForced$1.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase()
})

var data = (isForced$1.data = {})
var NATIVE = (isForced$1.NATIVE = 'N')
var POLYFILL = (isForced$1.POLYFILL = 'P')
var isForced_1 = isForced$1

var global$5 = global$p
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
  options.name        - the .name of the function if it does not match the key
*/

var _export = function (options, source) {
  var TARGET = options.target
  var GLOBAL = options.global
  var STATIC = options.stat
  var FORCED, target, key, targetProperty, sourceProperty, descriptor

  if (GLOBAL) {
    target = global$5
  } else if (STATIC) {
    target = global$5[TARGET] || setGlobal(TARGET, {})
  } else {
    target = (global$5[TARGET] || {}).prototype
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

var uncurryThis$3 = functionUncurryThis
var aCallable = aCallable$2
var bind$1 = uncurryThis$3(uncurryThis$3.bind) // optional / simple context binding

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

var classof$4 = classofRaw$1 // `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe

var isArray$1 =
  Array.isArray ||
  function isArray(argument) {
    return classof$4(argument) == 'Array'
  }

var wellKnownSymbol$5 = wellKnownSymbol$7
var TO_STRING_TAG$1 = wellKnownSymbol$5('toStringTag')
var test = {}
test[TO_STRING_TAG$1] = 'z'
var toStringTagSupport = String(test) === '[object z]'

var global$4 = global$p
var TO_STRING_TAG_SUPPORT = toStringTagSupport
var isCallable$1 = isCallable$b
var classofRaw = classofRaw$1
var wellKnownSymbol$4 = wellKnownSymbol$7
var TO_STRING_TAG = wellKnownSymbol$4('toStringTag')
var Object$1 = global$4.Object // ES3 wrong here

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

var classof$3 = TO_STRING_TAG_SUPPORT
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

var uncurryThis$2 = functionUncurryThis
var fails$2 = fails$8
var isCallable = isCallable$b
var classof$2 = classof$3
var getBuiltIn = getBuiltIn$4
var inspectSource = inspectSource$3

var noop = function () {
  /* empty */
}

var empty = []
var construct = getBuiltIn('Reflect', 'construct')
var constructorRegExp = /^\s*(?:class|function)\b/
var exec = uncurryThis$2(constructorRegExp.exec)
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

  switch (classof$2(argument)) {
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
  fails$2(function () {
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

var global$3 = global$p
var isArray = isArray$1
var isConstructor = isConstructor$1
var isObject$1 = isObject$7
var wellKnownSymbol$3 = wellKnownSymbol$7
var SPECIES$1 = wellKnownSymbol$3('species')
var Array$1 = global$3.Array // a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

var arraySpeciesConstructor$1 = function (originalArray) {
  var C

  if (isArray(originalArray)) {
    C = originalArray.constructor // cross-realm fallback

    if (isConstructor(C) && (C === Array$1 || isArray(C.prototype)))
      C = undefined
    else if (isObject$1(C)) {
      C = C[SPECIES$1]
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
var uncurryThis$1 = functionUncurryThis
var IndexedObject = indexedObject
var toObject$1 = toObject$3
var lengthOfArrayLike = lengthOfArrayLike$2
var arraySpeciesCreate = arraySpeciesCreate$1
var push = uncurryThis$1([].push) // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation

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

var fails$1 = fails$8
var wellKnownSymbol$2 = wellKnownSymbol$7
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
      callbackfn,
      /* , thisArg */
    ) {
      return $filter(
        this,
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined,
      )
    },
  },
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
var fails = fails$8
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
  },
)

var global$2 = global$p
var classof$1 = classof$3
var String$1 = global$2.String

var toString$1 = function (argument) {
  if (classof$1(argument) === 'Symbol')
    throw TypeError('Cannot convert a Symbol value to a string')
  return String$1(argument)
}

var isObject = isObject$7
var classof = classofRaw$1
var wellKnownSymbol$1 = wellKnownSymbol$7
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

var global$1 = global$p
var isRegExp = isRegexp
var TypeError$1 = global$1.TypeError

var notARegexp = function (it) {
  if (isRegExp(it)) {
    throw TypeError$1("The method doesn't accept regular expressions")
  }

  return it
}

var wellKnownSymbol = wellKnownSymbol$7
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
var uncurryThis = functionUncurryThis
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f
var toLength = toLength$2
var toString = toString$1
var notARegExp = notARegexp
var requireObjectCoercible = requireObjectCoercible$3
var correctIsRegExpLogic = correctIsRegexpLogic

var un$StartsWith = uncurryThis(''.startsWith)
var stringSlice = uncurryThis(''.slice)
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
      searchString,
      /* , position = 0 */
    ) {
      var that = toString(requireObjectCoercible(this))
      notARegExp(searchString)
      var index = toLength(
        min(arguments.length > 1 ? arguments[1] : undefined, that.length),
      )
      var search = toString(searchString)
      return un$StartsWith
        ? un$StartsWith(that, search, index)
        : stringSlice(that, index, index + search.length) === search
    },
  },
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
      }),
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
    options.imports,
  )

  var compiled = ___default['default'].template(content, options)

  content = compiled(data)
  return content
}

var plugin = exportPlugin(process, info$1)
plugin.lodash = ___default['default']
module.exports = plugin
