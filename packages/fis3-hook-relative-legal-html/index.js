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

var fails$e = function (exec) {
  try {
    return !!exec()
  } catch (error) {
    return true
  }
}

var fails$d = fails$e // Detect IE8's incomplete defineProperty implementation

var descriptors = !fails$d(function () {
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
var call$8 = FunctionPrototype$2.call
var callBind = bind$1 && bind$1.bind(call$8)
var functionUncurryThis = bind$1
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

var uncurryThis$g = functionUncurryThis
var toString$6 = uncurryThis$g({}.toString)
var stringSlice$5 = uncurryThis$g(''.slice)

var classofRaw$1 = function (it) {
  return stringSlice$5(toString$6(it), 8, -1)
}

var global$t = global$u
var uncurryThis$f = functionUncurryThis
var fails$c = fails$e
var classof$6 = classofRaw$1
var Object$4 = global$t.Object
var split = uncurryThis$f(''.split) // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails$c(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object$4('z').propertyIsEnumerable(0)
})
  ? function (it) {
      return classof$6(it) == 'String' ? split(it, '') : Object$4(it)
    }
  : Object$4

var global$s = global$u
var TypeError$a = global$s.TypeError // `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible

var requireObjectCoercible$5 = function (it) {
  if (it == undefined) throw TypeError$a("Can't call method on " + it)
  return it
}

var IndexedObject = indexedObject
var requireObjectCoercible$4 = requireObjectCoercible$5

var toIndexedObject$4 = function (it) {
  return IndexedObject(requireObjectCoercible$4(it))
}

// https://tc39.es/ecma262/#sec-iscallable

var isCallable$d = function (argument) {
  return typeof argument == 'function'
}

var isCallable$c = isCallable$d

