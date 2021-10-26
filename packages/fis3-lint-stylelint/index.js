'use strict'

var sync = require('promise-synchronizer')
var postcss = require('postcss')
var stylelint = require('stylelint')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {default: e}
}

var sync__default = /*#__PURE__*/ _interopDefaultLegacy(sync)
var postcss__default = /*#__PURE__*/ _interopDefaultLegacy(postcss)
var stylelint__default = /*#__PURE__*/ _interopDefaultLegacy(stylelint)

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

var global$A = // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  (function () {
    return this
  })() ||
  Function('return this')()

var objectGetOwnPropertyDescriptor = {}

var fails$a = function (exec) {
  try {
    return !!exec()
  } catch (error) {
    return true
  }
}

var fails$9 = fails$a // Detect IE8's incomplete defineProperty implementation

var descriptors = !fails$9(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return (
    Object.defineProperty({}, 1, {
      get: function () {
        return 7
      },
    })[1] != 7
  )
})

var call$9 = Function.prototype.call
var functionCall = call$9.bind
  ? call$9.bind(call$9)
  : function () {
      return call$9.apply(call$9, arguments)
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

var createPropertyDescriptor$3 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value,
  }
}

var FunctionPrototype$2 = Function.prototype
var bind$6 = FunctionPrototype$2.bind
var call$8 = FunctionPrototype$2.call
var callBind = bind$6 && bind$6.bind(call$8)
var functionUncurryThis = bind$6
  ? function (fn) {
      return fn && callBind(call$8, fn)
    }
  : function (fn) {
      return (
        fn &&
        function () {
          return call$8.apply(fn, arguments)
        }
      )
    }

var uncurryThis$d = functionUncurryThis
var toString$2 = uncurryThis$d({}.toString)
var stringSlice = uncurryThis$d(''.slice)

var classofRaw$1 = function (it) {
  return stringSlice(toString$2(it), 8, -1)
}

var global$z = global$A
var uncurryThis$c = functionUncurryThis
var fails$8 = fails$a
var classof$6 = classofRaw$1
var Object$4 = global$z.Object
var split = uncurryThis$c(''.split) // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails$8(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object$4('z').propertyIsEnumerable(0)
})
  ? function (it) {
      return classof$6(it) == 'String' ? split(it, '') : Object$4(it)
    }
  : Object$4

var global$y = global$A
var TypeError$e = global$y.TypeError // `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible

var requireObjectCoercible$2 = function (it) {
  if (it == undefined) throw TypeError$e("Can't call method on " + it)
  return it
}

var IndexedObject$1 = indexedObject
var requireObjectCoercible$1 = requireObjectCoercible$2

var toIndexedObject$4 = function (it) {
  return IndexedObject$1(requireObjectCoercible$1(it))
}

// https://tc39.es/ecma262/#sec-iscallable

var isCallable$e = function (argument) {
  return typeof argument == 'function'
}

var isCallable$d = isCallable$e

var isObject$9 = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$d(it)
}

var global$x = global$A
var isCallable$c = isCallable$e

var aFunction = function (argument) {
  return isCallable$c(argument) ? argument : undefined
}

var getBuiltIn$7 = function (namespace, method) {
  return arguments.length < 2
    ? aFunction(global$x[namespace])
    : global$x[namespace] && global$x[namespace][method]
}

var uncurryThis$b = functionUncurryThis
var objectIsPrototypeOf = uncurryThis$b({}.isPrototypeOf)

var getBuiltIn$6 = getBuiltIn$7
var engineUserAgent = getBuiltIn$6('navigator', 'userAgent') || ''

var global$w = global$A
var userAgent$3 = engineUserAgent
var process$4 = global$w.process
var Deno = global$w.Deno
var versions = (process$4 && process$4.versions) || (Deno && Deno.version)
var v8 = versions && versions.v8
var match, version

if (v8) {
  match = v8.split('.') // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us

  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1])
} // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0

if (!version && userAgent$3) {
  match = userAgent$3.match(/Edge\/(\d+)/)

  if (!match || match[1] >= 74) {
    match = userAgent$3.match(/Chrome\/(\d+)/)
    if (match) version = +match[1]
  }
}

var engineV8Version = version

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION$3 = engineV8Version
var fails$7 = fails$a // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

var nativeSymbol =
  !!Object.getOwnPropertySymbols &&
  !fails$7(function () {
    var symbol = Symbol() // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

    return (
      !String(symbol) ||
      !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      (!Symbol.sham && V8_VERSION$3 && V8_VERSION$3 < 41)
    )
  })

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL$1 = nativeSymbol
var useSymbolAsUid =
  NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == 'symbol'

var global$v = global$A
var getBuiltIn$5 = getBuiltIn$7
var isCallable$b = isCallable$e
var isPrototypeOf$2 = objectIsPrototypeOf
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid
var Object$3 = global$v.Object
var isSymbol$2 = USE_SYMBOL_AS_UID$1
  ? function (it) {
      return typeof it == 'symbol'
    }
  : function (it) {
      var $Symbol = getBuiltIn$5('Symbol')
      return (
        isCallable$b($Symbol) &&
        isPrototypeOf$2($Symbol.prototype, Object$3(it))
      )
    }

var global$u = global$A
var String$4 = global$u.String

var tryToString$4 = function (argument) {
  try {
    return String$4(argument)
  } catch (error) {
    return 'Object'
  }
}

var global$t = global$A
var isCallable$a = isCallable$e
var tryToString$3 = tryToString$4
var TypeError$d = global$t.TypeError // `Assert: IsCallable(argument) is true`

