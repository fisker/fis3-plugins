'use strict'

var path$1 = require('path')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {default: e}
}

var path__default = /*#__PURE__*/ _interopDefaultLegacy(path$1)

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

function createCommonjsModule(fn, basedir, module) {
  return (
    (module = {
      path: basedir,
      exports: {},
      require: function (path, base) {
        return commonjsRequire(
          path,
          base === undefined || base === null ? module.path : base
        )
      },
    }),
    fn(module, module.exports),
    module.exports
  )
}

function commonjsRequire() {
  throw new Error(
    'Dynamic requires are not currently supported by @rollup/plugin-commonjs'
  )
}

var check = function (it) {
  return it && it.Math == Math && it
} // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028

var global_1 = // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func
  Function('return this')()

var fails = function (exec) {
  try {
    return !!exec()
  } catch (error) {
    return true
  }
}

var descriptors = !fails(function () {
  return (
    Object.defineProperty({}, 1, {
      get: function () {
        return 7
      },
    })[1] != 7
  )
})

var nativePropertyIsEnumerable = {}.propertyIsEnumerable
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor // Nashorn ~ JDK8 bug

var NASHORN_BUG =
  getOwnPropertyDescriptor &&
  !nativePropertyIsEnumerable.call(
    {
      1: 2,
    },
    1
  ) // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

var f = NASHORN_BUG
  ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor(this, V)
      return !!descriptor && descriptor.enumerable
    }
  : nativePropertyIsEnumerable
var objectPropertyIsEnumerable = {
  f: f,
}

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value,
  }
}

var toString = {}.toString

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1)
}

var split = ''.split // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0)
})
  ? function (it) {
      return classofRaw(it) == 'String' ? split.call(it, '') : Object(it)
    }
  : Object

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it)
  return it
}

var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it))
}

var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function'
}

// https://tc39.github.io/ecma262/#sec-toprimitive
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

var hasOwnProperty = {}.hasOwnProperty

var has = function (it, key) {
  return hasOwnProperty.call(it, key)
}

var document = global_1.document // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement)

var documentCreateElement = function (it) {
  return EXISTS ? document.createElement(it) : {}
}

var ie8DomDefine =
  !descriptors &&
  !fails(function () {
    return (
      Object.defineProperty(documentCreateElement('div'), 'a', {
        get: function () {
          return 7
        },
      }).a != 7
    )
  })

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

var f$1 = descriptors
  ? nativeGetOwnPropertyDescriptor
  : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject(O)
      P = toPrimitive(P, true)
      if (ie8DomDefine)
        try {
          return nativeGetOwnPropertyDescriptor(O, P)
        } catch (error) {
          /* empty */
        }
      if (has(O, P))
        return createPropertyDescriptor(
          !objectPropertyIsEnumerable.f.call(O, P),
          O[P]
        )
    }
var objectGetOwnPropertyDescriptor = {
  f: f$1,
}

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object')
  }

  return it
}

var nativeDefineProperty = Object.defineProperty // `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty

var f$2 = descriptors
  ? nativeDefineProperty
  : function defineProperty(O, P, Attributes) {
      anObject(O)
      P = toPrimitive(P, true)
      anObject(Attributes)
      if (ie8DomDefine)
        try {
          return nativeDefineProperty(O, P, Attributes)
        } catch (error) {
          /* empty */
        }
      if ('get' in Attributes || 'set' in Attributes)
        throw TypeError('Accessors not supported')
      if ('value' in Attributes) O[P] = Attributes.value
      return O
    }
var objectDefineProperty = {
  f: f$2,
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
    createNonEnumerableProperty(global_1, key, value)
  } catch (error) {
    global_1[key] = value
  }

  return value
}

var SHARED = '__core-js_shared__'
var store = global_1[SHARED] || setGlobal(SHARED, {})
var sharedStore = store

var functionToString = Function.toString // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

if (typeof sharedStore.inspectSource != 'function') {
  sharedStore.inspectSource = function (it) {
    return functionToString.call(it)
  }
}

var inspectSource = sharedStore.inspectSource

var WeakMap = global_1.WeakMap
var nativeWeakMap =
  typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap))

var shared = createCommonjsModule(function (module) {
  ;(module.exports = function (key, value) {
    return (
      sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {})
    )
  })('versions', []).push({
    version: '3.6.5',
    mode: 'global',
    copyright: '© 2020 Denis Pushkarev (zloirock.ru)',
  })
})

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

