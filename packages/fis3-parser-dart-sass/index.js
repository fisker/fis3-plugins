'use strict'

var path = require('path')
var url = require('url')
var util = require('util')
var sass = require('sass')
var fs = require('fs')
var process$2 = require('process')
var cartesianProduct = require('fast-cartesian-product')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {default: e}
}

var path__default = /*#__PURE__*/ _interopDefaultLegacy(path)
var sass__default = /*#__PURE__*/ _interopDefaultLegacy(sass)
var fs__default = /*#__PURE__*/ _interopDefaultLegacy(fs)
var process__default = /*#__PURE__*/ _interopDefaultLegacy(process$2)
var cartesianProduct__default =
  /*#__PURE__*/ _interopDefaultLegacy(cartesianProduct)

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

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  )
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  )
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr)
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr
}

function _iterableToArray(iter) {
  if (
    (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
    iter['@@iterator'] != null
  )
    return Array.from(iter)
}

function _iterableToArrayLimit(arr, i) {
  var _i =
    arr == null
      ? null
      : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) ||
        arr['@@iterator']

  if (_i == null) return
  var _arr = []
  var _n = true
  var _d = false

  var _s, _e

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value)

      if (i && _arr.length === i) break
    }
  } catch (err) {
    _d = true
    _e = err
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']()
    } finally {
      if (_d) throw _e
    }
  }

  return _arr
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

function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  )
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  )
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

var global$F = // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  (function () {
    return this
  })() ||
  Function('return this')()

var objectGetOwnPropertyDescriptor = {}

var fails$k = function (exec) {
  try {
    return !!exec()
  } catch (error) {
    return true
  }
}

var fails$j = fails$k // Detect IE8's incomplete defineProperty implementation

var descriptors = !fails$j(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return (
    Object.defineProperty({}, 1, {
      get: function () {
        return 7
      },
    })[1] != 7
  )
})

var call$o = Function.prototype.call
var functionCall = call$o.bind
  ? call$o.bind(call$o)
  : function () {
      return call$o.apply(call$o, arguments)
    }

var objectPropertyIsEnumerable = {}

var $propertyIsEnumerable$1 = {}.propertyIsEnumerable // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor // Nashorn ~ JDK8 bug

var NASHORN_BUG =
  getOwnPropertyDescriptor$2 &&
  !$propertyIsEnumerable$1.call(
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
  : $propertyIsEnumerable$1

var createPropertyDescriptor$4 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value,
  }
}

var FunctionPrototype$2 = Function.prototype
var bind$a = FunctionPrototype$2.bind
var call$n = FunctionPrototype$2.call
var callBind = bind$a && bind$a.bind(call$n)
var functionUncurryThis = bind$a
  ? function (fn) {
      return fn && callBind(call$n, fn)
    }
  : function (fn) {
      return (
        fn &&
        function () {
          return call$n.apply(fn, arguments)
        }
      )
    }

var uncurryThis$r = functionUncurryThis
var toString$b = uncurryThis$r({}.toString)
var stringSlice$6 = uncurryThis$r(''.slice)

var classofRaw$1 = function (it) {
  return stringSlice$6(toString$b(it), 8, -1)
}

var global$E = global$F
var uncurryThis$q = functionUncurryThis
var fails$i = fails$k
var classof$a = classofRaw$1
var Object$5 = global$E.Object
var split = uncurryThis$q(''.split) // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails$i(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object$5('z').propertyIsEnumerable(0)
})
  ? function (it) {
      return classof$a(it) == 'String' ? split(it, '') : Object$5(it)
    }
  : Object$5

var global$D = global$F
var TypeError$h = global$D.TypeError // `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible

var requireObjectCoercible$7 = function (it) {
  if (it == undefined) throw TypeError$h("Can't call method on " + it)
  return it
}

var IndexedObject$3 = indexedObject
var requireObjectCoercible$6 = requireObjectCoercible$7

var toIndexedObject$9 = function (it) {
  return IndexedObject$3(requireObjectCoercible$6(it))
}

// https://tc39.es/ecma262/#sec-iscallable

var isCallable$k = function (argument) {
  return typeof argument == 'function'
}

var isCallable$j = isCallable$k

var isObject$c = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$j(it)
}

var global$C = global$F
var isCallable$i = isCallable$k

var aFunction = function (argument) {
  return isCallable$i(argument) ? argument : undefined
}

var getBuiltIn$d = function (namespace, method) {
  return arguments.length < 2
    ? aFunction(global$C[namespace])
    : global$C[namespace] && global$C[namespace][method]
}

var uncurryThis$p = functionUncurryThis
var objectIsPrototypeOf = uncurryThis$p({}.isPrototypeOf)

var getBuiltIn$c = getBuiltIn$d
var engineUserAgent = getBuiltIn$c('navigator', 'userAgent') || ''

var global$B = global$F
var userAgent = engineUserAgent
var process$1 = global$B.process
var Deno = global$B.Deno
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
var V8_VERSION$2 = engineV8Version
var fails$h = fails$k // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

var nativeSymbol =
  !!Object.getOwnPropertySymbols &&
  !fails$h(function () {
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

var global$A = global$F
var getBuiltIn$b = getBuiltIn$d
var isCallable$h = isCallable$k
var isPrototypeOf$3 = objectIsPrototypeOf
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid
var Object$4 = global$A.Object
var isSymbol$2 = USE_SYMBOL_AS_UID$1
  ? function (it) {
      return typeof it == 'symbol'
    }
  : function (it) {
      var $Symbol = getBuiltIn$b('Symbol')
      return (
        isCallable$h($Symbol) &&
        isPrototypeOf$3($Symbol.prototype, Object$4(it))
      )
    }

var global$z = global$F
var String$4 = global$z.String

var tryToString$4 = function (argument) {
  try {
    return String$4(argument)
  } catch (error) {
    return 'Object'
  }
}

var global$y = global$F
var isCallable$g = isCallable$k
var tryToString$3 = tryToString$4
var TypeError$g = global$y.TypeError // `Assert: IsCallable(argument) is true`

var aCallable$g = function (argument) {
  if (isCallable$g(argument)) return argument
  throw TypeError$g(tryToString$3(argument) + ' is not a function')
}

var aCallable$f = aCallable$g // `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod

var getMethod$5 = function (V, P) {
  var func = V[P]
  return func == null ? undefined : aCallable$f(func)
}

var global$x = global$F
var call$m = functionCall
var isCallable$f = isCallable$k
var isObject$b = isObject$c
var TypeError$f = global$x.TypeError // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val
  if (
    pref === 'string' &&
    isCallable$f((fn = input.toString)) &&
    !isObject$b((val = call$m(fn, input)))
  )
    return val
  if (
    isCallable$f((fn = input.valueOf)) &&
    !isObject$b((val = call$m(fn, input)))
  )
    return val
  if (
    pref !== 'string' &&
    isCallable$f((fn = input.toString)) &&
    !isObject$b((val = call$m(fn, input)))
  )
    return val
  throw TypeError$f("Can't convert object to primitive value")
}

var shared$4 = {exports: {}}

var isPure = false

var global$w = global$F // eslint-disable-next-line es/no-object-defineproperty -- safe

var defineProperty$3 = Object.defineProperty

var setGlobal$3 = function (key, value) {
  try {
    defineProperty$3(global$w, key, {
      value: value,
      configurable: true,
      writable: true,
    })
  } catch (error) {
    global$w[key] = value
  }

  return value
}

var global$v = global$F
var setGlobal$2 = setGlobal$3
var SHARED = '__core-js_shared__'
var store$3 = global$v[SHARED] || setGlobal$2(SHARED, {})
var sharedStore = store$3

var store$2 = sharedStore
;(shared$4.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {})
})('versions', []).push({
  version: '3.19.0',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)',
})

var global$u = global$F
var requireObjectCoercible$5 = requireObjectCoercible$7
var Object$3 = global$u.Object // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

var toObject$6 = function (argument) {
  return Object$3(requireObjectCoercible$5(argument))
}

var uncurryThis$o = functionUncurryThis
var toObject$5 = toObject$6
var hasOwnProperty = uncurryThis$o({}.hasOwnProperty) // `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty

var hasOwnProperty_1 =
  Object.hasOwn ||
  function hasOwn(it, key) {
    return hasOwnProperty(toObject$5(it), key)
  }

var uncurryThis$n = functionUncurryThis
var id$1 = 0
var postfix = Math.random()
var toString$a = uncurryThis$n((1.0).toString)

var uid$3 = function (key) {
  return (
    'Symbol(' +
    (key === undefined ? '' : key) +
    ')_' +
    toString$a(++id$1 + postfix, 36)
  )
}

var global$t = global$F
var shared$3 = shared$4.exports
var hasOwn$9 = hasOwnProperty_1
var uid$2 = uid$3
var NATIVE_SYMBOL = nativeSymbol
var USE_SYMBOL_AS_UID = useSymbolAsUid
var WellKnownSymbolsStore = shared$3('wks')
var Symbol$1 = global$t.Symbol
var symbolFor = Symbol$1 && Symbol$1['for']
var createWellKnownSymbol = USE_SYMBOL_AS_UID
  ? Symbol$1
  : (Symbol$1 && Symbol$1.withoutSetter) || uid$2

var wellKnownSymbol$k = function (name) {
  if (
    !hasOwn$9(WellKnownSymbolsStore, name) ||
    !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')
  ) {
    var description = 'Symbol.' + name

    if (NATIVE_SYMBOL && hasOwn$9(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name]
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description)
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description)
    }
  }

  return WellKnownSymbolsStore[name]
}

var global$s = global$F
var call$l = functionCall
var isObject$a = isObject$c
var isSymbol$1 = isSymbol$2
var getMethod$4 = getMethod$5
var ordinaryToPrimitive = ordinaryToPrimitive$1
var wellKnownSymbol$j = wellKnownSymbol$k
var TypeError$e = global$s.TypeError
var TO_PRIMITIVE = wellKnownSymbol$j('toPrimitive') // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

var toPrimitive$1 = function (input, pref) {
  if (!isObject$a(input) || isSymbol$1(input)) return input
  var exoticToPrim = getMethod$4(input, TO_PRIMITIVE)
  var result

  if (exoticToPrim) {
    if (pref === undefined) pref = 'default'
    result = call$l(exoticToPrim, input, pref)
    if (!isObject$a(result) || isSymbol$1(result)) return result
    throw TypeError$e("Can't convert object to primitive value")
  }

  if (pref === undefined) pref = 'number'
  return ordinaryToPrimitive(input, pref)
}

var toPrimitive = toPrimitive$1
var isSymbol = isSymbol$2 // `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey

var toPropertyKey$3 = function (argument) {
  var key = toPrimitive(argument, 'string')
  return isSymbol(key) ? key : key + ''
}

var global$r = global$F
var isObject$9 = isObject$c
var document$1 = global$r.document // typeof document.createElement is 'object' in old IE

var EXISTS$1 = isObject$9(document$1) && isObject$9(document$1.createElement)

var documentCreateElement$1 = function (it) {
  return EXISTS$1 ? document$1.createElement(it) : {}
}

var DESCRIPTORS$8 = descriptors
var fails$g = fails$k
var createElement = documentCreateElement$1 // Thank's IE8 for his funny defineProperty

var ie8DomDefine =
  !DESCRIPTORS$8 &&
  !fails$g(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return (
      Object.defineProperty(createElement('div'), 'a', {
        get: function () {
          return 7
        },
      }).a != 7
    )
  })

var DESCRIPTORS$7 = descriptors
var call$k = functionCall
var propertyIsEnumerableModule = objectPropertyIsEnumerable
var createPropertyDescriptor$3 = createPropertyDescriptor$4
var toIndexedObject$8 = toIndexedObject$9
var toPropertyKey$2 = toPropertyKey$3
var hasOwn$8 = hasOwnProperty_1
var IE8_DOM_DEFINE$1 = ie8DomDefine // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

objectGetOwnPropertyDescriptor.f = DESCRIPTORS$7
  ? $getOwnPropertyDescriptor
  : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject$8(O)
      P = toPropertyKey$2(P)
      if (IE8_DOM_DEFINE$1)
        try {
          return $getOwnPropertyDescriptor(O, P)
        } catch (error) {
          /* empty */
        }
      if (hasOwn$8(O, P))
        return createPropertyDescriptor$3(
          !call$k(propertyIsEnumerableModule.f, O, P),
          O[P],
        )
    }

var objectDefineProperty = {}

var global$q = global$F
var isObject$8 = isObject$c
var String$3 = global$q.String
var TypeError$d = global$q.TypeError // `Assert: Type(argument) is Object`

var anObject$u = function (argument) {
  if (isObject$8(argument)) return argument
  throw TypeError$d(String$3(argument) + ' is not an object')
}

var global$p = global$F
var DESCRIPTORS$6 = descriptors
var IE8_DOM_DEFINE = ie8DomDefine
var anObject$t = anObject$u
var toPropertyKey$1 = toPropertyKey$3
var TypeError$c = global$p.TypeError // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

objectDefineProperty.f = DESCRIPTORS$6
  ? $defineProperty
  : function defineProperty(O, P, Attributes) {
      anObject$t(O)
      P = toPropertyKey$1(P)
      anObject$t(Attributes)
      if (IE8_DOM_DEFINE)
        try {
          return $defineProperty(O, P, Attributes)
        } catch (error) {
          /* empty */
        }
      if ('get' in Attributes || 'set' in Attributes)
        throw TypeError$c('Accessors not supported')
      if ('value' in Attributes) O[P] = Attributes.value
      return O
    }

