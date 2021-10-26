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

var global$D = // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  (function () {
    return this
  })() ||
  Function('return this')()

var objectGetOwnPropertyDescriptor = {}

var fails$c = function (exec) {
  try {
    return !!exec()
  } catch (error) {
    return true
  }
}

var fails$b = fails$c // Detect IE8's incomplete defineProperty implementation

var descriptors = !fails$b(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return (
    Object.defineProperty({}, 1, {
      get: function () {
        return 7
      },
    })[1] != 7
  )
})

var call$c = Function.prototype.call
var functionCall = call$c.bind
  ? call$c.bind(call$c)
  : function () {
      return call$c.apply(call$c, arguments)
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

var FunctionPrototype$2 = Function.prototype
var bind$6 = FunctionPrototype$2.bind
var call$b = FunctionPrototype$2.call
var callBind = bind$6 && bind$6.bind(call$b)
var functionUncurryThis = bind$6
  ? function (fn) {
      return fn && callBind(call$b, fn)
    }
  : function (fn) {
      return (
        fn &&
        function () {
          return call$b.apply(fn, arguments)
        }
      )
    }

var uncurryThis$h = functionUncurryThis
var toString$6 = uncurryThis$h({}.toString)
var stringSlice$4 = uncurryThis$h(''.slice)

var classofRaw$1 = function (it) {
  return stringSlice$4(toString$6(it), 8, -1)
}

var global$C = global$D
var uncurryThis$g = functionUncurryThis
var fails$a = fails$c
var classof$7 = classofRaw$1
var Object$4 = global$C.Object
var split = uncurryThis$g(''.split) // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails$a(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object$4('z').propertyIsEnumerable(0)
})
  ? function (it) {
      return classof$7(it) == 'String' ? split(it, '') : Object$4(it)
    }
  : Object$4

var global$B = global$D
var TypeError$e = global$B.TypeError // `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible

var requireObjectCoercible$4 = function (it) {
  if (it == undefined) throw TypeError$e("Can't call method on " + it)
  return it
}

var IndexedObject = indexedObject
var requireObjectCoercible$3 = requireObjectCoercible$4

var toIndexedObject$4 = function (it) {
  return IndexedObject(requireObjectCoercible$3(it))
}

// https://tc39.es/ecma262/#sec-iscallable

var isCallable$g = function (argument) {
  return typeof argument == 'function'
}

var isCallable$f = isCallable$g

var isObject$7 = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$f(it)
}

var global$A = global$D
var isCallable$e = isCallable$g

var aFunction = function (argument) {
  return isCallable$e(argument) ? argument : undefined
}

var getBuiltIn$7 = function (namespace, method) {
  return arguments.length < 2
    ? aFunction(global$A[namespace])
    : global$A[namespace] && global$A[namespace][method]
}

var uncurryThis$f = functionUncurryThis
var objectIsPrototypeOf = uncurryThis$f({}.isPrototypeOf)

var getBuiltIn$6 = getBuiltIn$7
var engineUserAgent = getBuiltIn$6('navigator', 'userAgent') || ''

var global$z = global$D
var userAgent$3 = engineUserAgent
var process$4 = global$z.process
var Deno = global$z.Deno
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
var V8_VERSION$1 = engineV8Version
var fails$9 = fails$c // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

