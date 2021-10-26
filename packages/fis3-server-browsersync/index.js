'use strict'

Object.defineProperty(exports, '__esModule', {value: true})

var path = require('path')
var fs = require('fs')
var buffer = require('buffer')
var process$1 = require('process')
var execa = require('execa')
var yargs = require('yargs')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {default: e}
}

var path__default = /*#__PURE__*/ _interopDefaultLegacy(path)
var fs__default = /*#__PURE__*/ _interopDefaultLegacy(fs)
var process__default = /*#__PURE__*/ _interopDefaultLegacy(process$1)
var execa__default = /*#__PURE__*/ _interopDefaultLegacy(execa)
var yargs__default = /*#__PURE__*/ _interopDefaultLegacy(yargs)

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

var global$s = // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  (function () {
    return this
  })() ||
  Function('return this')()

var shared$4 = {exports: {}}

var global$r = global$s // eslint-disable-next-line es/no-object-defineproperty -- safe

var defineProperty = Object.defineProperty

var setGlobal$3 = function (key, value) {
  try {
    defineProperty(global$r, key, {
      value: value,
      configurable: true,
      writable: true,
    })
  } catch (error) {
    global$r[key] = value
  }

  return value
}

var global$q = global$s
var setGlobal$2 = setGlobal$3
var SHARED = '__core-js_shared__'
var store$3 = global$q[SHARED] || setGlobal$2(SHARED, {})
var sharedStore = store$3

var store$2 = sharedStore
;(shared$4.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {})
})('versions', []).push({
  version: '3.19.0',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)',
})

var FunctionPrototype$1 = Function.prototype
var bind = FunctionPrototype$1.bind
var call$7 = FunctionPrototype$1.call
var callBind = bind && bind.bind(call$7)
var functionUncurryThis = bind
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

var global$p = global$s
var TypeError$9 = global$p.TypeError // `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible

var requireObjectCoercible$5 = function (it) {
  if (it == undefined) throw TypeError$9("Can't call method on " + it)
  return it
}

var global$o = global$s
var requireObjectCoercible$4 = requireObjectCoercible$5
var Object$4 = global$o.Object // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

var toObject$1 = function (argument) {
  return Object$4(requireObjectCoercible$4(argument))
}

var uncurryThis$e = functionUncurryThis
var toObject = toObject$1
var hasOwnProperty = uncurryThis$e({}.hasOwnProperty) // `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty

var hasOwnProperty_1 =
  Object.hasOwn ||
  function hasOwn(it, key) {
    return hasOwnProperty(toObject(it), key)
  }

var uncurryThis$d = functionUncurryThis
var id = 0
var postfix = Math.random()
var toString$7 = uncurryThis$d((1.0).toString)

var uid$2 = function (key) {
  return (
    'Symbol(' +
    (key === undefined ? '' : key) +
    ')_' +
    toString$7(++id + postfix, 36)
  )
}

// https://tc39.es/ecma262/#sec-iscallable

var isCallable$b = function (argument) {
  return typeof argument == 'function'
}

var global$n = global$s
var isCallable$a = isCallable$b

var aFunction = function (argument) {
  return isCallable$a(argument) ? argument : undefined
}

var getBuiltIn$4 = function (namespace, method) {
  return arguments.length < 2
    ? aFunction(global$n[namespace])
    : global$n[namespace] && global$n[namespace][method]
}

var getBuiltIn$3 = getBuiltIn$4
var engineUserAgent = getBuiltIn$3('navigator', 'userAgent') || ''

var global$m = global$s
var userAgent = engineUserAgent
var process = global$m.process
var Deno = global$m.Deno
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

var fails$b = function (exec) {
  try {
    return !!exec()
  } catch (error) {
    return true
  }
}

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = engineV8Version
var fails$a = fails$b // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

var nativeSymbol =
  !!Object.getOwnPropertySymbols &&
  !fails$a(function () {
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

var global$l = global$s
var shared$3 = shared$4.exports
var hasOwn$6 = hasOwnProperty_1
var uid$1 = uid$2
var NATIVE_SYMBOL = nativeSymbol
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid
var WellKnownSymbolsStore = shared$3('wks')
var Symbol$1 = global$l.Symbol
var symbolFor = Symbol$1 && Symbol$1['for']
var createWellKnownSymbol = USE_SYMBOL_AS_UID$1
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
    } else if (USE_SYMBOL_AS_UID$1 && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description)
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description)
    }
  }

  return WellKnownSymbolsStore[name]
}