var aCallable$5 = function (argument) {
  if (isCallable$a(argument)) return argument
  throw TypeError$d(tryToString$3(argument) + ' is not a function')
}

var aCallable$4 = aCallable$5 // `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod

var getMethod$3 = function (V, P) {
  var func = V[P]
  return func == null ? undefined : aCallable$4(func)
}

var global$s = global$A
var call$7 = functionCall
var isCallable$9 = isCallable$e
var isObject$8 = isObject$9
var TypeError$c = global$s.TypeError // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val
  if (
    pref === 'string' &&
    isCallable$9((fn = input.toString)) &&
    !isObject$8((val = call$7(fn, input)))
  )
    return val
  if (
    isCallable$9((fn = input.valueOf)) &&
    !isObject$8((val = call$7(fn, input)))
  )
    return val
  if (
    pref !== 'string' &&
    isCallable$9((fn = input.toString)) &&
    !isObject$8((val = call$7(fn, input)))
  )
    return val
  throw TypeError$c("Can't convert object to primitive value")
}

var shared$3 = {exports: {}}

var global$r = global$A // eslint-disable-next-line es/no-object-defineproperty -- safe

var defineProperty$1 = Object.defineProperty

var setGlobal$3 = function (key, value) {
  try {
    defineProperty$1(global$r, key, {
      value: value,
      configurable: true,
      writable: true,
    })
  } catch (error) {
    global$r[key] = value
  }

  return value
}

var global$q = global$A
var setGlobal$2 = setGlobal$3
var SHARED = '__core-js_shared__'
var store$3 = global$q[SHARED] || setGlobal$2(SHARED, {})
var sharedStore = store$3

var store$2 = sharedStore
;(shared$3.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {})
})('versions', []).push({
  version: '3.19.0',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)',
})

var global$p = global$A
var requireObjectCoercible = requireObjectCoercible$2
var Object$2 = global$p.Object // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

var toObject$2 = function (argument) {
  return Object$2(requireObjectCoercible(argument))
}

var uncurryThis$a = functionUncurryThis
var toObject$1 = toObject$2
var hasOwnProperty = uncurryThis$a({}.hasOwnProperty) // `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty

var hasOwnProperty_1 =
  Object.hasOwn ||
  function hasOwn(it, key) {
    return hasOwnProperty(toObject$1(it), key)
  }

var uncurryThis$9 = functionUncurryThis
var id = 0
var postfix = Math.random()
var toString$1 = uncurryThis$9((1.0).toString)

var uid$2 = function (key) {
  return (
    'Symbol(' +
    (key === undefined ? '' : key) +
    ')_' +
    toString$1(++id + postfix, 36)
  )
}

var global$o = global$A
var shared$2 = shared$3.exports
var hasOwn$8 = hasOwnProperty_1
var uid$1 = uid$2
var NATIVE_SYMBOL = nativeSymbol
var USE_SYMBOL_AS_UID = useSymbolAsUid
var WellKnownSymbolsStore = shared$2('wks')
var Symbol$1 = global$o.Symbol
var symbolFor = Symbol$1 && Symbol$1['for']
var createWellKnownSymbol = USE_SYMBOL_AS_UID
  ? Symbol$1
  : (Symbol$1 && Symbol$1.withoutSetter) || uid$1

var wellKnownSymbol$d = function (name) {
  if (
    !hasOwn$8(WellKnownSymbolsStore, name) ||
    !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')
  ) {
    var description = 'Symbol.' + name

    if (NATIVE_SYMBOL && hasOwn$8(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name]
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description)
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description)
    }
  }

  return WellKnownSymbolsStore[name]
}

var global$n = global$A
var call$6 = functionCall
var isObject$7 = isObject$9
var isSymbol$1 = isSymbol$2
var getMethod$2 = getMethod$3
var ordinaryToPrimitive = ordinaryToPrimitive$1
var wellKnownSymbol$c = wellKnownSymbol$d
var TypeError$b = global$n.TypeError
var TO_PRIMITIVE = wellKnownSymbol$c('toPrimitive') // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