var nativeSymbol =
  !!Object.getOwnPropertySymbols &&
  !fails$9(function () {
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

var global$y = global$D
var getBuiltIn$5 = getBuiltIn$7
var isCallable$d = isCallable$g
var isPrototypeOf$2 = objectIsPrototypeOf
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid
var Object$3 = global$y.Object
var isSymbol$2 = USE_SYMBOL_AS_UID$1
  ? function (it) {
      return typeof it == 'symbol'
    }
  : function (it) {
      var $Symbol = getBuiltIn$5('Symbol')
      return (
        isCallable$d($Symbol) &&
        isPrototypeOf$2($Symbol.prototype, Object$3(it))
      )
    }

var global$x = global$D
var String$5 = global$x.String

var tryToString$4 = function (argument) {
  try {
    return String$5(argument)
  } catch (error) {
    return 'Object'
  }
}

var global$w = global$D
var isCallable$c = isCallable$g
var tryToString$3 = tryToString$4
var TypeError$d = global$w.TypeError // `Assert: IsCallable(argument) is true`

var aCallable$5 = function (argument) {
  if (isCallable$c(argument)) return argument
  throw TypeError$d(tryToString$3(argument) + ' is not a function')
}

var aCallable$4 = aCallable$5 // `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod

var getMethod$4 = function (V, P) {
  var func = V[P]
  return func == null ? undefined : aCallable$4(func)
}

var global$v = global$D
var call$a = functionCall
var isCallable$b = isCallable$g
var isObject$6 = isObject$7
var TypeError$c = global$v.TypeError // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val
  if (
    pref === 'string' &&
    isCallable$b((fn = input.toString)) &&
    !isObject$6((val = call$a(fn, input)))
  )
    return val
  if (
    isCallable$b((fn = input.valueOf)) &&
    !isObject$6((val = call$a(fn, input)))
  )
    return val
  if (
    pref !== 'string' &&
    isCallable$b((fn = input.toString)) &&
    !isObject$6((val = call$a(fn, input)))
  )
    return val
  throw TypeError$c("Can't convert object to primitive value")
}

var shared$4 = {exports: {}}

var global$u = global$D // eslint-disable-next-line es/no-object-defineproperty -- safe

var defineProperty$1 = Object.defineProperty

var setGlobal$3 = function (key, value) {
  try {
    defineProperty$1(global$u, key, {
      value: value,
      configurable: true,
      writable: true,
    })
  } catch (error) {
    global$u[key] = value
  }

  return value
}

var global$t = global$D
var setGlobal$2 = setGlobal$3
var SHARED = '__core-js_shared__'
var store$3 = global$t[SHARED] || setGlobal$2(SHARED, {})
var sharedStore = store$3

var store$2 = sharedStore
;(shared$4.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {})
})('versions', []).push({
  version: '3.19.0',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)',
})

var global$s = global$D
var requireObjectCoercible$2 = requireObjectCoercible$4
var Object$2 = global$s.Object // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

var toObject$2 = function (argument) {
  return Object$2(requireObjectCoercible$2(argument))
}

var uncurryThis$e = functionUncurryThis
var toObject$1 = toObject$2
var hasOwnProperty = uncurryThis$e({}.hasOwnProperty) // `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty

var hasOwnProperty_1 =
  Object.hasOwn ||
  function hasOwn(it, key) {
    return hasOwnProperty(toObject$1(it), key)
  }

var uncurryThis$d = functionUncurryThis
var id = 0
var postfix = Math.random()
var toString$5 = uncurryThis$d((1.0).toString)

var uid$2 = function (key) {
  return (
    'Symbol(' +
    (key === undefined ? '' : key) +
    ')_' +
    toString$5(++id + postfix, 36)
  )
}

var global$r = global$D
var shared$3 = shared$4.exports
var hasOwn$8 = hasOwnProperty_1
var uid$1 = uid$2
var NATIVE_SYMBOL = nativeSymbol
var USE_SYMBOL_AS_UID = useSymbolAsUid
var WellKnownSymbolsStore = shared$3('wks')
var Symbol$1 = global$r.Symbol
var symbolFor = Symbol$1 && Symbol$1['for']
var createWellKnownSymbol = USE_SYMBOL_AS_UID
  ? Symbol$1
  : (Symbol$1 && Symbol$1.withoutSetter) || uid$1

