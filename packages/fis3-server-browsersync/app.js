'use strict'

var path$2 = require('path')
var process$1 = require('process')
var browserSync = require('browser-sync')
var yargs = require('yargs')
var merge = require('lodash.merge')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var require$$1$1 = require('fs')
var require$$0$1 = require('url')
var require$$0 = require('util')
var require$$0$2 = require('http')
var require$$1 = require('https')
var require$$3 = require('stream')
var require$$4 = require('assert')
var serveDirectory = require('serve-directory')
var serveDirectoryThemeOcticons = require('serve-directory-theme-octicons')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {default: e}
}

var path__default = /*#__PURE__*/ _interopDefaultLegacy(path$2)
var process__default = /*#__PURE__*/ _interopDefaultLegacy(process$1)
var browserSync__default = /*#__PURE__*/ _interopDefaultLegacy(browserSync)
var yargs__default = /*#__PURE__*/ _interopDefaultLegacy(yargs)
var merge__default = /*#__PURE__*/ _interopDefaultLegacy(merge)
var morgan__default = /*#__PURE__*/ _interopDefaultLegacy(morgan)
var bodyParser__default = /*#__PURE__*/ _interopDefaultLegacy(bodyParser)
var require$$1__default$1 = /*#__PURE__*/ _interopDefaultLegacy(require$$1$1)
var require$$0__default$1 = /*#__PURE__*/ _interopDefaultLegacy(require$$0$1)
var require$$0__default = /*#__PURE__*/ _interopDefaultLegacy(require$$0)
var require$$0__default$2 = /*#__PURE__*/ _interopDefaultLegacy(require$$0$2)
var require$$1__default = /*#__PURE__*/ _interopDefaultLegacy(require$$1)
var require$$3__default = /*#__PURE__*/ _interopDefaultLegacy(require$$3)
var require$$4__default = /*#__PURE__*/ _interopDefaultLegacy(require$$4)
var serveDirectory__default =
  /*#__PURE__*/ _interopDefaultLegacy(serveDirectory)
var serveDirectoryThemeOcticons__default = /*#__PURE__*/ _interopDefaultLegacy(
  serveDirectoryThemeOcticons,
)

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

function commonjsRequire(path) {
  throw new Error(
    'Could not dynamically require "' +
      path +
      '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.',
  )
}

var check = function (it) {
  return it && it.Math == Math && it
} // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028

var global$u = // eslint-disable-next-line es/no-global-this -- safe
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

var call$8 = Function.prototype.call
var functionCall = call$8.bind
  ? call$8.bind(call$8)
  : function () {
      return call$8.apply(call$8, arguments)
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

var createPropertyDescriptor$3 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value,
  }
}

var FunctionPrototype$2 = Function.prototype
var bind$1 = FunctionPrototype$2.bind
var call$7 = FunctionPrototype$2.call
var callBind = bind$1 && bind$1.bind(call$7)
var functionUncurryThis = bind$1
  ? function (fn) {
      return fn && callBind(call$7, fn)
    }
  : function (fn) {
      return (
        fn &&
        function () {
          return call$7.apply(fn, arguments)
        }
      )
    }

var uncurryThis$g = functionUncurryThis
var toString$6 = uncurryThis$g({}.toString)
var stringSlice$4 = uncurryThis$g(''.slice)

var classofRaw$1 = function (it) {
  return stringSlice$4(toString$6(it), 8, -1)
}

var global$t = global$u
var uncurryThis$f = functionUncurryThis
var fails$b = fails$d
var classof$7 = classofRaw$1
var Object$4 = global$t.Object
var split = uncurryThis$f(''.split) // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails$b(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object$4('z').propertyIsEnumerable(0)
})
  ? function (it) {
      return classof$7(it) == 'String' ? split(it, '') : Object$4(it)
    }
  : Object$4

var global$s = global$u
var TypeError$9 = global$s.TypeError // `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible

var requireObjectCoercible$4 = function (it) {
  if (it == undefined) throw TypeError$9("Can't call method on " + it)
  return it
}

var IndexedObject$2 = indexedObject
var requireObjectCoercible$3 = requireObjectCoercible$4

var toIndexedObject$6 = function (it) {
  return IndexedObject$2(requireObjectCoercible$3(it))
}

// https://tc39.es/ecma262/#sec-iscallable

var isCallable$d = function (argument) {
  return typeof argument == 'function'
}

var isCallable$c = isCallable$d

var isObject$6 = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$c(it)
}

var global$r = global$u
var isCallable$b = isCallable$d

var aFunction = function (argument) {
  return isCallable$b(argument) ? argument : undefined
}

var getBuiltIn$5 = function (namespace, method) {
  return arguments.length < 2
    ? aFunction(global$r[namespace])
    : global$r[namespace] && global$r[namespace][method]
}

var uncurryThis$e = functionUncurryThis
var objectIsPrototypeOf = uncurryThis$e({}.isPrototypeOf)

var getBuiltIn$4 = getBuiltIn$5
var engineUserAgent = getBuiltIn$4('navigator', 'userAgent') || ''

var global$q = global$u
var userAgent = engineUserAgent
var process = global$q.process
var Deno = global$q.Deno
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
var V8_VERSION$1 = engineV8Version
var fails$a = fails$d // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

var nativeSymbol =
  !!Object.getOwnPropertySymbols &&
  !fails$a(function () {
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

var global$p = global$u
var getBuiltIn$3 = getBuiltIn$5
var isCallable$a = isCallable$d
var isPrototypeOf = objectIsPrototypeOf
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid
var Object$3 = global$p.Object
var isSymbol$2 = USE_SYMBOL_AS_UID$1
  ? function (it) {
      return typeof it == 'symbol'
    }
  : function (it) {
      var $Symbol = getBuiltIn$3('Symbol')
      return (
        isCallable$a($Symbol) && isPrototypeOf($Symbol.prototype, Object$3(it))
      )
    }

var global$o = global$u
var String$3 = global$o.String

var tryToString$1 = function (argument) {
  try {
    return String$3(argument)
  } catch (error) {
    return 'Object'
  }
}

var global$n = global$u
var isCallable$9 = isCallable$d
var tryToString = tryToString$1
var TypeError$8 = global$n.TypeError // `Assert: IsCallable(argument) is true`

var aCallable$2 = function (argument) {
  if (isCallable$9(argument)) return argument
  throw TypeError$8(tryToString(argument) + ' is not a function')
}

var aCallable$1 = aCallable$2 // `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod

var getMethod$2 = function (V, P) {
  var func = V[P]
  return func == null ? undefined : aCallable$1(func)
}

var global$m = global$u
var call$6 = functionCall
var isCallable$8 = isCallable$d
var isObject$5 = isObject$6
var TypeError$7 = global$m.TypeError // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val
  if (
    pref === 'string' &&
    isCallable$8((fn = input.toString)) &&
    !isObject$5((val = call$6(fn, input)))
  )
    return val
  if (
    isCallable$8((fn = input.valueOf)) &&
    !isObject$5((val = call$6(fn, input)))
  )
    return val
  if (
    pref !== 'string' &&
    isCallable$8((fn = input.toString)) &&
    !isObject$5((val = call$6(fn, input)))
  )
    return val
  throw TypeError$7("Can't convert object to primitive value")
}

var shared$4 = {exports: {}}

var global$l = global$u // eslint-disable-next-line es/no-object-defineproperty -- safe

var defineProperty = Object.defineProperty

var setGlobal$3 = function (key, value) {
  try {
    defineProperty(global$l, key, {
      value: value,
      configurable: true,
      writable: true,
    })
  } catch (error) {
    global$l[key] = value
  }

  return value
}

var global$k = global$u
var setGlobal$2 = setGlobal$3
var SHARED = '__core-js_shared__'
var store$3 = global$k[SHARED] || setGlobal$2(SHARED, {})
var sharedStore = store$3

var store$2 = sharedStore
;(shared$4.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {})
})('versions', []).push({
  version: '3.19.0',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)',
})

var global$j = global$u
var requireObjectCoercible$2 = requireObjectCoercible$4
var Object$2 = global$j.Object // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

var toObject$3 = function (argument) {
  return Object$2(requireObjectCoercible$2(argument))
}

var uncurryThis$d = functionUncurryThis
var toObject$2 = toObject$3
var hasOwnProperty = uncurryThis$d({}.hasOwnProperty) // `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty

var hasOwnProperty_1 =
  Object.hasOwn ||
  function hasOwn(it, key) {
    return hasOwnProperty(toObject$2(it), key)
  }

var uncurryThis$c = functionUncurryThis
var id = 0
var postfix = Math.random()
var toString$5 = uncurryThis$c((1.0).toString)

var uid$2 = function (key) {
  return (
    'Symbol(' +
    (key === undefined ? '' : key) +
    ')_' +
    toString$5(++id + postfix, 36)
  )
}

var global$i = global$u
var shared$3 = shared$4.exports
var hasOwn$6 = hasOwnProperty_1
var uid$1 = uid$2
var NATIVE_SYMBOL = nativeSymbol
var USE_SYMBOL_AS_UID = useSymbolAsUid
var WellKnownSymbolsStore = shared$3('wks')
var Symbol$1 = global$i.Symbol
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

var global$h = global$u
var call$5 = functionCall
var isObject$4 = isObject$6
var isSymbol$1 = isSymbol$2
var getMethod$1 = getMethod$2
var ordinaryToPrimitive = ordinaryToPrimitive$1
var wellKnownSymbol$6 = wellKnownSymbol$7
var TypeError$6 = global$h.TypeError
var TO_PRIMITIVE = wellKnownSymbol$6('toPrimitive') // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

var toPrimitive$1 = function (input, pref) {
  if (!isObject$4(input) || isSymbol$1(input)) return input
  var exoticToPrim = getMethod$1(input, TO_PRIMITIVE)
  var result

  if (exoticToPrim) {
    if (pref === undefined) pref = 'default'
    result = call$5(exoticToPrim, input, pref)
    if (!isObject$4(result) || isSymbol$1(result)) return result
    throw TypeError$6("Can't convert object to primitive value")
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

var global$g = global$u
var isObject$3 = isObject$6
var document$1 = global$g.document // typeof document.createElement is 'object' in old IE

var EXISTS$1 = isObject$3(document$1) && isObject$3(document$1.createElement)

var documentCreateElement$1 = function (it) {
  return EXISTS$1 ? document$1.createElement(it) : {}
}

var DESCRIPTORS$5 = descriptors
var fails$9 = fails$d
var createElement = documentCreateElement$1 // Thank's IE8 for his funny defineProperty

var ie8DomDefine =
  !DESCRIPTORS$5 &&
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

var DESCRIPTORS$4 = descriptors
var call$4 = functionCall
var propertyIsEnumerableModule = objectPropertyIsEnumerable
var createPropertyDescriptor$2 = createPropertyDescriptor$3
var toIndexedObject$5 = toIndexedObject$6
var toPropertyKey$2 = toPropertyKey$3
var hasOwn$5 = hasOwnProperty_1
var IE8_DOM_DEFINE$1 = ie8DomDefine // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

objectGetOwnPropertyDescriptor.f = DESCRIPTORS$4
  ? $getOwnPropertyDescriptor
  : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject$5(O)
      P = toPropertyKey$2(P)
      if (IE8_DOM_DEFINE$1)
        try {
          return $getOwnPropertyDescriptor(O, P)
        } catch (error) {
          /* empty */
        }
      if (hasOwn$5(O, P))
        return createPropertyDescriptor$2(
          !call$4(propertyIsEnumerableModule.f, O, P),
          O[P],
        )
    }

var objectDefineProperty = {}

var global$f = global$u
var isObject$2 = isObject$6
var String$2 = global$f.String
var TypeError$5 = global$f.TypeError // `Assert: Type(argument) is Object`

var anObject$7 = function (argument) {
  if (isObject$2(argument)) return argument
  throw TypeError$5(String$2(argument) + ' is not an object')
}

var global$e = global$u
var DESCRIPTORS$3 = descriptors
var IE8_DOM_DEFINE = ie8DomDefine
var anObject$6 = anObject$7
var toPropertyKey$1 = toPropertyKey$3
var TypeError$4 = global$e.TypeError // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

objectDefineProperty.f = DESCRIPTORS$3
  ? $defineProperty
  : function defineProperty(O, P, Attributes) {
      anObject$6(O)
      P = toPropertyKey$1(P)
      anObject$6(Attributes)
      if (IE8_DOM_DEFINE)
        try {
          return $defineProperty(O, P, Attributes)
        } catch (error) {
          /* empty */
        }
      if ('get' in Attributes || 'set' in Attributes)
        throw TypeError$4('Accessors not supported')
      if ('value' in Attributes) O[P] = Attributes.value
      return O
    }

var DESCRIPTORS$2 = descriptors
var definePropertyModule$3 = objectDefineProperty
var createPropertyDescriptor$1 = createPropertyDescriptor$3
var createNonEnumerableProperty$4 = DESCRIPTORS$2
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

var redefine$3 = {exports: {}}

var uncurryThis$b = functionUncurryThis
var isCallable$7 = isCallable$d
var store$1 = sharedStore
var functionToString = uncurryThis$b(Function.toString) // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (!isCallable$7(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it)
  }
}

var inspectSource$3 = store$1.inspectSource

var global$d = global$u
var isCallable$6 = isCallable$d
var inspectSource$2 = inspectSource$3
var WeakMap$1 = global$d.WeakMap
var nativeWeakMap =
  isCallable$6(WeakMap$1) && /native code/.test(inspectSource$2(WeakMap$1))

var shared$2 = shared$4.exports
var uid = uid$2
var keys = shared$2('keys')

var sharedKey$2 = function (key) {
  return keys[key] || (keys[key] = uid(key))
}

var hiddenKeys$4 = {}

var NATIVE_WEAK_MAP = nativeWeakMap
var global$c = global$u
var uncurryThis$a = functionUncurryThis
var isObject$1 = isObject$6
var createNonEnumerableProperty$3 = createNonEnumerableProperty$4
var hasOwn$4 = hasOwnProperty_1
var shared$1 = sharedStore
var sharedKey$1 = sharedKey$2
var hiddenKeys$3 = hiddenKeys$4
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized'
var TypeError$3 = global$c.TypeError
var WeakMap = global$c.WeakMap
var set, get, has

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {})
}