var keys = shared('keys')

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key))
}

var hiddenKeys = {}

var WeakMap$1 = global_1.WeakMap
var set, get, has$1

var enforce = function (it) {
  return has$1(it) ? get(it) : set(it, {})
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
  var store$1 = new WeakMap$1()
  var wmget = store$1.get
  var wmhas = store$1.has
  var wmset = store$1.set

  set = function (it, metadata) {
    wmset.call(store$1, it, metadata)
    return metadata
  }

  get = function (it) {
    return wmget.call(store$1, it) || {}
  }

  has$1 = function (it) {
    return wmhas.call(store$1, it)
  }
} else {
  var STATE = sharedKey('state')
  hiddenKeys[STATE] = true

  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata)
    return metadata
  }

  get = function (it) {
    return has(it, STATE) ? it[STATE] : {}
  }

  has$1 = function (it) {
    return has(it, STATE)
  }
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
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

    if (typeof value == 'function') {
      if (typeof key == 'string' && !has(value, 'name'))
        createNonEnumerableProperty(value, 'name', key)
      enforceInternalState(value).source = TEMPLATE.join(
        typeof key == 'string' ? key : ''
      )
    }

    if (O === global_1) {
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

var path = global_1

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined
}

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2
    ? aFunction(path[namespace]) || aFunction(global_1[namespace])
    : (path[namespace] && path[namespace][method]) ||
        (global_1[namespace] && global_1[namespace][method])
}

var ceil = Math.ceil
var floor = Math.floor // `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger

var toInteger = function (argument) {
  return isNaN((argument = +argument))
    ? 0
    : (argument > 0 ? floor : ceil)(argument)
}

var min = Math.min // `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength

var toLength = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1fffffffffffff) : 0 // 2 ** 53 - 1 == 9007199254740991
}

var max = Math.max
var min$1 = Math.min // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index)
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length)
}

var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this)
    var length = toLength(O.length)
    var index = toAbsoluteIndex(fromIndex, length)
    var value // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare

    if (IS_INCLUDES && el != el)
      while (length > index) {
        value = O[index++] // eslint-disable-next-line no-self-compare

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
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false),
}

var indexOf = arrayIncludes.indexOf

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object)
  var i = 0
  var result = []
  var key

  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key) // Don't enum bug & hidden keys

  while (names.length > i)
    if (has(O, (key = names[i++]))) {
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

var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype') // `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

var f$3 =
  Object.getOwnPropertyNames ||
  function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1)
  }

var objectGetOwnPropertyNames = {
  f: f$3,
}

var f$4 = Object.getOwnPropertySymbols
var objectGetOwnPropertySymbols = {
  f: f$4,
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
    if (!has(target, key))
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

var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f
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
    target = global_1
  } else if (STATIC) {
    target = global_1[TARGET] || setGlobal(TARGET, {})
  } else {
    target = (global_1[TARGET] || {}).prototype
  }

  if (target)
    for (key in source) {
      sourceProperty = source[key]

      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key)
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

// https://tc39.github.io/ecma262/#sec-isarray

var isArray =
  Array.isArray ||
  function isArray(arg) {
    return classofRaw(arg) == 'Array'
  }

// https://tc39.github.io/ecma262/#sec-toobject

var toObject = function (argument) {
  return Object(requireObjectCoercible(argument))
}

var createProperty = function (object, key, value) {
  var propertyKey = toPrimitive(key)
  if (propertyKey in object)
    objectDefineProperty.f(
      object,
      propertyKey,
      createPropertyDescriptor(0, value)
    )
  else object[propertyKey] = value
}

var nativeSymbol =
  !!Object.getOwnPropertySymbols &&
  !fails(function () {
    // Chrome 38 Symbol has incorrect toString conversion
    // eslint-disable-next-line no-undef
    return !String(Symbol())
  })

var useSymbolAsUid =
  nativeSymbol && // eslint-disable-next-line no-undef
  !Symbol.sham && // eslint-disable-next-line no-undef
  typeof Symbol.iterator == 'symbol'

var WellKnownSymbolsStore = shared('wks')
var Symbol$1 = global_1.Symbol
var createWellKnownSymbol = useSymbolAsUid
  ? Symbol$1
  : (Symbol$1 && Symbol$1.withoutSetter) || uid