var wellKnownSymbol$c = function (name) {
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

var global$q = global$D
var call$9 = functionCall
var isObject$5 = isObject$7
var isSymbol$1 = isSymbol$2
var getMethod$3 = getMethod$4
var ordinaryToPrimitive = ordinaryToPrimitive$1
var wellKnownSymbol$b = wellKnownSymbol$c
var TypeError$b = global$q.TypeError
var TO_PRIMITIVE = wellKnownSymbol$b('toPrimitive') // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

var toPrimitive$1 = function (input, pref) {
  if (!isObject$5(input) || isSymbol$1(input)) return input
  var exoticToPrim = getMethod$3(input, TO_PRIMITIVE)
  var result

  if (exoticToPrim) {
    if (pref === undefined) pref = 'default'
    result = call$9(exoticToPrim, input, pref)
    if (!isObject$5(result) || isSymbol$1(result)) return result
    throw TypeError$b("Can't convert object to primitive value")
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

var global$p = global$D
var isObject$4 = isObject$7
var document$3 = global$p.document // typeof document.createElement is 'object' in old IE

var EXISTS$1 = isObject$4(document$3) && isObject$4(document$3.createElement)

var documentCreateElement$1 = function (it) {
  return EXISTS$1 ? document$3.createElement(it) : {}
}

var DESCRIPTORS$6 = descriptors
var fails$8 = fails$c
var createElement$1 = documentCreateElement$1 // Thank's IE8 for his funny defineProperty

var ie8DomDefine =
  !DESCRIPTORS$6 &&
  !fails$8(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return (
      Object.defineProperty(createElement$1('div'), 'a', {
        get: function () {
          return 7
        },
      }).a != 7
    )
  })

var DESCRIPTORS$5 = descriptors
var call$8 = functionCall
var propertyIsEnumerableModule = objectPropertyIsEnumerable
var createPropertyDescriptor$1 = createPropertyDescriptor$2
var toIndexedObject$3 = toIndexedObject$4
var toPropertyKey$1 = toPropertyKey$2
var hasOwn$7 = hasOwnProperty_1
var IE8_DOM_DEFINE$1 = ie8DomDefine // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

objectGetOwnPropertyDescriptor.f = DESCRIPTORS$5
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
      if (hasOwn$7(O, P))
        return createPropertyDescriptor$1(
          !call$8(propertyIsEnumerableModule.f, O, P),
          O[P],
        )
    }

var objectDefineProperty = {}

var global$o = global$D
var isObject$3 = isObject$7
var String$4 = global$o.String
var TypeError$a = global$o.TypeError // `Assert: Type(argument) is Object`

var anObject$d = function (argument) {
  if (isObject$3(argument)) return argument
  throw TypeError$a(String$4(argument) + ' is not an object')
}

var global$n = global$D
var DESCRIPTORS$4 = descriptors
var IE8_DOM_DEFINE = ie8DomDefine
var anObject$c = anObject$d
var toPropertyKey = toPropertyKey$2
var TypeError$9 = global$n.TypeError // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

objectDefineProperty.f = DESCRIPTORS$4
  ? $defineProperty
  : function defineProperty(O, P, Attributes) {
      anObject$c(O)
      P = toPropertyKey(P)
      anObject$c(Attributes)
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

var DESCRIPTORS$3 = descriptors
var definePropertyModule$3 = objectDefineProperty
var createPropertyDescriptor = createPropertyDescriptor$2
var createNonEnumerableProperty$4 = DESCRIPTORS$3
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

var uncurryThis$c = functionUncurryThis
var isCallable$a = isCallable$g
var store$1 = sharedStore
var functionToString = uncurryThis$c(Function.toString) // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (!isCallable$a(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it)
  }
}

var inspectSource$4 = store$1.inspectSource

var global$m = global$D
var isCallable$9 = isCallable$g
var inspectSource$3 = inspectSource$4
var WeakMap$1 = global$m.WeakMap
var nativeWeakMap =
  isCallable$9(WeakMap$1) && /native code/.test(inspectSource$3(WeakMap$1))

var shared$2 = shared$4.exports
var uid = uid$2
var keys = shared$2('keys')

var sharedKey$2 = function (key) {
  return keys[key] || (keys[key] = uid(key))
}

var hiddenKeys$4 = {}

var NATIVE_WEAK_MAP = nativeWeakMap
var global$l = global$D
var uncurryThis$b = functionUncurryThis
var isObject$2 = isObject$7
var createNonEnumerableProperty$3 = createNonEnumerableProperty$4
var hasOwn$6 = hasOwnProperty_1
var shared$1 = sharedStore
var sharedKey$1 = sharedKey$2
var hiddenKeys$3 = hiddenKeys$4
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized'
var TypeError$8 = global$l.TypeError
var WeakMap = global$l.WeakMap
var set$1, get, has

var enforce = function (it) {
  return has(it) ? get(it) : set$1(it, {})
}