var wellKnownSymbol$6 = wellKnownSymbol$7
var TO_STRING_TAG$1 = wellKnownSymbol$6('toStringTag')
var test = {}
test[TO_STRING_TAG$1] = 'z'
var toStringTagSupport = String(test) === '[object z]'

var redefine$4 = {exports: {}}

var fails$9 = fails$b // Detect IE8's incomplete defineProperty implementation

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

var objectDefineProperty = {}

var isCallable$9 = isCallable$b

var isObject$6 = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$9(it)
}

var global$k = global$s
var isObject$5 = isObject$6
var document$1 = global$k.document // typeof document.createElement is 'object' in old IE

var EXISTS$1 = isObject$5(document$1) && isObject$5(document$1.createElement)

var documentCreateElement$1 = function (it) {
  return EXISTS$1 ? document$1.createElement(it) : {}
}

var DESCRIPTORS$5 = descriptors
var fails$8 = fails$b
var createElement = documentCreateElement$1 // Thank's IE8 for his funny defineProperty

var ie8DomDefine =
  !DESCRIPTORS$5 &&
  !fails$8(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return (
      Object.defineProperty(createElement('div'), 'a', {
        get: function () {
          return 7
        },
      }).a != 7
    )
  })

var global$j = global$s
var isObject$4 = isObject$6
var String$3 = global$j.String
var TypeError$8 = global$j.TypeError // `Assert: Type(argument) is Object`

var anObject$8 = function (argument) {
  if (isObject$4(argument)) return argument
  throw TypeError$8(String$3(argument) + ' is not an object')
}

var call$6 = Function.prototype.call
var functionCall = call$6.bind
  ? call$6.bind(call$6)
  : function () {
      return call$6.apply(call$6, arguments)
    }

var uncurryThis$c = functionUncurryThis
var objectIsPrototypeOf = uncurryThis$c({}.isPrototypeOf)

var global$i = global$s
var getBuiltIn$2 = getBuiltIn$4
var isCallable$8 = isCallable$b
var isPrototypeOf$1 = objectIsPrototypeOf
var USE_SYMBOL_AS_UID = useSymbolAsUid
var Object$3 = global$i.Object
var isSymbol$2 = USE_SYMBOL_AS_UID
  ? function (it) {
      return typeof it == 'symbol'
    }
  : function (it) {
      var $Symbol = getBuiltIn$2('Symbol')
      return (
        isCallable$8($Symbol) &&
        isPrototypeOf$1($Symbol.prototype, Object$3(it))
      )
    }

var global$h = global$s
var String$2 = global$h.String

var tryToString$1 = function (argument) {
  try {
    return String$2(argument)
  } catch (error) {
    return 'Object'
  }
}

var global$g = global$s
var isCallable$7 = isCallable$b
var tryToString = tryToString$1
var TypeError$7 = global$g.TypeError // `Assert: IsCallable(argument) is true`

var aCallable$1 = function (argument) {
  if (isCallable$7(argument)) return argument
  throw TypeError$7(tryToString(argument) + ' is not a function')
}

var aCallable = aCallable$1 // `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod

var getMethod$2 = function (V, P) {
  var func = V[P]
  return func == null ? undefined : aCallable(func)
}

var global$f = global$s
var call$5 = functionCall
var isCallable$6 = isCallable$b
var isObject$3 = isObject$6
var TypeError$6 = global$f.TypeError // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val
  if (
    pref === 'string' &&
    isCallable$6((fn = input.toString)) &&
    !isObject$3((val = call$5(fn, input)))
  )
    return val
  if (
    isCallable$6((fn = input.valueOf)) &&
    !isObject$3((val = call$5(fn, input)))
  )
    return val
  if (
    pref !== 'string' &&
    isCallable$6((fn = input.toString)) &&
    !isObject$3((val = call$5(fn, input)))
  )
    return val
  throw TypeError$6("Can't convert object to primitive value")
}

var global$e = global$s
var call$4 = functionCall
var isObject$2 = isObject$6
var isSymbol$1 = isSymbol$2
var getMethod$1 = getMethod$2
var ordinaryToPrimitive = ordinaryToPrimitive$1
var wellKnownSymbol$5 = wellKnownSymbol$7
var TypeError$5 = global$e.TypeError
var TO_PRIMITIVE = wellKnownSymbol$5('toPrimitive') // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