var getterFor = function (TYPE) {
  return function (it) {
    var state

    if (!isObject$1(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$3('Incompatible receiver, ' + TYPE + ' required')
    }

    return state
  }
}

if (NATIVE_WEAK_MAP || shared$1.state) {
  var store = shared$1.state || (shared$1.state = new WeakMap())
  var wmget = uncurryThis$a(store.get)
  var wmhas = uncurryThis$a(store.has)
  var wmset = uncurryThis$a(store.set)

  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError$3(OBJECT_ALREADY_INITIALIZED)
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
  var STATE = sharedKey$1('state')
  hiddenKeys$3[STATE] = true

  set = function (it, metadata) {
    if (hasOwn$4(it, STATE)) throw new TypeError$3(OBJECT_ALREADY_INITIALIZED)
    metadata.facade = it
    createNonEnumerableProperty$3(it, STATE, metadata)
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

var DESCRIPTORS$1 = descriptors
var hasOwn$3 = hasOwnProperty_1
var FunctionPrototype$1 = Function.prototype // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getDescriptor = DESCRIPTORS$1 && Object.getOwnPropertyDescriptor
var EXISTS = hasOwn$3(FunctionPrototype$1, 'name') // additional protection from minified / mangled / dropped function names

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

var global$b = global$u
var isCallable$5 = isCallable$d
var hasOwn$2 = hasOwnProperty_1
var createNonEnumerableProperty$2 = createNonEnumerableProperty$4
var setGlobal$1 = setGlobal$3
var inspectSource$1 = inspectSource$3
var InternalStateModule = internalState
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE
var getInternalState$1 = InternalStateModule.get
var enforceInternalState = InternalStateModule.enforce
var TEMPLATE = String(String).split('String')
;(redefine$3.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false
  var simple = options ? !!options.enumerable : false
  var noTargetGet = options ? !!options.noTargetGet : false
  var name = options && options.name !== undefined ? options.name : key
  var state

  if (isCallable$5(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']'
    }

    if (
      !hasOwn$2(value, 'name') ||
      (CONFIGURABLE_FUNCTION_NAME && value.name !== name)
    ) {
      createNonEnumerableProperty$2(value, 'name', name)
    }

    state = enforceInternalState(value)

    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '')
    }
  }

  if (O === global$b) {
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
    (isCallable$5(this) && getInternalState$1(this).source) ||
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
var min$2 = Math.min // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex$2 = function (index, length) {
  var integer = toIntegerOrInfinity$3(index)
  return integer < 0 ? max$2(integer + length, 0) : min$2(integer, length)
}

var toIntegerOrInfinity$2 = toIntegerOrInfinity$4
var min$1 = Math.min // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

var toLength$2 = function (argument) {
  return argument > 0
    ? min$1(toIntegerOrInfinity$2(argument), 0x1fffffffffffff)
    : 0 // 2 ** 53 - 1 == 9007199254740991
}

var toLength$1 = toLength$2 // `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike

var lengthOfArrayLike$3 = function (obj) {
  return toLength$1(obj.length)
}

var toIndexedObject$4 = toIndexedObject$6
var toAbsoluteIndex$1 = toAbsoluteIndex$2
var lengthOfArrayLike$2 = lengthOfArrayLike$3 // `Array.prototype.{ indexOf, includes }` methods implementation

var createMethod$2 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$4($this)
    var length = lengthOfArrayLike$2(O)
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
  includes: createMethod$2(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$2(false),
}

var uncurryThis$9 = functionUncurryThis
var hasOwn$1 = hasOwnProperty_1
var toIndexedObject$3 = toIndexedObject$6
var indexOf$1 = arrayIncludes.indexOf
var hiddenKeys$2 = hiddenKeys$4
var push$1 = uncurryThis$9([].push)

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$3(object)
  var i = 0
  var result = []
  var key

  for (key in O)
    !hasOwn$1(hiddenKeys$2, key) && hasOwn$1(O, key) && push$1(result, key) // Don't enum bug & hidden keys

  while (names.length > i)
    if (hasOwn$1(O, (key = names[i++]))) {
      ~indexOf$1(result, key) || push$1(result, key)
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

var getBuiltIn$2 = getBuiltIn$5
var uncurryThis$8 = functionUncurryThis
var getOwnPropertyNamesModule = objectGetOwnPropertyNames
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols
var anObject$5 = anObject$7
var concat$1 = uncurryThis$8([].concat) // all object keys, includes non-enumerable and symbols

var ownKeys$1 =
  getBuiltIn$2('Reflect', 'ownKeys') ||
  function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$5(it))
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f
    return getOwnPropertySymbols
      ? concat$1(keys, getOwnPropertySymbols(it))
      : keys
  }

var hasOwn = hasOwnProperty_1
var ownKeys = ownKeys$1
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor
var definePropertyModule$2 = objectDefineProperty

var copyConstructorProperties$1 = function (target, source) {
  var keys = ownKeys(source)
  var defineProperty = definePropertyModule$2.f
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    if (!hasOwn(target, key))
      defineProperty(target, key, getOwnPropertyDescriptor(source, key))
  }
}

var fails$8 = fails$d
var isCallable$4 = isCallable$d
var replacement = /#|\.prototype\./

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)]
  return value == POLYFILL
    ? true
    : value == NATIVE
    ? false
    : isCallable$4(detection)
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

var global$a = global$u
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f
var createNonEnumerableProperty$1 = createNonEnumerableProperty$4
var redefine$2 = redefine$3.exports
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
    target = global$a
  } else if (STATIC) {
    target = global$a[TARGET] || setGlobal(TARGET, {})
  } else {
    target = (global$a[TARGET] || {}).prototype
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
        createNonEnumerableProperty$1(sourceProperty, 'sham', true)
      } // extend global

      redefine$2(target, key, sourceProperty, options)
    }
}

var wellKnownSymbol$5 = wellKnownSymbol$7
var TO_STRING_TAG$1 = wellKnownSymbol$5('toStringTag')
var test = {}
test[TO_STRING_TAG$1] = 'z'
var toStringTagSupport = String(test) === '[object z]'

var global$9 = global$u
var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport
var isCallable$3 = isCallable$d
var classofRaw = classofRaw$1
var wellKnownSymbol$4 = wellKnownSymbol$7
var TO_STRING_TAG = wellKnownSymbol$4('toStringTag')
var Object$1 = global$9.Object // ES3 wrong here

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

var classof$6 = TO_STRING_TAG_SUPPORT$2
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
        : (result = classofRaw(O)) == 'Object' && isCallable$3(O.callee)
        ? 'Arguments'
        : result
    }

var global$8 = global$u
var classof$5 = classof$6
var String$1 = global$8.String

var toString$4 = function (argument) {
  if (classof$5(argument) === 'Symbol')
    throw TypeError('Cannot convert a Symbol value to a string')
  return String$1(argument)
}

var anObject$4 = anObject$7 // `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags

