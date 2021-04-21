'use strict'

Object.defineProperty(exports, '__esModule', {value: true})

var path$1 = require('path')
var fs = require('fs')
var execa = require('execa')
var yargs = require('yargs')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {default: e}
}

var path__default = /*#__PURE__*/ _interopDefaultLegacy(path$1)
var fs__default = /*#__PURE__*/ _interopDefaultLegacy(fs)
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

function createCommonjsModule(fn) {
  var module = {exports: {}}
  return fn(module, module.exports), module.exports
}

var check = function (it) {
  return it && it.Math == Math && it
} // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028

var global$1 = // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  (function () {
    return this
  })() ||
  Function('return this')()

var fails = function (exec) {
  try {
    return !!exec()
  } catch (error) {
    return true
  }
}

var descriptors = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return (
    Object.defineProperty({}, 1, {
      get: function () {
        return 7
      },
    })[1] != 7
  )
})

var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function'
}

var document$1 = global$1.document // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document$1) && isObject(document$1.createElement)

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {}
}

var ie8DomDefine =
  !descriptors &&
  !fails(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return (
      Object.defineProperty(documentCreateElement('div'), 'a', {
        get: function () {
          return 7
        },
      }).a != 7
    )
  })

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object')
  }

  return it
}

// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string

var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input
  var fn, val
  if (
    PREFERRED_STRING &&
    typeof (fn = input.toString) == 'function' &&
    !isObject((val = fn.call(input)))
  )
    return val
  if (
    typeof (fn = input.valueOf) == 'function' &&
    !isObject((val = fn.call(input)))
  )
    return val
  if (
    !PREFERRED_STRING &&
    typeof (fn = input.toString) == 'function' &&
    !isObject((val = fn.call(input)))
  )
    return val
  throw TypeError("Can't convert object to primitive value")
}

var $defineProperty = Object.defineProperty // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

var f$4 = descriptors
  ? $defineProperty
  : function defineProperty(O, P, Attributes) {
      anObject(O)
      P = toPrimitive(P, true)
      anObject(Attributes)
      if (ie8DomDefine)
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
var objectDefineProperty = {
  f: f$4,
}

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value,
  }
}

var createNonEnumerableProperty = descriptors
  ? function (object, key, value) {
      return objectDefineProperty.f(
        object,
        key,
        createPropertyDescriptor(1, value)
      )
    }
  : function (object, key, value) {
      object[key] = value
      return object
    }

var setGlobal = function (key, value) {
  try {
    createNonEnumerableProperty(global$1, key, value)
  } catch (error) {
    global$1[key] = value
  }

  return value
}

var SHARED = '__core-js_shared__'
var store$1 = global$1[SHARED] || setGlobal(SHARED, {})
var sharedStore = store$1

var shared = createCommonjsModule(function (module) {
  ;(module.exports = function (key, value) {
    return (
      sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {})
    )
  })('versions', []).push({
    version: '3.10.2',
    mode: 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)',
  })
})

var hasOwnProperty = {}.hasOwnProperty

var has$1 = function (it, key) {
  return hasOwnProperty.call(it, key)
}

var id = 0
var postfix = Math.random()

var uid = function (key) {
  return (
    'Symbol(' +
    String(key === undefined ? '' : key) +
    ')_' +
    (++id + postfix).toString(36)
  )
}

var toString = {}.toString

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1)
}

var engineIsNode = classofRaw(global$1.process) == 'process'

var path = global$1

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined
}

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2
    ? aFunction(path[namespace]) || aFunction(global$1[namespace])
    : (path[namespace] && path[namespace][method]) ||
        (global$1[namespace] && global$1[namespace][method])
}

var engineUserAgent = getBuiltIn('navigator', 'userAgent') || ''

var process$1 = global$1.process
var versions = process$1 && process$1.versions
var v8 = versions && versions.v8
var match, version

if (v8) {
  match = v8.split('.')
  version = match[0] + match[1]
} else if (engineUserAgent) {
  match = engineUserAgent.match(/Edge\/(\d+)/)

  if (!match || match[1] >= 74) {
    match = engineUserAgent.match(/Chrome\/(\d+)/)
    if (match) version = match[1]
  }
}