var DESCRIPTORS$5 = descriptors
var definePropertyModule$5 = objectDefineProperty
var createPropertyDescriptor$2 = createPropertyDescriptor$4
var createNonEnumerableProperty$5 = DESCRIPTORS$5
  ? function (object, key, value) {
      return definePropertyModule$5.f(
        object,
        key,
        createPropertyDescriptor$2(1, value),
      )
    }
  : function (object, key, value) {
      object[key] = value
      return object
    }

var redefine$8 = {exports: {}}

var uncurryThis$m = functionUncurryThis
var isCallable$e = isCallable$k
var store$1 = sharedStore
var functionToString = uncurryThis$m(Function.toString) // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (!isCallable$e(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it)
  }
}

var inspectSource$3 = store$1.inspectSource

var global$o = global$F
var isCallable$d = isCallable$k
var inspectSource$2 = inspectSource$3
var WeakMap$1 = global$o.WeakMap
var nativeWeakMap =
  isCallable$d(WeakMap$1) && /native code/.test(inspectSource$2(WeakMap$1))

var shared$2 = shared$4.exports
var uid$1 = uid$3
var keys = shared$2('keys')

var sharedKey$3 = function (key) {
  return keys[key] || (keys[key] = uid$1(key))
}

var hiddenKeys$5 = {}

var NATIVE_WEAK_MAP = nativeWeakMap
var global$n = global$F
var uncurryThis$l = functionUncurryThis
var isObject$7 = isObject$c
var createNonEnumerableProperty$4 = createNonEnumerableProperty$5
var hasOwn$7 = hasOwnProperty_1
var shared$1 = sharedStore
var sharedKey$2 = sharedKey$3
var hiddenKeys$4 = hiddenKeys$5
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized'
var TypeError$b = global$n.TypeError
var WeakMap = global$n.WeakMap
var set, get, has

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {})
}

var getterFor = function (TYPE) {
  return function (it) {
    var state

    if (!isObject$7(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$b('Incompatible receiver, ' + TYPE + ' required')
    }

    return state
  }
}

if (NATIVE_WEAK_MAP || shared$1.state) {
  var store = shared$1.state || (shared$1.state = new WeakMap())
  var wmget = uncurryThis$l(store.get)
  var wmhas = uncurryThis$l(store.has)
  var wmset = uncurryThis$l(store.set)

  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError$b(OBJECT_ALREADY_INITIALIZED)
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
  var STATE = sharedKey$2('state')
  hiddenKeys$4[STATE] = true

  set = function (it, metadata) {
    if (hasOwn$7(it, STATE)) throw new TypeError$b(OBJECT_ALREADY_INITIALIZED)
    metadata.facade = it
    createNonEnumerableProperty$4(it, STATE, metadata)
    return metadata
  }

  get = function (it) {
    return hasOwn$7(it, STATE) ? it[STATE] : {}
  }

  has = function (it) {
    return hasOwn$7(it, STATE)
  }
}

var internalState = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor,
}

var DESCRIPTORS$4 = descriptors
var hasOwn$6 = hasOwnProperty_1
var FunctionPrototype$1 = Function.prototype // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getDescriptor = DESCRIPTORS$4 && Object.getOwnPropertyDescriptor
var EXISTS = hasOwn$6(FunctionPrototype$1, 'name') // additional protection from minified / mangled / dropped function names

var PROPER =
  EXISTS &&
  function something() {
    /* empty */
  }.name === 'something'

var CONFIGURABLE =
  EXISTS &&
  (!DESCRIPTORS$4 ||
    (DESCRIPTORS$4 && getDescriptor(FunctionPrototype$1, 'name').configurable))
var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE,
}

var global$m = global$F
var isCallable$c = isCallable$k
var hasOwn$5 = hasOwnProperty_1
var createNonEnumerableProperty$3 = createNonEnumerableProperty$5
var setGlobal$1 = setGlobal$3
var inspectSource$1 = inspectSource$3
var InternalStateModule$3 = internalState
var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE
var getInternalState$3 = InternalStateModule$3.get
var enforceInternalState = InternalStateModule$3.enforce
var TEMPLATE = String(String).split('String')
;(redefine$8.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false
  var simple = options ? !!options.enumerable : false
  var noTargetGet = options ? !!options.noTargetGet : false
  var name = options && options.name !== undefined ? options.name : key
  var state

  if (isCallable$c(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']'
    }

    if (
      !hasOwn$5(value, 'name') ||
      (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)
    ) {
      createNonEnumerableProperty$3(value, 'name', name)
    }

    state = enforceInternalState(value)

    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '')
    }
  }

  if (O === global$m) {
    if (simple) O[key] = value
    else setGlobal$1(key, value)
    return
  } else if (!unsafe) {
    delete O[key]
  } else if (!noTargetGet && O[key]) {
    simple = true
  }

  if (simple) O[key] = value
  else createNonEnumerableProperty$3(O, key, value) // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return (
    (isCallable$c(this) && getInternalState$3(this).source) ||
    inspectSource$1(this)
  )
})

var objectGetOwnPropertyNames = {}

var ceil = Math.ceil
var floor$1 = Math.floor // `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity

var toIntegerOrInfinity$4 = function (argument) {
  var number = +argument // eslint-disable-next-line no-self-compare -- safe

  return number !== number || number === 0
    ? 0
    : (number > 0 ? floor$1 : ceil)(number)
}

var toIntegerOrInfinity$3 = toIntegerOrInfinity$4
var max$2 = Math.max
var min$4 = Math.min // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex$2 = function (index, length) {
  var integer = toIntegerOrInfinity$3(index)
  return integer < 0 ? max$2(integer + length, 0) : min$4(integer, length)
}

var toIntegerOrInfinity$2 = toIntegerOrInfinity$4
var min$3 = Math.min // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

var toLength$4 = function (argument) {
  return argument > 0
    ? min$3(toIntegerOrInfinity$2(argument), 0x1fffffffffffff)
    : 0 // 2 ** 53 - 1 == 9007199254740991
}

var toLength$3 = toLength$4 // `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike

var lengthOfArrayLike$6 = function (obj) {
  return toLength$3(obj.length)
}

var toIndexedObject$7 = toIndexedObject$9
var toAbsoluteIndex$1 = toAbsoluteIndex$2
var lengthOfArrayLike$5 = lengthOfArrayLike$6 // `Array.prototype.{ indexOf, includes }` methods implementation

var createMethod$4 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$7($this)
    var length = lengthOfArrayLike$5(O)
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
  includes: createMethod$4(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$4(false),
}

var uncurryThis$k = functionUncurryThis
var hasOwn$4 = hasOwnProperty_1
var toIndexedObject$6 = toIndexedObject$9
var indexOf$1 = arrayIncludes.indexOf
var hiddenKeys$3 = hiddenKeys$5
var push$5 = uncurryThis$k([].push)

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$6(object)
  var i = 0
  var result = []
  var key

  for (key in O)
    !hasOwn$4(hiddenKeys$3, key) && hasOwn$4(O, key) && push$5(result, key) // Don't enum bug & hidden keys

  while (names.length > i)
    if (hasOwn$4(O, (key = names[i++]))) {
      ~indexOf$1(result, key) || push$5(result, key)
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
var hiddenKeys$2 = enumBugKeys$2.concat('length', 'prototype') // `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe

objectGetOwnPropertyNames.f =
  Object.getOwnPropertyNames ||
  function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$2)
  }

var objectGetOwnPropertySymbols = {}

objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols

var getBuiltIn$a = getBuiltIn$d
var uncurryThis$j = functionUncurryThis
var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols
var anObject$s = anObject$u
var concat$1 = uncurryThis$j([].concat) // all object keys, includes non-enumerable and symbols

var ownKeys$1 =
  getBuiltIn$a('Reflect', 'ownKeys') ||
  function ownKeys(it) {
    var keys = getOwnPropertyNamesModule$1.f(anObject$s(it))
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f
    return getOwnPropertySymbols
      ? concat$1(keys, getOwnPropertySymbols(it))
      : keys
  }

var hasOwn$3 = hasOwnProperty_1
var ownKeys = ownKeys$1
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor
var definePropertyModule$4 = objectDefineProperty

var copyConstructorProperties$1 = function (target, source) {
  var keys = ownKeys(source)
  var defineProperty = definePropertyModule$4.f
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    if (!hasOwn$3(target, key))
      defineProperty(target, key, getOwnPropertyDescriptor(source, key))
  }
}

var fails$f = fails$k
var isCallable$b = isCallable$k
var replacement = /#|\.prototype\./

var isForced$2 = function (feature, detection) {
  var value = data[normalize(feature)]
  return value == POLYFILL
    ? true
    : value == NATIVE
    ? false
    : isCallable$b(detection)
    ? fails$f(detection)
    : !!detection
}

var normalize = (isForced$2.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase()
})

var data = (isForced$2.data = {})
var NATIVE = (isForced$2.NATIVE = 'N')
var POLYFILL = (isForced$2.POLYFILL = 'P')
var isForced_1 = isForced$2

var global$l = global$F
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f
var createNonEnumerableProperty$2 = createNonEnumerableProperty$5
var redefine$7 = redefine$8.exports
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
  options.name        - the .name of the function if it does not match the key
*/

var _export = function (options, source) {
  var TARGET = options.target
  var GLOBAL = options.global
  var STATIC = options.stat
  var FORCED, target, key, targetProperty, sourceProperty, descriptor

  if (GLOBAL) {
    target = global$l
  } else if (STATIC) {
    target = global$l[TARGET] || setGlobal(TARGET, {})
  } else {
    target = (global$l[TARGET] || {}).prototype
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
        if (typeof sourceProperty == typeof targetProperty) continue
        copyConstructorProperties(sourceProperty, targetProperty)
      } // add a flag to not completely full polyfills

      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$2(sourceProperty, 'sham', true)
      } // extend global

      redefine$7(target, key, sourceProperty, options)
    }
}

var global$k = global$F
var aCallable$e = aCallable$g
var toObject$4 = toObject$6
var IndexedObject$2 = indexedObject
var lengthOfArrayLike$4 = lengthOfArrayLike$6
var TypeError$a = global$k.TypeError // `Array.prototype.{ reduce, reduceRight }` methods implementation

var createMethod$3 = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aCallable$e(callbackfn)
    var O = toObject$4(that)
    var self = IndexedObject$2(O)
    var length = lengthOfArrayLike$4(O)
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
          throw TypeError$a('Reduce of empty array with no initial value')
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
  left: createMethod$3(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod$3(true),
}

var fails$e = fails$k