var getterFor = function (TYPE) {
  return function (it) {
    var state

    if (!isObject$2(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$8('Incompatible receiver, ' + TYPE + ' required')
    }

    return state
  }
}

if (NATIVE_WEAK_MAP || shared$1.state) {
  var store = shared$1.state || (shared$1.state = new WeakMap())
  var wmget = uncurryThis$b(store.get)
  var wmhas = uncurryThis$b(store.has)
  var wmset = uncurryThis$b(store.set)

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
  var STATE = sharedKey$1('state')
  hiddenKeys$3[STATE] = true

  set$1 = function (it, metadata) {
    if (hasOwn$6(it, STATE)) throw new TypeError$8(OBJECT_ALREADY_INITIALIZED)
    metadata.facade = it
    createNonEnumerableProperty$3(it, STATE, metadata)
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

var DESCRIPTORS$2 = descriptors
var hasOwn$5 = hasOwnProperty_1
var FunctionPrototype$1 = Function.prototype // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getDescriptor = DESCRIPTORS$2 && Object.getOwnPropertyDescriptor
var EXISTS = hasOwn$5(FunctionPrototype$1, 'name') // additional protection from minified / mangled / dropped function names

var PROPER =
  EXISTS &&
  function something() {
    /* empty */
  }.name === 'something'

var CONFIGURABLE =
  EXISTS &&
  (!DESCRIPTORS$2 ||
    (DESCRIPTORS$2 && getDescriptor(FunctionPrototype$1, 'name').configurable))
var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE,
}

var global$k = global$D
var isCallable$8 = isCallable$g
var hasOwn$4 = hasOwnProperty_1
var createNonEnumerableProperty$2 = createNonEnumerableProperty$4
var setGlobal$1 = setGlobal$3
var inspectSource$2 = inspectSource$4
var InternalStateModule$1 = internalState
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE
var getInternalState$2 = InternalStateModule$1.get
var enforceInternalState = InternalStateModule$1.enforce
var TEMPLATE = String(String).split('String')
;(redefine$5.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false
  var simple = options ? !!options.enumerable : false
  var noTargetGet = options ? !!options.noTargetGet : false
  var name = options && options.name !== undefined ? options.name : key
  var state

  if (isCallable$8(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']'
    }

    if (
      !hasOwn$4(value, 'name') ||
      (CONFIGURABLE_FUNCTION_NAME && value.name !== name)
    ) {
      createNonEnumerableProperty$2(value, 'name', name)
    }

    state = enforceInternalState(value)

    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '')
    }
  }

  if (O === global$k) {
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
    (isCallable$8(this) && getInternalState$2(this).source) ||
    inspectSource$2(this)
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
var max$1 = Math.max
var min$2 = Math.min // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex$1 = function (index, length) {
  var integer = toIntegerOrInfinity$3(index)
  return integer < 0 ? max$1(integer + length, 0) : min$2(integer, length)
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

var lengthOfArrayLike$2 = function (obj) {
  return toLength$1(obj.length)
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

var uncurryThis$a = functionUncurryThis
var hasOwn$3 = hasOwnProperty_1
var toIndexedObject$1 = toIndexedObject$4
var indexOf$1 = arrayIncludes.indexOf
var hiddenKeys$2 = hiddenKeys$4
var push$1 = uncurryThis$a([].push)

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$1(object)
  var i = 0
  var result = []
  var key

  for (key in O)
    !hasOwn$3(hiddenKeys$2, key) && hasOwn$3(O, key) && push$1(result, key) // Don't enum bug & hidden keys

  while (names.length > i)
    if (hasOwn$3(O, (key = names[i++]))) {
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

var getBuiltIn$4 = getBuiltIn$7
var uncurryThis$9 = functionUncurryThis
var getOwnPropertyNamesModule = objectGetOwnPropertyNames
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols
var anObject$b = anObject$d
var concat$1 = uncurryThis$9([].concat) // all object keys, includes non-enumerable and symbols

var ownKeys$1 =
  getBuiltIn$4('Reflect', 'ownKeys') ||
  function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$b(it))
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f
    return getOwnPropertySymbols
      ? concat$1(keys, getOwnPropertySymbols(it))
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

var fails$7 = fails$c
var isCallable$7 = isCallable$g
var replacement = /#|\.prototype\./

var isForced$2 = function (feature, detection) {
  var value = data[normalize(feature)]
  return value == POLYFILL
    ? true
    : value == NATIVE
    ? false
    : isCallable$7(detection)
    ? fails$7(detection)
    : !!detection
}

var normalize = (isForced$2.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase()
})

var data = (isForced$2.data = {})
var NATIVE = (isForced$2.NATIVE = 'N')
var POLYFILL = (isForced$2.POLYFILL = 'P')
var isForced_1 = isForced$2

var global$j = global$D
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
  options.name        - the .name of the function if it does not match the key
*/

var _export = function (options, source) {
  var TARGET = options.target
  var GLOBAL = options.global
  var STATIC = options.stat
  var FORCED, target, key, targetProperty, sourceProperty, descriptor

  if (GLOBAL) {
    target = global$j
  } else if (STATIC) {
    target = global$j[TARGET] || setGlobal(TARGET, {})
  } else {
    target = (global$j[TARGET] || {}).prototype
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
        createNonEnumerableProperty$1(sourceProperty, 'sham', true)
      } // extend global

      redefine$4(target, key, sourceProperty, options)
    }
}

var wellKnownSymbol$a = wellKnownSymbol$c
var TO_STRING_TAG$2 = wellKnownSymbol$a('toStringTag')
var test = {}
test[TO_STRING_TAG$2] = 'z'
var toStringTagSupport = String(test) === '[object z]'

var global$i = global$D
var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport
var isCallable$6 = isCallable$g
var classofRaw = classofRaw$1
var wellKnownSymbol$9 = wellKnownSymbol$c
var TO_STRING_TAG$1 = wellKnownSymbol$9('toStringTag')
var Object$1 = global$i.Object // ES3 wrong here

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
        : typeof (tag = tryGet((O = Object$1(it)), TO_STRING_TAG$1)) == 'string'
        ? tag // builtinTag case
        : CORRECT_ARGUMENTS
        ? classofRaw(O) // ES3 arguments fallback
        : (result = classofRaw(O)) == 'Object' && isCallable$6(O.callee)
        ? 'Arguments'
        : result
    }