var engineV8Version = version && +version

var nativeSymbol =
  !!Object.getOwnPropertySymbols &&
  !fails(function () {
    // eslint-disable-next-line es/no-symbol -- required for testing
    return (
      !Symbol.sham && // Chrome 38 Symbol has incorrect toString conversion
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      (engineIsNode
        ? engineV8Version === 38
        : engineV8Version > 37 && engineV8Version < 41)
    )
  })

/* eslint-disable es/no-symbol -- required for testing */
var useSymbolAsUid =
  nativeSymbol && !Symbol.sham && typeof Symbol.iterator == 'symbol'

var WellKnownSymbolsStore = shared('wks')
var Symbol$1 = global$1.Symbol
var createWellKnownSymbol = useSymbolAsUid
  ? Symbol$1
  : (Symbol$1 && Symbol$1.withoutSetter) || uid

var wellKnownSymbol = function (name) {
  if (
    !has$1(WellKnownSymbolsStore, name) ||
    !(nativeSymbol || typeof WellKnownSymbolsStore[name] == 'string')
  ) {
    if (nativeSymbol && has$1(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name]
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name)
    }
  }

  return WellKnownSymbolsStore[name]
}

var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag')
var test = {}
test[TO_STRING_TAG$1] = 'z'
var toStringTagSupport = String(test) === '[object z]'

var functionToString = Function.toString // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

if (typeof sharedStore.inspectSource != 'function') {
  sharedStore.inspectSource = function (it) {
    return functionToString.call(it)
  }
}

var inspectSource = sharedStore.inspectSource

var WeakMap$1 = global$1.WeakMap
var nativeWeakMap =
  typeof WeakMap$1 === 'function' &&
  /native code/.test(inspectSource(WeakMap$1))

var keys = shared('keys')

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key))
}

var hiddenKeys$1 = {}

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized'
var WeakMap = global$1.WeakMap
var set, get, has

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {})
}

var getterFor = function (TYPE) {
  return function (it) {
    var state

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required')
    }

    return state
  }
}

if (nativeWeakMap) {
  var store = sharedStore.state || (sharedStore.state = new WeakMap())
  var wmget = store.get
  var wmhas = store.has
  var wmset = store.set

  set = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED)
    metadata.facade = it
    wmset.call(store, it, metadata)
    return metadata
  }

  get = function (it) {
    return wmget.call(store, it) || {}
  }

  has = function (it) {
    return wmhas.call(store, it)
  }
} else {
  var STATE = sharedKey('state')
  hiddenKeys$1[STATE] = true

  set = function (it, metadata) {
    if (has$1(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED)
    metadata.facade = it
    createNonEnumerableProperty(it, STATE, metadata)
    return metadata
  }

  get = function (it) {
    return has$1(it, STATE) ? it[STATE] : {}
  }

  has = function (it) {
    return has$1(it, STATE)
  }
}

var internalState = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor,
}

var redefine = createCommonjsModule(function (module) {
  var getInternalState = internalState.get
  var enforceInternalState = internalState.enforce
  var TEMPLATE = String(String).split('String')
  ;(module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false
    var simple = options ? !!options.enumerable : false
    var noTargetGet = options ? !!options.noTargetGet : false
    var state

    if (typeof value == 'function') {
      if (typeof key == 'string' && !has$1(value, 'name')) {
        createNonEnumerableProperty(value, 'name', key)
      }

      state = enforceInternalState(value)

      if (!state.source) {
        state.source = TEMPLATE.join(typeof key == 'string' ? key : '')
      }
    }

    if (O === global$1) {
      if (simple) O[key] = value
      else setGlobal(key, value)
      return
    } else if (!unsafe) {
      delete O[key]
    } else if (!noTargetGet && O[key]) {
      simple = true
    }

    if (simple) O[key] = value
    else createNonEnumerableProperty(O, key, value) // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return (
      (typeof this == 'function' && getInternalState(this).source) ||
      inspectSource(this)
    )
  })
})