var wellKnownSymbol = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (nativeSymbol && has(Symbol$1, name))
      WellKnownSymbolsStore[name] = Symbol$1[name]
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name)
  }

  return WellKnownSymbolsStore[name]
}

var SPECIES = wellKnownSymbol('species') // `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate

var arraySpeciesCreate = function (originalArray, length) {
  var C

  if (isArray(originalArray)) {
    C = originalArray.constructor // cross-realm fallback

    if (typeof C == 'function' && (C === Array || isArray(C.prototype)))
      C = undefined
    else if (isObject(C)) {
      C = C[SPECIES]
      if (C === null) C = undefined
    }
  }

  return new (C === undefined ? Array : C)(length === 0 ? 0 : length)
}

var engineUserAgent = getBuiltIn('navigator', 'userAgent') || ''

var process = global_1.process
var versions = process && process.versions
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

var SPECIES$1 = wellKnownSymbol('species')

var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return (
    engineV8Version >= 51 ||
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

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable')
var MAX_SAFE_INTEGER = 0x1fffffffffffff
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded' // We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679

var IS_CONCAT_SPREADABLE_SUPPORT =
  engineV8Version >= 51 ||
  !fails(function () {
    var array = []
    array[IS_CONCAT_SPREADABLE] = false
    return array.concat()[0] !== array
  })
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat')

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false
  var spreadable = O[IS_CONCAT_SPREADABLE]
  return spreadable !== undefined ? !!spreadable : isArray(O)
}

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT // `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species

_export(
  {
    target: 'Array',
    proto: true,
    forced: FORCED,
  },
  {
    concat: function concat(arg) {
      // eslint-disable-line no-unused-vars
      var O = toObject(this)
      var A = arraySpeciesCreate(O, 0)
      var n = 0
      var i, k, length, len, E

      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i]

        if (isConcatSpreadable(E)) {
          len = toLength(E.length)
          if (n + len > MAX_SAFE_INTEGER)
            throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED)

          for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k])
        } else {
          if (n >= MAX_SAFE_INTEGER)
            throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED)
          createProperty(A, n++, E)
        }
      }

      A.length = n
      return A
    },
  }
)

// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags

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

// so we use an intermediate function.

function RE(s, f) {
  return RegExp(s, f)
}

var UNSUPPORTED_Y = fails(function () {
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
  UNSUPPORTED_Y: UNSUPPORTED_Y,
  BROKEN_CARET: BROKEN_CARET,
}

var nativeExec = RegExp.prototype.exec // This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.

var nativeReplace = String.prototype.replace
var patchedExec = nativeExec

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/
  var re2 = /b*/g
  nativeExec.call(re1, 'a')
  nativeExec.call(re2, 'a')
  return re1.lastIndex !== 0 || re2.lastIndex !== 0
})()

var UNSUPPORTED_Y$1 =
  regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET // nonparticipating capturing group, copied from es5-shim's String#split patch.

var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined
var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this
    var lastIndex, reCopy, match, i
    var sticky = UNSUPPORTED_Y$1 && re.sticky
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

var SPECIES$2 = wellKnownSymbol('species')
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
        if (regexp.exec === regexpExec) {
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

var createMethod$1 = function (CONVERT_TO_STRING) {
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
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$1(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$1(true),
}

var charAt = stringMultibyte.charAt // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex

var advanceStringIndex = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1)
}

// https://tc39.github.io/ecma262/#sec-regexpexec

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

var max$1 = Math.max
var min$2 = Math.min
var floor$1 = Math.floor
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g

var maybeToString = function (it) {
  return it === undefined ? it : String(it)
} // @@replace logic