var toPrimitive$1 = function (input, pref) {
  if (!isObject$2(input) || isSymbol$1(input)) return input
  var exoticToPrim = getMethod$1(input, TO_PRIMITIVE)
  var result

  if (exoticToPrim) {
    if (pref === undefined) pref = 'default'
    result = call$4(exoticToPrim, input, pref)
    if (!isObject$2(result) || isSymbol$1(result)) return result
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

var global$d = global$s
var DESCRIPTORS$4 = descriptors
var IE8_DOM_DEFINE$1 = ie8DomDefine
var anObject$7 = anObject$8
var toPropertyKey$1 = toPropertyKey$2
var TypeError$4 = global$d.TypeError // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

objectDefineProperty.f = DESCRIPTORS$4
  ? $defineProperty
  : function defineProperty(O, P, Attributes) {
      anObject$7(O)
      P = toPropertyKey$1(P)
      anObject$7(Attributes)
      if (IE8_DOM_DEFINE$1)
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

var createPropertyDescriptor$2 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value,
  }
}

var DESCRIPTORS$3 = descriptors
var definePropertyModule$3 = objectDefineProperty
var createPropertyDescriptor$1 = createPropertyDescriptor$2
var createNonEnumerableProperty$4 = DESCRIPTORS$3
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

var uncurryThis$b = functionUncurryThis
var isCallable$5 = isCallable$b
var store$1 = sharedStore
var functionToString = uncurryThis$b(Function.toString) // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (!isCallable$5(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it)
  }
}

var inspectSource$2 = store$1.inspectSource

var global$c = global$s
var isCallable$4 = isCallable$b
var inspectSource$1 = inspectSource$2
var WeakMap$1 = global$c.WeakMap
var nativeWeakMap =
  isCallable$4(WeakMap$1) && /native code/.test(inspectSource$1(WeakMap$1))

var shared$2 = shared$4.exports
var uid = uid$2
var keys = shared$2('keys')

var sharedKey$2 = function (key) {
  return keys[key] || (keys[key] = uid(key))
}

var hiddenKeys$4 = {}

var NATIVE_WEAK_MAP = nativeWeakMap
var global$b = global$s
var uncurryThis$a = functionUncurryThis
var isObject$1 = isObject$6
var createNonEnumerableProperty$3 = createNonEnumerableProperty$4
var hasOwn$5 = hasOwnProperty_1
var shared$1 = sharedStore
var sharedKey$1 = sharedKey$2
var hiddenKeys$3 = hiddenKeys$4
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized'
var TypeError$3 = global$b.TypeError
var WeakMap = global$b.WeakMap
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
    if (hasOwn$5(it, STATE)) throw new TypeError$3(OBJECT_ALREADY_INITIALIZED)
    metadata.facade = it
    createNonEnumerableProperty$3(it, STATE, metadata)
    return metadata
  }

  get = function (it) {
    return hasOwn$5(it, STATE) ? it[STATE] : {}
  }

  has = function (it) {
    return hasOwn$5(it, STATE)
  }
}

var internalState = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor,
}

var DESCRIPTORS$2 = descriptors
var hasOwn$4 = hasOwnProperty_1
var FunctionPrototype = Function.prototype // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getDescriptor = DESCRIPTORS$2 && Object.getOwnPropertyDescriptor
var EXISTS = hasOwn$4(FunctionPrototype, 'name') // additional protection from minified / mangled / dropped function names

var PROPER =
  EXISTS &&
  function something() {
    /* empty */
  }.name === 'something'

var CONFIGURABLE =
  EXISTS &&
  (!DESCRIPTORS$2 ||
    (DESCRIPTORS$2 && getDescriptor(FunctionPrototype, 'name').configurable))
var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE,
}

var global$a = global$s
var isCallable$3 = isCallable$b
var hasOwn$3 = hasOwnProperty_1
var createNonEnumerableProperty$2 = createNonEnumerableProperty$4
var setGlobal$1 = setGlobal$3
var inspectSource = inspectSource$2
var InternalStateModule = internalState
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE
var getInternalState$1 = InternalStateModule.get
var enforceInternalState = InternalStateModule.enforce
var TEMPLATE = String(String).split('String')
;(redefine$4.exports = function (O, key, value, options) {
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
      !hasOwn$3(value, 'name') ||
      (CONFIGURABLE_FUNCTION_NAME && value.name !== name)
    ) {
      createNonEnumerableProperty$2(value, 'name', name)
    }

    state = enforceInternalState(value)

    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '')
    }
  }

  if (O === global$a) {
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
    (isCallable$3(this) && getInternalState$1(this).source) ||
    inspectSource(this)
  )
})

var uncurryThis$9 = functionUncurryThis
var toString$6 = uncurryThis$9({}.toString)
var stringSlice$2 = uncurryThis$9(''.slice)

var classofRaw$1 = function (it) {
  return stringSlice$2(toString$6(it), 8, -1)
}