var TO_STRING_TAG = wellKnownSymbol('toStringTag') // ES3 wrong here

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

var classof = toStringTagSupport
  ? classofRaw
  : function (it) {
      var O, tag, result
      return it === undefined
        ? 'Undefined'
        : it === null
        ? 'Null' // @@toStringTag case
        : typeof (tag = tryGet((O = Object(it)), TO_STRING_TAG)) == 'string'
        ? tag // builtinTag case
        : CORRECT_ARGUMENTS
        ? classofRaw(O) // ES3 arguments fallback
        : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function'
        ? 'Arguments'
        : result
    }

// https://tc39.es/ecma262/#sec-object.prototype.tostring

var objectToString = toStringTagSupport
  ? {}.toString
  : function toString() {
      return '[object ' + classof(this) + ']'
    }

// https://tc39.es/ecma262/#sec-object.prototype.tostring

if (!toStringTagSupport) {
  redefine(Object.prototype, 'toString', objectToString, {
    unsafe: true,
  })
}

// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags

var regexpFlags = function () {
  var that = anObject(this)
  var result = ''
  if (that.global) result += 'g'
  if (that.ignoreCase) result += 'i'
  if (that.multiline) result += 'm'
  if (that.dotAll) result += 's'
  if (that.unicode) result += 'u'
  if (that.sticky) result += 'y'
  return result
}

var TO_STRING = 'toString'
var RegExpPrototype = RegExp.prototype
var nativeToString = RegExpPrototype[TO_STRING]
var NOT_GENERIC = fails(function () {
  return (
    nativeToString.call({
      source: 'a',
      flags: 'b',
    }) != '/a/b'
  )
}) // FF44- RegExp#toString has a wrong name

var INCORRECT_NAME = nativeToString.name != TO_STRING // `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring

if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(
    RegExp.prototype,
    TO_STRING,
    function toString() {
      var R = anObject(this)
      var p = String(R.source)
      var rf = R.flags
      var f = String(
        rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype)
          ? regexpFlags.call(R)
          : rf
      )
      return '/' + p + '/' + f
    },
    {
      unsafe: true,
    }
  )
}

var $propertyIsEnumerable = {}.propertyIsEnumerable // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor // Nashorn ~ JDK8 bug

var NASHORN_BUG =
  getOwnPropertyDescriptor$1 &&
  !$propertyIsEnumerable.call(
    {
      1: 2,
    },
    1
  ) // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

var f$3 = NASHORN_BUG
  ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor$1(this, V)
      return !!descriptor && descriptor.enumerable
    }
  : $propertyIsEnumerable
var objectPropertyIsEnumerable = {
  f: f$3,
}

var split = ''.split // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0)
})
  ? function (it) {
      return classofRaw(it) == 'String' ? split.call(it, '') : Object(it)
    }
  : Object

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it)
  return it
}

var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it))
}

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

var f$2 = descriptors
  ? $getOwnPropertyDescriptor
  : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject(O)
      P = toPrimitive(P, true)
      if (ie8DomDefine)
        try {
          return $getOwnPropertyDescriptor(O, P)
        } catch (error) {
          /* empty */
        }
      if (has$1(O, P))
        return createPropertyDescriptor(
          !objectPropertyIsEnumerable.f.call(O, P),
          O[P]
        )
    }
var objectGetOwnPropertyDescriptor = {
  f: f$2,
}

var ceil = Math.ceil
var floor = Math.floor // `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger

var toInteger = function (argument) {
  return isNaN((argument = +argument))
    ? 0
    : (argument > 0 ? floor : ceil)(argument)
}

var min$1 = Math.min // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

var toLength = function (argument) {
  return argument > 0 ? min$1(toInteger(argument), 0x1fffffffffffff) : 0 // 2 ** 53 - 1 == 9007199254740991
}

var max = Math.max
var min = Math.min // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index)
  return integer < 0 ? max(integer + length, 0) : min(integer, length)
}