var global$h = global$D
var classof$5 = classof$6
var String$3 = global$h.String

var toString$4 = function (argument) {
  if (classof$5(argument) === 'Symbol')
    throw TypeError('Cannot convert a Symbol value to a string')
  return String$3(argument)
}

var anObject$a = anObject$d // `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags

var regexpFlags$1 = function () {
  var that = anObject$a(this)
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

var fails$6 = fails$c
var global$g = global$D // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError

var $RegExp$2 = global$g.RegExp
regexpStickyHelpers.UNSUPPORTED_Y = fails$6(function () {
  var re = $RegExp$2('a', 'y')
  re.lastIndex = 2
  return re.exec('abcd') != null
})
regexpStickyHelpers.BROKEN_CARET = fails$6(function () {
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

var DESCRIPTORS$1 = descriptors
var definePropertyModule$1 = objectDefineProperty
var anObject$9 = anObject$d
var toIndexedObject = toIndexedObject$4
var objectKeys = objectKeys$1 // `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe

var objectDefineProperties = DESCRIPTORS$1
  ? Object.defineProperties
  : function defineProperties(O, Properties) {
      anObject$9(O)
      var props = toIndexedObject(Properties)
      var keys = objectKeys(Properties)
      var length = keys.length
      var index = 0
      var key

      while (length > index)
        definePropertyModule$1.f(O, (key = keys[index++]), props[key])

      return O
    }

var getBuiltIn$3 = getBuiltIn$7
var html$2 = getBuiltIn$3('document', 'documentElement')

/* global ActiveXObject -- old IE, WSH */
var anObject$8 = anObject$d
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
  iframe.style.display = 'none'
  html$1.appendChild(iframe) // https://github.com/zloirock/core-js/issues/475

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
      EmptyConstructor[PROTOTYPE] = anObject$8(O)
      result = new EmptyConstructor()
      EmptyConstructor[PROTOTYPE] = null // add "__proto__" for Object.getPrototypeOf polyfill

      result[IE_PROTO] = O
    } else result = NullProtoObject()

    return Properties === undefined
      ? result
      : defineProperties(result, Properties)
  }

var fails$5 = fails$c
var global$f = global$D // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError

var $RegExp$1 = global$f.RegExp
var regexpUnsupportedDotAll = fails$5(function () {
  var re = $RegExp$1('.', 's')
  return !(re.dotAll && re.exec('\n') && re.flags === 's')
})

var fails$4 = fails$c
var global$e = global$D // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError

var $RegExp = global$e.RegExp
var regexpUnsupportedNcg = fails$4(function () {
  var re = $RegExp('(?<a>b)', 'g')
  return re.exec('b').groups.a !== 'b' || 'b'.replace(re, '$<a>c') !== 'bc'
})

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */

/* eslint-disable regexp/no-useless-quantifier -- testing */

var call$7 = functionCall
var uncurryThis$8 = functionUncurryThis
var toString$3 = toString$4
var regexpFlags = regexpFlags$1
var stickyHelpers = regexpStickyHelpers
var shared = shared$4.exports
var create = objectCreate
var getInternalState$1 = internalState.get
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll
var UNSUPPORTED_NCG = regexpUnsupportedNcg
var nativeReplace = shared('native-string-replace', String.prototype.replace)
var nativeExec = RegExp.prototype.exec
var patchedExec = nativeExec
var charAt$3 = uncurryThis$8(''.charAt)
var indexOf = uncurryThis$8(''.indexOf)
var replace$1 = uncurryThis$8(''.replace)
var stringSlice$3 = uncurryThis$8(''.slice)

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/
  var re2 = /b*/g
  call$7(nativeExec, re1, 'a')
  call$7(nativeExec, re2, 'a')
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
      result = call$7(patchedExec, raw, str)
      re.lastIndex = raw.lastIndex
      return result
    }

    var groups = state.groups
    var sticky = UNSUPPORTED_Y && re.sticky
    var flags = call$7(regexpFlags, re)
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
    match = call$7(nativeExec, sticky ? reCopy : re, strCopy)

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
      call$7(nativeReplace, match[0], reCopy, function () {
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
var exec$1 = regexpExec$2 // `RegExp.prototype.exec` method
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
var bind$5 = FunctionPrototype.bind
var call$6 = FunctionPrototype.call // eslint-disable-next-line es/no-reflect -- safe

var functionApply =
  (typeof Reflect == 'object' && Reflect.apply) ||
  (bind$5
    ? call$6.bind(apply$2)
    : function () {
        return call$6.apply(apply$2, arguments)
      })

var uncurryThis$7 = functionUncurryThis
var redefine$3 = redefine$5.exports
var regexpExec$1 = regexpExec$2
var fails$3 = fails$c
var wellKnownSymbol$8 = wellKnownSymbol$c
var createNonEnumerableProperty = createNonEnumerableProperty$4
var SPECIES$3 = wellKnownSymbol$8('species')
var RegExpPrototype = RegExp.prototype

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$8(KEY)
  var DELEGATES_TO_SYMBOL = !fails$3(function () {
    // String methods call symbol-named RegEp methods
    var O = {}

    O[SYMBOL] = function () {
      return 7
    }

    return ''[KEY](O) != 7
  })
  var DELEGATES_TO_EXEC =
    DELEGATES_TO_SYMBOL &&
    !fails$3(function () {
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
    var uncurriedNativeRegExpMethod = uncurryThis$7(/./[SYMBOL])
    var methods = exec(
      SYMBOL,
      ''[KEY],
      function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var uncurriedNativeMethod = uncurryThis$7(nativeMethod)
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
    redefine$3(String.prototype, KEY, methods[0])
    redefine$3(RegExpPrototype, SYMBOL, methods[1])
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true)
}

var uncurryThis$6 = functionUncurryThis
var toIntegerOrInfinity$1 = toIntegerOrInfinity$4
var toString$2 = toString$4
var requireObjectCoercible$1 = requireObjectCoercible$4
var charAt$2 = uncurryThis$6(''.charAt)
var charCodeAt = uncurryThis$6(''.charCodeAt)
var stringSlice$2 = uncurryThis$6(''.slice)

var createMethod = function (CONVERT_TO_STRING) {
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
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true),
}

var charAt$1 = stringMultibyte.charAt // `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex

var advanceStringIndex$1 = function (S, index, unicode) {
  return index + (unicode ? charAt$1(S, index).length : 1)
}

var uncurryThis$5 = functionUncurryThis
var toObject = toObject$2
var floor = Math.floor
var charAt = uncurryThis$5(''.charAt)
var replace = uncurryThis$5(''.replace)
var stringSlice$1 = uncurryThis$5(''.slice)
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

var global$d = global$D
var call$5 = functionCall
var anObject$7 = anObject$d
var isCallable$5 = isCallable$g
var classof$4 = classofRaw$1
var regexpExec = regexpExec$2
var TypeError$7 = global$d.TypeError // `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec

var regexpExecAbstract = function (R, S) {
  var exec = R.exec

  if (isCallable$5(exec)) {
    var result = call$5(exec, R, S)
    if (result !== null) anObject$7(result)
    return result
  }

  if (classof$4(R) === 'RegExp') return call$5(regexpExec, R, S)
  throw TypeError$7('RegExp#exec called on incompatible receiver')
}

var apply$1 = functionApply
var call$4 = functionCall
var uncurryThis$4 = functionUncurryThis
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic
var fails$2 = fails$c
var anObject$6 = anObject$d
var isCallable$4 = isCallable$g
var toIntegerOrInfinity = toIntegerOrInfinity$4
var toLength = toLength$2
var toString$1 = toString$4
var requireObjectCoercible = requireObjectCoercible$4
var advanceStringIndex = advanceStringIndex$1
var getMethod$2 = getMethod$4
var getSubstitution = getSubstitution$1
var regExpExec = regexpExecAbstract
var wellKnownSymbol$7 = wellKnownSymbol$c
var REPLACE = wellKnownSymbol$7('replace')
var max = Math.max
var min = Math.min
var concat = uncurryThis$4([].concat)
var push = uncurryThis$4([].push)
var stringIndexOf = uncurryThis$4(''.indexOf)
var stringSlice = uncurryThis$4(''.slice)

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

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$2(function () {
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
          searchValue == undefined
            ? undefined
            : getMethod$2(searchValue, REPLACE)
        return replacer
          ? call$4(replacer, searchValue, O, replaceValue)
          : call$4(nativeReplace, toString$1(O), searchValue, replaceValue)
      }, // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (string, replaceValue) {
        var rx = anObject$6(this)
        var S = toString$1(string)

        if (
          typeof replaceValue == 'string' &&
          stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
          stringIndexOf(replaceValue, '$<') === -1
        ) {
          var res = maybeCallNative(nativeReplace, rx, S, replaceValue)
          if (res.done) return res.value
        }

        var functionalReplace = isCallable$4(replaceValue)
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
          var position = max(
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

var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport
var classof$3 = classof$6 // `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring

var objectToString = TO_STRING_TAG_SUPPORT$1
  ? {}.toString
  : function toString() {
      return '[object ' + classof$3(this) + ']'
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

var global$c = global$D
var nativePromiseConstructor = global$c.Promise

var redefine$1 = redefine$5.exports

var redefineAll$1 = function (target, src, options) {
  for (var key in src) redefine$1(target, key, src[key], options)

  return target
}

var global$b = global$D
var isCallable$3 = isCallable$g
var String$2 = global$b.String
var TypeError$6 = global$b.TypeError

var aPossiblePrototype$1 = function (argument) {
  if (typeof argument == 'object' || isCallable$3(argument)) return argument
  throw TypeError$6("Can't set " + String$2(argument) + ' as a prototype')
}

/* eslint-disable no-proto -- safe */
var uncurryThis$3 = functionUncurryThis
var anObject$5 = anObject$d
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
          setter = uncurryThis$3(
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
var wellKnownSymbol$6 = wellKnownSymbol$c
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
var wellKnownSymbol$5 = wellKnownSymbol$c
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

var global$a = global$D
var isPrototypeOf$1 = objectIsPrototypeOf
var TypeError$5 = global$a.TypeError

var anInstance$1 = function (it, Prototype) {
  if (isPrototypeOf$1(Prototype, it)) return it
  throw TypeError$5('Incorrect invocation')
}

var uncurryThis$2 = functionUncurryThis
var aCallable$3 = aCallable$5
var bind$4 = uncurryThis$2(uncurryThis$2.bind) // optional / simple context binding

var functionBindContext = function (fn, that) {
  aCallable$3(fn)
  return that === undefined
    ? fn
    : bind$4
    ? bind$4(fn, that)
    : function () {
        return fn.apply(that, arguments)
      }
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

var classof$2 = classof$6
var getMethod$1 = getMethod$4
var Iterators = iterators
var wellKnownSymbol$3 = wellKnownSymbol$c
var ITERATOR$1 = wellKnownSymbol$3('iterator')

var getIteratorMethod$2 = function (it) {
  if (it != undefined)
    return (
      getMethod$1(it, ITERATOR$1) ||
      getMethod$1(it, '@@iterator') ||
      Iterators[classof$2(it)]
    )
}

var global$9 = global$D
var call$3 = functionCall
var aCallable$2 = aCallable$5
var anObject$4 = anObject$d
var tryToString$2 = tryToString$4
var getIteratorMethod$1 = getIteratorMethod$2
var TypeError$4 = global$9.TypeError

var getIterator$1 = function (argument, usingIterator) {
  var iteratorMethod =
    arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator
  if (aCallable$2(iteratorMethod))
    return anObject$4(call$3(iteratorMethod, argument))
  throw TypeError$4(tryToString$2(argument) + ' is not iterable')
}

var call$2 = functionCall
var anObject$3 = anObject$d
var getMethod = getMethod$4

var iteratorClose$1 = function (iterator, kind, value) {
  var innerResult, innerError
  anObject$3(iterator)

  try {
    innerResult = getMethod(iterator, 'return')

    if (!innerResult) {
      if (kind === 'throw') throw value
      return value
    }

    innerResult = call$2(innerResult, iterator)
  } catch (error) {
    innerError = true
    innerResult = error
  }

  if (kind === 'throw') throw value
  if (innerError) throw innerResult
  anObject$3(innerResult)
  return value
}

var global$8 = global$D
var bind$3 = functionBindContext
var call$1 = functionCall
var anObject$2 = anObject$d
var tryToString$1 = tryToString$4
var isArrayIteratorMethod = isArrayIteratorMethod$1
var lengthOfArrayLike = lengthOfArrayLike$2
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
  var fn = bind$3(unboundFunction, that)
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

  while (!(step = call$1(next, iterator)).done) {
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

var uncurryThis$1 = functionUncurryThis
var fails$1 = fails$c
var isCallable$2 = isCallable$g
var classof$1 = classof$6
var getBuiltIn$1 = getBuiltIn$7
var inspectSource$1 = inspectSource$4

var noop = function () {
  /* empty */
}

var empty = []
var construct = getBuiltIn$1('Reflect', 'construct')
var constructorRegExp = /^\s*(?:class|function)\b/
var exec = uncurryThis$1(constructorRegExp.exec)
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop)

var isConstructorModern = function (argument) {
  if (!isCallable$2(argument)) return false

  try {
    construct(noop, empty, argument)
    return true
  } catch (error) {
    return false
  }
}

var isConstructorLegacy = function (argument) {
  if (!isCallable$2(argument)) return false

  switch (classof$1(argument)) {
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

var global$7 = global$D
var isConstructor = isConstructor$1
var tryToString = tryToString$4
var TypeError$2 = global$7.TypeError // `Assert: IsConstructor(argument) is true`

var aConstructor$1 = function (argument) {
  if (isConstructor(argument)) return argument
  throw TypeError$2(tryToString(argument) + ' is not a constructor')
}

var anObject$1 = anObject$d
var aConstructor = aConstructor$1
var wellKnownSymbol$1 = wellKnownSymbol$c
var SPECIES$1 = wellKnownSymbol$1('species') // `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor

var speciesConstructor$1 = function (O, defaultConstructor) {
  var C = anObject$1(O).constructor
  var S
  return C === undefined || (S = anObject$1(C)[SPECIES$1]) == undefined
    ? defaultConstructor
    : aConstructor(S)
}

var uncurryThis = functionUncurryThis
var arraySlice$1 = uncurryThis([].slice)

var userAgent$2 = engineUserAgent
var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$2)

var classof = classofRaw$1
var global$6 = global$D
var engineIsNode = classof(global$6.process) == 'process'

var global$5 = global$D
var apply = functionApply
var bind$2 = functionBindContext
var isCallable$1 = isCallable$g
var hasOwn = hasOwnProperty_1
var fails = fails$c
var html = html$2
var arraySlice = arraySlice$1
var createElement = documentCreateElement$1
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
var global$4 = global$D
var engineIsIosPebble =
  /ipad|iphone|ipod/i.test(userAgent$1) && global$4.Pebble !== undefined

var userAgent = engineUserAgent
var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent)

var global$3 = global$D
var bind$1 = functionBindContext
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f
var macrotask = task$1.set
var IS_IOS = engineIsIos
var IS_IOS_PEBBLE = engineIsIosPebble
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

var anObject = anObject$d
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

var global$2 = global$D

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
var global$1 = global$D
var getBuiltIn = getBuiltIn$7
var call = functionCall
var NativePromise = nativePromiseConstructor
var redefine = redefine$5.exports
var redefineAll = redefineAll$1
var setPrototypeOf = objectSetPrototypeOf
var setToStringTag = setToStringTag$1
var setSpecies = setSpecies$1
var aCallable = aCallable$5
var isCallable = isCallable$g
var isObject = isObject$7
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
var PromisePrototype = NativePromisePrototype
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