var toPrimitive$1 = function (input, pref) {
  if (!isObject$7(input) || isSymbol$1(input)) return input
  var exoticToPrim = getMethod$2(input, TO_PRIMITIVE)
  var result

  if (exoticToPrim) {
    if (pref === undefined) pref = 'default'
    result = call$6(exoticToPrim, input, pref)
    if (!isObject$7(result) || isSymbol$1(result)) return result
    throw TypeError$b("Can't convert object to primitive value")
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

var global$m = global$A
var isObject$6 = isObject$9
var document$2 = global$m.document // typeof document.createElement is 'object' in old IE

var EXISTS$1 = isObject$6(document$2) && isObject$6(document$2.createElement)

var documentCreateElement = function (it) {
  return EXISTS$1 ? document$2.createElement(it) : {}
}

var DESCRIPTORS$5 = descriptors
var fails$6 = fails$a
var createElement$1 = documentCreateElement // Thank's IE8 for his funny defineProperty

var ie8DomDefine =
  !DESCRIPTORS$5 &&
  !fails$6(function () {
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
var call$5 = functionCall
var propertyIsEnumerableModule = objectPropertyIsEnumerable
var createPropertyDescriptor$2 = createPropertyDescriptor$3
var toIndexedObject$3 = toIndexedObject$4
var toPropertyKey$2 = toPropertyKey$3
var hasOwn$7 = hasOwnProperty_1
var IE8_DOM_DEFINE$1 = ie8DomDefine // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

objectGetOwnPropertyDescriptor.f = DESCRIPTORS$4
  ? $getOwnPropertyDescriptor
  : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject$3(O)
      P = toPropertyKey$2(P)
      if (IE8_DOM_DEFINE$1)
        try {
          return $getOwnPropertyDescriptor(O, P)
        } catch (error) {
          /* empty */
        }
      if (hasOwn$7(O, P))
        return createPropertyDescriptor$2(
          !call$5(propertyIsEnumerableModule.f, O, P),
          O[P],
        )
    }

var objectDefineProperty = {}

var global$l = global$A
var isObject$5 = isObject$9
var String$3 = global$l.String
var TypeError$a = global$l.TypeError // `Assert: Type(argument) is Object`

var anObject$8 = function (argument) {
  if (isObject$5(argument)) return argument
  throw TypeError$a(String$3(argument) + ' is not an object')
}

var global$k = global$A
var DESCRIPTORS$3 = descriptors
var IE8_DOM_DEFINE = ie8DomDefine
var anObject$7 = anObject$8
var toPropertyKey$1 = toPropertyKey$3
var TypeError$9 = global$k.TypeError // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

objectDefineProperty.f = DESCRIPTORS$3
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
        throw TypeError$9('Accessors not supported')
      if ('value' in Attributes) O[P] = Attributes.value
      return O
    }

var DESCRIPTORS$2 = descriptors
var definePropertyModule$3 = objectDefineProperty
var createPropertyDescriptor$1 = createPropertyDescriptor$3
var createNonEnumerableProperty$3 = DESCRIPTORS$2
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

var redefine$4 = {exports: {}}

var uncurryThis$8 = functionUncurryThis
var isCallable$8 = isCallable$e
var store$1 = sharedStore
var functionToString = uncurryThis$8(Function.toString) // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (!isCallable$8(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it)
  }
}

var inspectSource$4 = store$1.inspectSource

var global$j = global$A
var isCallable$7 = isCallable$e
var inspectSource$3 = inspectSource$4
var WeakMap$1 = global$j.WeakMap
var nativeWeakMap =
  isCallable$7(WeakMap$1) && /native code/.test(inspectSource$3(WeakMap$1))

var shared$1 = shared$3.exports
var uid = uid$2
var keys = shared$1('keys')

var sharedKey$1 = function (key) {
  return keys[key] || (keys[key] = uid(key))
}

var hiddenKeys$3 = {}

var NATIVE_WEAK_MAP = nativeWeakMap
var global$i = global$A
var uncurryThis$7 = functionUncurryThis
var isObject$4 = isObject$9
var createNonEnumerableProperty$2 = createNonEnumerableProperty$3
var hasOwn$6 = hasOwnProperty_1
var shared = sharedStore
var sharedKey = sharedKey$1
var hiddenKeys$2 = hiddenKeys$3
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized'
var TypeError$8 = global$i.TypeError
var WeakMap = global$i.WeakMap
var set$1, get, has

var enforce = function (it) {
  return has(it) ? get(it) : set$1(it, {})
}

var getterFor = function (TYPE) {
  return function (it) {
    var state

    if (!isObject$4(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$8('Incompatible receiver, ' + TYPE + ' required')
    }

    return state
  }
}

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap())
  var wmget = uncurryThis$7(store.get)
  var wmhas = uncurryThis$7(store.has)
  var wmset = uncurryThis$7(store.set)

  set$1 = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError$8(OBJECT_ALREADY_INITIALIZED)
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

  set$1 = function (it, metadata) {
    if (hasOwn$6(it, STATE)) throw new TypeError$8(OBJECT_ALREADY_INITIALIZED)
    metadata.facade = it
    createNonEnumerableProperty$2(it, STATE, metadata)
    return metadata
  }

  get = function (it) {
    return hasOwn$6(it, STATE) ? it[STATE] : {}
  }

  has = function (it) {
    return hasOwn$6(it, STATE)
  }
}

var internalState = {
  set: set$1,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor,
}

var DESCRIPTORS$1 = descriptors
var hasOwn$5 = hasOwnProperty_1
var FunctionPrototype$1 = Function.prototype // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getDescriptor = DESCRIPTORS$1 && Object.getOwnPropertyDescriptor
var EXISTS = hasOwn$5(FunctionPrototype$1, 'name') // additional protection from minified / mangled / dropped function names

var PROPER =
  EXISTS &&
  function something() {
    /* empty */
  }.name === 'something'

var CONFIGURABLE =
  EXISTS &&
  (!DESCRIPTORS$1 ||
    (DESCRIPTORS$1 && getDescriptor(FunctionPrototype$1, 'name').configurable))
var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE,
}