var arrayMethodIsStrict$2 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME]
  return (
    !!method &&
    fails$e(function () {
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

var classof$9 = classofRaw$1
var global$j = global$F
var engineIsNode = classof$9(global$j.process) == 'process'

var $$t = _export
var $reduce = arrayReduce.left
var arrayMethodIsStrict$1 = arrayMethodIsStrict$2
var CHROME_VERSION = engineV8Version
var IS_NODE = engineIsNode
var STRICT_METHOD$1 = arrayMethodIsStrict$1('reduce') // Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982

var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83 // `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce

$$t(
  {
    target: 'Array',
    proto: true,
    forced: !STRICT_METHOD$1 || CHROME_BUG,
  },
  {
    reduce: function reduce(
      callbackfn,
      /* , initialValue */
    ) {
      var length = arguments.length
      return $reduce(
        this,
        callbackfn,
        length,
        length > 1 ? arguments[1] : undefined,
      )
    },
  },
)

var $$s = _export
var uncurryThis$i = functionUncurryThis
var IndexedObject$1 = indexedObject
var toIndexedObject$5 = toIndexedObject$9
var arrayMethodIsStrict = arrayMethodIsStrict$2
var un$Join = uncurryThis$i([].join)
var ES3_STRINGS = IndexedObject$1 != Object
var STRICT_METHOD = arrayMethodIsStrict('join', ',') // `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join

$$s(
  {
    target: 'Array',
    proto: true,
    forced: ES3_STRINGS || !STRICT_METHOD,
  },
  {
    join: function join(separator) {
      return un$Join(
        toIndexedObject$5(this),
        separator === undefined ? ',' : separator,
      )
    },
  },
)

var classof$8 = classofRaw$1 // `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe

var isArray$3 =
  Array.isArray ||
  function isArray(argument) {
    return classof$8(argument) == 'Array'
  }

var toPropertyKey = toPropertyKey$3
var definePropertyModule$3 = objectDefineProperty
var createPropertyDescriptor$1 = createPropertyDescriptor$4

var createProperty$2 = function (object, key, value) {
  var propertyKey = toPropertyKey(key)
  if (propertyKey in object)
    definePropertyModule$3.f(
      object,
      propertyKey,
      createPropertyDescriptor$1(0, value),
    )
  else object[propertyKey] = value
}

var wellKnownSymbol$i = wellKnownSymbol$k
var TO_STRING_TAG$2 = wellKnownSymbol$i('toStringTag')
var test = {}
test[TO_STRING_TAG$2] = 'z'
var toStringTagSupport = String(test) === '[object z]'

var global$i = global$F
var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport
var isCallable$a = isCallable$k
var classofRaw = classofRaw$1
var wellKnownSymbol$h = wellKnownSymbol$k
var TO_STRING_TAG$1 = wellKnownSymbol$h('toStringTag')
var Object$2 = global$i.Object // ES3 wrong here

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

var classof$7 = TO_STRING_TAG_SUPPORT$2
  ? classofRaw
  : function (it) {
      var O, tag, result
      return it === undefined
        ? 'Undefined'
        : it === null
        ? 'Null' // @@toStringTag case
        : typeof (tag = tryGet((O = Object$2(it)), TO_STRING_TAG$1)) == 'string'
        ? tag // builtinTag case
        : CORRECT_ARGUMENTS
        ? classofRaw(O) // ES3 arguments fallback
        : (result = classofRaw(O)) == 'Object' && isCallable$a(O.callee)
        ? 'Arguments'
        : result
    }

var uncurryThis$h = functionUncurryThis
var fails$d = fails$k
var isCallable$9 = isCallable$k
var classof$6 = classof$7
var getBuiltIn$9 = getBuiltIn$d
var inspectSource = inspectSource$3

var noop = function () {
  /* empty */
}

var empty = []
var construct = getBuiltIn$9('Reflect', 'construct')
var constructorRegExp = /^\s*(?:class|function)\b/
var exec$2 = uncurryThis$h(constructorRegExp.exec)
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop)

var isConstructorModern = function (argument) {
  if (!isCallable$9(argument)) return false

  try {
    construct(noop, empty, argument)
    return true
  } catch (error) {
    return false
  }
}

var isConstructorLegacy = function (argument) {
  if (!isCallable$9(argument)) return false

  switch (classof$6(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction':
      return false
    // we can't check .prototype since constructors produced by .bind haven't it
  }

  return (
    INCORRECT_TO_STRING || !!exec$2(constructorRegExp, inspectSource(argument))
  )
} // `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor

var isConstructor$3 =
  !construct ||
  fails$d(function () {
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

var global$h = global$F
var isArray$2 = isArray$3
var isConstructor$2 = isConstructor$3
var isObject$6 = isObject$c
var wellKnownSymbol$g = wellKnownSymbol$k
var SPECIES$5 = wellKnownSymbol$g('species')
var Array$2 = global$h.Array // a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

var arraySpeciesConstructor$1 = function (originalArray) {
  var C

  if (isArray$2(originalArray)) {
    C = originalArray.constructor // cross-realm fallback

    if (isConstructor$2(C) && (C === Array$2 || isArray$2(C.prototype)))
      C = undefined
    else if (isObject$6(C)) {
      C = C[SPECIES$5]
      if (C === null) C = undefined
    }
  }

  return C === undefined ? Array$2 : C
}

var arraySpeciesConstructor = arraySpeciesConstructor$1 // `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

var arraySpeciesCreate$2 = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length)
}

var fails$c = fails$k
var wellKnownSymbol$f = wellKnownSymbol$k
var V8_VERSION$1 = engineV8Version
var SPECIES$4 = wellKnownSymbol$f('species')

var arrayMethodHasSpeciesSupport$4 = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return (
    V8_VERSION$1 >= 51 ||
    !fails$c(function () {
      var array = []
      var constructor = (array.constructor = {})

      constructor[SPECIES$4] = function () {
        return {
          foo: 1,
        }
      }

      return array[METHOD_NAME](Boolean).foo !== 1
    })
  )
}

var $$r = _export
var global$g = global$F
var fails$b = fails$k
var isArray$1 = isArray$3
var isObject$5 = isObject$c
var toObject$3 = toObject$6
var lengthOfArrayLike$3 = lengthOfArrayLike$6
var createProperty$1 = createProperty$2
var arraySpeciesCreate$1 = arraySpeciesCreate$2
var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$4
var wellKnownSymbol$e = wellKnownSymbol$k
var V8_VERSION = engineV8Version
var IS_CONCAT_SPREADABLE = wellKnownSymbol$e('isConcatSpreadable')
var MAX_SAFE_INTEGER = 0x1fffffffffffff
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'
var TypeError$9 = global$g.TypeError // We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679

var IS_CONCAT_SPREADABLE_SUPPORT =
  V8_VERSION >= 51 ||
  !fails$b(function () {
    var array = []
    array[IS_CONCAT_SPREADABLE] = false
    return array.concat()[0] !== array
  })
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$3('concat')

var isConcatSpreadable = function (O) {
  if (!isObject$5(O)) return false
  var spreadable = O[IS_CONCAT_SPREADABLE]
  return spreadable !== undefined ? !!spreadable : isArray$1(O)
}

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT // `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species

$$r(
  {
    target: 'Array',
    proto: true,
    forced: FORCED,
  },
  {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject$3(this)
      var A = arraySpeciesCreate$1(O, 0)
      var n = 0
      var i, k, length, len, E

      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i]

        if (isConcatSpreadable(E)) {
          len = lengthOfArrayLike$3(E)
          if (n + len > MAX_SAFE_INTEGER)
            throw TypeError$9(MAXIMUM_ALLOWED_INDEX_EXCEEDED)

          for (k = 0; k < len; k++, n++)
            if (k in E) createProperty$1(A, n, E[k])
        } else {
          if (n >= MAX_SAFE_INTEGER)
            throw TypeError$9(MAXIMUM_ALLOWED_INDEX_EXCEEDED)
          createProperty$1(A, n++, E)
        }
      }

      A.length = n
      return A
    },
  },
)

var uncurryThis$g = functionUncurryThis
var aCallable$d = aCallable$g
var bind$9 = uncurryThis$g(uncurryThis$g.bind) // optional / simple context binding

var functionBindContext = function (fn, that) {
  aCallable$d(fn)
  return that === undefined
    ? fn
    : bind$9
    ? bind$9(fn, that)
    : function () {
        return fn.apply(that, arguments)
      }
}

var bind$8 = functionBindContext
var uncurryThis$f = functionUncurryThis
var IndexedObject = indexedObject
var toObject$2 = toObject$6
var lengthOfArrayLike$2 = lengthOfArrayLike$6
var arraySpeciesCreate = arraySpeciesCreate$2
var push$4 = uncurryThis$f([].push) // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation

var createMethod$2 = function (TYPE) {
  var IS_MAP = TYPE == 1
  var IS_FILTER = TYPE == 2
  var IS_SOME = TYPE == 3
  var IS_EVERY = TYPE == 4
  var IS_FIND_INDEX = TYPE == 6
  var IS_FILTER_REJECT = TYPE == 7
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject$2($this)
    var self = IndexedObject(O)
    var boundFunction = bind$8(callbackfn, that)
    var length = lengthOfArrayLike$2(self)
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
                push$4(target, value)
              // filter
            }
          else
            switch (TYPE) {
              case 4:
                return false
              // every

              case 7:
                push$4(target, value)
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
  forEach: createMethod$2(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod$2(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod$2(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod$2(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod$2(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod$2(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$2(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod$2(7),
}

var $$q = _export
var $map = arrayIteration.map
var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$4
var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$2('map') // `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species

$$q(
  {
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT$2,
  },
  {
    map: function map(
      callbackfn,
      /* , thisArg */
    ) {
      return $map(
        this,
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined,
      )
    },
  },
)

var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport
var classof$5 = classof$7 // `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring

var objectToString = TO_STRING_TAG_SUPPORT$1
  ? {}.toString
  : function toString() {
      return '[object ' + classof$5(this) + ']'
    }

var TO_STRING_TAG_SUPPORT = toStringTagSupport
var redefine$6 = redefine$8.exports
var toString$9 = objectToString // `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring

if (!TO_STRING_TAG_SUPPORT) {
  redefine$6(Object.prototype, 'toString', toString$9, {
    unsafe: true,
  })
}

var global$f = global$F
var classof$4 = classof$7
var String$2 = global$f.String

var toString$8 = function (argument) {
  if (classof$4(argument) === 'Symbol')
    throw TypeError('Cannot convert a Symbol value to a string')
  return String$2(argument)
}

var anObject$r = anObject$u // `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags

var regexpFlags$1 = function () {
  var that = anObject$r(this)
  var result = ''
  if (that.global) result += 'g'
  if (that.ignoreCase) result += 'i'
  if (that.multiline) result += 'm'
  if (that.dotAll) result += 's'
  if (that.unicode) result += 'u'
  if (that.sticky) result += 'y'
  return result
}

var uncurryThis$e = functionUncurryThis
var PROPER_FUNCTION_NAME$1 = functionName.PROPER
var redefine$5 = redefine$8.exports
var anObject$q = anObject$u
var isPrototypeOf$2 = objectIsPrototypeOf
var $toString = toString$8
var fails$a = fails$k
var regExpFlags = regexpFlags$1
var TO_STRING = 'toString'
var RegExpPrototype$1 = RegExp.prototype
var n$ToString = RegExpPrototype$1[TO_STRING]
var getFlags = uncurryThis$e(regExpFlags)
var NOT_GENERIC = fails$a(function () {
  return (
    n$ToString.call({
      source: 'a',
      flags: 'b',
    }) != '/a/b'
  )
}) // FF44- RegExp#toString has a wrong name

var INCORRECT_NAME = PROPER_FUNCTION_NAME$1 && n$ToString.name != TO_STRING // `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring

if (NOT_GENERIC || INCORRECT_NAME) {
  redefine$5(
    RegExp.prototype,
    TO_STRING,
    function toString() {
      var R = anObject$q(this)
      var p = $toString(R.source)
      var rf = R.flags
      var f = $toString(
        rf === undefined &&
          isPrototypeOf$2(RegExpPrototype$1, R) &&
          !('flags' in RegExpPrototype$1)
          ? getFlags(R)
          : rf,
      )
      return '/' + p + '/' + f
    },
    {
      unsafe: true,
    },
  )
}

function exportPlugin(process, _ref) {
  var options = _ref.options
  process.defaultOptions = options
  return process
}

var internalObjectKeys = objectKeysInternal
var enumBugKeys$1 = enumBugKeys$3 // `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe

var objectKeys$2 =
  Object.keys ||
  function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1)
  }

var DESCRIPTORS$3 = descriptors
var definePropertyModule$2 = objectDefineProperty
var anObject$p = anObject$u
var toIndexedObject$4 = toIndexedObject$9
var objectKeys$1 = objectKeys$2 // `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe

var objectDefineProperties = DESCRIPTORS$3
  ? Object.defineProperties
  : function defineProperties(O, Properties) {
      anObject$p(O)
      var props = toIndexedObject$4(Properties)
      var keys = objectKeys$1(Properties)
      var length = keys.length
      var index = 0
      var key

      while (length > index)
        definePropertyModule$2.f(O, (key = keys[index++]), props[key])

      return O
    }

var getBuiltIn$8 = getBuiltIn$d
var html$1 = getBuiltIn$8('document', 'documentElement')

/* global ActiveXObject -- old IE, WSH */
var anObject$o = anObject$u
var defineProperties = objectDefineProperties
var enumBugKeys = enumBugKeys$3
var hiddenKeys$1 = hiddenKeys$5
var html = html$1
var documentCreateElement = documentCreateElement$1
var sharedKey$1 = sharedKey$3
var GT = '>'
var LT = '<'
var PROTOTYPE = 'prototype'
var SCRIPT = 'script'
var IE_PROTO$1 = sharedKey$1('IE_PROTO')

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
  iframe.style.display = 'none'
  html.appendChild(iframe) // https://github.com/zloirock/core-js/issues/475

  iframe.src = String(JS)
  iframeDocument = iframe.contentWindow.document
  iframeDocument.open()
  iframeDocument.write(scriptTag('document.F=Object'))
  iframeDocument.close()
  return iframeDocument.F
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
    typeof document != 'undefined'
      ? document.domain && activeXDocument
        ? NullProtoObjectViaActiveX(activeXDocument) // old IE
        : NullProtoObjectViaIFrame()
      : NullProtoObjectViaActiveX(activeXDocument) // WSH

  var length = enumBugKeys.length

  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]]

  return NullProtoObject()
}

hiddenKeys$1[IE_PROTO$1] = true // `Object.create` method
// https://tc39.es/ecma262/#sec-object.create

var objectCreate =
  Object.create ||
  function create(O, Properties) {
    var result

    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject$o(O)
      result = new EmptyConstructor()
      EmptyConstructor[PROTOTYPE] = null // add "__proto__" for Object.getPrototypeOf polyfill

      result[IE_PROTO$1] = O
    } else result = NullProtoObject()

    return Properties === undefined
      ? result
      : defineProperties(result, Properties)
  }

var wellKnownSymbol$d = wellKnownSymbol$k
var create$3 = objectCreate
var definePropertyModule$1 = objectDefineProperty
var UNSCOPABLES = wellKnownSymbol$d('unscopables')
var ArrayPrototype$1 = Array.prototype // Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
  definePropertyModule$1.f(ArrayPrototype$1, UNSCOPABLES, {
    configurable: true,
    value: create$3(null),
  })
} // add a key to Array.prototype[@@unscopables]

var addToUnscopables$2 = function (key) {
  ArrayPrototype$1[UNSCOPABLES][key] = true
}

var $$p = _export
var $includes = arrayIncludes.includes
var addToUnscopables$1 = addToUnscopables$2 // `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes

$$p(
  {
    target: 'Array',
    proto: true,
  },
  {
    includes: function includes(
      el,
      /* , fromIndex = 0 */
    ) {
      return $includes(
        this,
        el,
        arguments.length > 1 ? arguments[1] : undefined,
      )
    },
  },
) // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables$1('includes')

var isObject$4 = isObject$c
var classof$3 = classofRaw$1
var wellKnownSymbol$c = wellKnownSymbol$k
var MATCH$1 = wellKnownSymbol$c('match') // `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp

var isRegexp = function (it) {
  var isRegExp
  return (
    isObject$4(it) &&
    ((isRegExp = it[MATCH$1]) !== undefined
      ? !!isRegExp
      : classof$3(it) == 'RegExp')
  )
}

var global$e = global$F
var isRegExp$1 = isRegexp
var TypeError$8 = global$e.TypeError

var notARegexp = function (it) {
  if (isRegExp$1(it)) {
    throw TypeError$8("The method doesn't accept regular expressions")
  }

  return it
}

var wellKnownSymbol$b = wellKnownSymbol$k
var MATCH = wellKnownSymbol$b('match')

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