var regexpFlags$1 = function () {
  var that = anObject$4(this)
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

var fails$7 = fails$d
var global$7 = global$u // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError

var $RegExp$2 = global$7.RegExp
regexpStickyHelpers.UNSUPPORTED_Y = fails$7(function () {
  var re = $RegExp$2('a', 'y')
  re.lastIndex = 2
  return re.exec('abcd') != null
})
regexpStickyHelpers.BROKEN_CARET = fails$7(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp$2('^r', 'gy')
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
var definePropertyModule$1 = objectDefineProperty
var anObject$3 = anObject$7
var toIndexedObject$2 = toIndexedObject$6
var objectKeys = objectKeys$1 // `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe

var objectDefineProperties = DESCRIPTORS
  ? Object.defineProperties
  : function defineProperties(O, Properties) {
      anObject$3(O)
      var props = toIndexedObject$2(Properties)
      var keys = objectKeys(Properties)
      var length = keys.length
      var index = 0
      var key

      while (length > index)
        definePropertyModule$1.f(O, (key = keys[index++]), props[key])

      return O
    }

var getBuiltIn$1 = getBuiltIn$5
var html$1 = getBuiltIn$1('document', 'documentElement')

/* global ActiveXObject -- old IE, WSH */
var anObject$2 = anObject$7
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

hiddenKeys[IE_PROTO] = true // `Object.create` method
// https://tc39.es/ecma262/#sec-object.create

var objectCreate =
  Object.create ||
  function create(O, Properties) {
    var result

    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject$2(O)
      result = new EmptyConstructor()
      EmptyConstructor[PROTOTYPE] = null // add "__proto__" for Object.getPrototypeOf polyfill

      result[IE_PROTO] = O
    } else result = NullProtoObject()

    return Properties === undefined
      ? result
      : defineProperties(result, Properties)
  }

var fails$6 = fails$d
var global$6 = global$u // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError

var $RegExp$1 = global$6.RegExp
var regexpUnsupportedDotAll = fails$6(function () {
  var re = $RegExp$1('.', 's')
  return !(re.dotAll && re.exec('\n') && re.flags === 's')
})

var fails$5 = fails$d
var global$5 = global$u // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError

var $RegExp = global$5.RegExp
var regexpUnsupportedNcg = fails$5(function () {
  var re = $RegExp('(?<a>b)', 'g')
  return re.exec('b').groups.a !== 'b' || 'b'.replace(re, '$<a>c') !== 'bc'
})

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */

/* eslint-disable regexp/no-useless-quantifier -- testing */

var call$3 = functionCall
var uncurryThis$7 = functionUncurryThis
var toString$3 = toString$4
var regexpFlags = regexpFlags$1
var stickyHelpers = regexpStickyHelpers
var shared = shared$4.exports
var create = objectCreate
var getInternalState = internalState.get
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll
var UNSUPPORTED_NCG = regexpUnsupportedNcg
var nativeReplace = shared('native-string-replace', String.prototype.replace)
var nativeExec = RegExp.prototype.exec
var patchedExec = nativeExec
var charAt$3 = uncurryThis$7(''.charAt)
var indexOf = uncurryThis$7(''.indexOf)
var replace$1 = uncurryThis$7(''.replace)
var stringSlice$3 = uncurryThis$7(''.slice)

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/
  var re2 = /b*/g
  call$3(nativeExec, re1, 'a')
  call$3(nativeExec, re2, 'a')
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
    var state = getInternalState(re)
    var str = toString$3(string)
    var raw = state.raw
    var result, reCopy, lastIndex, match, i, object, group

    if (raw) {
      raw.lastIndex = re.lastIndex
      result = call$3(patchedExec, raw, str)
      re.lastIndex = raw.lastIndex
      return result
    }

    var groups = state.groups
    var sticky = UNSUPPORTED_Y && re.sticky
    var flags = call$3(regexpFlags, re)
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
          (re.multiline && charAt$3(str, re.lastIndex - 1) !== '\n'))
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
    match = call$3(nativeExec, sticky ? reCopy : re, strCopy)

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
      call$3(nativeReplace, match[0], reCopy, function () {
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

var $$3 = _export
var exec$1 = regexpExec$2 // `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec

$$3(
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
var apply$1 = FunctionPrototype.apply
var bind = FunctionPrototype.bind
var call$2 = FunctionPrototype.call // eslint-disable-next-line es/no-reflect -- safe

var functionApply =
  (typeof Reflect == 'object' && Reflect.apply) ||
  (bind
    ? call$2.bind(apply$1)
    : function () {
        return call$2.apply(apply$1, arguments)
      })

var uncurryThis$6 = functionUncurryThis
var redefine$1 = redefine$3.exports
var regexpExec$1 = regexpExec$2
var fails$4 = fails$d
var wellKnownSymbol$3 = wellKnownSymbol$7
var createNonEnumerableProperty = createNonEnumerableProperty$4
var SPECIES$2 = wellKnownSymbol$3('species')
var RegExpPrototype = RegExp.prototype

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$3(KEY)
  var DELEGATES_TO_SYMBOL = !fails$4(function () {
    // String methods call symbol-named RegEp methods
    var O = {}

    O[SYMBOL] = function () {
      return 7
    }

    return ''[KEY](O) != 7
  })
  var DELEGATES_TO_EXEC =
    DELEGATES_TO_SYMBOL &&
    !fails$4(function () {
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

        re.constructor[SPECIES$2] = function () {
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
    var uncurriedNativeRegExpMethod = uncurryThis$6(/./[SYMBOL])
    var methods = exec(
      SYMBOL,
      ''[KEY],
      function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var uncurriedNativeMethod = uncurryThis$6(nativeMethod)
        var $exec = regexp.exec

        if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
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
    redefine$1(String.prototype, KEY, methods[0])
    redefine$1(RegExpPrototype, SYMBOL, methods[1])
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true)
}

var uncurryThis$5 = functionUncurryThis
var toIntegerOrInfinity$1 = toIntegerOrInfinity$4
var toString$2 = toString$4
var requireObjectCoercible$1 = requireObjectCoercible$4
var charAt$2 = uncurryThis$5(''.charAt)
var charCodeAt = uncurryThis$5(''.charCodeAt)
var stringSlice$2 = uncurryThis$5(''.slice)

var createMethod$1 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$2(requireObjectCoercible$1($this))
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
        ? charAt$2(S, position)
        : first
      : CONVERT_TO_STRING
      ? stringSlice$2(S, position, position + 2)
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

var charAt$1 = stringMultibyte.charAt // `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex

var advanceStringIndex$1 = function (S, index, unicode) {
  return index + (unicode ? charAt$1(S, index).length : 1)
}

var uncurryThis$4 = functionUncurryThis
var toObject$1 = toObject$3
var floor = Math.floor
var charAt = uncurryThis$4(''.charAt)
var replace = uncurryThis$4(''.replace)
var stringSlice$1 = uncurryThis$4(''.slice)
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
    namedCaptures = toObject$1(namedCaptures)
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
        return stringSlice$1(str, 0, position)

      case "'":
        return stringSlice$1(str, tailPos)

      case '<':
        capture = namedCaptures[stringSlice$1(ch, 1, -1)]
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

var global$4 = global$u
var call$1 = functionCall
var anObject$1 = anObject$7
var isCallable$2 = isCallable$d
var classof$4 = classofRaw$1
var regexpExec = regexpExec$2
var TypeError$2 = global$4.TypeError // `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec

var regexpExecAbstract = function (R, S) {
  var exec = R.exec

  if (isCallable$2(exec)) {
    var result = call$1(exec, R, S)
    if (result !== null) anObject$1(result)
    return result
  }

  if (classof$4(R) === 'RegExp') return call$1(regexpExec, R, S)
  throw TypeError$2('RegExp#exec called on incompatible receiver')
}

var apply = functionApply
var call = functionCall
var uncurryThis$3 = functionUncurryThis
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic
var fails$3 = fails$d
var anObject = anObject$7
var isCallable$1 = isCallable$d
var toIntegerOrInfinity = toIntegerOrInfinity$4
var toLength = toLength$2
var toString$1 = toString$4
var requireObjectCoercible = requireObjectCoercible$4
var advanceStringIndex = advanceStringIndex$1
var getMethod = getMethod$2
var getSubstitution = getSubstitution$1
var regExpExec = regexpExecAbstract
var wellKnownSymbol$2 = wellKnownSymbol$7
var REPLACE = wellKnownSymbol$2('replace')
var max$1 = Math.max
var min = Math.min
var concat = uncurryThis$3([].concat)
var push = uncurryThis$3([].push)
var stringIndexOf = uncurryThis$3(''.indexOf)
var stringSlice = uncurryThis$3(''.slice)

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

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$3(function () {
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
          searchValue == undefined ? undefined : getMethod(searchValue, REPLACE)
        return replacer
          ? call(replacer, searchValue, O, replaceValue)
          : call(nativeReplace, toString$1(O), searchValue, replaceValue)
      }, // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (string, replaceValue) {
        var rx = anObject(this)
        var S = toString$1(string)

        if (
          typeof replaceValue == 'string' &&
          stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
          stringIndexOf(replaceValue, '$<') === -1
        ) {
          var res = maybeCallNative(nativeReplace, rx, S, replaceValue)
          if (res.done) return res.value
        }

        var functionalReplace = isCallable$1(replaceValue)
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
          push(results, result)
          if (!global) break
          var matchStr = toString$1(result[0])
          if (matchStr === '')
            rx.lastIndex = advanceStringIndex(
              S,
              toLength(rx.lastIndex),
              fullUnicode,
            )
        }

        var accumulatedResult = ''
        var nextSourcePosition = 0

        for (var i = 0; i < results.length; i++) {
          result = results[i]
          var matched = toString$1(result[0])
          var position = max$1(
            min(toIntegerOrInfinity(result.index), S.length),
            0,
          )
          var captures = [] // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

          for (var j = 1; j < result.length; j++)
            push(captures, maybeToString(result[j]))

          var namedCaptures = result.groups

          if (functionalReplace) {
            var replacerArgs = concat([matched], captures, position, S)
            if (namedCaptures !== undefined) push(replacerArgs, namedCaptures)
            var replacement = toString$1(
              apply(replaceValue, undefined, replacerArgs),
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
              stringSlice(S, nextSourcePosition, position) + replacement
            nextSourcePosition = position + matched.length
          }
        }

        return accumulatedResult + stringSlice(S, nextSourcePosition)
      },
    ]
  },
  !REPLACE_SUPPORTS_NAMED_GROUPS ||
    !REPLACE_KEEPS_$0 ||
    REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,
)

var fails$2 = fails$d

var arrayMethodIsStrict$2 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME]
  return (
    !!method &&
    fails$2(function () {
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
var uncurryThis$2 = functionUncurryThis
var IndexedObject$1 = indexedObject
var toIndexedObject$1 = toIndexedObject$6
var arrayMethodIsStrict$1 = arrayMethodIsStrict$2
var un$Join = uncurryThis$2([].join)
var ES3_STRINGS = IndexedObject$1 != Object
var STRICT_METHOD$1 = arrayMethodIsStrict$1('join', ',') // `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join

$$2(
  {
    target: 'Array',
    proto: true,
    forced: ES3_STRINGS || !STRICT_METHOD$1,
  },
  {
    join: function join(separator) {
      return un$Join(
        toIndexedObject$1(this),
        separator === undefined ? ',' : separator,
      )
    },
  },
)

var classof$3 = classofRaw$1 // `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe

var isArray$1 =
  Array.isArray ||
  function isArray(argument) {
    return classof$3(argument) == 'Array'
  }

var uncurryThis$1 = functionUncurryThis
var fails$1 = fails$d
var isCallable = isCallable$d
var classof$2 = classof$6
var getBuiltIn = getBuiltIn$5
var inspectSource = inspectSource$3

var noop$1 = function () {
  /* empty */
}

var empty = []
var construct = getBuiltIn('Reflect', 'construct')
var constructorRegExp = /^\s*(?:class|function)\b/
var exec = uncurryThis$1(constructorRegExp.exec)
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop$1)

var isConstructorModern = function (argument) {
  if (!isCallable(argument)) return false

  try {
    construct(noop$1, empty, argument)
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
  fails$1(function () {
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

var toPropertyKey = toPropertyKey$3
var definePropertyModule = objectDefineProperty
var createPropertyDescriptor = createPropertyDescriptor$3

var createProperty$1 = function (object, key, value) {
  var propertyKey = toPropertyKey(key)
  if (propertyKey in object)
    definePropertyModule.f(
      object,
      propertyKey,
      createPropertyDescriptor(0, value),
    )
  else object[propertyKey] = value
}

var fails = fails$d
var wellKnownSymbol$1 = wellKnownSymbol$7
var V8_VERSION = engineV8Version
var SPECIES$1 = wellKnownSymbol$1('species')

var arrayMethodHasSpeciesSupport$1 = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return (
    V8_VERSION >= 51 ||
    !fails(function () {
      var array = []
      var constructor = (array.constructor = {})

      constructor[SPECIES$1] = function () {
        return {
          foo: 1,
        }
      }

      return array[METHOD_NAME](Boolean).foo !== 1
    })
  )
}

var uncurryThis = functionUncurryThis
var arraySlice = uncurryThis([].slice)

var $$1 = _export
var global$3 = global$u
var isArray = isArray$1
var isConstructor = isConstructor$1
var isObject = isObject$6
var toAbsoluteIndex = toAbsoluteIndex$2
var lengthOfArrayLike$1 = lengthOfArrayLike$3
var toIndexedObject = toIndexedObject$6
var createProperty = createProperty$1
var wellKnownSymbol = wellKnownSymbol$7
var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$1
var un$Slice = arraySlice
var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice')
var SPECIES = wellKnownSymbol('species')
var Array$1 = global$3.Array
var max = Math.max // `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects

$$1(
  {
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT,
  },
  {
    slice: function slice(start, end) {
      var O = toIndexedObject(this)
      var length = lengthOfArrayLike$1(O)
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
          Constructor = Constructor[SPECIES]
          if (Constructor === null) Constructor = undefined
        }

        if (Constructor === Array$1 || Constructor === undefined) {
          return un$Slice(O, k, fin)
        }
      }

      result = new (Constructor === undefined ? Array$1 : Constructor)(
        max(fin - k, 0),
      )

      for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k])

      result.length = n
      return result
    },
  },
)

var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport
var classof$1 = classof$6 // `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring

var objectToString = TO_STRING_TAG_SUPPORT$1
  ? {}.toString
  : function toString() {
      return '[object ' + classof$1(this) + ']'
    }

var TO_STRING_TAG_SUPPORT = toStringTagSupport
var redefine = redefine$3.exports
var toString = objectToString // `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring

if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, {
    unsafe: true,
  })
}

/**
 * @module BrowserSync.options
 */