var global$9 = global$s
var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport
var isCallable$2 = isCallable$b
var classofRaw = classofRaw$1
var wellKnownSymbol$4 = wellKnownSymbol$7
var TO_STRING_TAG = wellKnownSymbol$4('toStringTag')
var Object$2 = global$9.Object // ES3 wrong here

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

var classof$5 = TO_STRING_TAG_SUPPORT$2
  ? classofRaw
  : function (it) {
      var O, tag, result
      return it === undefined
        ? 'Undefined'
        : it === null
        ? 'Null' // @@toStringTag case
        : typeof (tag = tryGet((O = Object$2(it)), TO_STRING_TAG)) == 'string'
        ? tag // builtinTag case
        : CORRECT_ARGUMENTS
        ? classofRaw(O) // ES3 arguments fallback
        : (result = classofRaw(O)) == 'Object' && isCallable$2(O.callee)
        ? 'Arguments'
        : result
    }

var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport
var classof$4 = classof$5 // `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring

var objectToString = TO_STRING_TAG_SUPPORT$1
  ? {}.toString
  : function toString() {
      return '[object ' + classof$4(this) + ']'
    }

var TO_STRING_TAG_SUPPORT = toStringTagSupport
var redefine$3 = redefine$4.exports
var toString$5 = objectToString // `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring

if (!TO_STRING_TAG_SUPPORT) {
  redefine$3(Object.prototype, 'toString', toString$5, {
    unsafe: true,
  })
}

var global$8 = global$s
var classof$3 = classof$5
var String$1 = global$8.String

var toString$4 = function (argument) {
  if (classof$3(argument) === 'Symbol')
    throw TypeError('Cannot convert a Symbol value to a string')
  return String$1(argument)
}

var anObject$6 = anObject$8 // `RegExp.prototype.flags` getter implementation
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

var uncurryThis$8 = functionUncurryThis
var PROPER_FUNCTION_NAME = functionName.PROPER
var redefine$2 = redefine$4.exports
var anObject$5 = anObject$8
var isPrototypeOf = objectIsPrototypeOf
var $toString = toString$4
var fails$7 = fails$b
var regExpFlags = regexpFlags$1
var TO_STRING = 'toString'
var RegExpPrototype$1 = RegExp.prototype
var n$ToString = RegExpPrototype$1[TO_STRING]
var getFlags = uncurryThis$8(regExpFlags)
var NOT_GENERIC = fails$7(function () {
  return (
    n$ToString.call({
      source: 'a',
      flags: 'b',
    }) != '/a/b'
  )
}) // FF44- RegExp#toString has a wrong name

var INCORRECT_NAME = PROPER_FUNCTION_NAME && n$ToString.name != TO_STRING // `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring

if (NOT_GENERIC || INCORRECT_NAME) {
  redefine$2(
    RegExp.prototype,
    TO_STRING,
    function toString() {
      var R = anObject$5(this)
      var p = $toString(R.source)
      var rf = R.flags
      var f = $toString(
        rf === undefined &&
          isPrototypeOf(RegExpPrototype$1, R) &&
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

var objectGetOwnPropertyDescriptor = {}

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

var global$7 = global$s
var uncurryThis$7 = functionUncurryThis
var fails$6 = fails$b
var classof$2 = classofRaw$1
var Object$1 = global$7.Object
var split = uncurryThis$7(''.split) // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails$6(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object$1('z').propertyIsEnumerable(0)
})
  ? function (it) {
      return classof$2(it) == 'String' ? split(it, '') : Object$1(it)
    }
  : Object$1

var IndexedObject$1 = indexedObject
var requireObjectCoercible$3 = requireObjectCoercible$5

var toIndexedObject$5 = function (it) {
  return IndexedObject$1(requireObjectCoercible$3(it))
}

var DESCRIPTORS$1 = descriptors
var call$3 = functionCall
var propertyIsEnumerableModule = objectPropertyIsEnumerable
var createPropertyDescriptor = createPropertyDescriptor$2
var toIndexedObject$4 = toIndexedObject$5
var toPropertyKey = toPropertyKey$2
var hasOwn$2 = hasOwnProperty_1
var IE8_DOM_DEFINE = ie8DomDefine // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

objectGetOwnPropertyDescriptor.f = DESCRIPTORS$1
  ? $getOwnPropertyDescriptor
  : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject$4(O)
      P = toPropertyKey(P)
      if (IE8_DOM_DEFINE)
        try {
          return $getOwnPropertyDescriptor(O, P)
        } catch (error) {
          /* empty */
        }
      if (hasOwn$2(O, P))
        return createPropertyDescriptor(
          !call$3(propertyIsEnumerableModule.f, O, P),
          O[P],
        )
    }

var objectGetOwnPropertyNames = {}

var ceil = Math.ceil
var floor = Math.floor // `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity

var toIntegerOrInfinity$3 = function (argument) {
  var number = +argument // eslint-disable-next-line no-self-compare -- safe

  return number !== number || number === 0
    ? 0
    : (number > 0 ? floor : ceil)(number)
}

var toIntegerOrInfinity$2 = toIntegerOrInfinity$3
var max = Math.max
var min$1 = Math.min // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex$1 = function (index, length) {
  var integer = toIntegerOrInfinity$2(index)
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length)
}