fixRegexpWellKnownSymbolLogic(
  'replace',
  2,
  function (REPLACE, nativeReplace, maybeCallNative, reason) {
    var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE =
      reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
      ? '$'
      : '$0'
    return [
      // `String.prototype.replace` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible(this)
        var replacer =
          searchValue == undefined ? undefined : searchValue[REPLACE]
        return replacer !== undefined
          ? replacer.call(searchValue, O, replaceValue)
          : nativeReplace.call(String(O), searchValue, replaceValue)
      }, // `RegExp.prototype[@@replace]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
      function (regexp, replaceValue) {
        if (
          (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
          (typeof replaceValue === 'string' &&
            replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
        ) {
          var res = maybeCallNative(nativeReplace, regexp, this, replaceValue)
          if (res.done) return res.value
        }

        var rx = anObject(regexp)
        var S = String(this)
        var functionalReplace = typeof replaceValue === 'function'
        if (!functionalReplace) replaceValue = String(replaceValue)
        var global = rx.global

        if (global) {
          var fullUnicode = rx.unicode
          rx.lastIndex = 0
        }

        var results = []

        while (true) {
          var result = regexpExecAbstract(rx, S)
          if (result === null) break
          results.push(result)
          if (!global) break
          var matchStr = String(result[0])
          if (matchStr === '')
            rx.lastIndex = advanceStringIndex(
              S,
              toLength(rx.lastIndex),
              fullUnicode
            )
        }

        var accumulatedResult = ''
        var nextSourcePosition = 0

        for (var i = 0; i < results.length; i++) {
          result = results[i]
          var matched = String(result[0])
          var position = max$1(min$2(toInteger(result.index), S.length), 0)
          var captures = [] // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

          for (var j = 1; j < result.length; j++)
            captures.push(maybeToString(result[j]))

          var namedCaptures = result.groups

          if (functionalReplace) {
            var replacerArgs = [matched].concat(captures, position, S)
            if (namedCaptures !== undefined) replacerArgs.push(namedCaptures)
            var replacement = String(
              replaceValue.apply(undefined, replacerArgs)
            )
          } else {
            replacement = getSubstitution(
              matched,
              S,
              position,
              captures,
              namedCaptures,
              replaceValue
            )
          }

          if (position >= nextSourcePosition) {
            accumulatedResult +=
              S.slice(nextSourcePosition, position) + replacement
            nextSourcePosition = position + matched.length
          }
        }

        return accumulatedResult + S.slice(nextSourcePosition)
      },
    ] // https://tc39.github.io/ecma262/#sec-getsubstitution

    function getSubstitution(
      matched,
      str,
      position,
      captures,
      namedCaptures,
      replacement
    ) {
      var tailPos = position + matched.length
      var m = captures.length
      var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED

      if (namedCaptures !== undefined) {
        namedCaptures = toObject(namedCaptures)
        symbols = SUBSTITUTION_SYMBOLS
      }

      return nativeReplace.call(replacement, symbols, function (match, ch) {
        var capture

        switch (ch.charAt(0)) {
          case '$':
            return '$'

          case '&':
            return matched

          case '`':
            return str.slice(0, position)

          case "'":
            return str.slice(tailPos)

          case '<':
            capture = namedCaptures[ch.slice(1, -1)]
            break

          default:
            // \d\d?
            var n = +ch
            if (n === 0) return match

            if (n > m) {
              var f = floor$1(n / 10)
              if (f === 0) return match
              if (f <= m)
                return captures[f - 1] === undefined
                  ? ch.charAt(1)
                  : captures[f - 1] + ch.charAt(1)
              return match
            }

            capture = captures[n - 1]
        }

        return capture === undefined ? '' : capture
      })
    }
  }
)

var MATCH = wellKnownSymbol('match') // `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp

var isRegexp = function (it) {
  var isRegExp
  return (
    isObject(it) &&
    ((isRegExp = it[MATCH]) !== undefined
      ? !!isRegExp
      : classofRaw(it) == 'RegExp')
  )
}

var aFunction$1 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function')
  }

  return it
}

var SPECIES$3 = wellKnownSymbol('species') // `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor

var speciesConstructor = function (O, defaultConstructor) {
  var C = anObject(O).constructor
  var S
  return C === undefined || (S = anObject(C)[SPECIES$3]) == undefined
    ? defaultConstructor
    : aFunction$1(S)
}

var arrayPush = [].push
var min$3 = Math.min
var MAX_UINT32 = 0xffffffff // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError

var SUPPORTS_Y = !fails(function () {
  return !RegExp(MAX_UINT32, 'y')
}) // @@split logic