var global$h = global$A
var isCallable$6 = isCallable$e
var hasOwn$4 = hasOwnProperty_1
var createNonEnumerableProperty$1 = createNonEnumerableProperty$3
var setGlobal$1 = setGlobal$3
var inspectSource$2 = inspectSource$4
var InternalStateModule$1 = internalState
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE
var getInternalState$1 = InternalStateModule$1.get
var enforceInternalState = InternalStateModule$1.enforce
var TEMPLATE = String(String).split('String')
;(redefine$4.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false
  var simple = options ? !!options.enumerable : false
  var noTargetGet = options ? !!options.noTargetGet : false
  var name = options && options.name !== undefined ? options.name : key
  var state

  if (isCallable$6(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']'
    }

    if (
      !hasOwn$4(value, 'name') ||
      (CONFIGURABLE_FUNCTION_NAME && value.name !== name)
    ) {
      createNonEnumerableProperty$1(value, 'name', name)
    }

    state = enforceInternalState(value)

    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '')
    }
  }

  if (O === global$h) {
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
    (isCallable$6(this) && getInternalState$1(this).source) ||
    inspectSource$2(this)
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

var lengthOfArrayLike$3 = function (obj) {
  return toLength(obj.length)
}

var toIndexedObject$2 = toIndexedObject$4
var toAbsoluteIndex = toAbsoluteIndex$1
var lengthOfArrayLike$2 = lengthOfArrayLike$3 // `Array.prototype.{ indexOf, includes }` methods implementation

var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$2($this)
    var length = lengthOfArrayLike$2(O)
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

var uncurryThis$6 = functionUncurryThis
var hasOwn$3 = hasOwnProperty_1
var toIndexedObject$1 = toIndexedObject$4
var indexOf = arrayIncludes.indexOf
var hiddenKeys$1 = hiddenKeys$3
var push = uncurryThis$6([].push)

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$1(object)
  var i = 0
  var result = []
  var key

  for (key in O)
    !hasOwn$3(hiddenKeys$1, key) && hasOwn$3(O, key) && push(result, key) // Don't enum bug & hidden keys

  while (names.length > i)
    if (hasOwn$3(O, (key = names[i++]))) {
      ~indexOf(result, key) || push(result, key)
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

var getBuiltIn$4 = getBuiltIn$7
var uncurryThis$5 = functionUncurryThis
var getOwnPropertyNamesModule = objectGetOwnPropertyNames
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols
var anObject$6 = anObject$8
var concat = uncurryThis$5([].concat) // all object keys, includes non-enumerable and symbols

var ownKeys$1 =
  getBuiltIn$4('Reflect', 'ownKeys') ||
  function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$6(it))
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f
    return getOwnPropertySymbols
      ? concat(keys, getOwnPropertySymbols(it))
      : keys
  }

var hasOwn$2 = hasOwnProperty_1
var ownKeys = ownKeys$1
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor
var definePropertyModule$2 = objectDefineProperty

var copyConstructorProperties$1 = function (target, source) {
  var keys = ownKeys(source)
  var defineProperty = definePropertyModule$2.f
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    if (!hasOwn$2(target, key))
      defineProperty(target, key, getOwnPropertyDescriptor(source, key))
  }
}

var fails$5 = fails$a
var isCallable$5 = isCallable$e
var replacement = /#|\.prototype\./

var isForced$2 = function (feature, detection) {
  var value = data[normalize(feature)]
  return value == POLYFILL
    ? true
    : value == NATIVE
    ? false
    : isCallable$5(detection)
    ? fails$5(detection)
    : !!detection
}

var normalize = (isForced$2.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase()
})

var data = (isForced$2.data = {})
var NATIVE = (isForced$2.NATIVE = 'N')
var POLYFILL = (isForced$2.POLYFILL = 'P')
var isForced_1 = isForced$2

var global$g = global$A
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f
var createNonEnumerableProperty = createNonEnumerableProperty$3
var redefine$3 = redefine$4.exports
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
    target = global$g
  } else if (STATIC) {
    target = global$g[TARGET] || setGlobal(TARGET, {})
  } else {
    target = (global$g[TARGET] || {}).prototype
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
        createNonEnumerableProperty(sourceProperty, 'sham', true)
      } // extend global

      redefine$3(target, key, sourceProperty, options)
    }
}

var fails$4 = fails$a