var defaultConfig = {
  /**
   * Browsersync includes a user-interface that is accessed via a separate port.
   * The UI allows to controls all devices, push sync updates and much more.
   * @property ui
   * @type Object
   * @param {Number} [port=3001]
   * @since 2.0.0
   * @default false
   */
  ui: {
    port: 3001,
  },

  /**
   * Browsersync can watch your files as you work. Changes you make will either
   * be injected into the page (CSS & images) or will cause all browsers to do
   * a full-page refresh.
   * @property files
   * @type Array|String
   * @default false
   */
  files: false,

  /**
   * Specify which file events to respond to.
   * Available events: `add`, `change`, `unlink`, `addDir`, `unlinkDir`
   * @property watchEvents
   * @type Array
   * @default ["change"]
   * @since 2.18.8
   */
  watchEvents: ['change'],

  /**
   * Watch files automatically - this should be used as an
   * alternative to the `files` option. When this option is used, some directories
   * will be ignored automatically such as `node_modules` `bower_components` `.sass-cache`
   * `.vscode` `.git` `.idea`
   *
   * @property watch
   * @type Boolean
   * @default false
   * @since 2.23.0
   */
  watch: false,

  /**
   * Patterns for any watchers to ignore. Anything provided here
   * will end up inside `watchOptions.ignored`
   * @property ignore
   * @type Array
   * @default []
   * @since 2.23.0
   */
  ignore: [],

  /**
   * Serve an index.html file for all non-asset routes. Useful
   * when using client-routers
   * @property single
   * @type Boolean
   * @default false
   * @since 2.23.0
   */
  single: false,

  /**
   * File watching options that get passed along to [Chokidar](https://github.com/paulmillr/chokidar).
   * Check their docs for available options
   * @property watchOptions
   * @type Object
   * @default undefined
   * @since 2.6.0
   */
  watchOptions: {
    ignoreInitial: true,
    /*
     persistent: true,
      ignored: '*.txt',
     followSymlinks: true,
     cwd: '.',
      usePolling: true,
     alwaysStat: false,
     depth: undefined,
     interval: 100,
      ignorePermissionErrors: false,
     atomic: true
     */
  },

  /**
   * Use the built-in static server for basic HTML/JS/CSS websites.
   * @property server
   * @type Object|Boolean
   * @default false
   */
  server: false,

  /**
   * Proxy an EXISTING vhost. Browsersync will wrap your vhost with a proxy URL to view your site.
   * @property proxy
   * @type String|Object|Boolean
   * @param {String} [target]
   * @param {Boolean} [ws] - Enable websocket proxying
   * @param {Function|Array} [middleware]
   * @param {Function} [reqHeaders]
   * @param {Array} [proxyReq]
   * @param {Array} [proxyRes]
   * @default false
   */
  proxy: false,

  /**
   * @property port
   * @type Number
   * @default 3000
   */
  port: 3000,

  /**
   * @property middleware
   * @type Function|Array
   * @default false
   */
  middleware: false,

  /**
   * Add additional directories from which static
   * files should be served. Should only be used in `proxy` or `snippet`
   * mode.
   * @property serveStatic
   * @type Array
   * @default []
   * @since 2.8.0
   */
  serveStatic: [],

  /**
   * Options that are passed to the serve-static middleware
   * when you use the string[] syntax: eg: `serveStatic: ['./app']`. Please see
   * [serve-static](https://github.com/expressjs/serve-static) for details
   *
   * @property serveStaticOptions
   * @type Object
   * @since 2.17.0
   */

  /**
   * Enable https for localhost development. **Note** - this is not needed for proxy
   * option as it will be inferred from your target url.
   * @property https
   * @type Boolean
   * @default undefined
   * @since 1.3.0
   */

  /**
   * Override http module to allow using 3rd party server modules (such as http2)
   * *Note*: these modules are not included in the Browsersync package - you need
   * to 'npm install' any that you'd like to use.
   * @property httpModule
   * @type string
   * @default undefined
   * @since 2.18.0
   */

  /**
   * Current working directory
   * @property cwd
   * @type String
   * @since 2.23.0
   */

  /**
   * Register callbacks via a regular option - this can be used
   * to get access the Browsersync instance in situations where you
   * cannot provide a callback via the normal API (for example, in a Gruntfile)
   *
   * **Note**: Only the `ready` callback is currently supported here.
   *
   * @property callbacks
   * @type Object
   * @param {Function} ready
   */

  /**
   * Clicks, Scrolls & Form inputs on any device will be mirrored to all others.
   * @property ghostMode
   * @param {Boolean} [clicks=true]
   * @param {Boolean} [scroll=true]
   * @param {Boolean} [location=true]
   * @param {Boolean} [forms=true]
   * @param {Boolean} [forms.submit=true]
   * @param {Boolean} [forms.inputs=true]
   * @param {Boolean} [forms.toggles=true]
   * @type Object
   */
  ghostMode: {
    clicks: true,
    scroll: true,
    location: true,
    forms: {
      submit: true,
      inputs: true,
      toggles: true,
    },
  },

  /**
   * Can be either "info", "debug", "warn", or "silent"
   * @property logLevel
   * @type String
   * @default info
   */
  logLevel: 'info',

  /**
   * Change the console logging prefix. Useful if you're creating your
   * own project based on Browsersync
   * @property logPrefix
   * @type String
   * @default Browsersync
   * @since 1.5.1
   */
  logPrefix: 'Browsersync',

  /**
   * @property logConnections
   * @type Boolean
   * @default false
   */
  logConnections: false,

  /**
   * @property logFileChanges
   * @type Boolean
   * @default true
   */
  logFileChanges: true,

  /**
   * Log the snippet to the console when you're in snippet mode (no proxy/server)
   * @property logSnippet
   * @type: Boolean
   * @default true
   * @since 1.5.2
   */
  logSnippet: true,

  /**
   * You can prevent Browsersync from injecting the connection snippet
   * by passing `snippet: false`.
   * @property snippet
   * @type Boolean
   * @default undefined
   */

  /**
   * You can control how the snippet is injected
   * onto each page via a custom regex + function.
   * You can also provide patterns for certain urls
   * that should be ignored from the snippet injection.
   * @property snippetOptions
   * @since 2.0.0
   * @param {Boolean} [async] - should the script tags have the async attribute?
   * @param {Array} [blacklist]
   * @param {Array} [whitelist]
   * @param {RegExp} [rule.match=/$/]
   * @param {Function} [rule.fn=Function]
   * @type Object
   */
  snippetOptions: {
    async: true,
    whitelist: [],
    blacklist: [],
    rule: {
      match: /<body[^>]*>/i,
      fn: function (snippet, match) {
        return match + snippet
      },
    },
  },

  /**
   * Add additional HTML rewriting rules.
   * @property rewriteRules
   * @since 2.4.0
   * @type Array
   * @default false
   */
  rewriteRules: [],

  /**
   * @property tunnel
   * @type String|Boolean
   * @default null
   */

  /**
   * Some features of Browsersync (such as `xip` & `tunnel`) require an internet connection, but if you're
   * working offline, you can reduce start-up time by setting this option to `false`
   * @property online
   * @type Boolean
   * @default undefined
   */

  /**
   * Decide which URL to open automatically when Browsersync starts. Defaults to "local" if none set.
   * Can be `true`, `local`, `external`, `ui`, `ui-external`, `tunnel` or `false`
   * @property open
   * @type Boolean|String
   * @default true
   */
  open: 'local',

  /**
   * @property browser
   * @type String|Array
   * @default default
   */
  browser: 'default',

  /**
   * Add HTTP access control (CORS) headers to assets served by Browsersync.
   * @property cors
   * @type boolean
   * @default false
   * @since 2.16.0
   */
  cors: false,

  /**
   * Requires an internet connection - useful for services such as [Typekit](https://typekit.com/)
   * as it allows you to configure domains such as `*.xip.io` in your kit settings
   * @property xip
   * @type Boolean
   * @default false
   */
  xip: false,
  hostnameSuffix: false,

  /**
   * Reload each browser when Browsersync is restarted.
   * @property reloadOnRestart
   * @type Boolean
   * @default false
   */
  reloadOnRestart: false,

  /**
   * The small pop-over notifications in the browser are not always needed/wanted.
   * @property notify
   * @type Boolean
   * @default true
   */
  notify: true,

  /**
   * @property scrollProportionally
   * @type Boolean
   * @default true
   */
  scrollProportionally: true,

  /**
   * @property scrollThrottle
   * @type Number
   * @default 0
   */
  scrollThrottle: 0,

  /**
   * Decide which technique should be used to restore
   * scroll position following a reload.
   * Can be `window.name` or `cookie`
   * @property scrollRestoreTechnique
   * @type String
   * @default 'window.name'
   */
  scrollRestoreTechnique: 'window.name',

  /**
   * Sync the scroll position of any element
   * on the page. Add any amount of CSS selectors
   * @property scrollElements
   * @type Array
   * @default []
   * @since 2.9.0
   */
  scrollElements: [],

  /**
   * Sync the scroll position of any element
   * on the page - where any scrolled element
   * will cause all others to match scroll position.
   * This is helpful when a breakpoint alters which element
   * is actually scrolling
   * @property scrollElementMapping
   * @type Array
   * @default []
   * @since 2.9.0
   */
  scrollElementMapping: [],

  /**
   * Time, in milliseconds, to wait before
   * instructing the browser to reload/inject following a
   * file change event
   * @property reloadDelay
   * @type Number
   * @default 0
   */
  reloadDelay: 0,

  /**
   * Wait for a specified window of event-silence before
   * sending any reload events.
   * @property reloadDebounce
   * @type Number
   * @default 0
   * @since 2.6.0
   */
  reloadDebounce: 500,

  /**
   * Emit only the first event during sequential time windows
   * of a specified duration.
   * @property reloadThrottle
   * @type Number
   * @default 0
   * @since 2.13.0
   */
  reloadThrottle: 0,

  /**
   * User provided plugins
   * @property plugins
   * @type Array
   * @default []
   * @since 2.6.0
   */
  plugins: [],

  /**
   * @property injectChanges
   * @type Boolean
   * @default true
   */
  injectChanges: true,

  /**
   * @property startPath
   * @type String|Null
   * @default null
   */
  startPath: null,

  /**
   * Whether to minify client script, or not.
   * @property minify
   * @type Boolean
   * @default true
   */
  minify: true,

  /**
   * @property host
   * @type String
   * @default null
   */
  host: null,

  /**
   * Specify a host to listen on. Use this if you want to
   * prevent binding to all interfaces.
   *
   * Note: When you specify this option, it overrides the 'host' option
   * @property listen
   * @type String
   * @default undefined
   */

  /**
   * Support environments where dynamic hostnames are not required
   * (ie: electron)
   * @property localOnly
   * @type Boolean
   * @default false
   * @since 2.14.0
   */
  localOnly: false,

  /**
   * @property codeSync
   * @type Boolean
   * @default true
   */
  codeSync: true,

  /**
   * @property timestamps
   * @type Boolean
   * @default true
   */
  timestamps: true,
  clientEvents: [
    'scroll',
    'scroll:element',
    'input:text',
    'input:toggles',
    'form:submit',
    'form:reset',
    'click',
  ],

  /**
   * Alter the script path for complete control over where the Browsersync
   * Javascript is served from. Whatever you return from this function
   * will be used as the script path.
   * @property scriptPath
   * @default undefined
   * @since 1.5.0
   * @type Function
   */

  /**
   * Configure the Socket.IO path and namespace & domain to avoid collisions.
   * @property socket
   * @param {String} [path="/browser-sync/socket.io"]
   * @param {String} [clientPath="/browser-sync"]
   * @param {String|Function} [namespace="/browser-sync"]
   * @param {String|Function} [domain=undefined]
   * @param {String|Function} [port=undefined]
   * @param {Object} [clients.heartbeatTimeout=5000]
   * @since 1.6.2
   * @type Object
   */
  socket: {
    socketIoOptions: {
      log: false,
    },
    socketIoClientConfig: {
      reconnectionAttempts: 50,
    },
    path: '/browser-sync/socket.io',
    clientPath: '/browser-sync',
    namespace: '/browser-sync',
    clients: {
      heartbeatTimeout: 5000,
    },
  },

  /**
   * Configure the script domain
   * @property script
   * @param {String|Function} [domain=undefined]
   * @since 2.14.0
   * @type Object
   */
  tagNames: {
    less: 'link',
    scss: 'link',
    css: 'link',
    jpg: 'img',
    jpeg: 'img',
    png: 'img',
    svg: 'img',
    gif: 'img',
    js: 'script',
  },
  injectFileTypes: ['css', 'png', 'jpg', 'jpeg', 'svg', 'gif', 'webp', 'map'],
  injectNotification: false,
  excludedFileTypes: [
    'js',
    'css',
    'pdf',
    'map',
    'svg',
    'ico',
    'woff',
    'json',
    'eot',
    'ttf',
    'png',
    'jpg',
    'jpeg',
    'webp',
    'gif',
    'mp4',
    'mp3',
    '3gp',
    'ogg',
    'ogv',
    'webm',
    'm4a',
    'flv',
    'wmv',
    'avi',
    'swf',
    'scss',
  ],
}

var global$2 = global$u
var aCallable = aCallable$2
var toObject = toObject$3
var IndexedObject = indexedObject
var lengthOfArrayLike = lengthOfArrayLike$3
var TypeError$1 = global$2.TypeError // `Array.prototype.{ reduce, reduceRight }` methods implementation

var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aCallable(callbackfn)
    var O = toObject(that)
    var self = IndexedObject(O)
    var length = lengthOfArrayLike(O)
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
          throw TypeError$1('Reduce of empty array with no initial value')
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
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true),
}

var classof = classofRaw$1
var global$1 = global$u
var engineIsNode = classof(global$1.process) == 'process'

var $ = _export
var $reduceRight = arrayReduce.right
var arrayMethodIsStrict = arrayMethodIsStrict$2
var CHROME_VERSION = engineV8Version
var IS_NODE = engineIsNode
var STRICT_METHOD = arrayMethodIsStrict('reduceRight') // Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982

var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83 // `Array.prototype.reduceRight` method
// https://tc39.es/ecma262/#sec-array.prototype.reduceright

$(
  {
    target: 'Array',
    proto: true,
    forced: !STRICT_METHOD || CHROME_BUG,
  },
  {
    reduceRight: function reduceRight(
      callbackfn,
      /* , initialValue */
    ) {
      return $reduceRight(
        this,
        callbackfn,
        arguments.length,
        arguments.length > 1 ? arguments[1] : undefined,
      )
    },
  },
)

var httpProxy$3 = {exports: {}}

var eventemitter3 = {exports: {}}

;(function (module) {
  var has = Object.prototype.hasOwnProperty,
    prefix = '~'
  /**
   * Constructor to create a storage for our `EE` objects.
   * An `Events` instance is a plain object whose properties are event names.
   *
   * @constructor
   * @private
   */

  function Events() {} //
  // We try to not inherit from `Object.prototype`. In some engines creating an
  // instance in this way is faster than calling `Object.create(null)` directly.
  // If `Object.create(null)` is not supported we prefix the event names with a
  // character to make sure that the built-in object properties are not
  // overridden or used as an attack vector.
  //

  if (Object.create) {
    Events.prototype = Object.create(null) //
    // This hack is needed because the `__proto__` property is still inherited in
    // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
    //

    if (!new Events().__proto__) prefix = false
  }
  /**
   * Representation of a single event listener.
   *
   * @param {Function} fn The listener function.
   * @param {*} context The context to invoke the listener with.
   * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
   * @constructor
   * @private
   */

  function EE(fn, context, once) {
    this.fn = fn
    this.context = context
    this.once = once || false
  }
  /**
   * Add a listener for a given event.
   *
   * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} context The context to invoke the listener with.
   * @param {Boolean} once Specify if the listener is a one-time listener.
   * @returns {EventEmitter}
   * @private
   */

  function addListener(emitter, event, fn, context, once) {
    if (typeof fn !== 'function') {
      throw new TypeError('The listener must be a function')
    }

    var listener = new EE(fn, context || emitter, once),
      evt = prefix ? prefix + event : event
    if (!emitter._events[evt])
      (emitter._events[evt] = listener), emitter._eventsCount++
    else if (!emitter._events[evt].fn) emitter._events[evt].push(listener)
    else emitter._events[evt] = [emitter._events[evt], listener]
    return emitter
  }
  /**
   * Clear event by name.
   *
   * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
   * @param {(String|Symbol)} evt The Event name.
   * @private
   */

  function clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0) emitter._events = new Events()
    else delete emitter._events[evt]
  }
  /**
   * Minimal `EventEmitter` interface that is molded against the Node.js
   * `EventEmitter` interface.
   *
   * @constructor
   * @public
   */

  function EventEmitter() {
    this._events = new Events()
    this._eventsCount = 0
  }
  /**
   * Return an array listing the events for which the emitter has registered
   * listeners.
   *
   * @returns {Array}
   * @public
   */

  EventEmitter.prototype.eventNames = function eventNames() {
    var names = [],
      events,
      name
    if (this._eventsCount === 0) return names

    for (name in (events = this._events)) {
      if (has.call(events, name)) names.push(prefix ? name.slice(1) : name)
    }

    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events))
    }

    return names
  }
  /**
   * Return the listeners registered for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Array} The registered listeners.
   * @public
   */

  EventEmitter.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event,
      handlers = this._events[evt]
    if (!handlers) return []
    if (handlers.fn) return [handlers.fn]

    for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
      ee[i] = handlers[i].fn
    }

    return ee
  }
  /**
   * Return the number of listeners listening to a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Number} The number of listeners.
   * @public
   */

  EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event,
      listeners = this._events[evt]
    if (!listeners) return 0
    if (listeners.fn) return 1
    return listeners.length
  }
  /**
   * Calls each of the listeners registered for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Boolean} `true` if the event had listeners, else `false`.
   * @public
   */

  EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event
    if (!this._events[evt]) return false
    var listeners = this._events[evt],
      len = arguments.length,
      args,
      i

    if (listeners.fn) {
      if (listeners.once)
        this.removeListener(event, listeners.fn, undefined, true)

      switch (len) {
        case 1:
          return listeners.fn.call(listeners.context), true

        case 2:
          return listeners.fn.call(listeners.context, a1), true

        case 3:
          return listeners.fn.call(listeners.context, a1, a2), true

        case 4:
          return listeners.fn.call(listeners.context, a1, a2, a3), true

        case 5:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4), true

        case 6:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true
      }

      for (i = 1, args = new Array(len - 1); i < len; i++) {
        args[i - 1] = arguments[i]
      }

      listeners.fn.apply(listeners.context, args)
    } else {
      var length = listeners.length,
        j

      for (i = 0; i < length; i++) {
        if (listeners[i].once)
          this.removeListener(event, listeners[i].fn, undefined, true)

        switch (len) {
          case 1:
            listeners[i].fn.call(listeners[i].context)
            break

          case 2:
            listeners[i].fn.call(listeners[i].context, a1)
            break

          case 3:
            listeners[i].fn.call(listeners[i].context, a1, a2)
            break

          case 4:
            listeners[i].fn.call(listeners[i].context, a1, a2, a3)
            break

          default:
            if (!args)
              for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j]
              }
            listeners[i].fn.apply(listeners[i].context, args)
        }
      }
    }

    return true
  }
  /**
   * Add a listener for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} [context=this] The context to invoke the listener with.
   * @returns {EventEmitter} `this`.
   * @public
   */

  EventEmitter.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false)
  }
  /**
   * Add a one-time listener for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} [context=this] The context to invoke the listener with.
   * @returns {EventEmitter} `this`.
   * @public
   */

  EventEmitter.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true)
  }
  /**
   * Remove the listeners of a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn Only remove the listeners that match this function.
   * @param {*} context Only remove the listeners that have this context.
   * @param {Boolean} once Only remove one-time listeners.
   * @returns {EventEmitter} `this`.
   * @public
   */

  EventEmitter.prototype.removeListener = function removeListener(
    event,
    fn,
    context,
    once,
  ) {
    var evt = prefix ? prefix + event : event
    if (!this._events[evt]) return this

    if (!fn) {
      clearEvent(this, evt)
      return this
    }

    var listeners = this._events[evt]

    if (listeners.fn) {
      if (
        listeners.fn === fn &&
        (!once || listeners.once) &&
        (!context || listeners.context === context)
      ) {
        clearEvent(this, evt)
      }
    } else {
      for (var i = 0, events = [], length = listeners.length; i < length; i++) {
        if (
          listeners[i].fn !== fn ||
          (once && !listeners[i].once) ||
          (context && listeners[i].context !== context)
        ) {
          events.push(listeners[i])
        }
      } //
      // Reset the array, or remove it completely if we have no more listeners.
      //

      if (events.length)
        this._events[evt] = events.length === 1 ? events[0] : events
      else clearEvent(this, evt)
    }

    return this
  }
  /**
   * Remove all listeners, or those of the specified event.
   *
   * @param {(String|Symbol)} [event] The event name.
   * @returns {EventEmitter} `this`.
   * @public
   */

  EventEmitter.prototype.removeAllListeners = function removeAllListeners(
    event,
  ) {
    var evt

    if (event) {
      evt = prefix ? prefix + event : event
      if (this._events[evt]) clearEvent(this, evt)
    } else {
      this._events = new Events()
      this._eventsCount = 0
    }

    return this
  } //
  // Alias methods names because people roll like that.
  //

  EventEmitter.prototype.off = EventEmitter.prototype.removeListener
  EventEmitter.prototype.addListener = EventEmitter.prototype.on //
  // Expose the prefix.
  //

  EventEmitter.prefixed = prefix //
  // Allow `EventEmitter` to be imported as module namespace.
  //

  EventEmitter.EventEmitter = EventEmitter //
  // Expose the module.
  //

  {
    module.exports = EventEmitter
  }
})(eventemitter3)