var $$o = _export
var uncurryThis$d = functionUncurryThis
var notARegExp$1 = notARegexp
var requireObjectCoercible$4 = requireObjectCoercible$7
var toString$7 = toString$8
var correctIsRegExpLogic$1 = correctIsRegexpLogic
var stringIndexOf$1 = uncurryThis$d(''.indexOf) // `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes

$$o(
  {
    target: 'String',
    proto: true,
    forced: !correctIsRegExpLogic$1('includes'),
  },
  {
    includes: function includes(
      searchString,
      /* , position = 0 */
    ) {
      return !!~stringIndexOf$1(
        toString$7(requireObjectCoercible$4(this)),
        toString$7(notARegExp$1(searchString)),
        arguments.length > 1 ? arguments[1] : undefined,
      )
    },
  },
)

var iterators = {}

var fails$9 = fails$k
var correctPrototypeGetter = !fails$9(function () {
  function F() {
    /* empty */
  }

  F.prototype.constructor = null // eslint-disable-next-line es/no-object-getprototypeof -- required for testing

  return Object.getPrototypeOf(new F()) !== F.prototype
})

var global$d = global$F
var hasOwn$2 = hasOwnProperty_1
var isCallable$8 = isCallable$k
var toObject$1 = toObject$6
var sharedKey = sharedKey$3
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter
var IE_PROTO = sharedKey('IE_PROTO')
var Object$1 = global$d.Object
var ObjectPrototype = Object$1.prototype // `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof

var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER
  ? Object$1.getPrototypeOf
  : function (O) {
      var object = toObject$1(O)
      if (hasOwn$2(object, IE_PROTO)) return object[IE_PROTO]
      var constructor = object.constructor

      if (isCallable$8(constructor) && object instanceof constructor) {
        return constructor.prototype
      }

      return object instanceof Object$1 ? ObjectPrototype : null
    }

var fails$8 = fails$k
var isCallable$7 = isCallable$k
var getPrototypeOf$1 = objectGetPrototypeOf
var redefine$4 = redefine$8.exports
var wellKnownSymbol$a = wellKnownSymbol$k
var ITERATOR$4 = wellKnownSymbol$a('iterator')
var BUGGY_SAFARI_ITERATORS$1 = false // `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object

var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator
/* eslint-disable es/no-array-prototype-keys -- safe */

if ([].keys) {
  arrayIterator = [].keys() // Safari 8 has buggy iterators w/o `next`

  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(
      getPrototypeOf$1(arrayIterator),
    )
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
      IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype
  }
}

var NEW_ITERATOR_PROTOTYPE =
  IteratorPrototype$2 == undefined ||
  fails$8(function () {
    var test = {} // FF44- legacy iterators case

    return IteratorPrototype$2[ITERATOR$4].call(test) !== test
  })
if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {} // `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator

if (!isCallable$7(IteratorPrototype$2[ITERATOR$4])) {
  redefine$4(IteratorPrototype$2, ITERATOR$4, function () {
    return this
  })
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1,
}

var defineProperty$2 = objectDefineProperty.f
var hasOwn$1 = hasOwnProperty_1
var wellKnownSymbol$9 = wellKnownSymbol$k
var TO_STRING_TAG = wellKnownSymbol$9('toStringTag')

var setToStringTag$3 = function (it, TAG, STATIC) {
  if (it && !hasOwn$1((it = STATIC ? it : it.prototype), TO_STRING_TAG)) {
    defineProperty$2(it, TO_STRING_TAG, {
      configurable: true,
      value: TAG,
    })
  }
}

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype
var create$2 = objectCreate
var createPropertyDescriptor = createPropertyDescriptor$4
var setToStringTag$2 = setToStringTag$3
var Iterators$4 = iterators

var returnThis$1 = function () {
  return this
}

var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator'
  IteratorConstructor.prototype = create$2(IteratorPrototype$1, {
    next: createPropertyDescriptor(1, next),
  })
  setToStringTag$2(IteratorConstructor, TO_STRING_TAG, false)
  Iterators$4[TO_STRING_TAG] = returnThis$1
  return IteratorConstructor
}

var global$c = global$F
var isCallable$6 = isCallable$k
var String$1 = global$c.String
var TypeError$7 = global$c.TypeError

var aPossiblePrototype$1 = function (argument) {
  if (typeof argument == 'object' || isCallable$6(argument)) return argument
  throw TypeError$7("Can't set " + String$1(argument) + ' as a prototype')
}

/* eslint-disable no-proto -- safe */
var uncurryThis$c = functionUncurryThis
var anObject$n = anObject$u
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
          setter = uncurryThis$c(
            Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set,
          )
          setter(test, [])
          CORRECT_SETTER = test instanceof Array
        } catch (error) {
          /* empty */
        }

        return function setPrototypeOf(O, proto) {
          anObject$n(O)
          aPossiblePrototype(proto)
          if (CORRECT_SETTER) setter(O, proto)
          else O.__proto__ = proto
          return O
        }
      })()
    : undefined)

var $$n = _export
var call$j = functionCall
var FunctionName = functionName
var isCallable$5 = isCallable$k
var createIteratorConstructor = createIteratorConstructor$1
var getPrototypeOf = objectGetPrototypeOf
var setPrototypeOf$1 = objectSetPrototypeOf
var setToStringTag$1 = setToStringTag$3
var createNonEnumerableProperty$1 = createNonEnumerableProperty$5
var redefine$3 = redefine$8.exports
var wellKnownSymbol$8 = wellKnownSymbol$k
var Iterators$3 = iterators
var IteratorsCore = iteratorsCore
var PROPER_FUNCTION_NAME = FunctionName.PROPER
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE
var IteratorPrototype = IteratorsCore.IteratorPrototype
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS
var ITERATOR$3 = wellKnownSymbol$8('iterator')
var KEYS = 'keys'
var VALUES = 'values'
var ENTRIES = 'entries'

var returnThis = function () {
  return this
}

var defineIterator$3 = function (
  Iterable,
  NAME,
  IteratorConstructor,
  next,
  DEFAULT,
  IS_SET,
  FORCED,
) {
  createIteratorConstructor(IteratorConstructor, NAME, next)

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype)
      return IterablePrototype[KIND]

    switch (KIND) {
      case KEYS:
        return function keys() {
          return new IteratorConstructor(this, KIND)
        }

      case VALUES:
        return function values() {
          return new IteratorConstructor(this, KIND)
        }

      case ENTRIES:
        return function entries() {
          return new IteratorConstructor(this, KIND)
        }
    }

    return function () {
      return new IteratorConstructor(this)
    }
  }

  var TO_STRING_TAG = NAME + ' Iterator'
  var INCORRECT_VALUES_NAME = false
  var IterablePrototype = Iterable.prototype
  var nativeIterator =
    IterablePrototype[ITERATOR$3] ||
    IterablePrototype['@@iterator'] ||
    (DEFAULT && IterablePrototype[DEFAULT])
  var defaultIterator =
    (!BUGGY_SAFARI_ITERATORS && nativeIterator) || getIterationMethod(DEFAULT)
  var anyNativeIterator =
    NAME == 'Array'
      ? IterablePrototype.entries || nativeIterator
      : nativeIterator
  var CurrentIteratorPrototype, methods, KEY // fix native

  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(
      anyNativeIterator.call(new Iterable()),
    )

    if (
      CurrentIteratorPrototype !== Object.prototype &&
      CurrentIteratorPrototype.next
    ) {
      if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf$1) {
          setPrototypeOf$1(CurrentIteratorPrototype, IteratorPrototype)
        } else if (!isCallable$5(CurrentIteratorPrototype[ITERATOR$3])) {
          redefine$3(CurrentIteratorPrototype, ITERATOR$3, returnThis)
        }
      } // Set @@toStringTag to native iterators

      setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true)
    }
  } // fix Array.prototype.{ values, @@iterator }.name in V8 / FF

  if (
    PROPER_FUNCTION_NAME &&
    DEFAULT == VALUES &&
    nativeIterator &&
    nativeIterator.name !== VALUES
  ) {
    if (CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty$1(IterablePrototype, 'name', VALUES)
    } else {
      INCORRECT_VALUES_NAME = true

      defaultIterator = function values() {
        return call$j(nativeIterator, this)
      }
    }
  } // export additional methods

  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES),
    }
    if (FORCED)
      for (KEY in methods) {
        if (
          BUGGY_SAFARI_ITERATORS ||
          INCORRECT_VALUES_NAME ||
          !(KEY in IterablePrototype)
        ) {
          redefine$3(IterablePrototype, KEY, methods[KEY])
        }
      }
    else
      $$n(
        {
          target: NAME,
          proto: true,
          forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME,
        },
        methods,
      )
  } // define iterator

  if (IterablePrototype[ITERATOR$3] !== defaultIterator) {
    redefine$3(IterablePrototype, ITERATOR$3, defaultIterator, {
      name: DEFAULT,
    })
  }

  Iterators$3[NAME] = defaultIterator
  return methods
}

var toIndexedObject$3 = toIndexedObject$9
var addToUnscopables = addToUnscopables$2
var Iterators$2 = iterators
var InternalStateModule$2 = internalState
var defineIterator$2 = defineIterator$3
var ARRAY_ITERATOR = 'Array Iterator'
var setInternalState$2 = InternalStateModule$2.set
var getInternalState$2 = InternalStateModule$2.getterFor(ARRAY_ITERATOR) // `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator

defineIterator$2(
  Array,
  'Array',
  function (iterated, kind) {
    setInternalState$2(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject$3(iterated),
      // target
      index: 0,
      // next index
      kind: kind, // kind
    }) // `%ArrayIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  },
  function () {
    var state = getInternalState$2(this)
    var target = state.target
    var kind = state.kind
    var index = state.index++

    if (!target || index >= target.length) {
      state.target = undefined
      return {
        value: undefined,
        done: true,
      }
    }

    if (kind == 'keys')
      return {
        value: index,
        done: false,
      }
    if (kind == 'values')
      return {
        value: target[index],
        done: false,
      }
    return {
      value: [index, target[index]],
      done: false,
    }
  },
  'values',
) // argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject

Iterators$2.Arguments = Iterators$2.Array // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('keys')
addToUnscopables('values')
addToUnscopables('entries')

var internalMetadata = {exports: {}}

var objectGetOwnPropertyNamesExternal = {}

var uncurryThis$b = functionUncurryThis
var arraySlice$2 = uncurryThis$b([].slice)

/* eslint-disable es/no-object-getownpropertynames -- safe */
var classof$2 = classofRaw$1
var toIndexedObject$2 = toIndexedObject$9
var $getOwnPropertyNames = objectGetOwnPropertyNames.f
var arraySlice$1 = arraySlice$2
var windowNames =
  typeof window == 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window)
    : []

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it)
  } catch (error) {
    return arraySlice$1(windowNames)
  }
} // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
  return windowNames && classof$2(it) == 'Window'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject$2(it))
}

var fails$7 = fails$k
var freezing = !fails$7(function () {
  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}))
})

var $$m = _export
var uncurryThis$a = functionUncurryThis
var hiddenKeys = hiddenKeys$5
var isObject$3 = isObject$c
var hasOwn = hasOwnProperty_1
var defineProperty$1 = objectDefineProperty.f
var getOwnPropertyNamesModule = objectGetOwnPropertyNames
var getOwnPropertyNamesExternalModule = objectGetOwnPropertyNamesExternal
var uid = uid$3
var FREEZING = freezing
var REQUIRED = false
var METADATA = uid('meta')
var id = 0 // eslint-disable-next-line es/no-object-isextensible -- safe

var isExtensible =
  Object.isExtensible ||
  function () {
    return true
  }

var setMetadata = function (it) {
  defineProperty$1(it, METADATA, {
    value: {
      objectID: 'O' + id++,
      // object ID
      weakData: {}, // weak collections IDs
    },
  })
}