var toIntegerOrInfinity$1 = toIntegerOrInfinity$3
var min = Math.min // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

var toLength$2 = function (argument) {
  return argument > 0
    ? min(toIntegerOrInfinity$1(argument), 0x1fffffffffffff)
    : 0 // 2 ** 53 - 1 == 9007199254740991
}

var toLength$1 = toLength$2 // `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike

var lengthOfArrayLike$1 = function (obj) {
  return toLength$1(obj.length)
}

var toIndexedObject$3 = toIndexedObject$5
var toAbsoluteIndex = toAbsoluteIndex$1
var lengthOfArrayLike = lengthOfArrayLike$1 // `Array.prototype.{ indexOf, includes }` methods implementation

var createMethod$1 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$3($this)
    var length = lengthOfArrayLike(O)
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

var uncurryThis$6 = functionUncurryThis
var hasOwn$1 = hasOwnProperty_1
var toIndexedObject$2 = toIndexedObject$5
var indexOf$1 = arrayIncludes.indexOf
var hiddenKeys$2 = hiddenKeys$4
var push = uncurryThis$6([].push)

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$2(object)
  var i = 0
  var result = []
  var key

  for (key in O)
    !hasOwn$1(hiddenKeys$2, key) && hasOwn$1(O, key) && push(result, key) // Don't enum bug & hidden keys

  while (names.length > i)
    if (hasOwn$1(O, (key = names[i++]))) {
      ~indexOf$1(result, key) || push(result, key)
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
var uncurryThis$5 = functionUncurryThis
var getOwnPropertyNamesModule = objectGetOwnPropertyNames
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols
var anObject$4 = anObject$8
var concat = uncurryThis$5([].concat) // all object keys, includes non-enumerable and symbols

var ownKeys$1 =
  getBuiltIn$1('Reflect', 'ownKeys') ||
  function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$4(it))
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f
    return getOwnPropertySymbols
      ? concat(keys, getOwnPropertySymbols(it))
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

var fails$5 = fails$b
var isCallable$1 = isCallable$b
var replacement = /#|\.prototype\./

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)]
  return value == POLYFILL
    ? true
    : value == NATIVE
    ? false
    : isCallable$1(detection)
    ? fails$5(detection)
    : !!detection
}

var normalize = (isForced$1.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase()
})

var data = (isForced$1.data = {})
var NATIVE = (isForced$1.NATIVE = 'N')
var POLYFILL = (isForced$1.POLYFILL = 'P')
var isForced_1 = isForced$1

var global$6 = global$s
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f
var createNonEnumerableProperty$1 = createNonEnumerableProperty$4
var redefine$1 = redefine$4.exports
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
    target = global$6
  } else if (STATIC) {
    target = global$6[TARGET] || setGlobal(TARGET, {})
  } else {
    target = (global$6[TARGET] || {}).prototype
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

var fails$4 = fails$b

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

var $$3 = _export
var uncurryThis$4 = functionUncurryThis
var IndexedObject = indexedObject
var toIndexedObject$1 = toIndexedObject$5
var arrayMethodIsStrict = arrayMethodIsStrict$1
var un$Join = uncurryThis$4([].join)
var ES3_STRINGS = IndexedObject != Object
var STRICT_METHOD = arrayMethodIsStrict('join', ',') // `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join

$$3(
  {
    target: 'Array',
    proto: true,
    forced: ES3_STRINGS || !STRICT_METHOD,
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
var anObject$3 = anObject$8
var toIndexedObject = toIndexedObject$5
var objectKeys = objectKeys$1 // `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe

var objectDefineProperties = DESCRIPTORS
  ? Object.defineProperties
  : function defineProperties(O, Properties) {
      anObject$3(O)
      var props = toIndexedObject(Properties)
      var keys = objectKeys(Properties)
      var length = keys.length
      var index = 0
      var key

      while (length > index)
        definePropertyModule$1.f(O, (key = keys[index++]), props[key])

      return O
    }

var getBuiltIn = getBuiltIn$4
var html$1 = getBuiltIn('document', 'documentElement')

/* global ActiveXObject -- old IE, WSH */
var anObject$2 = anObject$8
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

var wellKnownSymbol$3 = wellKnownSymbol$7
var create$1 = objectCreate
var definePropertyModule = objectDefineProperty
var UNSCOPABLES = wellKnownSymbol$3('unscopables')
var ArrayPrototype = Array.prototype // Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create$1(null),
  })
} // add a key to Array.prototype[@@unscopables]