var common$3 = {}

/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */

var requiresPort = function required(port, protocol) {
  protocol = protocol.split(':')[0]
  port = +port
  if (!port) return false

  switch (protocol) {
    case 'http':
    case 'ws':
      return port !== 80

    case 'https':
    case 'wss':
      return port !== 443

    case 'ftp':
      return port !== 21

    case 'gopher':
      return port !== 70

    case 'file':
      return false
  }

  return port !== 0
}

;(function (exports) {
  var common = exports,
    url = require$$0__default$1['default'],
    extend = require$$0__default['default']._extend,
    required = requiresPort
  var upgradeHeader = /(^|,)\s*upgrade\s*($|,)/i,
    isSSL = /^https|wss/
  /**
   * Simple Regex for testing if protocol is https
   */

  common.isSSL = isSSL
  /**
   * Copies the right headers from `options` and `req` to
   * `outgoing` which is then used to fire the proxied
   * request.
   *
   * Examples:
   *
   *    common.setupOutgoing(outgoing, options, req)
   *    // => { host: ..., hostname: ...}
   *
   * @param {Object} Outgoing Base object to be filled with required properties
   * @param {Object} Options Config object passed to the proxy
   * @param {ClientRequest} Req Request Object
   * @param {String} Forward String to select forward or target
   *
   * @return {Object} Outgoing Object with all required properties set
   *
   * @api private
   */

  common.setupOutgoing = function (outgoing, options, req, forward) {
    outgoing.port =
      options[forward || 'target'].port ||
      (isSSL.test(options[forward || 'target'].protocol) ? 443 : 80)
    ;[
      'host',
      'hostname',
      'socketPath',
      'pfx',
      'key',
      'passphrase',
      'cert',
      'ca',
      'ciphers',
      'secureProtocol',
    ].forEach(function (e) {
      outgoing[e] = options[forward || 'target'][e]
    })
    outgoing.method = options.method || req.method
    outgoing.headers = extend({}, req.headers)

    if (options.headers) {
      extend(outgoing.headers, options.headers)
    }

    if (options.auth) {
      outgoing.auth = options.auth
    }

    if (options.ca) {
      outgoing.ca = options.ca
    }

    if (isSSL.test(options[forward || 'target'].protocol)) {
      outgoing.rejectUnauthorized =
        typeof options.secure === 'undefined' ? true : options.secure
    }

    outgoing.agent = options.agent || false
    outgoing.localAddress = options.localAddress //
    // Remark: If we are false and not upgrading, set the connection: close. This is the right thing to do
    // as node core doesn't handle this COMPLETELY properly yet.
    //

    if (!outgoing.agent) {
      outgoing.headers = outgoing.headers || {}

      if (
        typeof outgoing.headers.connection !== 'string' ||
        !upgradeHeader.test(outgoing.headers.connection)
      ) {
        outgoing.headers.connection = 'close'
      }
    } // the final path is target path + relative path requested by user:

    var target = options[forward || 'target']
    var targetPath =
      target && options.prependPath !== false ? target.path || '' : '' //
    // Remark: Can we somehow not use url.parse as a perf optimization?
    //

    var outgoingPath = !options.toProxy
      ? url.parse(req.url).path || ''
      : req.url //
    // Remark: ignorePath will just straight up ignore whatever the request's
    // path is. This can be labeled as FOOT-GUN material if you do not know what
    // you are doing and are using conflicting options.
    //

    outgoingPath = !options.ignorePath ? outgoingPath : ''
    outgoing.path = common.urlJoin(targetPath, outgoingPath)

    if (options.changeOrigin) {
      outgoing.headers.host =
        required(outgoing.port, options[forward || 'target'].protocol) &&
        !hasPort(outgoing.host)
          ? outgoing.host + ':' + outgoing.port
          : outgoing.host
    }

    return outgoing
  }
  /**
   * Set the proper configuration for sockets,
   * set no delay and set keep alive, also set
   * the timeout to 0.
   *
   * Examples:
   *
   *    common.setupSocket(socket)
   *    // => Socket
   *
   * @param {Socket} Socket instance to setup
   *
   * @return {Socket} Return the configured socket.
   *
   * @api private
   */

  common.setupSocket = function (socket) {
    socket.setTimeout(0)
    socket.setNoDelay(true)
    socket.setKeepAlive(true, 0)
    return socket
  }
  /**
   * Get the port number from the host. Or guess it based on the connection type.
   *
   * @param {Request} req Incoming HTTP request.
   *
   * @return {String} The port number.
   *
   * @api private
   */

  common.getPort = function (req) {
    var res = req.headers.host ? req.headers.host.match(/:(\d+)/) : ''
    return res ? res[1] : common.hasEncryptedConnection(req) ? '443' : '80'
  }
  /**
   * Check if the request has an encrypted connection.
   *
   * @param {Request} req Incoming HTTP request.
   *
   * @return {Boolean} Whether the connection is encrypted or not.
   *
   * @api private
   */

  common.hasEncryptedConnection = function (req) {
    return Boolean(req.connection.encrypted || req.connection.pair)
  }
  /**
   * OS-agnostic join (doesn't break on URLs like path.join does on Windows)>
   *
   * @return {String} The generated path.
   *
   * @api private
   */

  common.urlJoin = function () {
    //
    // We do not want to mess with the query string. All we want to touch is the path.
    //
    var args = Array.prototype.slice.call(arguments),
      lastIndex = args.length - 1,
      last = args[lastIndex],
      lastSegs = last.split('?'),
      retSegs
    args[lastIndex] = lastSegs.shift() //
    // Join all strings, but remove empty strings so we don't get extra slashes from
    // joining e.g. ['', 'am']
    //

    retSegs = [
      args
        .filter(Boolean)
        .join('/')
        .replace(/\/+/g, '/')
        .replace('http:/', 'http://')
        .replace('https:/', 'https://'),
    ] // Only join the query string if it exists so we don't have trailing a '?'
    // on every request
    // Handle case where there could be multiple ? in the URL.

    retSegs.push.apply(retSegs, lastSegs)
    return retSegs.join('?')
  }
  /**
   * Rewrites or removes the domain of a cookie header
   *
   * @param {String|Array} Header
   * @param {Object} Config, mapping of domain to rewritten domain.
   *                 '*' key to match any domain, null value to remove the domain.
   *
   * @api private
   */

  common.rewriteCookieProperty = function rewriteCookieProperty(
    header,
    config,
    property,
  ) {
    if (Array.isArray(header)) {
      return header.map(function (headerElement) {
        return rewriteCookieProperty(headerElement, config, property)
      })
    }

    return header.replace(
      new RegExp('(;\\s*' + property + '=)([^;]+)', 'i'),
      function (match, prefix, previousValue) {
        var newValue

        if (previousValue in config) {
          newValue = config[previousValue]
        } else if ('*' in config) {
          newValue = config['*']
        } else {
          //no match, return previous value
          return match
        }

        if (newValue) {
          //replace value
          return prefix + newValue
        } else {
          //remove value
          return ''
        }
      },
    )
  }
  /**
   * Check the host and see if it potentially has a port in it (keep it simple)
   *
   * @returns {Boolean} Whether we have one or not
   *
   * @api private
   */

  function hasPort(host) {
    return !!~host.indexOf(':')
  }
})(common$3)

var url$1 = require$$0__default$1['default'],
  common$2 = common$3
var redirectRegex = /^201|30(1|2|7|8)$/
/*!
 * Array of passes.
 *
 * A `pass` is just a function that is executed on `req, res, options`
 * so that you can easily add new checks while still keeping the base
 * flexible.
 */

var webOutgoing = {
  // <--

  /**
   * If is a HTTP 1.0 request, remove chunk headers
   *
   * @param {ClientRequest} Req Request object
   * @param {IncomingMessage} Res Response object
   * @param {proxyResponse} Res Response object from the proxy request
   *
   * @api private
   */
  removeChunked: function removeChunked(req, res, proxyRes) {
    if (req.httpVersion === '1.0') {
      delete proxyRes.headers['transfer-encoding']
    }
  },

  /**
   * If is a HTTP 1.0 request, set the correct connection header
   * or if connection header not present, then use `keep-alive`
   *
   * @param {ClientRequest} Req Request object
   * @param {IncomingMessage} Res Response object
   * @param {proxyResponse} Res Response object from the proxy request
   *
   * @api private
   */
  setConnection: function setConnection(req, res, proxyRes) {
    if (req.httpVersion === '1.0') {
      proxyRes.headers.connection = req.headers.connection || 'close'
    } else if (req.httpVersion !== '2.0' && !proxyRes.headers.connection) {
      proxyRes.headers.connection = req.headers.connection || 'keep-alive'
    }
  },
  setRedirectHostRewrite: function setRedirectHostRewrite(
    req,
    res,
    proxyRes,
    options,
  ) {
    if (
      (options.hostRewrite || options.autoRewrite || options.protocolRewrite) &&
      proxyRes.headers['location'] &&
      redirectRegex.test(proxyRes.statusCode)
    ) {
      var target = url$1.parse(options.target)
      var u = url$1.parse(proxyRes.headers['location']) // make sure the redirected host matches the target host before rewriting

      if (target.host != u.host) {
        return
      }

      if (options.hostRewrite) {
        u.host = options.hostRewrite
      } else if (options.autoRewrite) {
        u.host = req.headers['host']
      }

      if (options.protocolRewrite) {
        u.protocol = options.protocolRewrite
      }

      proxyRes.headers['location'] = u.format()
    }
  },

  /**
   * Copy headers from proxyResponse to response
   * set each header in response object.
   *
   * @param {ClientRequest} Req Request object
   * @param {IncomingMessage} Res Response object
   * @param {proxyResponse} Res Response object from the proxy request
   * @param {Object} Options options.cookieDomainRewrite: Config to rewrite cookie domain
   *
   * @api private
   */
  writeHeaders: function writeHeaders(req, res, proxyRes, options) {
    var rewriteCookieDomainConfig = options.cookieDomainRewrite,
      rewriteCookiePathConfig = options.cookiePathRewrite,
      preserveHeaderKeyCase = options.preserveHeaderKeyCase,
      rawHeaderKeyMap,
      setHeader = function (key, header) {
        if (header == undefined) return

        if (rewriteCookieDomainConfig && key.toLowerCase() === 'set-cookie') {
          header = common$2.rewriteCookieProperty(
            header,
            rewriteCookieDomainConfig,
            'domain',
          )
        }

        if (rewriteCookiePathConfig && key.toLowerCase() === 'set-cookie') {
          header = common$2.rewriteCookieProperty(
            header,
            rewriteCookiePathConfig,
            'path',
          )
        }

        res.setHeader(String(key).trim(), header)
      }

    if (typeof rewriteCookieDomainConfig === 'string') {
      //also test for ''
      rewriteCookieDomainConfig = {
        '*': rewriteCookieDomainConfig,
      }
    }

    if (typeof rewriteCookiePathConfig === 'string') {
      //also test for ''
      rewriteCookiePathConfig = {
        '*': rewriteCookiePathConfig,
      }
    } // message.rawHeaders is added in: v0.11.6
    // https://nodejs.org/api/http.html#http_message_rawheaders

    if (preserveHeaderKeyCase && proxyRes.rawHeaders != undefined) {
      rawHeaderKeyMap = {}

      for (var i = 0; i < proxyRes.rawHeaders.length; i += 2) {
        var key = proxyRes.rawHeaders[i]
        rawHeaderKeyMap[key.toLowerCase()] = key
      }
    }

    Object.keys(proxyRes.headers).forEach(function (key) {
      var header = proxyRes.headers[key]

      if (preserveHeaderKeyCase && rawHeaderKeyMap) {
        key = rawHeaderKeyMap[key] || key
      }

      setHeader(key, header)
    })
  },

  /**
   * Set the statusCode from the proxyResponse
   *
   * @param {ClientRequest} Req Request object
   * @param {IncomingMessage} Res Response object
   * @param {proxyResponse} Res Response object from the proxy request
   *
   * @api private
   */
  writeStatusCode: function writeStatusCode(req, res, proxyRes) {
    // From Node.js docs: response.writeHead(statusCode[, statusMessage][, headers])
    if (proxyRes.statusMessage) {
      res.statusCode = proxyRes.statusCode
      res.statusMessage = proxyRes.statusMessage
    } else {
      res.statusCode = proxyRes.statusCode
    }
  },
}

var followRedirects$1 = {exports: {}}

var debug$1