var fastKey$1 = function (it, create) {
  // return a primitive with prefix
  if (!isObject$3(it))
    return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it

  if (!hasOwn(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F' // not necessary to add metadata

    if (!create) return 'E' // add missing metadata

    setMetadata(it) // return object ID
  }

  return it[METADATA].objectID
}

var getWeakData = function (it, create) {
  if (!hasOwn(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true // not necessary to add metadata

    if (!create) return false // add missing metadata

    setMetadata(it) // return the store of weak collections IDs
  }

  return it[METADATA].weakData
} // add metadata on freeze-family methods calling

var onFreeze = function (it) {
  if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn(it, METADATA))
    setMetadata(it)
  return it
}

var enable = function () {
  meta.enable = function () {
    /* empty */
  }

  REQUIRED = true
  var getOwnPropertyNames = getOwnPropertyNamesModule.f
  var splice = uncurryThis$a([].splice)
  var test = {}
  test[METADATA] = 1 // prevent exposing of metadata key

  if (getOwnPropertyNames(test).length) {
    getOwnPropertyNamesModule.f = function (it) {
      var result = getOwnPropertyNames(it)

      for (var i = 0, length = result.length; i < length; i++) {
        if (result[i] === METADATA) {
          splice(result, i, 1)
          break
        }
      }

      return result
    }

    $$m(
      {
        target: 'Object',
        stat: true,
        forced: true,
      },
      {
        getOwnPropertyNames: getOwnPropertyNamesExternalModule.f,
      },
    )
  }
}

var meta = (internalMetadata.exports = {
  enable: enable,
  fastKey: fastKey$1,
  getWeakData: getWeakData,
  onFreeze: onFreeze,
})
hiddenKeys[METADATA] = true

var wellKnownSymbol$7 = wellKnownSymbol$k
var Iterators$1 = iterators
var ITERATOR$2 = wellKnownSymbol$7('iterator')
var ArrayPrototype = Array.prototype // check on default Array iterator

var isArrayIteratorMethod$1 = function (it) {
  return (
    it !== undefined &&
    (Iterators$1.Array === it || ArrayPrototype[ITERATOR$2] === it)
  )
}

var classof$1 = classof$7
var getMethod$3 = getMethod$5
var Iterators = iterators
var wellKnownSymbol$6 = wellKnownSymbol$k
var ITERATOR$1 = wellKnownSymbol$6('iterator')

var getIteratorMethod$2 = function (it) {
  if (it != undefined)
    return (
      getMethod$3(it, ITERATOR$1) ||
      getMethod$3(it, '@@iterator') ||
      Iterators[classof$1(it)]
    )
}

var global$b = global$F
var call$i = functionCall
var aCallable$c = aCallable$g
var anObject$m = anObject$u
var tryToString$2 = tryToString$4
var getIteratorMethod$1 = getIteratorMethod$2
var TypeError$6 = global$b.TypeError

var getIterator$2 = function (argument, usingIterator) {
  var iteratorMethod =
    arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator
  if (aCallable$c(iteratorMethod))
    return anObject$m(call$i(iteratorMethod, argument))
  throw TypeError$6(tryToString$2(argument) + ' is not iterable')
}

var call$h = functionCall
var anObject$l = anObject$u
var getMethod$2 = getMethod$5

var iteratorClose$1 = function (iterator, kind, value) {
  var innerResult, innerError
  anObject$l(iterator)

  try {
    innerResult = getMethod$2(iterator, 'return')

    if (!innerResult) {
      if (kind === 'throw') throw value
      return value
    }

    innerResult = call$h(innerResult, iterator)
  } catch (error) {
    innerError = true
    innerResult = error
  }

  if (kind === 'throw') throw value
  if (innerError) throw innerResult
  anObject$l(innerResult)
  return value
}

var global$a = global$F
var bind$7 = functionBindContext
var call$g = functionCall
var anObject$k = anObject$u
var tryToString$1 = tryToString$4
var isArrayIteratorMethod = isArrayIteratorMethod$1
var lengthOfArrayLike$1 = lengthOfArrayLike$6
var isPrototypeOf$1 = objectIsPrototypeOf
var getIterator$1 = getIterator$2
var getIteratorMethod = getIteratorMethod$2
var iteratorClose = iteratorClose$1
var TypeError$5 = global$a.TypeError

var Result = function (stopped, result) {
  this.stopped = stopped
  this.result = result
}

var ResultPrototype = Result.prototype

var iterate$g = function (iterable, unboundFunction, options) {
  var that = options && options.that
  var AS_ENTRIES = !!(options && options.AS_ENTRIES)
  var IS_ITERATOR = !!(options && options.IS_ITERATOR)
  var INTERRUPTED = !!(options && options.INTERRUPTED)
  var fn = bind$7(unboundFunction, that)
  var iterator, iterFn, index, length, result, next, step

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition)
    return new Result(true, condition)
  }

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject$k(value)
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1])
    }

    return INTERRUPTED ? fn(value, stop) : fn(value)
  }

  if (IS_ITERATOR) {
    iterator = iterable
  } else {
    iterFn = getIteratorMethod(iterable)
    if (!iterFn) throw TypeError$5(tryToString$1(iterable) + ' is not iterable') // optimisation for array iterators

    if (isArrayIteratorMethod(iterFn)) {
      for (
        index = 0, length = lengthOfArrayLike$1(iterable);
        length > index;
        index++
      ) {
        result = callFn(iterable[index])
        if (result && isPrototypeOf$1(ResultPrototype, result)) return result
      }

      return new Result(false)
    }

    iterator = getIterator$1(iterable, iterFn)
  }

  next = iterator.next

  while (!(step = call$g(next, iterator)).done) {
    try {
      result = callFn(step.value)
    } catch (error) {
      iteratorClose(iterator, 'throw', error)
    }

    if (
      typeof result == 'object' &&
      result &&
      isPrototypeOf$1(ResultPrototype, result)
    )
      return result
  }

  return new Result(false)
}

var global$9 = global$F
var isPrototypeOf = objectIsPrototypeOf
var TypeError$4 = global$9.TypeError

var anInstance$2 = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it
  throw TypeError$4('Incorrect invocation')
}

var wellKnownSymbol$5 = wellKnownSymbol$k
var ITERATOR = wellKnownSymbol$5('iterator')
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

var isCallable$4 = isCallable$k
var isObject$2 = isObject$c
var setPrototypeOf = objectSetPrototypeOf // makes subclassing work correct for wrapped built-ins

var inheritIfRequired$1 = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable$4((NewTarget = dummy.constructor)) &&
    NewTarget !== Wrapper &&
    isObject$2((NewTargetPrototype = NewTarget.prototype)) &&
    NewTargetPrototype !== Wrapper.prototype
  )
    setPrototypeOf($this, NewTargetPrototype)
  return $this
}

var $$l = _export
var global$8 = global$F
var uncurryThis$9 = functionUncurryThis
var isForced = isForced_1
var redefine$2 = redefine$8.exports
var InternalMetadataModule = internalMetadata.exports
var iterate$f = iterate$g
var anInstance$1 = anInstance$2
var isCallable$3 = isCallable$k
var isObject$1 = isObject$c
var fails$6 = fails$k
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1
var setToStringTag = setToStringTag$3
var inheritIfRequired = inheritIfRequired$1

var collection$1 = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1
  var ADDER = IS_MAP ? 'set' : 'add'
  var NativeConstructor = global$8[CONSTRUCTOR_NAME]
  var NativePrototype = NativeConstructor && NativeConstructor.prototype
  var Constructor = NativeConstructor
  var exported = {}

  var fixMethod = function (KEY) {
    var uncurriedNativeMethod = uncurryThis$9(NativePrototype[KEY])
    redefine$2(
      NativePrototype,
      KEY,
      KEY == 'add'
        ? function add(value) {
            uncurriedNativeMethod(this, value === 0 ? 0 : value)
            return this
          }
        : KEY == 'delete'
        ? function (key) {
            return IS_WEAK && !isObject$1(key)
              ? false
              : uncurriedNativeMethod(this, key === 0 ? 0 : key)
          }
        : KEY == 'get'
        ? function get(key) {
            return IS_WEAK && !isObject$1(key)
              ? undefined
              : uncurriedNativeMethod(this, key === 0 ? 0 : key)
          }
        : KEY == 'has'
        ? function has(key) {
            return IS_WEAK && !isObject$1(key)
              ? false
              : uncurriedNativeMethod(this, key === 0 ? 0 : key)
          }
        : function set(key, value) {
            uncurriedNativeMethod(this, key === 0 ? 0 : key, value)
            return this
          },
    )
  }

  var REPLACE = isForced(
    CONSTRUCTOR_NAME,
    !isCallable$3(NativeConstructor) ||
      !(
        IS_WEAK ||
        (NativePrototype.forEach &&
          !fails$6(function () {
            new NativeConstructor().entries().next()
          }))
      ),
  )

  if (REPLACE) {
    // create collection constructor
    Constructor = common.getConstructor(
      wrapper,
      CONSTRUCTOR_NAME,
      IS_MAP,
      ADDER,
    )
    InternalMetadataModule.enable()
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor() // early implementations not supports chaining

    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false

    var THROWS_ON_PRIMITIVES = fails$6(function () {
      instance.has(1)
    }) // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new -- required for testing

    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) {
      new NativeConstructor(iterable)
    }) // for early implementations -0 and +0 not the same

    var BUGGY_ZERO =
      !IS_WEAK &&
      fails$6(function () {
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new NativeConstructor()
        var index = 5

        while (index--) $instance[ADDER](index, index)

        return !$instance.has(-0)
      })

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance$1(dummy, NativePrototype)
        var that = inheritIfRequired(
          new NativeConstructor(),
          dummy,
          Constructor,
        )
        if (iterable != undefined)
          iterate$f(iterable, that[ADDER], {
            that: that,
            AS_ENTRIES: IS_MAP,
          })
        return that
      })
      Constructor.prototype = NativePrototype
      NativePrototype.constructor = Constructor
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete')
      fixMethod('has')
      IS_MAP && fixMethod('get')
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER) // weak collections should not contains .clear method

    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear
  }

  exported[CONSTRUCTOR_NAME] = Constructor
  $$l(
    {
      global: true,
      forced: Constructor != NativeConstructor,
    },
    exported,
  )
  setToStringTag(Constructor, CONSTRUCTOR_NAME)
  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP)
  return Constructor
}

var redefine$1 = redefine$8.exports

var redefineAll$1 = function (target, src, options) {
  for (var key in src) redefine$1(target, key, src[key], options)

  return target
}

var getBuiltIn$7 = getBuiltIn$d
var definePropertyModule = objectDefineProperty
var wellKnownSymbol$4 = wellKnownSymbol$k
var DESCRIPTORS$2 = descriptors
var SPECIES$3 = wellKnownSymbol$4('species')

var setSpecies$1 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$7(CONSTRUCTOR_NAME)
  var defineProperty = definePropertyModule.f

  if (DESCRIPTORS$2 && Constructor && !Constructor[SPECIES$3]) {
    defineProperty(Constructor, SPECIES$3, {
      configurable: true,
      get: function () {
        return this
      },
    })
  }
}

var defineProperty = objectDefineProperty.f
var create$1 = objectCreate
var redefineAll = redefineAll$1
var bind$6 = functionBindContext
var anInstance = anInstance$2
var iterate$e = iterate$g
var defineIterator$1 = defineIterator$3
var setSpecies = setSpecies$1
var DESCRIPTORS$1 = descriptors
var fastKey = internalMetadata.exports.fastKey
var InternalStateModule$1 = internalState
var setInternalState$1 = InternalStateModule$1.set
var internalStateGetterFor = InternalStateModule$1.getterFor
var collectionStrong$1 = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var Constructor = wrapper(function (that, iterable) {
      anInstance(that, Prototype)
      setInternalState$1(that, {
        type: CONSTRUCTOR_NAME,
        index: create$1(null),
        first: undefined,
        last: undefined,
        size: 0,
      })
      if (!DESCRIPTORS$1) that.size = 0
      if (iterable != undefined)
        iterate$e(iterable, that[ADDER], {
          that: that,
          AS_ENTRIES: IS_MAP,
        })
    })
    var Prototype = Constructor.prototype
    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME)

    var define = function (that, key, value) {
      var state = getInternalState(that)
      var entry = getEntry(that, key)
      var previous, index // change existing entry

      if (entry) {
        entry.value = value // create new entry
      } else {
        state.last = entry = {
          index: (index = fastKey(key, true)),
          key: key,
          value: value,
          previous: (previous = state.last),
          next: undefined,
          removed: false,
        }
        if (!state.first) state.first = entry
        if (previous) previous.next = entry
        if (DESCRIPTORS$1) state.size++
        else that.size++ // add to index

        if (index !== 'F') state.index[index] = entry
      }

      return that
    }

    var getEntry = function (that, key) {
      var state = getInternalState(that) // fast case

      var index = fastKey(key)
      var entry
      if (index !== 'F') return state.index[index] // frozen object case

      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry
      }
    }

    redefineAll(Prototype, {
      // `{ Map, Set }.prototype.clear()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.clear
      // https://tc39.es/ecma262/#sec-set.prototype.clear
      clear: function clear() {
        var that = this
        var state = getInternalState(that)
        var data = state.index
        var entry = state.first

        while (entry) {
          entry.removed = true
          if (entry.previous) entry.previous = entry.previous.next = undefined
          delete data[entry.index]
          entry = entry.next
        }

        state.first = state.last = undefined
        if (DESCRIPTORS$1) state.size = 0
        else that.size = 0
      },
      // `{ Map, Set }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.delete
      // https://tc39.es/ecma262/#sec-set.prototype.delete
      delete: function (key) {
        var that = this
        var state = getInternalState(that)
        var entry = getEntry(that, key)

        if (entry) {
          var next = entry.next
          var prev = entry.previous
          delete state.index[entry.index]
          entry.removed = true
          if (prev) prev.next = next
          if (next) next.previous = prev
          if (state.first == entry) state.first = next
          if (state.last == entry) state.last = prev
          if (DESCRIPTORS$1) state.size--
          else that.size--
        }

        return !!entry
      },
      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.foreach
      // https://tc39.es/ecma262/#sec-set.prototype.foreach
      forEach: function forEach(
        callbackfn,
        /* , that = undefined */
      ) {
        var state = getInternalState(this)
        var boundFunction = bind$6(
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined,
        )
        var entry

        while ((entry = entry ? entry.next : state.first)) {
          boundFunction(entry.value, entry.key, this) // revert to the last existing entry

          while (entry && entry.removed) entry = entry.previous
        }
      },
      // `{ Map, Set}.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.has
      // https://tc39.es/ecma262/#sec-set.prototype.has
      has: function has(key) {
        return !!getEntry(this, key)
      },
    })
    redefineAll(
      Prototype,
      IS_MAP
        ? {
            // `Map.prototype.get(key)` method
            // https://tc39.es/ecma262/#sec-map.prototype.get
            get: function get(key) {
              var entry = getEntry(this, key)
              return entry && entry.value
            },
            // `Map.prototype.set(key, value)` method
            // https://tc39.es/ecma262/#sec-map.prototype.set
            set: function set(key, value) {
              return define(this, key === 0 ? 0 : key, value)
            },
          }
        : {
            // `Set.prototype.add(value)` method
            // https://tc39.es/ecma262/#sec-set.prototype.add
            add: function add(value) {
              return define(this, (value = value === 0 ? 0 : value), value)
            },
          },
    )
    if (DESCRIPTORS$1)
      defineProperty(Prototype, 'size', {
        get: function () {
          return getInternalState(this).size
        },
      })
    return Constructor
  },
  setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator'
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME)
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME) // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
    // https://tc39.es/ecma262/#sec-map.prototype.entries
    // https://tc39.es/ecma262/#sec-map.prototype.keys
    // https://tc39.es/ecma262/#sec-map.prototype.values
    // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
    // https://tc39.es/ecma262/#sec-set.prototype.entries
    // https://tc39.es/ecma262/#sec-set.prototype.keys
    // https://tc39.es/ecma262/#sec-set.prototype.values
    // https://tc39.es/ecma262/#sec-set.prototype-@@iterator

    defineIterator$1(
      Constructor,
      CONSTRUCTOR_NAME,
      function (iterated, kind) {
        setInternalState$1(this, {
          type: ITERATOR_NAME,
          target: iterated,
          state: getInternalCollectionState(iterated),
          kind: kind,
          last: undefined,
        })
      },
      function () {
        var state = getInternalIteratorState(this)
        var kind = state.kind
        var entry = state.last // revert to the last existing entry

        while (entry && entry.removed) entry = entry.previous // get next entry

        if (
          !state.target ||
          !(state.last = entry = entry ? entry.next : state.state.first)
        ) {
          // or finish the iteration
          state.target = undefined
          return {
            value: undefined,
            done: true,
          }
        } // return step by kind

        if (kind == 'keys')
          return {
            value: entry.key,
            done: false,
          }
        if (kind == 'values')
          return {
            value: entry.value,
            done: false,
          }
        return {
          value: [entry.key, entry.value],
          done: false,
        }
      },
      IS_MAP ? 'entries' : 'values',
      !IS_MAP,
      true,
    ) // `{ Map, Set }.prototype[@@species]` accessors
    // https://tc39.es/ecma262/#sec-get-map-@@species
    // https://tc39.es/ecma262/#sec-get-set-@@species

    setSpecies(CONSTRUCTOR_NAME)
  },
}