var createMethod$1 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this)
    var length = toLength(O.length)
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

var indexOf = arrayIncludes.indexOf

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object)
  var i = 0
  var result = []
  var key

  for (key in O) !has$1(hiddenKeys$1, key) && has$1(O, key) && result.push(key) // Don't enum bug & hidden keys

  while (names.length > i)
    if (has$1(O, (key = names[i++]))) {
      ~indexOf(result, key) || result.push(key)
    }

  return result
}

// IE8- don't enum bug keys
var enumBugKeys = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf',
]

var hiddenKeys = enumBugKeys.concat('length', 'prototype') // `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe

var f$1 =
  Object.getOwnPropertyNames ||
  function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys)
  }

var objectGetOwnPropertyNames = {
  f: f$1,
}

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
var f = Object.getOwnPropertySymbols
var objectGetOwnPropertySymbols = {
  f: f,
}

var ownKeys =
  getBuiltIn('Reflect', 'ownKeys') ||
  function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it))
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys
  }

var copyConstructorProperties = function (target, source) {
  var keys = ownKeys(source)
  var defineProperty = objectDefineProperty.f
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    if (!has$1(target, key))
      defineProperty(target, key, getOwnPropertyDescriptor(source, key))
  }
}

var replacement = /#|\.prototype\./

var isForced = function (feature, detection) {
  var value = data[normalize(feature)]
  return value == POLYFILL
    ? true
    : value == NATIVE
    ? false
    : typeof detection == 'function'
    ? fails(detection)
    : !!detection
}

var normalize = (isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase()
})

var data = (isForced.data = {})
var NATIVE = (isForced.NATIVE = 'N')
var POLYFILL = (isForced.POLYFILL = 'P')
var isForced_1 = isForced

var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f
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
    target = global$1
  } else if (STATIC) {
    target = global$1[TARGET] || setGlobal(TARGET, {})
  } else {
    target = (global$1[TARGET] || {}).prototype
  }

  if (target)
    for (key in source) {
      sourceProperty = source[key]

      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor(target, key)
        targetProperty = descriptor && descriptor.value
      } else targetProperty = target[key]

      FORCED = isForced_1(
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

      redefine(target, key, sourceProperty, options)
    }
}

var arrayMethodIsStrict = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME]
  return (
    !!method &&
    fails(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
      method.call(
        null,
        argument ||
          function () {
            throw 1
          },
        1
      )
    })
  )
}

var nativeJoin = [].join
var ES3_STRINGS = indexedObject != Object
var STRICT_METHOD = arrayMethodIsStrict('join', ',') // `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join

_export(
  {
    target: 'Array',
    proto: true,
    forced: ES3_STRINGS || !STRICT_METHOD,
  },
  {
    join: function join(separator) {
      return nativeJoin.call(
        toIndexedObject(this),
        separator === undefined ? ',' : separator
      )
    },
  }
)

// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe

var objectKeys =
  Object.keys ||
  function keys(O) {
    return objectKeysInternal(O, enumBugKeys)
  }

// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe

var objectDefineProperties = descriptors
  ? Object.defineProperties
  : function defineProperties(O, Properties) {
      anObject(O)
      var keys = objectKeys(Properties)
      var length = keys.length
      var index = 0
      var key

      while (length > index)
        objectDefineProperty.f(O, (key = keys[index++]), Properties[key])

      return O
    }

var html = getBuiltIn('document', 'documentElement')

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
    /* global ActiveXObject -- old IE */
    activeXDocument = document.domain && new ActiveXObject('htmlfile')
  } catch (error) {
    /* ignore */
  }

  NullProtoObject = activeXDocument
    ? NullProtoObjectViaActiveX(activeXDocument)
    : NullProtoObjectViaIFrame()
  var length = enumBugKeys.length

  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]]

  return NullProtoObject()
}

hiddenKeys$1[IE_PROTO] = true // `Object.create` method
// https://tc39.es/ecma262/#sec-object.create