var debug_1 = function () {
  if (!debug$1) {
    try {
      /* eslint global-require: off */
      debug$1 = require('debug')('follow-redirects')
    } catch (error) {
      debug$1 = function () {
        /* */
      }
    }
  }

  debug$1.apply(null, arguments)
}

var url = require$$0__default$1['default']
var URL = url.URL
var http$1 = require$$0__default$2['default']
var https$1 = require$$1__default['default']
var Writable = require$$3__default['default'].Writable
var assert = require$$4__default['default']
var debug = debug_1 // Create handlers that pass events from native requests

var eventHandlers = Object.create(null)
;['abort', 'aborted', 'connect', 'error', 'socket', 'timeout'].forEach(
  function (event) {
    eventHandlers[event] = function (arg1, arg2, arg3) {
      this._redirectable.emit(event, arg1, arg2, arg3)
    }
  },
) // Error types with codes

var RedirectionError = createErrorType('ERR_FR_REDIRECTION_FAILURE', '')
var TooManyRedirectsError = createErrorType(
  'ERR_FR_TOO_MANY_REDIRECTS',
  'Maximum number of redirects exceeded',
)
var MaxBodyLengthExceededError = createErrorType(
  'ERR_FR_MAX_BODY_LENGTH_EXCEEDED',
  'Request body larger than maxBodyLength limit',
)
var WriteAfterEndError = createErrorType(
  'ERR_STREAM_WRITE_AFTER_END',
  'write after end',
) // An HTTP(S) request that can be redirected

function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this)

  this._sanitizeOptions(options)

  this._options = options
  this._ended = false
  this._ending = false
  this._redirectCount = 0
  this._redirects = []
  this._requestBodyLength = 0
  this._requestBodyBuffers = [] // Attach a callback if passed

  if (responseCallback) {
    this.on('response', responseCallback)
  } // React to responses of native requests

  var self = this

  this._onNativeResponse = function (response) {
    self._processResponse(response)
  } // Perform the first request

  this._performRequest()
}

RedirectableRequest.prototype = Object.create(Writable.prototype)

RedirectableRequest.prototype.abort = function () {
  // Abort the internal request
  this._currentRequest.removeAllListeners()

  this._currentRequest.on('error', noop)

  this._currentRequest.abort() // Abort this request

  this.emit('abort')
  this.removeAllListeners()
} // Writes buffered data to the current native request

RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Writing is not allowed if end has been called
  if (this._ending) {
    throw new WriteAfterEndError()
  } // Validate input and shift parameters if necessary

  if (
    !(
      typeof data === 'string' ||
      (typeof data === 'object' && 'length' in data)
    )
  ) {
    throw new TypeError('data should be a string, Buffer or Uint8Array')
  }

  if (typeof encoding === 'function') {
    callback = encoding
    encoding = null
  } // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066

  if (data.length === 0) {
    if (callback) {
      callback()
    }

    return
  } // Only write when we don't exceed the maximum body length

  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length

    this._requestBodyBuffers.push({
      data: data,
      encoding: encoding,
    })

    this._currentRequest.write(data, encoding, callback)
  } // Error when we exceed the maximum body length
  else {
    this.emit('error', new MaxBodyLengthExceededError())
    this.abort()
  }
} // Ends the current native request

RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (typeof data === 'function') {
    callback = data
    data = encoding = null
  } else if (typeof encoding === 'function') {
    callback = encoding
    encoding = null
  } // Write data if needed and end

  if (!data) {
    this._ended = this._ending = true

    this._currentRequest.end(null, null, callback)
  } else {
    var self = this
    var currentRequest = this._currentRequest
    this.write(data, encoding, function () {
      self._ended = true
      currentRequest.end(null, null, callback)
    })
    this._ending = true
  }
} // Sets a header value on the current native request

RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value

  this._currentRequest.setHeader(name, value)
} // Clears a header value on the current native request

RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name]

  this._currentRequest.removeHeader(name)
} // Global timeout for all underlying requests

RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
  var self = this

  if (callback) {
    this.on('timeout', callback)
  } // Sets up a timer to trigger a timeout event

  function startTimer() {
    if (self._timeout) {
      clearTimeout(self._timeout)
    }

    self._timeout = setTimeout(function () {
      self.emit('timeout')
      clearTimer()
    }, msecs)
  } // Prevent a timeout from triggering

  function clearTimer() {
    clearTimeout(this._timeout)

    if (callback) {
      self.removeListener('timeout', callback)
    }

    if (!this.socket) {
      self._currentRequest.removeListener('socket', startTimer)
    }
  } // Start the timer when the socket is opened

  if (this.socket) {
    startTimer()
  } else {
    this._currentRequest.once('socket', startTimer)
  }

  this.once('response', clearTimer)
  this.once('error', clearTimer)
  return this
} // Proxy all other public ClientRequest methods
;['flushHeaders', 'getHeader', 'setNoDelay', 'setSocketKeepAlive'].forEach(
  function (method) {
    RedirectableRequest.prototype[method] = function (a, b) {
      return this._currentRequest[method](a, b)
    }
  },
) // Proxy all public ClientRequest properties
;['aborted', 'connection', 'socket'].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () {
      return this._currentRequest[property]
    },
  })
})

RedirectableRequest.prototype._sanitizeOptions = function (options) {
  // Ensure headers are always present
  if (!options.headers) {
    options.headers = {}
  } // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.

  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host
    }

    delete options.host
  } // Complete the URL object when necessary

  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf('?')

    if (searchPos < 0) {
      options.pathname = options.path
    } else {
      options.pathname = options.path.substring(0, searchPos)
      options.search = options.path.substring(searchPos)
    }
  }
} // Executes the next native request (initial or redirect)

RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol
  var nativeProtocol = this._options.nativeProtocols[protocol]

  if (!nativeProtocol) {
    this.emit('error', new TypeError('Unsupported protocol ' + protocol))
    return
  } // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)

  if (this._options.agents) {
    var scheme = protocol.substr(0, protocol.length - 1)
    this._options.agent = this._options.agents[scheme]
  } // Create the native request

  var request = (this._currentRequest = nativeProtocol.request(
    this._options,
    this._onNativeResponse,
  ))
  this._currentUrl = url.format(this._options) // Set up event handlers

  request._redirectable = this

  for (var event in eventHandlers) {
    /* istanbul ignore else */
    if (event) {
      request.on(event, eventHandlers[event])
    }
  } // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)

  if (this._isRedirect) {
    // Write the request entity and end.
    var i = 0
    var self = this
    var buffers = this._requestBodyBuffers

    ;(function writeNext(error) {
      // Only write if this request has not been redirected yet

      /* istanbul ignore else */
      if (request === self._currentRequest) {
        // Report any write errors

        /* istanbul ignore if */
        if (error) {
          self.emit('error', error)
        } // Write the next buffer if there are still left
        else if (i < buffers.length) {
          var buffer = buffers[i++]
          /* istanbul ignore else */

          if (!request.finished) {
            request.write(buffer.data, buffer.encoding, writeNext)
          }
        } // End the request if `end` has been called on us
        else if (self._ended) {
          request.end()
        }
      }
    })()
  }
} // Processes a response from the current native request

RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  var statusCode = response.statusCode

  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: statusCode,
    })
  } // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.

  var location = response.headers.location

  if (
    location &&
    this._options.followRedirects !== false &&
    statusCode >= 300 &&
    statusCode < 400
  ) {
    // Abort the current request
    this._currentRequest.removeAllListeners()

    this._currentRequest.on('error', noop)

    this._currentRequest.abort() // Discard the remainder of the response to avoid waiting for data

    response.destroy() // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).

    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit('error', new TooManyRedirectsError())
      return
    } // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe, […]
    // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
    // the request method from POST to GET for the subsequent request.

    if (
      ((statusCode === 301 || statusCode === 302) &&
        this._options.method === 'POST') || // RFC7231§6.4.4: The 303 (See Other) status code indicates that
      // the server is redirecting the user agent to a different resource […]
      // A user agent can perform a retrieval request targeting that URI
      // (a GET or HEAD request if using HTTP) […]
      (statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method))
    ) {
      this._options.method = 'GET' // Drop a possible entity and headers related to it

      this._requestBodyBuffers = []
      removeMatchingHeaders(/^content-/i, this._options.headers)
    } // Drop the Host header, as the redirect might lead to a different host

    var previousHostName =
      removeMatchingHeaders(/^host$/i, this._options.headers) ||
      url.parse(this._currentUrl).hostname // Create the redirected request

    var redirectUrl = url.resolve(this._currentUrl, location)
    debug('redirecting to', redirectUrl)
    this._isRedirect = true
    var redirectUrlParts = url.parse(redirectUrl)
    Object.assign(this._options, redirectUrlParts) // Drop the Authorization header if redirecting to another host

    if (redirectUrlParts.hostname !== previousHostName) {
      removeMatchingHeaders(/^authorization$/i, this._options.headers)
    } // Evaluate the beforeRedirect callback

    if (typeof this._options.beforeRedirect === 'function') {
      var responseDetails = {
        headers: response.headers,
      }

      try {
        this._options.beforeRedirect.call(null, this._options, responseDetails)
      } catch (err) {
        this.emit('error', err)
        return
      }

      this._sanitizeOptions(this._options)
    } // Perform the redirected request

    try {
      this._performRequest()
    } catch (cause) {
      var error = new RedirectionError(
        'Redirected request failed: ' + cause.message,
      )
      error.cause = cause
      this.emit('error', error)
    }
  } else {
    // The response is not a redirect; return it as-is
    response.responseUrl = this._currentUrl
    response.redirects = this._redirects
    this.emit('response', response) // Clean up

    this._requestBodyBuffers = []
  }
} // Wraps the key/value object of protocols with redirect functionality

function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024,
  } // Wrap each protocol

  var nativeProtocols = {}
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ':'
    var nativeProtocol = (nativeProtocols[protocol] = protocols[scheme])
    var wrappedProtocol = (exports[scheme] = Object.create(nativeProtocol)) // Executes a request, following redirects

    function request(input, options, callback) {
      // Parse parameters
      if (typeof input === 'string') {
        var urlStr = input

        try {
          input = urlToOptions(new URL(urlStr))
        } catch (err) {
          /* istanbul ignore next */
          input = url.parse(urlStr)
        }
      } else if (URL && input instanceof URL) {
        input = urlToOptions(input)
      } else {
        callback = options
        options = input
        input = {
          protocol: protocol,
        }
      }

      if (typeof options === 'function') {
        callback = options
        options = null
      } // Set defaults

      options = Object.assign(
        {
          maxRedirects: exports.maxRedirects,
          maxBodyLength: exports.maxBodyLength,
        },
        input,
        options,
      )
      options.nativeProtocols = nativeProtocols
      assert.equal(options.protocol, protocol, 'protocol mismatch')
      debug('options', options)
      return new RedirectableRequest(options, callback)
    } // Executes a GET request, following redirects

    function get(input, options, callback) {
      var wrappedRequest = wrappedProtocol.request(input, options, callback)
      wrappedRequest.end()
      return wrappedRequest
    } // Expose the properties on the wrapped protocol

    Object.defineProperties(wrappedProtocol, {
      request: {
        value: request,
        configurable: true,
        enumerable: true,
        writable: true,
      },
      get: {
        value: get,
        configurable: true,
        enumerable: true,
        writable: true,
      },
    })
  })
  return exports
}
/* istanbul ignore next */

function noop() {
  /* empty */
} // from https://github.com/nodejs/node/blob/master/lib/internal/url.js

function urlToOptions(urlObject) {
  var options = {
    protocol: urlObject.protocol,
    hostname: urlObject.hostname.startsWith('[')
      ? /* istanbul ignore next */
        urlObject.hostname.slice(1, -1)
      : urlObject.hostname,
    hash: urlObject.hash,
    search: urlObject.search,
    pathname: urlObject.pathname,
    path: urlObject.pathname + urlObject.search,
    href: urlObject.href,
  }

  if (urlObject.port !== '') {
    options.port = Number(urlObject.port)
  }

  return options
}

function removeMatchingHeaders(regex, headers) {
  var lastValue

  for (var header in headers) {
    if (regex.test(header)) {
      lastValue = headers[header]
      delete headers[header]
    }
  }

  return lastValue
}

function createErrorType(code, defaultMessage) {
  function CustomError(message) {
    Error.captureStackTrace(this, this.constructor)
    this.message = message || defaultMessage
  }

  CustomError.prototype = new Error()
  CustomError.prototype.constructor = CustomError
  CustomError.prototype.name = 'Error [' + code + ']'
  CustomError.prototype.code = code
  return CustomError
} // Exports

followRedirects$1.exports = wrap({
  http: http$1,
  https: https$1,
})
followRedirects$1.exports.wrap = wrap

var httpNative = require$$0__default$2['default'],
  httpsNative = require$$1__default['default'],
  web_o = webOutgoing,
  common$1 = common$3,
  followRedirects = followRedirects$1.exports
web_o = Object.keys(web_o).map(function (pass) {
  return web_o[pass]
})
var nativeAgents = {
  http: httpNative,
  https: httpsNative,
}
/*!
 * Array of passes.
 *
 * A `pass` is just a function that is executed on `req, res, options`
 * so that you can easily add new checks while still keeping the base
 * flexible.
 */