var collection = collection$1
var collectionStrong = collectionStrong$1 // `Set` constructor
// https://tc39.es/ecma262/#sec-set-objects

collection(
  'Set',
  function (init) {
    return function Set() {
      return init(this, arguments.length ? arguments[0] : undefined)
    }
  },
  collectionStrong,
)

var uncurryThis$8 = functionUncurryThis
var toIntegerOrInfinity$1 = toIntegerOrInfinity$4
var toString$6 = toString$8
var requireObjectCoercible$3 = requireObjectCoercible$7
var charAt$4 = uncurryThis$8(''.charAt)
var charCodeAt = uncurryThis$8(''.charCodeAt)
var stringSlice$5 = uncurryThis$8(''.slice)

var createMethod$1 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$6(requireObjectCoercible$3($this))
    var position = toIntegerOrInfinity$1(pos)
    var size = S.length
    var first, second
    if (position < 0 || position >= size)
      return CONVERT_TO_STRING ? '' : undefined
    first = charCodeAt(S, position)
    return first < 0xd800 ||
      first > 0xdbff ||
      position + 1 === size ||
      (second = charCodeAt(S, position + 1)) < 0xdc00 ||
      second > 0xdfff
      ? CONVERT_TO_STRING
        ? charAt$4(S, position)
        : first
      : CONVERT_TO_STRING
      ? stringSlice$5(S, position, position + 2)
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

var charAt$3 = stringMultibyte.charAt
var toString$5 = toString$8
var InternalStateModule = internalState
var defineIterator = defineIterator$3
var STRING_ITERATOR = 'String Iterator'
var setInternalState = InternalStateModule.set
var getInternalState$1 = InternalStateModule.getterFor(STRING_ITERATOR) // `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator

defineIterator(
  String,
  'String',
  function (iterated) {
    setInternalState(this, {
      type: STRING_ITERATOR,
      string: toString$5(iterated),
      index: 0,
    }) // `%StringIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  },
  function next() {
    var state = getInternalState$1(this)
    var string = state.string
    var index = state.index
    var point
    if (index >= string.length)
      return {
        value: undefined,
        done: true,
      }
    point = charAt$3(string, index)
    state.index += point.length
    return {
      value: point,
      done: false,
    }
  },
)

var call$f = functionCall
var aCallable$b = aCallable$g
var anObject$j = anObject$u // https://github.com/tc39/collection-methods

var collectionAddAll = function addAll() {
  var set = anObject$j(this)
  var adder = aCallable$b(set.add)

  for (var k = 0, len = arguments.length; k < len; k++) {
    call$f(adder, set, arguments[k])
  }

  return set
}

var $$k = _export
var IS_PURE$f = isPure
var addAll = collectionAddAll // `Set.prototype.addAll` method
// https://github.com/tc39/proposal-collection-methods

$$k(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$f,
  },
  {
    addAll: addAll,
  },
)

var call$e = functionCall
var aCallable$a = aCallable$g
var anObject$i = anObject$u // https://github.com/tc39/collection-methods

var collectionDeleteAll = function deleteAll() {
  var collection = anObject$i(this)
  var remover = aCallable$a(collection['delete'])
  var allDeleted = true
  var wasDeleted

  for (var k = 0, len = arguments.length; k < len; k++) {
    wasDeleted = call$e(remover, collection, arguments[k])
    allDeleted = allDeleted && wasDeleted
  }

  return !!allDeleted
}

var $$j = _export
var IS_PURE$e = isPure
var deleteAll = collectionDeleteAll // `Set.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods

$$j(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$e,
  },
  {
    deleteAll: deleteAll,
  },
)

var global$7 = global$F
var isConstructor$1 = isConstructor$3
var tryToString = tryToString$4
var TypeError$3 = global$7.TypeError // `Assert: IsConstructor(argument) is true`

var aConstructor$1 = function (argument) {
  if (isConstructor$1(argument)) return argument
  throw TypeError$3(tryToString(argument) + ' is not a constructor')
}

var anObject$h = anObject$u
var aConstructor = aConstructor$1
var wellKnownSymbol$3 = wellKnownSymbol$k
var SPECIES$2 = wellKnownSymbol$3('species') // `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor

var speciesConstructor$7 = function (O, defaultConstructor) {
  var C = anObject$h(O).constructor
  var S
  return C === undefined || (S = anObject$h(C)[SPECIES$2]) == undefined
    ? defaultConstructor
    : aConstructor(S)
}

var IS_PURE$d = isPure
var $$i = _export
var getBuiltIn$6 = getBuiltIn$d
var call$d = functionCall
var aCallable$9 = aCallable$g
var anObject$g = anObject$u
var speciesConstructor$6 = speciesConstructor$7
var iterate$d = iterate$g // `Set.prototype.difference` method
// https://github.com/tc39/proposal-set-methods

$$i(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$d,
  },
  {
    difference: function difference(iterable) {
      var set = anObject$g(this)
      var newSet = new (speciesConstructor$6(set, getBuiltIn$6('Set')))(set)
      var remover = aCallable$9(newSet['delete'])
      iterate$d(iterable, function (value) {
        call$d(remover, newSet, value)
      })
      return newSet
    },
  },
)

var call$c = functionCall

var getSetIterator$7 = function (it) {
  // eslint-disable-next-line es/no-set -- safe
  return call$c(Set.prototype.values, it)
}

var $$h = _export
var IS_PURE$c = isPure
var anObject$f = anObject$u
var bind$5 = functionBindContext
var getSetIterator$6 = getSetIterator$7
var iterate$c = iterate$g // `Set.prototype.every` method
// https://github.com/tc39/proposal-collection-methods

$$h(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$c,
  },
  {
    every: function every(
      callbackfn,
      /* , thisArg */
    ) {
      var set = anObject$f(this)
      var iterator = getSetIterator$6(set)
      var boundFunction = bind$5(
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined,
      )
      return !iterate$c(
        iterator,
        function (value, stop) {
          if (!boundFunction(value, value, set)) return stop()
        },
        {
          IS_ITERATOR: true,
          INTERRUPTED: true,
        },
      ).stopped
    },
  },
)

var IS_PURE$b = isPure
var $$g = _export
var getBuiltIn$5 = getBuiltIn$d
var call$b = functionCall
var aCallable$8 = aCallable$g
var anObject$e = anObject$u
var bind$4 = functionBindContext
var speciesConstructor$5 = speciesConstructor$7
var getSetIterator$5 = getSetIterator$7
var iterate$b = iterate$g // `Set.prototype.filter` method
// https://github.com/tc39/proposal-collection-methods

$$g(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$b,
  },
  {
    filter: function filter(
      callbackfn,
      /* , thisArg */
    ) {
      var set = anObject$e(this)
      var iterator = getSetIterator$5(set)
      var boundFunction = bind$4(
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined,
      )
      var newSet = new (speciesConstructor$5(set, getBuiltIn$5('Set')))()
      var adder = aCallable$8(newSet.add)
      iterate$b(
        iterator,
        function (value) {
          if (boundFunction(value, value, set)) call$b(adder, newSet, value)
        },
        {
          IS_ITERATOR: true,
        },
      )
      return newSet
    },
  },
)

var $$f = _export
var IS_PURE$a = isPure
var anObject$d = anObject$u
var bind$3 = functionBindContext
var getSetIterator$4 = getSetIterator$7
var iterate$a = iterate$g // `Set.prototype.find` method
// https://github.com/tc39/proposal-collection-methods

$$f(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$a,
  },
  {
    find: function find(
      callbackfn,
      /* , thisArg */
    ) {
      var set = anObject$d(this)
      var iterator = getSetIterator$4(set)
      var boundFunction = bind$3(
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined,
      )
      return iterate$a(
        iterator,
        function (value, stop) {
          if (boundFunction(value, value, set)) return stop(value)
        },
        {
          IS_ITERATOR: true,
          INTERRUPTED: true,
        },
      ).result
    },
  },
)

var IS_PURE$9 = isPure
var $$e = _export
var getBuiltIn$4 = getBuiltIn$d
var call$a = functionCall
var aCallable$7 = aCallable$g
var anObject$c = anObject$u
var speciesConstructor$4 = speciesConstructor$7
var iterate$9 = iterate$g // `Set.prototype.intersection` method
// https://github.com/tc39/proposal-set-methods

$$e(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$9,
  },
  {
    intersection: function intersection(iterable) {
      var set = anObject$c(this)
      var newSet = new (speciesConstructor$4(set, getBuiltIn$4('Set')))()
      var hasCheck = aCallable$7(set.has)
      var adder = aCallable$7(newSet.add)
      iterate$9(iterable, function (value) {
        if (call$a(hasCheck, set, value)) call$a(adder, newSet, value)
      })
      return newSet
    },
  },
)

var IS_PURE$8 = isPure
var $$d = _export
var call$9 = functionCall
var aCallable$6 = aCallable$g
var anObject$b = anObject$u
var iterate$8 = iterate$g // `Set.prototype.isDisjointFrom` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isDisjointFrom

$$d(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$8,
  },
  {
    isDisjointFrom: function isDisjointFrom(iterable) {
      var set = anObject$b(this)
      var hasCheck = aCallable$6(set.has)
      return !iterate$8(
        iterable,
        function (value, stop) {
          if (call$9(hasCheck, set, value) === true) return stop()
        },
        {
          INTERRUPTED: true,
        },
      ).stopped
    },
  },
)

var IS_PURE$7 = isPure
var $$c = _export
var getBuiltIn$3 = getBuiltIn$d
var call$8 = functionCall
var aCallable$5 = aCallable$g
var isCallable$2 = isCallable$k
var anObject$a = anObject$u
var getIterator = getIterator$2
var iterate$7 = iterate$g // `Set.prototype.isSubsetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSubsetOf

$$c(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$7,
  },
  {
    isSubsetOf: function isSubsetOf(iterable) {
      var iterator = getIterator(this)
      var otherSet = anObject$a(iterable)
      var hasCheck = otherSet.has

      if (!isCallable$2(hasCheck)) {
        otherSet = new (getBuiltIn$3('Set'))(iterable)
        hasCheck = aCallable$5(otherSet.has)
      }

      return !iterate$7(
        iterator,
        function (value, stop) {
          if (call$8(hasCheck, otherSet, value) === false) return stop()
        },
        {
          IS_ITERATOR: true,
          INTERRUPTED: true,
        },
      ).stopped
    },
  },
)

var IS_PURE$6 = isPure
var $$b = _export
var call$7 = functionCall
var aCallable$4 = aCallable$g
var anObject$9 = anObject$u
var iterate$6 = iterate$g // `Set.prototype.isSupersetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSupersetOf

$$b(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$6,
  },
  {
    isSupersetOf: function isSupersetOf(iterable) {
      var set = anObject$9(this)
      var hasCheck = aCallable$4(set.has)
      return !iterate$6(
        iterable,
        function (value, stop) {
          if (call$7(hasCheck, set, value) === false) return stop()
        },
        {
          INTERRUPTED: true,
        },
      ).stopped
    },
  },
)

var IS_PURE$5 = isPure
var $$a = _export
var uncurryThis$7 = functionUncurryThis
var anObject$8 = anObject$u
var toString$4 = toString$8
var getSetIterator$3 = getSetIterator$7
var iterate$5 = iterate$g
var arrayJoin = uncurryThis$7([].join)
var push$3 = [].push // `Set.prototype.join` method
// https://github.com/tc39/proposal-collection-methods

$$a(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$5,
  },
  {
    join: function join(separator) {
      var set = anObject$8(this)
      var iterator = getSetIterator$3(set)
      var sep = separator === undefined ? ',' : toString$4(separator)
      var result = []
      iterate$5(iterator, push$3, {
        that: result,
        IS_ITERATOR: true,
      })
      return arrayJoin(result, sep)
    },
  },
)