var addToUnscopables$1 = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true
}

var $$2 = _export
var $includes = arrayIncludes.includes
var addToUnscopables = addToUnscopables$1 // `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes

$$2(
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

addToUnscopables('includes')

var isObject = isObject$6
var classof$1 = classofRaw$1
var wellKnownSymbol$2 = wellKnownSymbol$7
var MATCH$1 = wellKnownSymbol$2('match') // `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp

var isRegexp = function (it) {
  var isRegExp
  return (
    isObject(it) &&
    ((isRegExp = it[MATCH$1]) !== undefined
      ? !!isRegExp
      : classof$1(it) == 'RegExp')
  )
}

var global$5 = global$s
var isRegExp = isRegexp
var TypeError$2 = global$5.TypeError

var notARegexp = function (it) {
  if (isRegExp(it)) {
    throw TypeError$2("The method doesn't accept regular expressions")
  }

  return it
}

var wellKnownSymbol$1 = wellKnownSymbol$7
var MATCH = wellKnownSymbol$1('match')

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

var $$1 = _export
var uncurryThis$3 = functionUncurryThis
var notARegExp = notARegexp
var requireObjectCoercible$2 = requireObjectCoercible$5
var toString$3 = toString$4
var correctIsRegExpLogic = correctIsRegexpLogic
var stringIndexOf = uncurryThis$3(''.indexOf) // `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes

$$1(
  {
    target: 'String',
    proto: true,
    forced: !correctIsRegExpLogic('includes'),
  },
  {
    includes: function includes(
      searchString,
      /* , position = 0 */
    ) {
      return !!~stringIndexOf(
        toString$3(requireObjectCoercible$2(this)),
        toString$3(notARegExp(searchString)),
        arguments.length > 1 ? arguments[1] : undefined,
      )
    },
  },
)

var regexpStickyHelpers = {}

var fails$3 = fails$b
var global$4 = global$s // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError

var $RegExp$2 = global$4.RegExp
regexpStickyHelpers.UNSUPPORTED_Y = fails$3(function () {
  var re = $RegExp$2('a', 'y')
  re.lastIndex = 2
  return re.exec('abcd') != null
})
regexpStickyHelpers.BROKEN_CARET = fails$3(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp$2('^r', 'gy')
  re.lastIndex = 2
  return re.exec('str') != null
})

var fails$2 = fails$b
var global$3 = global$s // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError

var $RegExp$1 = global$3.RegExp
var regexpUnsupportedDotAll = fails$2(function () {
  var re = $RegExp$1('.', 's')
  return !(re.dotAll && re.exec('\n') && re.flags === 's')
})

var fails$1 = fails$b
var global$2 = global$s // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError

var $RegExp = global$2.RegExp
var regexpUnsupportedNcg = fails$1(function () {
  var re = $RegExp('(?<a>b)', 'g')
  return re.exec('b').groups.a !== 'b' || 'b'.replace(re, '$<a>c') !== 'bc'
})

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */

/* eslint-disable regexp/no-useless-quantifier -- testing */