var webIncoming = {
  /**
   * Sets `content-length` to '0' if request is of DELETE type.
   *
   * @param {ClientRequest} Req Request object
   * @param {IncomingMessage} Res Response object
   * @param {Object} Options Config object passed to the proxy
   *
   * @api private
   */
  deleteLength: function deleteLength(req, res, options) {
    if (
      (req.method === 'DELETE' || req.method === 'OPTIONS') &&
      !req.headers['content-length']
    ) {
      req.headers['content-length'] = '0'
      delete req.headers['transfer-encoding']
    }
  },

  /**
   * Sets timeout in request socket if it was specified in options.
   *
   * @param {ClientRequest} Req Request object
   * @param {IncomingMessage} Res Response object
   * @param {Object} Options Config object passed to the proxy
   *
   * @api private
   */
  timeout: function timeout(req, res, options) {
    if (options.timeout) {
      req.socket.setTimeout(options.timeout)
    }
  },

  /**
   * Sets `x-forwarded-*` headers if specified in config.
   *
   * @param {ClientRequest} Req Request object
   * @param {IncomingMessage} Res Response object
   * @param {Object} Options Config object passed to the proxy
   *
   * @api private
   */
  XHeaders: function XHeaders(req, res, options) {
    if (!options.xfwd) return
    var encrypted = req.isSpdy || common$1.hasEncryptedConnection(req)
    var values = {
      for: req.connection.remoteAddress || req.socket.remoteAddress,
      port: common$1.getPort(req),
      proto: encrypted ? 'https' : 'http',
    }
    ;['for', 'port', 'proto'].forEach(function (header) {
      req.headers['x-forwarded-' + header] =
        (req.headers['x-forwarded-' + header] || '') +
        (req.headers['x-forwarded-' + header] ? ',' : '') +
        values[header]
    })
    req.headers['x-forwarded-host'] =
      req.headers['x-forwarded-host'] || req.headers['host'] || ''
  },

  /**
   * Does the actual proxying. If `forward` is enabled fires up
   * a ForwardStream, same happens for ProxyStream. The request
   * just dies otherwise.
   *
   * @param {ClientRequest} Req Request object
   * @param {IncomingMessage} Res Response object
   * @param {Object} Options Config object passed to the proxy
   *
   * @api private
   */
  stream: function stream(req, res, options, _, server, clb) {
    // And we begin!
    server.emit('start', req, res, options.target || options.forward)
    var agents = options.followRedirects ? followRedirects : nativeAgents
    var http = agents.http
    var https = agents.https

    if (options.forward) {
      // If forward enable, so just pipe the request
      var forwardReq = (
        options.forward.protocol === 'https:' ? https : http
      ).request(
        common$1.setupOutgoing(options.ssl || {}, options, req, 'forward'),
      ) // error handler (e.g. ECONNRESET, ECONNREFUSED)
      // Handle errors on incoming request as well as it makes sense to

      var forwardError = createErrorHandler(forwardReq, options.forward)
      req.on('error', forwardError)
      forwardReq.on('error', forwardError)
      ;(options.buffer || req).pipe(forwardReq)

      if (!options.target) {
        return res.end()
      }
    } // Request initalization

    var proxyReq = (
      options.target.protocol === 'https:' ? https : http
    ).request(common$1.setupOutgoing(options.ssl || {}, options, req)) // Enable developers to modify the proxyReq before headers are sent

    proxyReq.on('socket', function (socket) {
      if (server && !proxyReq.getHeader('expect')) {
        server.emit('proxyReq', proxyReq, req, res, options)
      }
    }) // allow outgoing socket to timeout so that we could
    // show an error page at the initial request

    if (options.proxyTimeout) {
      proxyReq.setTimeout(options.proxyTimeout, function () {
        proxyReq.abort()
      })
    } // Ensure we abort proxy if request is aborted

    req.on('aborted', function () {
      proxyReq.abort()
    }) // handle errors in proxy and incoming request, just like for forward proxy

    var proxyError = createErrorHandler(proxyReq, options.target)
    req.on('error', proxyError)
    proxyReq.on('error', proxyError)

    function createErrorHandler(proxyReq, url) {
      return function proxyError(err) {
        if (req.socket.destroyed && err.code === 'ECONNRESET') {
          server.emit('econnreset', err, req, res, url)
          return proxyReq.abort()
        }

        if (clb) {
          clb(err, req, res, url)
        } else {
          server.emit('error', err, req, res, url)
        }
      }
    }

    ;(options.buffer || req).pipe(proxyReq)
    proxyReq.on('response', function (proxyRes) {
      if (server) {
        server.emit('proxyRes', proxyRes, req, res)
      }

      if (!res.headersSent && !options.selfHandleResponse) {
        for (var i = 0; i < web_o.length; i++) {
          if (web_o[i](req, res, proxyRes, options)) {
            break
          }
        }
      }

      if (!res.finished) {
        // Allow us to listen when the proxy has completed
        proxyRes.on('end', function () {
          if (server) server.emit('end', req, res, proxyRes)
        }) // We pipe to the response unless its expected to be handled by the user

        if (!options.selfHandleResponse) proxyRes.pipe(res)
      } else {
        if (server) server.emit('end', req, res, proxyRes)
      }
    })
  },
}

var http = require$$0__default$2['default'],
  https = require$$1__default['default'],
  common = common$3
/*!
 * Array of passes.
 *
 * A `pass` is just a function that is executed on `req, socket, options`
 * so that you can easily add new checks while still keeping the base
 * flexible.
 */

/*
 * Websockets Passes
 *
 */

var wsIncoming = {
  /**
   * WebSocket requests must have the `GET` method and
   * the `upgrade:websocket` header
   *
   * @param {ClientRequest} Req Request object
   * @param {Socket} Websocket
   *
   * @api private
   */
  checkMethodAndHeader: function checkMethodAndHeader(req, socket) {
    if (req.method !== 'GET' || !req.headers.upgrade) {
      socket.destroy()
      return true
    }

    if (req.headers.upgrade.toLowerCase() !== 'websocket') {
      socket.destroy()
      return true
    }
  },

  /**
   * Sets `x-forwarded-*` headers if specified in config.
   *
   * @param {ClientRequest} Req Request object
   * @param {Socket} Websocket
   * @param {Object} Options Config object passed to the proxy
   *
   * @api private
   */
  XHeaders: function XHeaders(req, socket, options) {
    if (!options.xfwd) return
    var values = {
      for: req.connection.remoteAddress || req.socket.remoteAddress,
      port: common.getPort(req),
      proto: common.hasEncryptedConnection(req) ? 'wss' : 'ws',
    }
    ;['for', 'port', 'proto'].forEach(function (header) {
      req.headers['x-forwarded-' + header] =
        (req.headers['x-forwarded-' + header] || '') +
        (req.headers['x-forwarded-' + header] ? ',' : '') +
        values[header]
    })
  },

  /**
   * Does the actual proxying. Make the request and upgrade it
   * send the Switching Protocols request and pipe the sockets.
   *
   * @param {ClientRequest} Req Request object
   * @param {Socket} Websocket
   * @param {Object} Options Config object passed to the proxy
   *
   * @api private
   */
  stream: function stream(req, socket, options, head, server, clb) {
    var createHttpHeader = function (line, headers) {
      return (
        Object.keys(headers)
          .reduce(
            function (head, key) {
              var value = headers[key]

              if (!Array.isArray(value)) {
                head.push(key + ': ' + value)
                return head
              }

              for (var i = 0; i < value.length; i++) {
                head.push(key + ': ' + value[i])
              }

              return head
            },
            [line],
          )
          .join('\r\n') + '\r\n\r\n'
      )
    }

    common.setupSocket(socket)
    if (head && head.length) socket.unshift(head)
    var proxyReq = (
      common.isSSL.test(options.target.protocol) ? https : http
    ).request(common.setupOutgoing(options.ssl || {}, options, req)) // Enable developers to modify the proxyReq before headers are sent

    if (server) {
      server.emit('proxyReqWs', proxyReq, req, socket, options, head)
    } // Error Handler

    proxyReq.on('error', onOutgoingError)
    proxyReq.on('response', function (res) {
      // if upgrade event isn't going to happen, close the socket
      if (!res.upgrade) {
        socket.write(
          createHttpHeader(
            'HTTP/' +
              res.httpVersion +
              ' ' +
              res.statusCode +
              ' ' +
              res.statusMessage,
            res.headers,
          ),
        )
        res.pipe(socket)
      }
    })
    proxyReq.on('upgrade', function (proxyRes, proxySocket, proxyHead) {
      proxySocket.on('error', onOutgoingError) // Allow us to listen when the websocket has completed

      proxySocket.on('end', function () {
        server.emit('close', proxyRes, proxySocket, proxyHead)
      }) // The pipe below will end proxySocket if socket closes cleanly, but not
      // if it errors (eg, vanishes from the net and starts returning
      // EHOSTUNREACH). We need to do that explicitly.

      socket.on('error', function () {
        proxySocket.end()
      })
      common.setupSocket(proxySocket)
      if (proxyHead && proxyHead.length) proxySocket.unshift(proxyHead) //
      // Remark: Handle writing the headers to the socket when switching protocols
      // Also handles when a header is an array
      //

      socket.write(
        createHttpHeader('HTTP/1.1 101 Switching Protocols', proxyRes.headers),
      )
      proxySocket.pipe(socket).pipe(proxySocket)
      server.emit('open', proxySocket)
      server.emit('proxySocket', proxySocket) //DEPRECATED.
    })
    return proxyReq.end() // XXX: CHECK IF THIS IS THIS CORRECT

    function onOutgoingError(err) {
      if (clb) {
        clb(err, req, socket)
      } else {
        server.emit('error', err, req, socket)
      }

      socket.end()
    }
  },
}

;(function (module) {
  var httpProxy = module.exports,
    extend = require$$0__default['default']._extend,
    parse_url = require$$0__default$1['default'].parse,
    EE3 = eventemitter3.exports,
    http = require$$0__default$2['default'],
    https = require$$1__default['default'],
    web = webIncoming,
    ws = wsIncoming
  httpProxy.Server = ProxyServer
  /**
   * Returns a function that creates the loader for
   * either `ws` or `web`'s  passes.
   *
   * Examples:
   *
   *    httpProxy.createRightProxy('ws')
   *    // => [Function]
   *
   * @param {String} Type Either 'ws' or 'web'
   *
   * @return {Function} Loader Function that when called returns an iterator for the right passes
   *
   * @api private
   */

  function createRightProxy(type) {
    return function (options) {
      return function (
        req,
        res,
        /*, [head], [opts] */
      ) {
        var passes = type === 'ws' ? this.wsPasses : this.webPasses,
          args = [].slice.call(arguments),
          cntr = args.length - 1,
          head,
          cbl
        /* optional args parse begin */

        if (typeof args[cntr] === 'function') {
          cbl = args[cntr]
          cntr--
        }

        var requestOptions = options

        if (!(args[cntr] instanceof Buffer) && args[cntr] !== res) {
          //Copy global options
          requestOptions = extend({}, options) //Overwrite with request options

          extend(requestOptions, args[cntr])
          cntr--
        }

        if (args[cntr] instanceof Buffer) {
          head = args[cntr]
        }
        /* optional args parse end */

        ;['target', 'forward'].forEach(function (e) {
          if (typeof requestOptions[e] === 'string')
            requestOptions[e] = parse_url(requestOptions[e])
        })

        if (!requestOptions.target && !requestOptions.forward) {
          return this.emit(
            'error',
            new Error('Must provide a proper URL as target'),
          )
        }

        for (var i = 0; i < passes.length; i++) {
          /**
           * Call of passes functions
           * pass(req, res, options, head)
           *
           * In WebSockets case the `res` variable
           * refer to the connection socket
           * pass(req, socket, options, head)
           */
          if (passes[i](req, res, requestOptions, head, this, cbl)) {
            // passes can return a truthy value to halt the loop
            break
          }
        }
      }
    }
  }

  httpProxy.createRightProxy = createRightProxy

  function ProxyServer(options) {
    EE3.call(this)
    options = options || {}
    options.prependPath = options.prependPath === false ? false : true
    this.web = this.proxyRequest = createRightProxy('web')(options)
    this.ws = this.proxyWebsocketRequest = createRightProxy('ws')(options)
    this.options = options
    this.webPasses = Object.keys(web).map(function (pass) {
      return web[pass]
    })
    this.wsPasses = Object.keys(ws).map(function (pass) {
      return ws[pass]
    })
    this.on('error', this.onError, this)
  }

  require$$0__default['default'].inherits(ProxyServer, EE3)

  ProxyServer.prototype.onError = function (err) {
    //
    // Remark: Replicate node core behavior using EE3
    // so we force people to handle their own errors
    //
    if (this.listeners('error').length === 1) {
      throw err
    }
  }

  ProxyServer.prototype.listen = function (port, hostname) {
    var self = this,
      closure = function (req, res) {
        self.web(req, res)
      }

    this._server = this.options.ssl
      ? https.createServer(this.options.ssl, closure)
      : http.createServer(closure)

    if (this.options.ws) {
      this._server.on('upgrade', function (req, socket, head) {
        self.ws(req, socket, head)
      })
    }

    this._server.listen(port, hostname)

    return this
  }

  ProxyServer.prototype.close = function (callback) {
    var self = this

    if (this._server) {
      this._server.close(done)
    } // Wrap callback to nullify server after all open connections are closed.

    function done() {
      self._server = null

      if (callback) {
        callback.apply(null, arguments)
      }
    }
  }

  ProxyServer.prototype.before = function (type, passName, callback) {
    if (type !== 'ws' && type !== 'web') {
      throw new Error('type must be `web` or `ws`')
    }

    var passes = type === 'ws' ? this.wsPasses : this.webPasses,
      i = false
    passes.forEach(function (v, idx) {
      if (v.name === passName) i = idx
    })
    if (i === false) throw new Error('No such pass')
    passes.splice(i, 0, callback)
  }

  ProxyServer.prototype.after = function (type, passName, callback) {
    if (type !== 'ws' && type !== 'web') {
      throw new Error('type must be `web` or `ws`')
    }

    var passes = type === 'ws' ? this.wsPasses : this.webPasses,
      i = false
    passes.forEach(function (v, idx) {
      if (v.name === passName) i = idx
    })
    if (i === false) throw new Error('No such pass')
    passes.splice(i++, 0, callback)
  }
})(httpProxy$3)

var ProxyServer = httpProxy$3.exports.Server
/**
 * Creates the proxy server.
 *
 * Examples:
 *
 *    httpProxy.createProxyServer({ .. }, 8000)
 *    // => '{ web: [Function], ws: [Function] ... }'
 *
 * @param {Object} Options Config object passed to the proxy
 *
 * @return {Object} Proxy Proxy object with handlers for `ws` and `web` requests
 *
 * @api public
 */