var isObject$8 = function (it) {
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
var process$1 = global$q.process
var Deno = global$q.Deno
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
var fails$b = fails$e // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

var nativeSymbol =
  !!Object.getOwnPropertySymbols &&
  !fails$b(function () {
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

var tryToString$2 = function (argument) {
  try {
    return String$3(argument)
  } catch (error) {
    return 'Object'
  }
}

var global$n = global$u
var isCallable$9 = isCallable$d
var tryToString$1 = tryToString$2
var TypeError$9 = global$n.TypeError // `Assert: IsCallable(argument) is true`

var aCallable$1 = function (argument) {
  if (isCallable$9(argument)) return argument
  throw TypeError$9(tryToString$1(argument) + ' is not a function')
}

var aCallable = aCallable$1 // `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod

var getMethod$3 = function (V, P) {
  var func = V[P]
  return func == null ? undefined : aCallable(func)
}

var global$m = global$u
var call$7 = functionCall
var isCallable$8 = isCallable$d
var isObject$7 = isObject$8
var TypeError$8 = global$m.TypeError // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val
  if (
    pref === 'string' &&
    isCallable$8((fn = input.toString)) &&
    !isObject$7((val = call$7(fn, input)))
  )
    return val
  if (
    isCallable$8((fn = input.valueOf)) &&
    !isObject$7((val = call$7(fn, input)))
  )
    return val
  if (
    pref !== 'string' &&
    isCallable$8((fn = input.toString)) &&
    !isObject$7((val = call$7(fn, input)))
  )
    return val
  throw TypeError$8("Can't convert object to primitive value")
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
var requireObjectCoercible$3 = requireObjectCoercible$5
var Object$2 = global$j.Object // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

var toObject$3 = function (argument) {
  return Object$2(requireObjectCoercible$3(argument))
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

var wellKnownSymbol$a = function (name) {
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
var call$6 = functionCall
var isObject$6 = isObject$8
var isSymbol$1 = isSymbol$2
var getMethod$2 = getMethod$3
var ordinaryToPrimitive = ordinaryToPrimitive$1
var wellKnownSymbol$9 = wellKnownSymbol$a
var TypeError$7 = global$h.TypeError
var TO_PRIMITIVE = wellKnownSymbol$9('toPrimitive') // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

var toPrimitive$1 = function (input, pref) {
  if (!isObject$6(input) || isSymbol$1(input)) return input
  var exoticToPrim = getMethod$2(input, TO_PRIMITIVE)
  var result

  if (exoticToPrim) {
    if (pref === undefined) pref = 'default'
    result = call$6(exoticToPrim, input, pref)
    if (!isObject$6(result) || isSymbol$1(result)) return result
    throw TypeError$7("Can't convert object to primitive value")
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
var isObject$5 = isObject$8
var document$1 = global$g.document // typeof document.createElement is 'object' in old IE

var EXISTS$1 = isObject$5(document$1) && isObject$5(document$1.createElement)

var documentCreateElement$1 = function (it) {
  return EXISTS$1 ? document$1.createElement(it) : {}
}

var DESCRIPTORS$5 = descriptors
var fails$a = fails$e
var createElement = documentCreateElement$1 // Thank's IE8 for his funny defineProperty

var ie8DomDefine =
  !DESCRIPTORS$5 &&
  !fails$a(function () {
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
var call$5 = functionCall
var propertyIsEnumerableModule = objectPropertyIsEnumerable
var createPropertyDescriptor$2 = createPropertyDescriptor$3
var toIndexedObject$3 = toIndexedObject$4
var toPropertyKey$2 = toPropertyKey$3
var hasOwn$5 = hasOwnProperty_1
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
      if (hasOwn$5(O, P))
        return createPropertyDescriptor$2(
          !call$5(propertyIsEnumerableModule.f, O, P),
          O[P],
        )
    }

var objectDefineProperty = {}

var global$f = global$u
var isObject$4 = isObject$8
var String$2 = global$f.String
var TypeError$6 = global$f.TypeError // `Assert: Type(argument) is Object`

var anObject$9 = function (argument) {
  if (isObject$4(argument)) return argument
  throw TypeError$6(String$2(argument) + ' is not an object')
}

var global$e = global$u
var DESCRIPTORS$3 = descriptors
var IE8_DOM_DEFINE = ie8DomDefine
var anObject$8 = anObject$9
var toPropertyKey$1 = toPropertyKey$3
var TypeError$5 = global$e.TypeError // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

objectDefineProperty.f = DESCRIPTORS$3
  ? $defineProperty
  : function defineProperty(O, P, Attributes) {
      anObject$8(O)
      P = toPropertyKey$1(P)
      anObject$8(Attributes)
      if (IE8_DOM_DEFINE)
        try {
          return $defineProperty(O, P, Attributes)
        } catch (error) {
          /* empty */
        }
      if ('get' in Attributes || 'set' in Attributes)
        throw TypeError$5('Accessors not supported')
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

var redefine$2 = {exports: {}}

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
var isObject$3 = isObject$8
var createNonEnumerableProperty$3 = createNonEnumerableProperty$4
var hasOwn$4 = hasOwnProperty_1
var shared$1 = sharedStore
var sharedKey$1 = sharedKey$2
var hiddenKeys$3 = hiddenKeys$4
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized'
var TypeError$4 = global$c.TypeError
var WeakMap = global$c.WeakMap
var set, get, has

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {})
}

var getterFor = function (TYPE) {
  return function (it) {
    var state

    if (!isObject$3(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$4('Incompatible receiver, ' + TYPE + ' required')
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
    if (wmhas(store, it)) throw new TypeError$4(OBJECT_ALREADY_INITIALIZED)
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
    if (hasOwn$4(it, STATE)) throw new TypeError$4(OBJECT_ALREADY_INITIALIZED)
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
;(redefine$2.exports = function (O, key, value, options) {
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
var max$1 = Math.max
var min$3 = Math.min // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex$1 = function (index, length) {
  var integer = toIntegerOrInfinity$3(index)
  return integer < 0 ? max$1(integer + length, 0) : min$3(integer, length)
}

var toIntegerOrInfinity$2 = toIntegerOrInfinity$4
var min$2 = Math.min // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

var toLength$3 = function (argument) {
  return argument > 0
    ? min$2(toIntegerOrInfinity$2(argument), 0x1fffffffffffff)
    : 0 // 2 ** 53 - 1 == 9007199254740991
}

var toLength$2 = toLength$3 // `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike

var lengthOfArrayLike$2 = function (obj) {
  return toLength$2(obj.length)
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

var uncurryThis$9 = functionUncurryThis
var hasOwn$1 = hasOwnProperty_1
var toIndexedObject$1 = toIndexedObject$4
var indexOf$1 = arrayIncludes.indexOf
var hiddenKeys$2 = hiddenKeys$4
var push$2 = uncurryThis$9([].push)

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$1(object)
  var i = 0
  var result = []
  var key

  for (key in O)
    !hasOwn$1(hiddenKeys$2, key) && hasOwn$1(O, key) && push$2(result, key) // Don't enum bug & hidden keys

  while (names.length > i)
    if (hasOwn$1(O, (key = names[i++]))) {
      ~indexOf$1(result, key) || push$2(result, key)
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
var anObject$7 = anObject$9
var concat$1 = uncurryThis$8([].concat) // all object keys, includes non-enumerable and symbols

var ownKeys$1 =
  getBuiltIn$2('Reflect', 'ownKeys') ||
  function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$7(it))
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

var fails$9 = fails$e
var isCallable$4 = isCallable$d
var replacement = /#|\.prototype\./

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)]
  return value == POLYFILL
    ? true
    : value == NATIVE
    ? false
    : isCallable$4(detection)
    ? fails$9(detection)
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

      redefine$1(target, key, sourceProperty, options)
    }
}

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

var wellKnownSymbol$8 = wellKnownSymbol$a
var TO_STRING_TAG$1 = wellKnownSymbol$8('toStringTag')
var test = {}
test[TO_STRING_TAG$1] = 'z'
var toStringTagSupport = String(test) === '[object z]'

var global$9 = global$u
var TO_STRING_TAG_SUPPORT = toStringTagSupport
var isCallable$3 = isCallable$d
var classofRaw = classofRaw$1
var wellKnownSymbol$7 = wellKnownSymbol$a
var TO_STRING_TAG = wellKnownSymbol$7('toStringTag')
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

var classof$4 = TO_STRING_TAG_SUPPORT
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

var uncurryThis$7 = functionUncurryThis
var fails$8 = fails$e
var isCallable$2 = isCallable$d
var classof$3 = classof$4
var getBuiltIn$1 = getBuiltIn$5
var inspectSource = inspectSource$3

var noop = function () {
  /* empty */
}

var empty = []
var construct = getBuiltIn$1('Reflect', 'construct')
var constructorRegExp = /^\s*(?:class|function)\b/
var exec$2 = uncurryThis$7(constructorRegExp.exec)
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

  switch (classof$3(argument)) {
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

var isConstructor$2 =
  !construct ||
  fails$8(function () {
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

var global$8 = global$u
var isArray$1 = isArray$2
var isConstructor$1 = isConstructor$2
var isObject$2 = isObject$8
var wellKnownSymbol$6 = wellKnownSymbol$a
var SPECIES$3 = wellKnownSymbol$6('species')
var Array$1 = global$8.Array // a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

var arraySpeciesConstructor$1 = function (originalArray) {
  var C

  if (isArray$1(originalArray)) {
    C = originalArray.constructor // cross-realm fallback

    if (isConstructor$1(C) && (C === Array$1 || isArray$1(C.prototype)))
      C = undefined
    else if (isObject$2(C)) {
      C = C[SPECIES$3]
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

var fails$7 = fails$e
var wellKnownSymbol$5 = wellKnownSymbol$a
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
var global$7 = global$u
var fails$6 = fails$e
var isArray = isArray$2
var isObject$1 = isObject$8
var toObject$1 = toObject$3
var lengthOfArrayLike = lengthOfArrayLike$2
var createProperty = createProperty$1
var arraySpeciesCreate = arraySpeciesCreate$1
var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$1
var wellKnownSymbol$4 = wellKnownSymbol$a
var V8_VERSION = engineV8Version
var IS_CONCAT_SPREADABLE = wellKnownSymbol$4('isConcatSpreadable')
var MAX_SAFE_INTEGER = 0x1fffffffffffff
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'
var TypeError$3 = global$7.TypeError // We can't use this feature detection in V8 since it causes
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
          len = lengthOfArrayLike(E)
          if (n + len > MAX_SAFE_INTEGER)
            throw TypeError$3(MAXIMUM_ALLOWED_INDEX_EXCEEDED)

          for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k])
        } else {
          if (n >= MAX_SAFE_INTEGER)
            throw TypeError$3(MAXIMUM_ALLOWED_INDEX_EXCEEDED)
          createProperty(A, n++, E)
        }
      }

      A.length = n
      return A
    },
  },
)

var global$6 = global$u
var classof$2 = classof$4
var String$1 = global$6.String

var toString$4 = function (argument) {
  if (classof$2(argument) === 'Symbol')
    throw TypeError('Cannot convert a Symbol value to a string')
  return String$1(argument)
}

var anObject$6 = anObject$9 // `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags

var regexpFlags$1 = function () {
  var that = anObject$6(this)
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

var fails$5 = fails$e
var global$5 = global$u // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError

var $RegExp$2 = global$5.RegExp
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
var anObject$5 = anObject$9
var toIndexedObject = toIndexedObject$4
var objectKeys = objectKeys$1 // `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe

var objectDefineProperties = DESCRIPTORS
  ? Object.defineProperties
  : function defineProperties(O, Properties) {
      anObject$5(O)
      var props = toIndexedObject(Properties)
      var keys = objectKeys(Properties)
      var length = keys.length
      var index = 0
      var key

      while (length > index)
        definePropertyModule.f(O, (key = keys[index++]), props[key])

      return O
    }

var getBuiltIn = getBuiltIn$5
var html$1 = getBuiltIn('document', 'documentElement')

/* global ActiveXObject -- old IE, WSH */
var anObject$4 = anObject$9
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
      EmptyConstructor[PROTOTYPE] = anObject$4(O)
      result = new EmptyConstructor()
      EmptyConstructor[PROTOTYPE] = null // add "__proto__" for Object.getPrototypeOf polyfill

      result[IE_PROTO] = O
    } else result = NullProtoObject()

    return Properties === undefined
      ? result
      : defineProperties(result, Properties)
  }

var fails$4 = fails$e
var global$4 = global$u // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError

var $RegExp$1 = global$4.RegExp
var regexpUnsupportedDotAll = fails$4(function () {
  var re = $RegExp$1('.', 's')
  return !(re.dotAll && re.exec('\n') && re.flags === 's')
})

var fails$3 = fails$e
var global$3 = global$u // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError

var $RegExp = global$3.RegExp
var regexpUnsupportedNcg = fails$3(function () {
  var re = $RegExp('(?<a>b)', 'g')
  return re.exec('b').groups.a !== 'b' || 'b'.replace(re, '$<a>c') !== 'bc'
})

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */

/* eslint-disable regexp/no-useless-quantifier -- testing */

var call$4 = functionCall
var uncurryThis$6 = functionUncurryThis
var toString$3 = toString$4
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
var charAt$3 = uncurryThis$6(''.charAt)
var indexOf = uncurryThis$6(''.indexOf)
var replace$1 = uncurryThis$6(''.replace)
var stringSlice$4 = uncurryThis$6(''.slice)

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
    var str = toString$3(string)
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

      strCopy = stringSlice$4(str, re.lastIndex) // Support anchored sticky behavior.

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
    match = call$4(nativeExec, sticky ? reCopy : re, strCopy)

    if (sticky) {
      if (match) {
        match.input = stringSlice$4(match.input, charsAdded)
        match[0] = stringSlice$4(match[0], charsAdded)
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

var $ = _export
var exec$1 = regexpExec$3 // `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec

$(
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

var uncurryThis$5 = functionUncurryThis
var redefine = redefine$2.exports
var regexpExec$2 = regexpExec$3
var fails$2 = fails$e
var wellKnownSymbol$3 = wellKnownSymbol$a
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
    var uncurriedNativeRegExpMethod = uncurryThis$5(/./[SYMBOL])
    var methods = exec(
      SYMBOL,
      ''[KEY],
      function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var uncurriedNativeMethod = uncurryThis$5(nativeMethod)
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

var uncurryThis$4 = functionUncurryThis
var toIntegerOrInfinity$1 = toIntegerOrInfinity$4
var toString$2 = toString$4
var requireObjectCoercible$2 = requireObjectCoercible$5
var charAt$2 = uncurryThis$4(''.charAt)
var charCodeAt = uncurryThis$4(''.charCodeAt)
var stringSlice$3 = uncurryThis$4(''.slice)

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$2(requireObjectCoercible$2($this))
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
      ? stringSlice$3(S, position, position + 2)
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

var advanceStringIndex$2 = function (S, index, unicode) {
  return index + (unicode ? charAt$1(S, index).length : 1)
}

var uncurryThis$3 = functionUncurryThis
var toObject = toObject$3
var floor = Math.floor
var charAt = uncurryThis$3(''.charAt)
var replace = uncurryThis$3(''.replace)
var stringSlice$2 = uncurryThis$3(''.slice)
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

var global$2 = global$u
var call$2 = functionCall
var anObject$3 = anObject$9
var isCallable$1 = isCallable$d
var classof$1 = classofRaw$1
var regexpExec$1 = regexpExec$3
var TypeError$2 = global$2.TypeError // `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec

var regexpExecAbstract = function (R, S) {
  var exec = R.exec

  if (isCallable$1(exec)) {
    var result = call$2(exec, R, S)
    if (result !== null) anObject$3(result)
    return result
  }

  if (classof$1(R) === 'RegExp') return call$2(regexpExec$1, R, S)
  throw TypeError$2('RegExp#exec called on incompatible receiver')
}

var apply$1 = functionApply
var call$1 = functionCall
var uncurryThis$2 = functionUncurryThis
var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic
var fails$1 = fails$e
var anObject$2 = anObject$9
var isCallable = isCallable$d
var toIntegerOrInfinity = toIntegerOrInfinity$4
var toLength$1 = toLength$3
var toString$1 = toString$4
var requireObjectCoercible$1 = requireObjectCoercible$5
var advanceStringIndex$1 = advanceStringIndex$2
var getMethod$1 = getMethod$3
var getSubstitution = getSubstitution$1
var regExpExec = regexpExecAbstract
var wellKnownSymbol$2 = wellKnownSymbol$a
var REPLACE = wellKnownSymbol$2('replace')
var max = Math.max
var min$1 = Math.min
var concat = uncurryThis$2([].concat)
var push$1 = uncurryThis$2([].push)
var stringIndexOf = uncurryThis$2(''.indexOf)
var stringSlice$1 = uncurryThis$2(''.slice)

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
        var rx = anObject$2(this)
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

var isObject = isObject$8
var classof = classofRaw$1
var wellKnownSymbol$1 = wellKnownSymbol$a
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

var global$1 = global$u
var isConstructor = isConstructor$2
var tryToString = tryToString$2
var TypeError$1 = global$1.TypeError // `Assert: IsConstructor(argument) is true`

var aConstructor$1 = function (argument) {
  if (isConstructor(argument)) return argument
  throw TypeError$1(tryToString(argument) + ' is not a constructor')
}

var anObject$1 = anObject$9
var aConstructor = aConstructor$1
var wellKnownSymbol = wellKnownSymbol$a
var SPECIES = wellKnownSymbol('species') // `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor

var speciesConstructor$1 = function (O, defaultConstructor) {
  var C = anObject$1(O).constructor
  var S
  return C === undefined || (S = anObject$1(C)[SPECIES]) == undefined
    ? defaultConstructor
    : aConstructor(S)
}

var uncurryThis$1 = functionUncurryThis
var arraySlice$1 = uncurryThis$1([].slice)

var apply = functionApply
var call = functionCall
var uncurryThis = functionUncurryThis
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic
var isRegExp = isRegexp
var anObject = anObject$9
var requireObjectCoercible = requireObjectCoercible$5
var speciesConstructor = speciesConstructor$1
var advanceStringIndex = advanceStringIndex$2
var toLength = toLength$3
var toString = toString$4
var getMethod = getMethod$3
var arraySlice = arraySlice$1
var callRegExpExec = regexpExecAbstract
var regexpExec = regexpExec$3
var stickyHelpers = regexpStickyHelpers
var fails = fails$e
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