var objectCreate =
  Object.create ||
  function create(O, Properties) {
    var result

    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject(O)
      result = new EmptyConstructor()
      EmptyConstructor[PROTOTYPE] = null // add "__proto__" for Object.getPrototypeOf polyfill

      result[IE_PROTO] = O
    } else result = NullProtoObject()

    return Properties === undefined
      ? result
      : objectDefineProperties(result, Properties)
  }

var UNSCOPABLES = wellKnownSymbol('unscopables')
var ArrayPrototype = Array.prototype // Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

if (ArrayPrototype[UNSCOPABLES] == undefined) {
  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: objectCreate(null),
  })
} // add a key to Array.prototype[@@unscopables]

var addToUnscopables = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true
}

var $includes = arrayIncludes.includes // `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes

_export(
  {
    target: 'Array',
    proto: true,
  },
  {
    includes: function includes(
      el
      /* , fromIndex = 0 */
    ) {
      return $includes(
        this,
        el,
        arguments.length > 1 ? arguments[1] : undefined
      )
    },
  }
) // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('includes')

var MATCH$1 = wellKnownSymbol('match') // `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp

var isRegexp = function (it) {
  var isRegExp
  return (
    isObject(it) &&
    ((isRegExp = it[MATCH$1]) !== undefined
      ? !!isRegExp
      : classofRaw(it) == 'RegExp')
  )
}

var notARegexp = function (it) {
  if (isRegexp(it)) {
    throw TypeError("The method doesn't accept regular expressions")
  }

  return it
}

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

// https://tc39.es/ecma262/#sec-string.prototype.includes

_export(
  {
    target: 'String',
    proto: true,
    forced: !correctIsRegexpLogic('includes'),
  },
  {
    includes: function includes(
      searchString
      /* , position = 0 */
    ) {
      return !!~String(requireObjectCoercible(this)).indexOf(
        notARegexp(searchString),
        arguments.length > 1 ? arguments[1] : undefined
      )
    },
  }
)

// so we use an intermediate function.

function RE(s, f) {
  return RegExp(s, f)
}

var UNSUPPORTED_Y$1 = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y')
  re.lastIndex = 2
  return re.exec('abcd') != null
})
var BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy')
  re.lastIndex = 2
  return re.exec('str') != null
})
var regexpStickyHelpers = {
  UNSUPPORTED_Y: UNSUPPORTED_Y$1,
  BROKEN_CARET: BROKEN_CARET,
}

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

var UNSUPPORTED_Y =
  regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET // nonparticipating capturing group, copied from es5-shim's String#split patch.
// eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing

var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined
var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this
    var lastIndex, reCopy, match, i
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

      strCopy = String(str).slice(re.lastIndex) // Support anchored sticky behavior.

      if (
        re.lastIndex > 0 &&
        (!re.multiline || (re.multiline && str[re.lastIndex - 1] !== '\n'))
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

    return match
  }
}

var regexpExec = patchedExec

// https://tc39.es/ecma262/#sec-regexp.prototype.exec

_export(
  {
    target: 'RegExp',
    proto: true,
    forced: /./.exec !== regexpExec,
  },
  {
    exec: regexpExec,
  }
)

var SPECIES = wellKnownSymbol('species')
var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./

  re.exec = function () {
    var result = []
    result.groups = {
      a: '7',
    }
    return result
  }

  return ''.replace(re, '$<a>') !== '7'
}) // IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0

var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0'
})()

var REPLACE = wellKnownSymbol('replace') // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string

var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === ''
  }

  return false
})() // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
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
})

var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
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

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' &&
      !(
        REPLACE_SUPPORTS_NAMED_GROUPS &&
        REPLACE_KEEPS_$0 &&
        !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
      )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL]
    var methods = exec(
      SYMBOL,
      ''[KEY],
      function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === RegExp.prototype.exec) {
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
      {
        REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
        REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,
      }
    )
    var stringMethod = methods[0]
    var regexMethod = methods[1]
    redefine(String.prototype, KEY, stringMethod)
    redefine(
      RegExp.prototype,
      SYMBOL,
      length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
        ? // 21.2.5.11 RegExp.prototype[@@split](string, limit)
          function (string, arg) {
            return regexMethod.call(string, this, arg)
          } // 21.2.5.6 RegExp.prototype[@@match](string)
        : // 21.2.5.9 RegExp.prototype[@@search](string)
          function (string) {
            return regexMethod.call(string, this)
          }
    )
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true)
}

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this))
    var position = toInteger(pos)
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