function createProxyServer(options) {
  /*
   *  `options` is needed and it must have the following layout:
   *
   *  {
   *    target : <url string to be parsed with the url module>
   *    forward: <url string to be parsed with the url module>
   *    agent  : <object to be passed to http(s).request>
   *    ssl    : <object to be passed to https.createServer()>
   *    ws     : <true/false, if you want to proxy websockets>
   *    xfwd   : <true/false, adds x-forward headers>
   *    secure : <true/false, verify SSL certificate>
   *    toProxy: <true/false, explicitly specify if we are proxying to another proxy>
   *    prependPath: <true/false, Default: true - specify whether you want to prepend the target's path to the proxy path>
   *    ignorePath: <true/false, Default: false - specify whether you want to ignore the proxy path of the incoming request>
   *    localAddress : <Local interface string to bind for outgoing connections>
   *    changeOrigin: <true/false, Default: false - changes the origin of the host header to the target URL>
   *    preserveHeaderKeyCase: <true/false, Default: false - specify whether you want to keep letter case of response header key >
   *    auth   : Basic authentication i.e. 'user:password' to compute an Authorization header.
   *    hostRewrite: rewrites the location hostname on (201/301/302/307/308) redirects, Default: null.
   *    autoRewrite: rewrites the location host/port on (201/301/302/307/308) redirects based on requested host/port. Default: false.
   *    protocolRewrite: rewrites the location protocol on (201/301/302/307/308) redirects to 'http' or 'https'. Default: null.
   *  }
   *
   *  NOTE: `options.ws` and `options.ssl` are optional.
   *    `options.target and `options.forward` cannot be
   *    both missing
   *  }
   */
  return new ProxyServer(options)
}

ProxyServer.createProxyServer = createProxyServer
ProxyServer.createServer = createProxyServer
ProxyServer.createProxy = createProxyServer
/**
 * Export the proxy "Server" as the main export.
 */

var httpProxy$2 = ProxyServer

/*!
 * Caron dimonio, con occhi di bragia
 * loro accennando, tutte le raccoglie;
 * batte col remo qualunque s’adagia
 *
 * Charon the demon, with the eyes of glede,
 * Beckoning to them, collects them all together,
 * Beats with his oar whoever lags behind
 *
 *          Dante - The Divine Comedy (Canto III)
 */
var httpProxy$1 = httpProxy$2

/**
 * @fileOverview 负责读取 server.conf 转发规则。
 *
 * 支持 rewrite redirect 两种重定向规则。
 *
 * ```
 * rewrite ^\/testpage /example/page/testpage
 *
 * rewrite ^\/ajaxHander /test/page/ajaxHandler.js
 * rewrite ^\/somejsonfile /test/page/data.json
 * ```
 */
var fs$2 = require$$1__default$1['default']
var parseUrl = require$$0__default$1['default'].parse
var httpProxy = httpProxy$1

function escapeHtml(html) {
  return String(html)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function rewriteParser(file) {
  var rules = []

  function Ruler(type, reg, to) {
    return {
      type: type,
      reg: reg,
      to: to,
    }
  }

  if (!Array.isArray(file)) {
    file = [file]
  }
  file.forEach(function (file) {
    if (!fs$2.existsSync(file)) {
      return null
    }

    var content = fs$2.readFileSync(file, 'utf-8')
    var lines = content.split(/\r\n|\n/)
    var rrule = /^(rewrite|redirect|proxy)\s+([^\s]+)\s+([^\s]+)$/i
    lines.forEach(function (line) {
      var m = rrule.exec(line)

      if (!m) {
        return
      }

      rules.push(new Ruler(m[1].toLowerCase(), new RegExp(m[2], 'i'), m[3]))
    })
  })
  return {
    match: function (url) {
      var found
      var arr = [url.path, url.pathname]
      rules.every(function (ruler) {
        arr.every(function (url) {
          var m = url.match(ruler.reg)

          if (m) {
            found = ruler
            found.match = m
            return false
          }

          return !found
        })
        return !found
      })
      return found
    },
  }
}

var rewrite = function (options) {
  var file = options.rewrite_file
  var parser // todo cache the file.

  function lazyload() {
    // 每次都加载好了，server.conf 有可能经常改动。
    parser =
      /*parser || */
      rewriteParser(file)
  }

  var proxy = httpProxy.createProxyServer({
    changeOrigin: true,
    autoRewrite: true,
  })
  proxy.on('error', function (error, req, res) {
    var json
    console.log('proxy error', error)

    if (!res.headersSent) {
      res.writeHead(500, {
        'content-type': 'application/json',
      })
    }

    json = {
      error: 'proxy_error',
      reason: error.message,
    }
    res.end(JSON.stringify(json))
  })
  return function (req, res, next) {
    lazyload()
    var url = parseUrl(req.url)
    var ruler = parser && parser.match(url)

    if (ruler) {
      var to = ruler.to.replace(/\$(\d+)/g, function (all, index) {
        return ruler.match[index] || ''
      })

      switch (ruler.type) {
        case 'rewrite':
          req.originalUrl = req.originalUrl || req.url
          req.url = to
          break

        case 'proxy':
          var target = parseUrl(to)
          req.originalUrl = req.originalUrl || req.url
          req.url =
            target.path +
            (target.search
              ? url.query
                ? '&' + url.query
                : ''
              : url.search || '')
          proxy.web(req, res, {
            target: target.protocol + '//' + target.host,
          })
          return

        case 'redirect':
        default:
          res.statusCode = 303
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.setHeader('Location', to)
          res.end(
            'Redirecting to <a href="' +
              escapeHtml(to) +
              '">' +
              escapeHtml(to) +
              '</a>\n',
          )
          return
      }
    }

    next()
  }
}

/**
 * @fileOverview 提供预览 tpl 页面功能
 * 数据自动关联 test/ns/xxx.json 文件。
 * 同时后续再关联 test/ns/xxx.js 文件进行动态补充。
 *
 * 比如: 预览 ns/page/index.tpl 页面时。
 * 数据来源自动读取自 test/ns/page/index.json
 * 同时 test/ns/page/index.js 脚本可以对数据进行进一步动态扩展。
 */
var path$1 = path__default['default']
var fs$1 = require$$1__default$1['default']

function mixin(a, b) {
  if (a && b) {
    for (var key in b) {
      a[key] = b[key]
    }
  }

  return a
}

var preview = function (options) {
  var rpage = /^\/([\w0-9_\-]+)\/page\/(.*)$/i
  var tplroot = path$1.resolve(options.view_path)
  var dirs = Array.isArray(options.data_path)
    ? options.data_path
    : [options.data_path]
  dirs = dirs.map(function (dir) {
    return path$1.resolve(dir)
  })

  function previewPage(ns, page, req, res, next) {
    var tplfile, jsonfile, jsfile, m
    var data = {}
    var rendered = false
    m = /^(.*)\.tpl$/i.exec(page)

    if (m) {
      page = m[1]
    }

    tplfile = path$1.join(tplroot, ns, page + '.tpl')

    if (!fs$1.existsSync(tplfile)) {
      return next()
    }

    dirs.every(function (dir) {
      var filepath = path$1.join(dir, ns, 'page', page + '.json')

      if (fs$1.existsSync(filepath)) {
        jsonfile = filepath
      }

      return !jsonfile
    })

    if (jsonfile) {
      try {
        delete require.cache[require.resolve(jsonfile)]
        data = commonjsRequire(jsonfile)
      } catch (err) {
        data = {}
      }
    }

    render = function (locals) {
      if (rendered) {
        return
      }

      rendered = true
      var tpl = ns + '/' + page + '.tpl'
      locals && mixin(data, locals)
      res.render(tpl, data)
    }

    jsfile = path$1.join(dataroot, ns, 'page', page + '.js')

    if (fs$1.existsSync(jsfile)) {
      delete require.cache[require.resolve(jsfile)]
      res.locals = res.locals || {}
      res.locals = mixin(res.locals, data)
      commonjsRequire(jsfile)(req, res, render)
    } else {
      render(data)
    }
  }

  return function (req, res, next) {
    var url = req.url
    var match = rpage.exec(url) // 如果页面满足  namespace/page/xxxx 这样的路径规则。

    if (match) {
      previewPage(match[1], match[2], req, res, next)
    } else {
      next()
    }
  }
}

/**
 * @fileOverview 添加 js 脚本页面功能。
 * 让 test 目录的 js 脚本能够想 jsp, php 脚本一样运行。
 */
var path = path__default['default']
var fs = require$$1__default$1['default']

var script = function (options) {
  var dataroot = options.data_path
  var rpage = /^\/(?:test|mock)\/(.*\.(js|json))(?:$|\?)/i

  function execScript(page, type, req, res, next) {
    var dirs = Array.isArray(dataroot) ? dataroot : [dataroot]
    var file
    dirs.every(function (dir) {
      var filepath = path.join(dir, page)

      if (fs.existsSync(filepath)) {
        file = filepath
      }

      return !file
    }) // 文件不存在，则跳过。

    if (!file) {
      return next()
    }

    if (type === 'js') {
      try {
        delete require.cache[require.resolve(file)]
        commonjsRequire(file)(req, res, next)
      } catch (err) {
        next(err)
      }
    } else {
      fs.readFile(file, function (err, buf) {
        if (err) return next(err)
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Content-Length': buf.length,
        })
        res.end(buf)
      })
    }
  }

  return function (req, res, next) {
    var url = req.url
    var match = rpage.exec(url)

    if (match) {
      execScript(match[1], match[2], req, res, next)
    } else {
      next()
    }
  }
}

function mock$1(root) {
  var options = {
    view_path: '',
    // 避免报错。
    rewrite_file: [
      path__default['default'].join(root, 'server.conf'),
      path__default['default'].join(root, 'config', 'server.conf'),
      path__default['default'].join(root, 'mock', 'server.conf'),
    ],
    data_path: [
      path__default['default'].join(root, 'test'),
      path__default['default'].join(root, 'mock'),
    ],
  }
  return function (request, response, next) {
    ;[
      rewrite(options),
      bodyParser__default['default'].urlencoded({
        extended: false,
      }),
      bodyParser__default['default'].json(),
      preview(options),
      script(options),
    ].reduceRight(function (next, middleware) {
      return function () {
        middleware(request, response, next)
      }
    }, next)()
  }
}

function getMiddleware(name, handler) {
  return function () {
    return {
      route: '',
      handle: handler.apply(void 0, arguments),
      id: 'Browsersync '.concat(name, ' Middleware'),
    }
  }
}

var middleware = {
  logger: getMiddleware('Logger', morgan__default['default']),
  mock: getMiddleware('Mock', mock$1),
  directory: function directory(root) {
    return getMiddleware(
      'Server Directory',
      serveDirectory__default['default'],
    )(root, serveDirectoryThemeOcticons__default['default'])
  },
}

var mock = middleware.mock,
  logger = middleware.logger,
  directory = middleware.directory
var defaultOptions = merge__default['default']({}, defaultConfig, {
  server: {
    directory: true,
  },
  watchEvents: ['change', 'add', 'addDir', 'unlink', 'unlinkDir'],
  ghostMode: false,
  reloadDebounce: 500,
  notify: false,
  online: false,
})
var overrideOptions = {
  open: false,
  snippetOptions: {
    rule: {
      match: /<\/body>|<!--\s*browser-sync-script\s*-->/i,
      fn: function fn(snippet, match) {
        return snippet + match
      },
    },
  },
}

function getType(object) {
  return Object.prototype.toString.call(object).slice(8, -1)
}

function getUserConfig(path) {
  var config = {}

  try {
    config = require(path)

    if (!config.server || getType(config.server) === 'String') {
      config.server = {
        directory: true,
      }
    }

    delete config.port
  } catch (_unused) {}

  return config
}

function parseMiddleware(middleware) {
  var type = getType(middleware)

  if (type !== 'Array') {
    if (type === 'Boolean') {
      return []
    }

    return [middleware]
  }

  return middleware
}

function getConfig(bs, argv) {
  var userConfig = getUserConfig(
    path__default['default'].resolve(
      argv.context,
      argv.bsConfig || bs.instance.config.userFile,
    ),
  )
  var config = merge__default['default'](
    {},
    defaultOptions,
    userConfig,
    overrideOptions,
    {
      server: {
        baseDir: argv.root,
      },
      port: argv.port, // https: argv.https
    },
  )
  config.middleware = parseMiddleware(config.middleware)
  config.middleware.push(
    // logger
    logger('short'), // mock
    mock(argv.root),
  ) // serveDirectory

  if (config.server && config.server.directory) {
    config.middleware.push(directory(argv.root))
    config.server.directory = false
  }

  return config
}

function now() {
  var d = new Date()
  var string = [d.getHours(), d.getMinutes(), d.getSeconds()]
    .join(':')
    .replace(/\b\d\b/g, '0$&')
  string += '.'.concat('00'.concat(d.getMilliseconds()).slice(-3))
  return string
}

function logEvent(event, path) {
  console.log('%s %s: %s', now(), '         '.concat(event).slice(-9), path)
}

function onInit(config) {
  return function () {
    console.log(
      'Listening on %s://127.0.0.1:%d',
      config.https ? 'https' : 'http',
      config.port,
    )
  }
}

function watch(bs, root) {
  return function (event, file) {
    var relativePath = path__default['default'].relative(root, file)

    if (
      !relativePath ||
      relativePath === 'server.log' ||
      /(?:^|[/\\])[._]./.test(relativePath)
    ) {
      return
    }

    bs.reload(file)
    logEvent(event, relativePath)
  }
}

function signalTerminate(bs) {
  process__default['default'].on('SIGTERM', function () {
    console.log(
      'Recive quit signal in worker %s.',
      process__default['default'].pid,
    )
    bs.exit()
  })
}

function replaceScriptTag(bs) {
  // replace scriptTag template with mine
  bs.instance.config.templates.scriptTag = path__default['default'].join(
    __dirname,
    'templates/script-tags.tmpl',
  )
}

function startServer(argv) {
  var bs = browserSync__default['default'].create()
  var bsConfig = getConfig(bs, argv)
  bs.exit()
  bs.init(bsConfig, onInit(bsConfig))
  bs.watch(argv.root, watch(bs, argv.root))
  replaceScriptTag(bs)
  signalTerminate(bs)
}

startServer(yargs__default['default'].argv)