var call$2 = functionCall
var uncurryThis$2 = functionUncurryThis
var toString$2 = toString$4
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
var charAt$2 = uncurryThis$2(''.charAt)
var indexOf = uncurryThis$2(''.indexOf)
var replace = uncurryThis$2(''.replace)
var stringSlice$1 = uncurryThis$2(''.slice)

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/
  var re2 = /b*/g
  call$2(nativeExec, re1, 'a')
  call$2(nativeExec, re2, 'a')
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
    var str = toString$2(string)
    var raw = state.raw
    var result, reCopy, lastIndex, match, i, object, group

    if (raw) {
      raw.lastIndex = re.lastIndex
      result = call$2(patchedExec, raw, str)
      re.lastIndex = raw.lastIndex
      return result
    }

    var groups = state.groups
    var sticky = UNSUPPORTED_Y && re.sticky
    var flags = call$2(regexpFlags, re)
    var source = re.source
    var charsAdded = 0
    var strCopy = str

    if (sticky) {
      flags = replace(flags, 'y', '')

      if (indexOf(flags, 'g') === -1) {
        flags += 'g'
      }

      strCopy = stringSlice$1(str, re.lastIndex) // Support anchored sticky behavior.

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
    match = call$2(nativeExec, sticky ? reCopy : re, strCopy)

    if (sticky) {
      if (match) {
        match.input = stringSlice$1(match.input, charsAdded)
        match[0] = stringSlice$1(match[0], charsAdded)
        match.index = re.lastIndex
        re.lastIndex += match[0].length
      } else re.lastIndex = 0
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex
    }

    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      call$2(nativeReplace, match[0], reCopy, function () {
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

var $ = _export
var exec = regexpExec$2 // `RegExp.prototype.exec` method
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

var uncurryThis$1 = functionUncurryThis
var redefine = redefine$4.exports
var regexpExec$1 = regexpExec$2
var fails = fails$b
var wellKnownSymbol = wellKnownSymbol$7
var createNonEnumerableProperty = createNonEnumerableProperty$4
var SPECIES = wellKnownSymbol('species')
var RegExpPrototype = RegExp.prototype

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol(KEY)
  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {}

    O[SYMBOL] = function () {
      return 7
    }

    return ''[KEY](O) != 7
  })
  var DELEGATES_TO_EXEC =
    DELEGATES_TO_SYMBOL &&
    !fails(function () {
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
    var uncurriedNativeRegExpMethod = uncurryThis$1(/./[SYMBOL])
    var methods = exec(
      SYMBOL,
      ''[KEY],
      function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var uncurriedNativeMethod = uncurryThis$1(nativeMethod)
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
    redefine(String.prototype, KEY, methods[0])
    redefine(RegExpPrototype, SYMBOL, methods[1])
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true)
}

var uncurryThis = functionUncurryThis
var toIntegerOrInfinity = toIntegerOrInfinity$3
var toString$1 = toString$4
var requireObjectCoercible$1 = requireObjectCoercible$5
var charAt$1 = uncurryThis(''.charAt)
var charCodeAt = uncurryThis(''.charCodeAt)
var stringSlice = uncurryThis(''.slice)

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$1(requireObjectCoercible$1($this))
    var position = toIntegerOrInfinity(pos)
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
        ? charAt$1(S, position)
        : first
      : CONVERT_TO_STRING
      ? stringSlice(S, position, position + 2)
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

var global$1 = global$s
var call$1 = functionCall
var anObject$1 = anObject$8
var isCallable = isCallable$b
var classof = classofRaw$1
var regexpExec = regexpExec$2
var TypeError$1 = global$1.TypeError // `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec

var regexpExecAbstract = function (R, S) {
  var exec = R.exec

  if (isCallable(exec)) {
    var result = call$1(exec, R, S)
    if (result !== null) anObject$1(result)
    return result
  }

  if (classof(R) === 'RegExp') return call$1(regexpExec, R, S)
  throw TypeError$1('RegExp#exec called on incompatible receiver')
}

var call = functionCall
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic
var anObject = anObject$8
var toLength = toLength$2
var toString = toString$4
var requireObjectCoercible = requireObjectCoercible$5
var getMethod = getMethod$2
var advanceStringIndex = advanceStringIndex$1
var regExpExec = regexpExecAbstract // @@match logic

fixRegExpWellKnownSymbolLogic(
  'match',
  function (MATCH, nativeMatch, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.es/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = requireObjectCoercible(this)
        var matcher = regexp == undefined ? undefined : getMethod(regexp, MATCH)
        return matcher
          ? call(matcher, regexp, O)
          : new RegExp(regexp)[MATCH](toString(O))
      }, // `RegExp.prototype[@@match]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
      function (string) {
        var rx = anObject(this)
        var S = toString(string)
        var res = maybeCallNative(nativeMatch, rx, S)
        if (res.done) return res.value
        if (!rx.global) return regExpExec(rx, S)
        var fullUnicode = rx.unicode
        rx.lastIndex = 0
        var A = []
        var n = 0
        var result

        while ((result = regExpExec(rx, S)) !== null) {
          var matchStr = toString(result[0])
          A[n] = matchStr
          if (matchStr === '')
            rx.lastIndex = advanceStringIndex(
              S,
              toLength(rx.lastIndex),
              fullUnicode,
            )
          n++
        }

        return n === 0 ? null : A
      },
    ]
  },
)

var info = {
  description: 'a browser sync server for fis3.',
  keywords: ['browser-sync', 'livereload'],
  dependencies: [
    'body-parser',
    'browser-sync',
    'lodash.merge',
    'morgan',
    'serve-directory',
    'serve-directory-theme-octicons',
    'yargs',
    'yog-devtools',
    'execa',
  ],
  options: {},
  links: {
    browsersync: 'https://browsersync.io/',
  },
  files: ['app.js', 'templates/script-tags.tmpl'],
}
var info$1 = info