var IS_PURE$4 = isPure
var $$9 = _export
var getBuiltIn$2 = getBuiltIn$d
var bind$2 = functionBindContext
var call$6 = functionCall
var aCallable$3 = aCallable$g
var anObject$7 = anObject$u
var speciesConstructor$3 = speciesConstructor$7
var getSetIterator$2 = getSetIterator$7
var iterate$4 = iterate$g // `Set.prototype.map` method
// https://github.com/tc39/proposal-collection-methods

$$9(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$4,
  },
  {
    map: function map(
      callbackfn,
      /* , thisArg */
    ) {
      var set = anObject$7(this)
      var iterator = getSetIterator$2(set)
      var boundFunction = bind$2(
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined,
      )
      var newSet = new (speciesConstructor$3(set, getBuiltIn$2('Set')))()
      var adder = aCallable$3(newSet.add)
      iterate$4(
        iterator,
        function (value) {
          call$6(adder, newSet, boundFunction(value, value, set))
        },
        {
          IS_ITERATOR: true,
        },
      )
      return newSet
    },
  },
)

var $$8 = _export
var global$6 = global$F
var IS_PURE$3 = isPure
var aCallable$2 = aCallable$g
var anObject$6 = anObject$u
var getSetIterator$1 = getSetIterator$7
var iterate$3 = iterate$g
var TypeError$2 = global$6.TypeError // `Set.prototype.reduce` method
// https://github.com/tc39/proposal-collection-methods

$$8(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$3,
  },
  {
    reduce: function reduce(
      callbackfn,
      /* , initialValue */
    ) {
      var set = anObject$6(this)
      var iterator = getSetIterator$1(set)
      var noInitial = arguments.length < 2
      var accumulator = noInitial ? undefined : arguments[1]
      aCallable$2(callbackfn)
      iterate$3(
        iterator,
        function (value) {
          if (noInitial) {
            noInitial = false
            accumulator = value
          } else {
            accumulator = callbackfn(accumulator, value, value, set)
          }
        },
        {
          IS_ITERATOR: true,
        },
      )
      if (noInitial)
        throw TypeError$2('Reduce of empty set with no initial value')
      return accumulator
    },
  },
)

var $$7 = _export
var IS_PURE$2 = isPure
var anObject$5 = anObject$u
var bind$1 = functionBindContext
var getSetIterator = getSetIterator$7
var iterate$2 = iterate$g // `Set.prototype.some` method
// https://github.com/tc39/proposal-collection-methods

$$7(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$2,
  },
  {
    some: function some(
      callbackfn,
      /* , thisArg */
    ) {
      var set = anObject$5(this)
      var iterator = getSetIterator(set)
      var boundFunction = bind$1(
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined,
      )
      return iterate$2(
        iterator,
        function (value, stop) {
          if (boundFunction(value, value, set)) return stop()
        },
        {
          IS_ITERATOR: true,
          INTERRUPTED: true,
        },
      ).stopped
    },
  },
)

var IS_PURE$1 = isPure
var $$6 = _export
var getBuiltIn$1 = getBuiltIn$d
var call$5 = functionCall
var aCallable$1 = aCallable$g
var anObject$4 = anObject$u
var speciesConstructor$2 = speciesConstructor$7
var iterate$1 = iterate$g // `Set.prototype.symmetricDifference` method
// https://github.com/tc39/proposal-set-methods

$$6(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$1,
  },
  {
    symmetricDifference: function symmetricDifference(iterable) {
      var set = anObject$4(this)
      var newSet = new (speciesConstructor$2(set, getBuiltIn$1('Set')))(set)
      var remover = aCallable$1(newSet['delete'])
      var adder = aCallable$1(newSet.add)
      iterate$1(iterable, function (value) {
        call$5(remover, newSet, value) || call$5(adder, newSet, value)
      })
      return newSet
    },
  },
)

var $$5 = _export
var IS_PURE = isPure
var getBuiltIn = getBuiltIn$d
var aCallable = aCallable$g
var anObject$3 = anObject$u
var speciesConstructor$1 = speciesConstructor$7
var iterate = iterate$g // `Set.prototype.union` method
// https://github.com/tc39/proposal-set-methods

$$5(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE,
  },
  {
    union: function union(iterable) {
      var set = anObject$3(this)
      var newSet = new (speciesConstructor$1(set, getBuiltIn('Set')))(set)
      iterate(iterable, aCallable(newSet.add), {
        that: newSet,
      })
      return newSet
    },
  },
)

var $$4 = _export
var global$5 = global$F
var isArray = isArray$3
var isConstructor = isConstructor$3
var isObject = isObject$c
var toAbsoluteIndex = toAbsoluteIndex$2
var lengthOfArrayLike = lengthOfArrayLike$6
var toIndexedObject$1 = toIndexedObject$9
var createProperty = createProperty$2
var wellKnownSymbol$2 = wellKnownSymbol$k
var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$4
var un$Slice = arraySlice$2
var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('slice')
var SPECIES$1 = wellKnownSymbol$2('species')
var Array$1 = global$5.Array
var max$1 = Math.max // `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects

$$4(
  {
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT$1,
  },
  {
    slice: function slice(start, end) {
      var O = toIndexedObject$1(this)
      var length = lengthOfArrayLike(O)
      var k = toAbsoluteIndex(start, length)
      var fin = toAbsoluteIndex(end === undefined ? length : end, length) // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

      var Constructor, result, n

      if (isArray(O)) {
        Constructor = O.constructor // cross-realm fallback

        if (
          isConstructor(Constructor) &&
          (Constructor === Array$1 || isArray(Constructor.prototype))
        ) {
          Constructor = undefined
        } else if (isObject(Constructor)) {
          Constructor = Constructor[SPECIES$1]
          if (Constructor === null) Constructor = undefined
        }

        if (Constructor === Array$1 || Constructor === undefined) {
          return un$Slice(O, k, fin)
        }
      }

      result = new (Constructor === undefined ? Array$1 : Constructor)(
        max$1(fin - k, 0),
      )

      for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k])

      result.length = n
      return result
    },
  },
)

var DESCRIPTORS = descriptors
var uncurryThis$6 = functionUncurryThis
var objectKeys = objectKeys$2
var toIndexedObject = toIndexedObject$9
var $propertyIsEnumerable = objectPropertyIsEnumerable.f
var propertyIsEnumerable = uncurryThis$6($propertyIsEnumerable)
var push$2 = uncurryThis$6([].push) // `Object.{ entries, values }` methods implementation

var createMethod = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it)
    var keys = objectKeys(O)
    var length = keys.length
    var i = 0
    var result = []
    var key

    while (length > i) {
      key = keys[i++]

      if (!DESCRIPTORS || propertyIsEnumerable(O, key)) {
        push$2(result, TO_ENTRIES ? [key, O[key]] : O[key])
      }
    }

    return result
  }
}

var objectToArray = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod(false),
}

var $$3 = _export
var $entries = objectToArray.entries // `Object.entries` method
// https://tc39.es/ecma262/#sec-object.entries

$$3(
  {
    target: 'Object',
    stat: true,
  },
  {
    entries: function entries(O) {
      return $entries(O)
    },
  },
)

var $$2 = _export
var uncurryThis$5 = functionUncurryThis
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f
var toLength$2 = toLength$4
var toString$3 = toString$8
var notARegExp = notARegexp
var requireObjectCoercible$2 = requireObjectCoercible$7
var correctIsRegExpLogic = correctIsRegexpLogic

var un$StartsWith = uncurryThis$5(''.startsWith)
var stringSlice$4 = uncurryThis$5(''.slice)
var min$2 = Math.min
var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith') // https://github.com/zloirock/core-js/pull/702

var MDN_POLYFILL_BUG =
  !CORRECT_IS_REGEXP_LOGIC &&
  !!(function () {
    var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith')
    return descriptor && !descriptor.writable
  })() // `String.prototype.startsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.startswith

$$2(
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
      var that = toString$3(requireObjectCoercible$2(this))
      notARegExp(searchString)
      var index = toLength$2(
        min$2(arguments.length > 1 ? arguments[1] : undefined, that.length),
      )
      var search = toString$3(searchString)
      return un$StartsWith
        ? un$StartsWith(that, search, index)
        : stringSlice$4(that, index, index + search.length) === search
    },
  },
)

var regexpStickyHelpers = {}

var fails$5 = fails$k
var global$4 = global$F // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError

var $RegExp$2 = global$4.RegExp
regexpStickyHelpers.UNSUPPORTED_Y = fails$5(function () {
  var re = $RegExp$2('a', 'y')
  re.lastIndex = 2
  return re.exec('abcd') != null
})
regexpStickyHelpers.BROKEN_CARET = fails$5(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp$2('^r', 'gy')
  re.lastIndex = 2
  return re.exec('str') != null
})

var fails$4 = fails$k
var global$3 = global$F // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError

var $RegExp$1 = global$3.RegExp
var regexpUnsupportedDotAll = fails$4(function () {
  var re = $RegExp$1('.', 's')
  return !(re.dotAll && re.exec('\n') && re.flags === 's')
})

var fails$3 = fails$k
var global$2 = global$F // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError

var $RegExp = global$2.RegExp
var regexpUnsupportedNcg = fails$3(function () {
  var re = $RegExp('(?<a>b)', 'g')
  return re.exec('b').groups.a !== 'b' || 'b'.replace(re, '$<a>c') !== 'bc'
})

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */

/* eslint-disable regexp/no-useless-quantifier -- testing */

var call$4 = functionCall
var uncurryThis$4 = functionUncurryThis
var toString$2 = toString$8
var regexpFlags = regexpFlags$1
var stickyHelpers$1 = regexpStickyHelpers
var shared = shared$4.exports
var create = objectCreate
var getInternalState = internalState.get
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll
var UNSUPPORTED_NCG = regexpUnsupportedNcg
var nativeReplace = shared('native-string-replace', String.prototype.replace)
var nativeExec = RegExp.prototype.exec
var patchedExec = nativeExec
var charAt$2 = uncurryThis$4(''.charAt)
var indexOf = uncurryThis$4(''.indexOf)
var replace$1 = uncurryThis$4(''.replace)
var stringSlice$3 = uncurryThis$4(''.slice)

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/
  var re2 = /b*/g
  call$4(nativeExec, re1, 'a')
  call$4(nativeExec, re2, 'a')
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
    var str = toString$2(string)
    var raw = state.raw
    var result, reCopy, lastIndex, match, i, object, group

    if (raw) {
      raw.lastIndex = re.lastIndex
      result = call$4(patchedExec, raw, str)
      re.lastIndex = raw.lastIndex
      return result
    }

    var groups = state.groups
    var sticky = UNSUPPORTED_Y$1 && re.sticky
    var flags = call$4(regexpFlags, re)
    var source = re.source
    var charsAdded = 0
    var strCopy = str

    if (sticky) {
      flags = replace$1(flags, 'y', '')

      if (indexOf(flags, 'g') === -1) {
        flags += 'g'
      }

      strCopy = stringSlice$3(str, re.lastIndex) // Support anchored sticky behavior.

      if (
        re.lastIndex > 0 &&
        (!re.multiline ||
          (re.multiline && charAt$2(str, re.lastIndex - 1) !== '\n'))
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
    match = call$4(nativeExec, sticky ? reCopy : re, strCopy)

    if (sticky) {
      if (match) {
        match.input = stringSlice$3(match.input, charsAdded)
        match[0] = stringSlice$3(match[0], charsAdded)
        match.index = re.lastIndex
        re.lastIndex += match[0].length
      } else re.lastIndex = 0
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex
    }

    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      call$4(nativeReplace, match[0], reCopy, function () {
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

var $$1 = _export
var exec$1 = regexpExec$3 // `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec

$$1(
  {
    target: 'RegExp',
    proto: true,
    forced: /./.exec !== exec$1,
  },
  {
    exec: exec$1,
  },
)

var FunctionPrototype = Function.prototype
var apply$2 = FunctionPrototype.apply
var bind = FunctionPrototype.bind
var call$3 = FunctionPrototype.call // eslint-disable-next-line es/no-reflect -- safe

var functionApply =
  (typeof Reflect == 'object' && Reflect.apply) ||
  (bind
    ? call$3.bind(apply$2)
    : function () {
        return call$3.apply(apply$2, arguments)
      })

var uncurryThis$3 = functionUncurryThis
var redefine = redefine$8.exports
var regexpExec$2 = regexpExec$3
var fails$2 = fails$k
var wellKnownSymbol$1 = wellKnownSymbol$k
var createNonEnumerableProperty = createNonEnumerableProperty$5
var SPECIES = wellKnownSymbol$1('species')
var RegExpPrototype = RegExp.prototype

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$1(KEY)
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

        re.constructor[SPECIES] = function () {
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
    var uncurriedNativeRegExpMethod = uncurryThis$3(/./[SYMBOL])
    var methods = exec(
      SYMBOL,
      ''[KEY],
      function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var uncurriedNativeMethod = uncurryThis$3(nativeMethod)
        var $exec = regexp.exec

        if ($exec === regexpExec$2 || $exec === RegExpPrototype.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return {
              done: true,
              value: uncurriedNativeRegExpMethod(regexp, str, arg2),
            }
          }

          return {
            done: true,
            value: uncurriedNativeMethod(str, regexp, arg2),
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

var charAt$1 = stringMultibyte.charAt // `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex

var advanceStringIndex$2 = function (S, index, unicode) {
  return index + (unicode ? charAt$1(S, index).length : 1)
}

var uncurryThis$2 = functionUncurryThis
var toObject = toObject$6
var floor = Math.floor
var charAt = uncurryThis$2(''.charAt)
var replace = uncurryThis$2(''.replace)
var stringSlice$2 = uncurryThis$2(''.slice)
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

  return replace(replacement, symbols, function (match, ch) {
    var capture

    switch (charAt(ch, 0)) {
      case '$':
        return '$'

      case '&':
        return matched

      case '`':
        return stringSlice$2(str, 0, position)

      case "'":
        return stringSlice$2(str, tailPos)

      case '<':
        capture = namedCaptures[stringSlice$2(ch, 1, -1)]
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
              ? charAt(ch, 1)
              : captures[f - 1] + charAt(ch, 1)
          return match
        }

        capture = captures[n - 1]
    }

    return capture === undefined ? '' : capture
  })
}

var global$1 = global$F
var call$2 = functionCall
var anObject$2 = anObject$u
var isCallable$1 = isCallable$k
var classof = classofRaw$1
var regexpExec$1 = regexpExec$3
var TypeError$1 = global$1.TypeError // `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec

var regexpExecAbstract = function (R, S) {
  var exec = R.exec

  if (isCallable$1(exec)) {
    var result = call$2(exec, R, S)
    if (result !== null) anObject$2(result)
    return result
  }

  if (classof(R) === 'RegExp') return call$2(regexpExec$1, R, S)
  throw TypeError$1('RegExp#exec called on incompatible receiver')
}

var apply$1 = functionApply
var call$1 = functionCall
var uncurryThis$1 = functionUncurryThis
var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic
var fails$1 = fails$k
var anObject$1 = anObject$u
var isCallable = isCallable$k
var toIntegerOrInfinity = toIntegerOrInfinity$4
var toLength$1 = toLength$4
var toString$1 = toString$8
var requireObjectCoercible$1 = requireObjectCoercible$7
var advanceStringIndex$1 = advanceStringIndex$2
var getMethod$1 = getMethod$5
var getSubstitution = getSubstitution$1
var regExpExec = regexpExecAbstract
var wellKnownSymbol = wellKnownSymbol$k
var REPLACE = wellKnownSymbol('replace')
var max = Math.max
var min$1 = Math.min
var concat = uncurryThis$1([].concat)
var push$1 = uncurryThis$1([].push)
var stringIndexOf = uncurryThis$1(''.indexOf)
var stringSlice$1 = uncurryThis$1(''.slice)

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
  } // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive

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
          searchValue == undefined
            ? undefined
            : getMethod$1(searchValue, REPLACE)
        return replacer
          ? call$1(replacer, searchValue, O, replaceValue)
          : call$1(nativeReplace, toString$1(O), searchValue, replaceValue)
      }, // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (string, replaceValue) {
        var rx = anObject$1(this)
        var S = toString$1(string)

        if (
          typeof replaceValue == 'string' &&
          stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
          stringIndexOf(replaceValue, '$<') === -1
        ) {
          var res = maybeCallNative(nativeReplace, rx, S, replaceValue)
          if (res.done) return res.value
        }

        var functionalReplace = isCallable(replaceValue)
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
          push$1(results, result)
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
          var position = max(
            min$1(toIntegerOrInfinity(result.index), S.length),
            0,
          )
          var captures = [] // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

          for (var j = 1; j < result.length; j++)
            push$1(captures, maybeToString(result[j]))

          var namedCaptures = result.groups

          if (functionalReplace) {
            var replacerArgs = concat([matched], captures, position, S)
            if (namedCaptures !== undefined) push$1(replacerArgs, namedCaptures)
            var replacement = toString$1(
              apply$1(replaceValue, undefined, replacerArgs),
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
              stringSlice$1(S, nextSourcePosition, position) + replacement
            nextSourcePosition = position + matched.length
          }
        }

        return accumulatedResult + stringSlice$1(S, nextSourcePosition)
      },
    ]
  },
  !REPLACE_SUPPORTS_NAMED_GROUPS ||
    !REPLACE_KEEPS_$0 ||
    REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,
)