fixRegexpWellKnownSymbolLogic(
  'split',
  2,
  function (SPLIT, nativeSplit, maybeCallNative) {
    var internalSplit

    if (
      'abbc'.split(/(b)*/)[1] == 'c' ||
      'test'.split(/(?:)/, -1).length != 4 ||
      'ab'.split(/(?:ab)*/).length != 2 ||
      '.'.split(/(.?)(.?)/).length != 4 ||
      '.'.split(/()()/).length > 1 ||
      ''.split(/.?/).length
    ) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function (separator, limit) {
        var string = String(requireObjectCoercible(this))
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0
        if (lim === 0) return []
        if (separator === undefined) return [string] // If `separator` is not a regex, use native split

        if (!isRegexp(separator)) {
          return nativeSplit.call(string, separator, lim)
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

        while ((match = regexpExec.call(separatorCopy, string))) {
          lastIndex = separatorCopy.lastIndex

          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index))
            if (match.length > 1 && match.index < string.length)
              arrayPush.apply(output, match.slice(1))
            lastLength = match[0].length
            lastLastIndex = lastIndex
            if (output.length >= lim) break
          }

          if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++ // Avoid an infinite loop
        }

        if (lastLastIndex === string.length) {
          if (lastLength || !separatorCopy.test('')) output.push('')
        } else output.push(string.slice(lastLastIndex))

        return output.length > lim ? output.slice(0, lim) : output
      } // Chakra, V8
    } else if ('0'.split(undefined, 0).length) {
      internalSplit = function (separator, limit) {
        return separator === undefined && limit === 0
          ? []
          : nativeSplit.call(this, separator, limit)
      }
    } else internalSplit = nativeSplit

    return [
      // `String.prototype.split` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = requireObjectCoercible(this)
        var splitter = separator == undefined ? undefined : separator[SPLIT]
        return splitter !== undefined
          ? splitter.call(separator, O, limit)
          : internalSplit.call(String(O), separator, limit)
      }, // `RegExp.prototype[@@split]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
      //
      // NOTE: This cannot be properly polyfilled in engines that don't support
      // the 'y' flag.
      function (regexp, limit) {
        var res = maybeCallNative(
          internalSplit,
          regexp,
          this,
          limit,
          internalSplit !== nativeSplit
        )
        if (res.done) return res.value
        var rx = anObject(regexp)
        var S = String(this)
        var C = speciesConstructor(rx, RegExp)
        var unicodeMatching = rx.unicode
        var flags =
          (rx.ignoreCase ? 'i' : '') +
          (rx.multiline ? 'm' : '') +
          (rx.unicode ? 'u' : '') +
          (SUPPORTS_Y ? 'y' : 'g') // ^(? + rx + ) is needed, in combination with some S slicing, to
        // simulate the 'y' flag.

        var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags)
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0
        if (lim === 0) return []
        if (S.length === 0)
          return regexpExecAbstract(splitter, S) === null ? [S] : []
        var p = 0
        var q = 0
        var A = []

        while (q < S.length) {
          splitter.lastIndex = SUPPORTS_Y ? q : 0
          var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q))
          var e

          if (
            z === null ||
            (e = min$3(
              toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)),
              S.length
            )) === p
          ) {
            q = advanceStringIndex(S, q, unicodeMatching)
          } else {
            A.push(S.slice(p, q))
            if (A.length === lim) return A

            for (var i = 1; i <= z.length - 1; i++) {
              A.push(z[i])
              if (A.length === lim) return A
            }

            q = p = e
          }
        }

        A.push(S.slice(p))
        return A
      },
    ]
  },
  !SUPPORTS_Y
)

var info = {
  description: 'fis3 relative path support',
  keywords: ['relative'],
  options: {},
}

var info$1 = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  default: info,
})

function exportPlugin(process, _ref) {
  var options = _ref.options
  process.defaultOptions = options
  return process
}

var _global = global,
  fis = _global.fis
var quotes = {
  '': 'QUOTE_NONE',
  "'": 'QUOTE_SINGLE',
  '"': 'QUOTE_DOUBLE',
}
var rUrl = /(["']?)__relative___(QUOTE_(?:NONE|SINGLE|DOUBLE))-(.*?)___(\1)/g
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

function process$1(fis) {
  fis.on('process:end', onProcessEnd)
  fis.on('standard:restore:uri', onStandardRestoreUri)
  fis.on('pack:file', onPackFile) // 给其他插件用的

  fis.on('plugin:relative:fetch', onFetchRelativeUrl)
}

module.exports = exportPlugin(process$1, info$1)