var advanceStringIndex = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1)
}

// https://tc39.es/ecma262/#sec-regexpexec

var regexpExecAbstract = function (R, S) {
  var exec = R.exec

  if (typeof exec === 'function') {
    var result = exec.call(R, S)

    if (typeof result !== 'object') {
      throw TypeError(
        'RegExp exec method returned something other than an Object or null'
      )
    }

    return result
  }

  if (classofRaw(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver')
  }

  return regexpExec.call(R, S)
}

fixRegexpWellKnownSymbolLogic(
  'match',
  1,
  function (MATCH, nativeMatch, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.es/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = requireObjectCoercible(this)
        var matcher = regexp == undefined ? undefined : regexp[MATCH]
        return matcher !== undefined
          ? matcher.call(regexp, O)
          : new RegExp(regexp)[MATCH](String(O))
      }, // `RegExp.prototype[@@match]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
      function (regexp) {
        var res = maybeCallNative(nativeMatch, regexp, this)
        if (res.done) return res.value
        var rx = anObject(regexp)
        var S = String(this)
        if (!rx.global) return regexpExecAbstract(rx, S)
        var fullUnicode = rx.unicode
        rx.lastIndex = 0
        var A = []
        var n = 0
        var result

        while ((result = regexpExecAbstract(rx, S)) !== null) {
          var matchStr = String(result[0])
          A[n] = matchStr
          if (matchStr === '')
            rx.lastIndex = advanceStringIndex(
              S,
              toLength(rx.lastIndex),
              fullUnicode
            )
          n++
        }

        return n === 0 ? null : A
      },
    ]
  }
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

var info$1 = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  default: info,
})

var _global = global,
  fis = _global.fis

var util = fis.require('command-server/lib/util.js')

var argv = yargs__default['default'].argv
var CWD = process.cwd() // 每 0.2 秒读取子进程的输出文件。
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
      var buffer = Buffer.alloc(stat.size - lastIndex)

      try {
        fs__default['default'].readSync(
          fd,
          buffer,
          lastIndex,
          stat.size - lastIndex
        )
        var content = buffer.toString('utf8')
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
  process.stdout.write('\n Starting browser-sync server ...')
  var server = execa__default['default'](process.execPath, arguments_, {
    cwd: path__default['default'].dirname(script),
    detached: opt.daemon,
    stdio: [
      0,
      opt.daemon ? fs__default['default'].openSync(logFile, 'w') : 'pipe',
      opt.daemon ? fs__default['default'].openSync(logFile, 'w+') : 'pipe',
    ],
  })
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
    process.stdout.write('.')

    if (chunk.includes('Error')) {
      if (error) {
        return
      }

      error = true
      process.stdout.write(' fail.\n')
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
        process.kill(server.pid)
      } catch (_unused2) {}
    } else if (chunk.includes('Listening on')) {
      started = true

      if (stoper) {
        stoper()
      }

      clearTimeout(timeoutTimer)
      process.stdout.write(' at port ['.concat(opt.port, ']\n'))
      callback(null)
    }
  }

  if (opt.daemon) {
    stoper = watchOnFile(logFile, onData)
    util.pid(String(server.pid)) // save pid to file.

    server.unref()
    timeoutTimer = setTimeout(function () {
      process.stdout.write(' fail\n')

      if (log) {
        console.log(log)
      }

      fis.log.error('timeout')
    }, timeout)
  } else {
    server.stdout.on('data', onData)
    server.stderr.on('data', onData)
    server.stdout.pipe(process.stdout)
    server.stderr.pipe(process.stderr)
  }
}
var defaultOptions = undefined

exports.defaultOptions = defaultOptions
exports.start = start