var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME]
  return (
    !!method &&
    fails$4(function () {
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

var $$2 = _export
var uncurryThis$4 = functionUncurryThis
var IndexedObject = indexedObject
var toIndexedObject = toIndexedObject$4
var arrayMethodIsStrict = arrayMethodIsStrict$1
var un$Join = uncurryThis$4([].join)
var ES3_STRINGS = IndexedObject != Object
var STRICT_METHOD = arrayMethodIsStrict('join', ',') // `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join

$$2(
  {
    target: 'Array',
    proto: true,
    forced: ES3_STRINGS || !STRICT_METHOD,
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

var classof$5 = classofRaw$1 // `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe

var isArray$2 =
  Array.isArray ||
  function isArray(argument) {
    return classof$5(argument) == 'Array'
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

var wellKnownSymbol$b = wellKnownSymbol$d
var TO_STRING_TAG$2 = wellKnownSymbol$b('toStringTag')
var test = {}
test[TO_STRING_TAG$2] = 'z'
var toStringTagSupport = String(test) === '[object z]'

var global$f = global$A
var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport
var isCallable$4 = isCallable$e
var classofRaw = classofRaw$1
var wellKnownSymbol$a = wellKnownSymbol$d
var TO_STRING_TAG$1 = wellKnownSymbol$a('toStringTag')
var Object$1 = global$f.Object // ES3 wrong here

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

var classof$4 = TO_STRING_TAG_SUPPORT$2
  ? classofRaw
  : function (it) {
      var O, tag, result
      return it === undefined
        ? 'Undefined'
        : it === null
        ? 'Null' // @@toStringTag case
        : typeof (tag = tryGet((O = Object$1(it)), TO_STRING_TAG$1)) == 'string'
        ? tag // builtinTag case
        : CORRECT_ARGUMENTS
        ? classofRaw(O) // ES3 arguments fallback
        : (result = classofRaw(O)) == 'Object' && isCallable$4(O.callee)
        ? 'Arguments'
        : result
    }

var uncurryThis$3 = functionUncurryThis
var fails$3 = fails$a
var isCallable$3 = isCallable$e
var classof$3 = classof$4
var getBuiltIn$3 = getBuiltIn$7
var inspectSource$1 = inspectSource$4

var noop = function () {
  /* empty */
}

var empty = []
var construct = getBuiltIn$3('Reflect', 'construct')
var constructorRegExp = /^\s*(?:class|function)\b/
var exec = uncurryThis$3(constructorRegExp.exec)
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop)

var isConstructorModern = function (argument) {
  if (!isCallable$3(argument)) return false

  try {
    construct(noop, empty, argument)
    return true
  } catch (error) {
    return false
  }
}

var isConstructorLegacy = function (argument) {
  if (!isCallable$3(argument)) return false

  switch (classof$3(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction':
      return false
    // we can't check .prototype since constructors produced by .bind haven't it
  }

  return (
    INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource$1(argument))
  )
} // `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor

var isConstructor$2 =
  !construct ||
  fails$3(function () {
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

var global$e = global$A
var isArray$1 = isArray$2
var isConstructor$1 = isConstructor$2
var isObject$3 = isObject$9
var wellKnownSymbol$9 = wellKnownSymbol$d
var SPECIES$4 = wellKnownSymbol$9('species')
var Array$1 = global$e.Array // a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

var arraySpeciesConstructor$1 = function (originalArray) {
  var C

  if (isArray$1(originalArray)) {
    C = originalArray.constructor // cross-realm fallback

    if (isConstructor$1(C) && (C === Array$1 || isArray$1(C.prototype)))
      C = undefined
    else if (isObject$3(C)) {
      C = C[SPECIES$4]
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

var fails$2 = fails$a
var wellKnownSymbol$8 = wellKnownSymbol$d
var V8_VERSION$2 = engineV8Version
var SPECIES$3 = wellKnownSymbol$8('species')

var arrayMethodHasSpeciesSupport$1 = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return (
    V8_VERSION$2 >= 51 ||
    !fails$2(function () {
      var array = []
      var constructor = (array.constructor = {})

      constructor[SPECIES$3] = function () {
        return {
          foo: 1,
        }
      }

      return array[METHOD_NAME](Boolean).foo !== 1
    })
  )
}

var $$1 = _export
var global$d = global$A
var fails$1 = fails$a
var isArray = isArray$2
var isObject$2 = isObject$9
var toObject = toObject$2
var lengthOfArrayLike$1 = lengthOfArrayLike$3
var createProperty = createProperty$1
var arraySpeciesCreate = arraySpeciesCreate$1
var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$1
var wellKnownSymbol$7 = wellKnownSymbol$d
var V8_VERSION$1 = engineV8Version
var IS_CONCAT_SPREADABLE = wellKnownSymbol$7('isConcatSpreadable')
var MAX_SAFE_INTEGER = 0x1fffffffffffff
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'
var TypeError$7 = global$d.TypeError // We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679

var IS_CONCAT_SPREADABLE_SUPPORT =
  V8_VERSION$1 >= 51 ||
  !fails$1(function () {
    var array = []
    array[IS_CONCAT_SPREADABLE] = false
    return array.concat()[0] !== array
  })
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat')

var isConcatSpreadable = function (O) {
  if (!isObject$2(O)) return false
  var spreadable = O[IS_CONCAT_SPREADABLE]
  return spreadable !== undefined ? !!spreadable : isArray(O)
}

var FORCED$1 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT // `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species

$$1(
  {
    target: 'Array',
    proto: true,
    forced: FORCED$1,
  },
  {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject(this)
      var A = arraySpeciesCreate(O, 0)
      var n = 0
      var i, k, length, len, E

      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i]

        if (isConcatSpreadable(E)) {
          len = lengthOfArrayLike$1(E)
          if (n + len > MAX_SAFE_INTEGER)
            throw TypeError$7(MAXIMUM_ALLOWED_INDEX_EXCEEDED)

          for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k])
        } else {
          if (n >= MAX_SAFE_INTEGER)
            throw TypeError$7(MAXIMUM_ALLOWED_INDEX_EXCEEDED)
          createProperty(A, n++, E)
        }
      }

      A.length = n
      return A
    },
  },
)

var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport
var classof$2 = classof$4 // `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring

var objectToString = TO_STRING_TAG_SUPPORT$1
  ? {}.toString
  : function toString() {
      return '[object ' + classof$2(this) + ']'
    }

var TO_STRING_TAG_SUPPORT = toStringTagSupport
var redefine$2 = redefine$4.exports
var toString = objectToString // `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring

if (!TO_STRING_TAG_SUPPORT) {
  redefine$2(Object.prototype, 'toString', toString, {
    unsafe: true,
  })
}

var global$c = global$A
var nativePromiseConstructor = global$c.Promise

var redefine$1 = redefine$4.exports

var redefineAll$1 = function (target, src, options) {
  for (var key in src) redefine$1(target, key, src[key], options)

  return target
}

var global$b = global$A
var isCallable$2 = isCallable$e
var String$2 = global$b.String
var TypeError$6 = global$b.TypeError

var aPossiblePrototype$1 = function (argument) {
  if (typeof argument == 'object' || isCallable$2(argument)) return argument
  throw TypeError$6("Can't set " + String$2(argument) + ' as a prototype')
}

/* eslint-disable no-proto -- safe */
var uncurryThis$2 = functionUncurryThis
var anObject$5 = anObject$8
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
          setter = uncurryThis$2(
            Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set,
          )
          setter(test, [])
          CORRECT_SETTER = test instanceof Array
        } catch (error) {
          /* empty */
        }

        return function setPrototypeOf(O, proto) {
          anObject$5(O)
          aPossiblePrototype(proto)
          if (CORRECT_SETTER) setter(O, proto)
          else O.__proto__ = proto
          return O
        }
      })()
    : undefined)