var _global = global,
  fis = _global.fis

var util = fis.require('command-server/lib/util.js')

var argv = yargs__default['default'].argv
var CWD = process__default['default'].cwd() // 每 0.2 秒读取子进程的输出文件。
//
// 为什么不直接通过 child.stdout 读取？
// 因为如果使用 stdio pipe 的方式去开启子进程，当 master 进程退出后，子进程再有输出就会导致程序莫名的崩溃。
// 解决办法是，让子进程的输出直接指向文件指针。
// master 每隔一段时间去读文件，获取子进程输出。

function watchOnFile(file, callback) {
  var lastIndex = 0
  var timer

  function read() {
    var stat = fs__default['default'].statSync(file)

    if (stat.size !== lastIndex) {
      var fd = fs__default['default'].openSync(file, 'r')
      var buffer$1 = buffer.Buffer.alloc(stat.size - lastIndex)

      try {
        fs__default['default'].readSync(
          fd,
          buffer$1,
          lastIndex,
          stat.size - lastIndex,
        )
        var content = buffer$1.toString('utf8')
        lastIndex = stat.size
        callback(content)
      } catch (_unused) {
        // 从头读起
        lastIndex = 0
      }
    }

    timer = setTimeout(read, 200)
  }

  read()
  return function () {
    clearTimeout(timer)
  }
}

function start(opt, callback) {
  var defaultScript = path__default['default'].join(opt.root, 'server.js')
  var script = fis.util.exists(defaultScript)
    ? defaultScript
    : path__default['default'].join(__dirname, 'app.js')
  var logFile = path__default['default'].join(opt.root, 'server.log')
  var timeout = Math.max(opt.timeout * 1000, 60000)
  var timeoutTimer
  var arguments_ = [
    script,
    '--root',
    opt.root || CWD,
    '--port',
    opt.port || 8080,
    '--https',
    opt.https,
    '--context',
    CWD,
    '--bs-config',
    argv.bsConfig || '',
  ]
  process__default['default'].stdout.write(
    '\n Starting browser-sync server ...',
  )
  var server = execa__default['default'](
    process__default['default'].execPath,
    arguments_,
    {
      cwd: path__default['default'].dirname(script),
      detached: opt.daemon,
      stdio: [
        0,
        opt.daemon ? fs__default['default'].openSync(logFile, 'w') : 'pipe',
        opt.daemon ? fs__default['default'].openSync(logFile, 'w+') : 'pipe',
      ],
    },
  )
  var log = ''
  var started = false
  var error = false
  var stoper

  function onData(chunk) {
    if (started) {
      return
    }

    chunk = chunk.toString('utf8')
    log += chunk
    process__default['default'].stdout.write('.')

    if (chunk.includes('Error')) {
      if (error) {
        return
      }

      error = true
      process__default['default'].stdout.write(' fail.\n')
      var match = chunk.match(/error:?\s+([^\n\r]+)/i)
      var errorMessage = 'unknown'

      if (chunk.includes('EADDRINUSE')) {
        log = ''
        errorMessage = 'Address already in use:'.concat(opt.port)
      } else if (match) {
        errorMessage = match[1]
      }

      if (log) {
        console.log(log)
      }

      if (stoper) {
        stoper()
      }

      try {
        callback(errorMessage)
      } catch (error_) {
        console.log(error_)
      }

      try {
        process__default['default'].kill(server.pid)
      } catch (_unused2) {}
    } else if (chunk.includes('Listening on')) {
      started = true

      if (stoper) {
        stoper()
      }

      clearTimeout(timeoutTimer)
      process__default['default'].stdout.write(
        ' at port ['.concat(opt.port, ']\n'),
      )
      callback(null)
    }
  }

  if (opt.daemon) {
    stoper = watchOnFile(logFile, onData)
    util.pid(String(server.pid)) // save pid to file.

    server.unref()
    timeoutTimer = setTimeout(function () {
      process__default['default'].stdout.write(' fail\n')

      if (log) {
        console.log(log)
      }

      fis.log.error('timeout')
    }, timeout)
  } else {
    server.stdout.on('data', onData)
    server.stderr.on('data', onData)
    server.stdout.pipe(process__default['default'].stdout)
    server.stderr.pipe(process__default['default'].stderr)
  }
}
var defaultOptions = info$1.options

exports.defaultOptions = defaultOptions
exports.start = start