var $ = _export
var $filter = arrayIteration.filter
var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$4
var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter') // `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species

$(
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

var apply = functionApply
var call = functionCall
var uncurryThis = functionUncurryThis
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic
var isRegExp = isRegexp
var anObject = anObject$u
var requireObjectCoercible = requireObjectCoercible$7
var speciesConstructor = speciesConstructor$7
var advanceStringIndex = advanceStringIndex$2
var toLength = toLength$4
var toString = toString$8
var getMethod = getMethod$5
var arraySlice = arraySlice$2
var callRegExpExec = regexpExecAbstract
var regexpExec = regexpExec$3
var stickyHelpers = regexpStickyHelpers
var fails = fails$k
var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y
var MAX_UINT32 = 0xffffffff
var min = Math.min
var $push = [].push
var exec = uncurryThis(/./.exec)
var push = uncurryThis($push)
var stringSlice = uncurryThis(''.slice) // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
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
      '.'.split(/(.?)(.?)/).length != 4 || // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
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
          return call(nativeSplit, string, separator, lim)
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

        while ((match = call(regexpExec, separatorCopy, string))) {
          lastIndex = separatorCopy.lastIndex

          if (lastIndex > lastLastIndex) {
            push(output, stringSlice(string, lastLastIndex, match.index))
            if (match.length > 1 && match.index < string.length)
              apply($push, output, arraySlice(match, 1))
            lastLength = match[0].length
            lastLastIndex = lastIndex
            if (output.length >= lim) break
          }

          if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++ // Avoid an infinite loop
        }

        if (lastLastIndex === string.length) {
          if (lastLength || !exec(separatorCopy, '')) push(output, '')
        } else push(output, stringSlice(string, lastLastIndex))

        return output.length > lim ? arraySlice(output, 0, lim) : output
      } // Chakra, V8
    } else if ('0'.split(undefined, 0).length) {
      internalSplit = function (separator, limit) {
        return separator === undefined && limit === 0
          ? []
          : call(nativeSplit, this, separator, limit)
      }
    } else internalSplit = nativeSplit

    return [
      // `String.prototype.split` method
      // https://tc39.es/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = requireObjectCoercible(this)
        var splitter =
          separator == undefined ? undefined : getMethod(separator, SPLIT)
        return splitter
          ? call(splitter, separator, O, limit)
          : call(internalSplit, toString(O), separator, limit)
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
          var z = callRegExpExec(
            splitter,
            UNSUPPORTED_Y ? stringSlice(S, q) : S,
          )
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
            push(A, stringSlice(S, p, q))
            if (A.length === lim) return A

            for (var i = 1; i <= z.length - 1; i++) {
              push(A, z[i])
              if (A.length === lim) return A
            }

            q = p = e
          }
        }

        push(A, stringSlice(S, p))
        return A
      },
    ]
  },
  !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC,
  UNSUPPORTED_Y,
)

var isPartial = function isPartial(file) {
  return file[0] === '_'
}

var extensions = ['scss', 'css', 'sass'].map(function (extension) {
  return '.'.concat(extension)
})

var hasExtension = function hasExtension(file) {
  return extensions.includes(path__default['default'].extname(file))
}

var unique = function unique(array) {
  return _toConsumableArray(new Set(array))
}

function getDirectories(directories, file) {
  directories = directories.map(function (directory) {
    return path__default['default'].join(directory, file)
  })

  if (path__default['default'].isAbsolute(file)) {
    directories.push(file)
  }

  return directories.map(function (directory) {
    return path__default['default'].dirname(directory)
  })
}

function possibleFileNames(file) {
  var fileName = path__default['default'].basename(file)
  var fileNames = [fileName]

  if (!isPartial(fileName)) {
    fileNames.unshift('_'.concat(fileName))
  }

  return hasExtension(fileName)
    ? fileNames
    : cartesianProduct__default['default']([fileNames, extensions]).map(
        function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            fileName = _ref2[0],
            extension = _ref2[1]

          return fileName + extension
        },
      )
}

function getFiles(directories, file) {
  directories = getDirectories(directories, file)
  var fileNames = possibleFileNames(file)
  var files = cartesianProduct__default['default']([
    directories,
    fileNames,
  ]).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      directory = _ref4[0],
      fileName = _ref4[1]

    return path__default['default'].join(directory, fileName)
  })
  return unique(files)
}

function resolveInDirectories(_ref5) {
  var includePaths = _ref5.includePaths,
    _ref5$cache = _ref5.cache,
    cache = _ref5$cache === void 0 ? {} : _ref5$cache,
    _ref5$alias = _ref5.alias,
    alias = _ref5$alias === void 0 ? {} : _ref5$alias
  return function (file, previous) {
    var cacheKey = ''
      .concat(path__default['default'].normalize(previous), '|')
      .concat(file)

    if (cache[cacheKey]) {
      var _file = cache[cacheKey]
      return _file
    }

    var _file$split = file.split(/[#?]/)

    var _file$split2 = _slicedToArray(_file$split, 1)

    file = _file$split2[0]
    var files = []

    if (file[0] === '~') {
      files = [
        require.resolve(file.slice(1), {
          paths: [process__default['default'].cwd()],
        }),
      ]
    } else {
      for (
        var _i = 0, _Object$entries = Object.entries(alias);
        _i < _Object$entries.length;
        _i++
      ) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          aliasName = _Object$entries$_i[0],
          _path = _Object$entries$_i[1]

        if (file.startsWith(aliasName)) {
          file = file.replace(aliasName, ''.concat(_path, '/'))
        }
      }

      files = getFiles(
        [path__default['default'].dirname(previous)].concat(
          _toConsumableArray(includePaths),
          [process__default['default'].cwd()],
        ),
        file,
      )
    }

    var results = files
      .map(function (file) {
        try {
          return {
            file: file,
            contents: fs__default['default'].readFileSync(file, 'utf8'),
          }
        } catch (_unused) {
          return null
        }
      })
      .filter(Boolean)

    if (results.length > 1) {
      return new Error(
        'importing '
          .concat(file, ' from ')
          .concat(
            previous,
            ". It's not clear which file to import. \n found files:",
          )
          .concat(
            results
              .map(function (_ref6) {
                var file = _ref6.file
                return file
              })
              .join('\n'),
          ),
      )
    }

    if (results.length === 0) {
      return new Error(
        'importing '
          .concat(file, ' from ')
          .concat(
            previous,
            '. File to import not found or unreadable. \n tried files:',
          )
          .concat(
            results
              .map(function (_ref7) {
                var file = _ref7.file
                return file
              })
              .join('\n'),
          ),
      )
    }

    var result = results[0]
    cache[cacheKey] = result
    return result
  }
}

var info = {
  description: 'A fis plugin to parse sass with dart-sass.',
  keywords: ['scss', 'sass', 'dart-sass'],
  dependencies: ['sass', 'fast-cartesian-product'],
  options: {
    outputStyle: 'expanded',
    sourceMapContents: true,
    sourceMap: false,
    omitSourceMapUrl: false,
  },
  links: {
    sass: 'http://sass-lang.com/',
    'dart-sass': 'https://github.com/sass/dart-sass/',
  },
}
var info$1 = info

var _global = global,
  fis = _global.fis
var PROJECT_ROOT = fis.project.getProjectPath()

function normalizeIncludePath(directories) {
  return directories.reduce(function (all, directory) {
    var directories_ = []

    if (
      path__default['default'].isAbsolute(directory) &&
      directory[0] !== '/'
    ) {
      directories_.push(directory)
    } else {
      directories_.push(
        directory,
        path__default['default'].join(PROJECT_ROOT, directory),
        path__default['default'].join(process.cwd(), directory),
      )
    }

    return [].concat(_toConsumableArray(all), directories_)
  }, [])
}

function process(content, file, config) {
  if (file.basename[0] === '_') {
    return content
  }

  var _config$includePaths = config.includePaths,
    includePaths = _config$includePaths === void 0 ? [] : _config$includePaths,
    _config$sourceMap = config.sourceMap,
    sourceMap = _config$sourceMap === void 0 ? false : _config$sourceMap,
    sourceMapContents = config.sourceMapContents,
    _config$alias = config.alias,
    alias = _config$alias === void 0 ? {} : _config$alias
  includePaths = [path__default['default'].dirname(file.realpath)].concat(
    _toConsumableArray(normalizeIncludePath(includePaths)),
    [PROJECT_ROOT],
  )
  var sourceMapFile

  if (sourceMap) {
    sourceMapContents = true
    sourceMapFile = fis.file.wrap(
      ''
        .concat(file.dirname, '/')
        .concat(file.filename)
        .concat(file.rExt, '.map'),
    )
    sourceMap = sourceMapFile.getUrl(
      fis.compile.settings.hash,
      fis.compile.settings.domain,
    )
  }

  var _importer = resolveInDirectories({
    includePaths: includePaths,
    alias: _objectSpread2(
      {
        '@/': PROJECT_ROOT,
      },
      alias,
    ),
  })

  var options = _objectSpread2(
    _objectSpread2({}, config),
    {},
    {
      includePaths: includePaths.map(function (directory) {
        return url.pathToFileURL(directory).href
      }),
      file: file.realpath,
      data: content,
      indentedSyntax: file.ext === '.sass',
      importer: function importer(file, previous) {
        var result = _importer(file, previous)

        if (file.cache) {
          file.cache.addDeps(result.file)
        }

        return result
      },
      sourceMap: sourceMap,
      sourceMapContents: sourceMapContents,
    },
  )

  delete options.outFile
  var result

  try {
    result = sass__default['default'].renderSync(options)
  } catch (error) {
    fis.log.error(
      util.format(
        '%s'.red + ' [`%s` %s:%s]'.yellow,
        error.message,
        error.file,
        error.line,
        error.column,
      ),
    )
  }

  if (sourceMapFile && result.map) {
    var _sourceMap = result.map.toString('utf8')

    sourceMapFile.setContent(_sourceMap)
    file.extras = file.extras || {}
    file.extras.derived = file.extras.derived || []
    file.extras.derived.push(sourceMapFile)
  }

  content = result.css.toString('utf8')
  return content
}

module.exports = exportPlugin(process, info$1)