var defineProperty = objectDefineProperty.f
var hasOwn$1 = hasOwnProperty_1
var wellKnownSymbol$6 = wellKnownSymbol$d
var TO_STRING_TAG = wellKnownSymbol$6('toStringTag')

var setToStringTag$1 = function (it, TAG, STATIC) {
  if (it && !hasOwn$1((it = STATIC ? it : it.prototype), TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, {
      configurable: true,
      value: TAG,
    })
  }
}

var getBuiltIn$2 = getBuiltIn$7
var definePropertyModule = objectDefineProperty
var wellKnownSymbol$5 = wellKnownSymbol$d
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

var global$a = global$A
var isPrototypeOf$1 = objectIsPrototypeOf
var TypeError$5 = global$a.TypeError

var anInstance$1 = function (it, Prototype) {
  if (isPrototypeOf$1(Prototype, it)) return it
  throw TypeError$5('Incorrect invocation')
}

var uncurryThis$1 = functionUncurryThis
var aCallable$3 = aCallable$5
var bind$5 = uncurryThis$1(uncurryThis$1.bind) // optional / simple context binding

var functionBindContext = function (fn, that) {
  aCallable$3(fn)
  return that === undefined
    ? fn
    : bind$5
    ? bind$5(fn, that)
    : function () {
        return fn.apply(that, arguments)
      }
}

var iterators = {}

var wellKnownSymbol$4 = wellKnownSymbol$d
var Iterators$1 = iterators
var ITERATOR$2 = wellKnownSymbol$4('iterator')
var ArrayPrototype = Array.prototype // check on default Array iterator

var isArrayIteratorMethod$1 = function (it) {
  return (
    it !== undefined &&
    (Iterators$1.Array === it || ArrayPrototype[ITERATOR$2] === it)
  )
}

var classof$1 = classof$4
var getMethod$1 = getMethod$3
var Iterators = iterators
var wellKnownSymbol$3 = wellKnownSymbol$d
var ITERATOR$1 = wellKnownSymbol$3('iterator')

var getIteratorMethod$2 = function (it) {
  if (it != undefined)
    return (
      getMethod$1(it, ITERATOR$1) ||
      getMethod$1(it, '@@iterator') ||
      Iterators[classof$1(it)]
    )
}

var global$9 = global$A
var call$4 = functionCall
var aCallable$2 = aCallable$5
var anObject$4 = anObject$8
var tryToString$2 = tryToString$4
var getIteratorMethod$1 = getIteratorMethod$2
var TypeError$4 = global$9.TypeError

var getIterator$1 = function (argument, usingIterator) {
  var iteratorMethod =
    arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator
  if (aCallable$2(iteratorMethod))
    return anObject$4(call$4(iteratorMethod, argument))
  throw TypeError$4(tryToString$2(argument) + ' is not iterable')
}

var call$3 = functionCall
var anObject$3 = anObject$8
var getMethod = getMethod$3

var iteratorClose$1 = function (iterator, kind, value) {
  var innerResult, innerError
  anObject$3(iterator)

  try {
    innerResult = getMethod(iterator, 'return')

    if (!innerResult) {
      if (kind === 'throw') throw value
      return value
    }

    innerResult = call$3(innerResult, iterator)
  } catch (error) {
    innerError = true
    innerResult = error
  }

  if (kind === 'throw') throw value
  if (innerError) throw innerResult
  anObject$3(innerResult)
  return value
}

var global$8 = global$A
var bind$4 = functionBindContext
var call$2 = functionCall
var anObject$2 = anObject$8
var tryToString$1 = tryToString$4
var isArrayIteratorMethod = isArrayIteratorMethod$1
var lengthOfArrayLike = lengthOfArrayLike$3
var isPrototypeOf = objectIsPrototypeOf
var getIterator = getIterator$1
var getIteratorMethod = getIteratorMethod$2
var iteratorClose = iteratorClose$1
var TypeError$3 = global$8.TypeError

var Result = function (stopped, result) {
  this.stopped = stopped
  this.result = result
}

var ResultPrototype = Result.prototype

var iterate$1 = function (iterable, unboundFunction, options) {
  var that = options && options.that
  var AS_ENTRIES = !!(options && options.AS_ENTRIES)
  var IS_ITERATOR = !!(options && options.IS_ITERATOR)
  var INTERRUPTED = !!(options && options.INTERRUPTED)
  var fn = bind$4(unboundFunction, that)
  var iterator, iterFn, index, length, result, next, step

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition)
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
    if (!iterFn) throw TypeError$3(tryToString$1(iterable) + ' is not iterable') // optimisation for array iterators

    if (isArrayIteratorMethod(iterFn)) {
      for (
        index = 0, length = lengthOfArrayLike(iterable);
        length > index;
        index++
      ) {
        result = callFn(iterable[index])
        if (result && isPrototypeOf(ResultPrototype, result)) return result
      }

      return new Result(false)
    }

    iterator = getIterator(iterable, iterFn)
  }

  next = iterator.next

  while (!(step = call$2(next, iterator)).done) {
    try {
      result = callFn(step.value)
    } catch (error) {
      iteratorClose(iterator, 'throw', error)
    }

    if (
      typeof result == 'object' &&
      result &&
      isPrototypeOf(ResultPrototype, result)
    )
      return result
  }

  return new Result(false)
}

var wellKnownSymbol$2 = wellKnownSymbol$d
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

var global$7 = global$A
var isConstructor = isConstructor$2
var tryToString = tryToString$4
var TypeError$2 = global$7.TypeError // `Assert: IsConstructor(argument) is true`

var aConstructor$1 = function (argument) {
  if (isConstructor(argument)) return argument
  throw TypeError$2(tryToString(argument) + ' is not a constructor')
}

var anObject$1 = anObject$8
var aConstructor = aConstructor$1
var wellKnownSymbol$1 = wellKnownSymbol$d
var SPECIES$1 = wellKnownSymbol$1('species') // `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor

var speciesConstructor$1 = function (O, defaultConstructor) {
  var C = anObject$1(O).constructor
  var S
  return C === undefined || (S = anObject$1(C)[SPECIES$1]) == undefined
    ? defaultConstructor
    : aConstructor(S)
}

var FunctionPrototype = Function.prototype
var apply$1 = FunctionPrototype.apply
var bind$3 = FunctionPrototype.bind
var call$1 = FunctionPrototype.call // eslint-disable-next-line es/no-reflect -- safe

var functionApply =
  (typeof Reflect == 'object' && Reflect.apply) ||
  (bind$3
    ? call$1.bind(apply$1)
    : function () {
        return call$1.apply(apply$1, arguments)
      })

var getBuiltIn$1 = getBuiltIn$7
var html$1 = getBuiltIn$1('document', 'documentElement')

var uncurryThis = functionUncurryThis
var arraySlice$1 = uncurryThis([].slice)

var userAgent$2 = engineUserAgent
var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$2)

var classof = classofRaw$1
var global$6 = global$A
var engineIsNode = classof(global$6.process) == 'process'

var global$5 = global$A
var apply = functionApply
var bind$2 = functionBindContext
var isCallable$1 = isCallable$e
var hasOwn = hasOwnProperty_1
var fails = fails$a
var html = html$1
var arraySlice = arraySlice$1
var createElement = documentCreateElement
var IS_IOS$1 = engineIsIos
var IS_NODE$2 = engineIsNode
var set = global$5.setImmediate
var clear = global$5.clearImmediate
var process$3 = global$5.process
var Dispatch = global$5.Dispatch
var Function$1 = global$5.Function
var MessageChannel = global$5.MessageChannel
var String$1 = global$5.String
var counter = 0
var queue = {}
var ONREADYSTATECHANGE = 'onreadystatechange'
var location, defer, channel, port

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location = global$5.location
} catch (error) {
  /* empty */
}

var run = function (id) {
  if (hasOwn(queue, id)) {
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
  global$5.postMessage(String$1(id), location.protocol + '//' + location.host)
} // Node.js 0.9+ & IE10+ has setImmediate, otherwise:

if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = arraySlice(arguments, 1)

    queue[++counter] = function () {
      apply(isCallable$1(fn) ? fn : Function$1(fn), undefined, args)
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
    defer = bind$2(port.postMessage, port) // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global$5.addEventListener &&
    isCallable$1(global$5.postMessage) &&
    !global$5.importScripts &&
    location &&
    location.protocol !== 'file:' &&
    !fails(post)
  ) {
    defer = post
    global$5.addEventListener('message', listener, false) // IE8-
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

var userAgent$1 = engineUserAgent
var global$4 = global$A
var engineIsIosPebble =
  /ipad|iphone|ipod/i.test(userAgent$1) && global$4.Pebble !== undefined

var userAgent = engineUserAgent
var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent)

var global$3 = global$A
var bind$1 = functionBindContext
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f
var macrotask = task$1.set
var IS_IOS = engineIsIos
var IS_IOS_PEBBLE = engineIsIosPebble
var IS_WEBOS_WEBKIT = engineIsWebosWebkit
var IS_NODE$1 = engineIsNode
var MutationObserver =
  global$3.MutationObserver || global$3.WebKitMutationObserver
var document$1 = global$3.document
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
  } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise$1.resolve(undefined) // workaround of WebKit ~ iOS Safari 10.1 bug

    promise.constructor = Promise$1
    then = bind$1(promise.then, promise)

    notify$1 = function () {
      then(flush)
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
    // strange IE + webpack dev server bug - use .bind(global)
    macrotask = bind$1(macrotask, global$3)

    notify$1 = function () {
      macrotask(flush)
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

var aCallable$1 = aCallable$5

var PromiseCapability = function (C) {
  var resolve, reject
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined)
      throw TypeError('Bad Promise constructor')
    resolve = $$resolve
    reject = $$reject
  })
  this.resolve = aCallable$1(resolve)
  this.reject = aCallable$1(reject)
} // `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability

newPromiseCapability$2.f = function (C) {
  return new PromiseCapability(C)
}

var anObject = anObject$8
var isObject$1 = isObject$9
var newPromiseCapability$1 = newPromiseCapability$2

var promiseResolve$1 = function (C, x) {
  anObject(C)
  if (isObject$1(x) && x.constructor === C) return x
  var promiseCapability = newPromiseCapability$1.f(C)
  var resolve = promiseCapability.resolve
  resolve(x)
  return promiseCapability.promise
}

var global$2 = global$A

var hostReportErrors$1 = function (a, b) {
  var console = global$2.console

  if (console && console.error) {
    arguments.length == 1 ? console.error(a) : console.error(a, b)
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
var global$1 = global$A
var getBuiltIn = getBuiltIn$7
var call = functionCall
var NativePromise = nativePromiseConstructor
var redefine = redefine$4.exports
var redefineAll = redefineAll$1
var setPrototypeOf = objectSetPrototypeOf
var setToStringTag = setToStringTag$1
var setSpecies = setSpecies$1
var aCallable = aCallable$5
var isCallable = isCallable$e
var isObject = isObject$9
var anInstance = anInstance$1
var inspectSource = inspectSource$4
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
var wellKnownSymbol = wellKnownSymbol$d
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
var PromisePrototype = NativePromisePrototype
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
var NATIVE_REJECTION_EVENT = isCallable(global$1.PromiseRejectionEvent)
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
  return isObject(it) && isCallable((then = it.then)) ? then : false
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
            call(then, result, resolve, reject)
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
  call(task, global$1, function () {
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
  call(task, global$1, function () {
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
          call(
            then,
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
    anInstance(this, PromisePrototype)
    aCallable(executor)
    call(Internal, this)
    var state = getInternalState(this)

    try {
      executor(bind(internalResolve, state), bind(internalReject, state))
    } catch (error) {
      internalReject(state, error)
    }
  }

  PromisePrototype = PromiseConstructor.prototype // eslint-disable-next-line no-unused-vars -- required for `.length`

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

  Internal.prototype = redefineAll(PromisePrototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this)
      var reactions = state.reactions
      var reaction = newPromiseCapability(
        speciesConstructor(this, PromiseConstructor),
      )
      reaction.ok = isCallable(onFulfilled) ? onFulfilled : true
      reaction.fail = isCallable(onRejected) && onRejected
      reaction.domain = IS_NODE ? process$1.domain : undefined
      state.parent = true
      reactions[reactions.length] = reaction
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
    isCallable(NativePromise) &&
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
            call(nativeThen, that, resolve, reject)
          }).then(onFulfilled, onRejected) // https://github.com/zloirock/core-js/issues/640
        },
        {
          unsafe: true,
        },
      ) // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`

      redefine(NativePromisePrototype, 'catch', PromisePrototype['catch'], {
        unsafe: true,
      })
    } // make `.constructor === Promise` work for native promise-based APIs

    try {
      delete NativePromisePrototype.constructor
    } catch (error) {
      /* empty */
    } // make `instanceof Promise` work for native promise-based APIs

    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromisePrototype)
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
      call(capability.reject, undefined, r)
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
        var $promiseResolve = aCallable(C.resolve)
        var values = []
        var counter = 0
        var remaining = 1
        iterate(iterable, function (promise) {
          var index = counter++
          var alreadyCalled = false
          remaining++
          call($promiseResolve, C, promise).then(function (value) {
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
        var $promiseResolve = aCallable(C.resolve)
        iterate(iterable, function (promise) {
          call($promiseResolve, C, promise).then(capability.resolve, reject)
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
  description: 'a css linter plugin of fis3 based on stylelint.',
  keywords: ['linter'],
  dependencies: ['postcss', 'promise-synchronizer', 'stylelint'],
  links: {
    stylelint: 'http://stylelint.io/',
  },
  options: {
    fix: true,
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

var syntax = {
  '.scss': 'scss',
  '.less': 'less',
  '.sss': 'sugarss',
}
var runStylelint = sync__default['default'](
  _async(function (content, config, file) {
    return _await(
      postcss__default['default']([stylelint__default['default']]).process(
        content,
        config,
      ),
      function (result) {
        var messages = result.messages || []
        var errorMessage = []
        var warnMessage = []

        var _iterator = _createForOfIteratorHelper(messages),
          _step

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var message = _step.value
            var type = message.severity || 'warn'
            ;(type === 'error' ? errorMessage : warnMessage).push(
              [
                ' ',
                ''.concat(type, ':'),
                message.line
                  ? '['.concat(message.line, ':').concat(message.column, ']')
                  : '', // '[' + message.rule + ']',
                message.text,
              ].join(' '),
            )
          }
        } catch (err) {
          _iterator.e(err)
        } finally {
          _iterator.f()
        }

        if (warnMessage.length !== 0 || errorMessage.length !== 0) {
          log.warn(
            '[%s] lint failed: \n%s \n  %s problem (%s errors, %s warning)',
            file.id,
            [].concat(warnMessage, errorMessage).join('\n'),
            warnMessage.length + errorMessage.length,
            errorMessage.length,
            warnMessage.length,
          )

          if (errorMessage.length !== 0) {
            process.exitCode = 1
            throw new Error('stylelint error.')
          }
        }

        return result && result.css ? result.css : ''
      },
    )
  }),
)

function process(content, file, config_) {
  if (!content) {
    return content
  }

  var config = _objectSpread2(
    _objectSpread2({}, config_),
    {},
    {
      formatter: 'string',
      files: file.realpath,
      extractStyleTagsFromHtml: false,
      from: config_.filename,
    },
  )

  delete config.filename
  delete config.code
  delete config.codeFilename

  if (!config.syntax && syntax[file.ext]) {
    config.syntax = syntax[file.ext]
  }

  try {
    return runStylelint(content, config, file)
  } catch (error) {
    throw new Error(
      '['.concat(file.id, '] lint failed with error: \n\n ').concat(error),
    )
  }
}

module.exports = exportPlugin(process, info$1)
