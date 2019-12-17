'use strict'

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var eslint = require('eslint')
var standard = _interopDefault(require('standard'))

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

function createCommonjsModule(fn, module) {
  return (module = {exports: {}}), fn(module, module.exports), module.exports
}

var check = function(it) {
  return it && it.Math == Math && it
} // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028

var global_1 = // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func
  Function('return this')()

var fails = function(exec) {
  try {
    return !!exec()
  } catch (error) {
    return true
  }
}

var descriptors = !fails(function() {
  return (
    Object.defineProperty({}, 'a', {
      get: function() {
        return 7
      },
    }).a != 7
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

var createPropertyDescriptor = function(bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value,
  }
}

var toString = {}.toString

var classofRaw = function(it) {
  return toString.call(it).slice(8, -1)
}

var split = ''.split // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails(function() {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0)
})
  ? function(it) {
      return classofRaw(it) == 'String' ? split.call(it, '') : Object(it)
    }
  : Object

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function(it) {
  if (it == undefined) throw TypeError("Can't call method on " + it)
  return it
}

var toIndexedObject = function(it) {
  return indexedObject(requireObjectCoercible(it))
}

var isObject = function(it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function'
}

// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string

var toPrimitive = function(input, PREFERRED_STRING) {
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

var has = function(it, key) {
  return hasOwnProperty.call(it, key)
}

var document = global_1.document // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement)

var documentCreateElement = function(it) {
  return EXISTS ? document.createElement(it) : {}
}

var ie8DomDefine =
  !descriptors &&
  !fails(function() {
    return (
      Object.defineProperty(documentCreateElement('div'), 'a', {
        get: function() {
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

var anObject = function(it) {
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
  ? function(object, key, value) {
      return objectDefineProperty.f(
        object,
        key,
        createPropertyDescriptor(1, value)
      )
    }
  : function(object, key, value) {
      object[key] = value
      return object
    }

var setGlobal = function(key, value) {
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
  sharedStore.inspectSource = function(it) {
    return functionToString.call(it)
  }
}

var inspectSource = sharedStore.inspectSource

var WeakMap = global_1.WeakMap
var nativeWeakMap =
  typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap))

var shared = createCommonjsModule(function(module) {
  ;(module.exports = function(key, value) {
    return (
      sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {})
    )
  })('versions', []).push({
    version: '3.5.0',
    mode: 'global',
    copyright: '© 2019 Denis Pushkarev (zloirock.ru)',
  })
})

var id = 0
var postfix = Math.random()

var uid = function(key) {
  return (
    'Symbol(' +
    String(key === undefined ? '' : key) +
    ')_' +
    (++id + postfix).toString(36)
  )
}

var keys = shared('keys')

var sharedKey = function(key) {
  return keys[key] || (keys[key] = uid(key))
}

var hiddenKeys = {}

var WeakMap$1 = global_1.WeakMap
var set, get, has$1

var enforce = function(it) {
  return has$1(it) ? get(it) : set(it, {})
}

var getterFor = function(TYPE) {
  return function(it) {
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

  set = function(it, metadata) {
    wmset.call(store$1, it, metadata)
    return metadata
  }

  get = function(it) {
    return wmget.call(store$1, it) || {}
  }

  has$1 = function(it) {
    return wmhas.call(store$1, it)
  }
} else {
  var STATE = sharedKey('state')
  hiddenKeys[STATE] = true

  set = function(it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata)
    return metadata
  }

  get = function(it) {
    return has(it, STATE) ? it[STATE] : {}
  }

  has$1 = function(it) {
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

var redefine = createCommonjsModule(function(module) {
  var getInternalState = internalState.get
  var enforceInternalState = internalState.enforce
  var TEMPLATE = String(String).split('String')
  ;(module.exports = function(O, key, value, options) {
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

var aFunction = function(variable) {
  return typeof variable == 'function' ? variable : undefined
}

var getBuiltIn = function(namespace, method) {
  return arguments.length < 2
    ? aFunction(path[namespace]) || aFunction(global_1[namespace])
    : (path[namespace] && path[namespace][method]) ||
        (global_1[namespace] && global_1[namespace][method])
}

var ceil = Math.ceil
var floor = Math.floor // `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger

var toInteger = function(argument) {
  return isNaN((argument = +argument))
    ? 0
    : (argument > 0 ? floor : ceil)(argument)
}

var min = Math.min // `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength

var toLength = function(argument) {
  return argument > 0 ? min(toInteger(argument), 0x1fffffffffffff) : 0 // 2 ** 53 - 1 == 9007199254740991
}

var max = Math.max
var min$1 = Math.min // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex = function(index, length) {
  var integer = toInteger(index)
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length)
}

var createMethod = function(IS_INCLUDES) {
  return function($this, el, fromIndex) {
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

var objectKeysInternal = function(object, names) {
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

var copyConstructorProperties = function(target, source) {
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

var isForced = function(feature, detection) {
  var value = data[normalize(feature)]
  return value == POLYFILL
    ? true
    : value == NATIVE
    ? false
    : typeof detection == 'function'
    ? fails(detection)
    : !!detection
}

var normalize = (isForced.normalize = function(string) {
  return String(string)
    .replace(replacement, '.')
    .toLowerCase()
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

var _export = function(options, source) {
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

// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags

var regexpFlags = function() {
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

var nativeExec = RegExp.prototype.exec // This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.

var nativeReplace = String.prototype.replace
var patchedExec = nativeExec

var UPDATES_LAST_INDEX_WRONG = (function() {
  var re1 = /a/
  var re2 = /b*/g
  nativeExec.call(re1, 'a')
  nativeExec.call(re2, 'a')
  return re1.lastIndex !== 0 || re2.lastIndex !== 0
})() // nonparticipating capturing group, copied from es5-shim's String#split patch.

var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined
var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this
    var lastIndex, reCopy, match, i

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re))
    }

    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex
    match = nativeExec.call(re, str)

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex
    }

    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function() {
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

var nativeSymbol =
  !!Object.getOwnPropertySymbols &&
  !fails(function() {
    // Chrome 38 Symbol has incorrect toString conversion
    // eslint-disable-next-line no-undef
    return !String(Symbol())
  })

var useSymbolAsUid =
  nativeSymbol && // eslint-disable-next-line no-undef
  !Symbol.sham && // eslint-disable-next-line no-undef
  typeof Symbol() == 'symbol'

var WellKnownSymbolsStore = shared('wks')
var Symbol$1 = global_1.Symbol
var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : uid

var wellKnownSymbol = function(name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (nativeSymbol && has(Symbol$1, name))
      WellKnownSymbolsStore[name] = Symbol$1[name]
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name)
  }

  return WellKnownSymbolsStore[name]
}

var SPECIES = wellKnownSymbol('species')
var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function() {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./

  re.exec = function() {
    var result = []
    result.groups = {
      a: '7',
    }
    return result
  }

  return ''.replace(re, '$<a>') !== '7'
}) // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function() {
  var re = /(?:)/
  var originalExec = re.exec

  re.exec = function() {
    return originalExec.apply(this, arguments)
  }

  var result = 'ab'.split(re)
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b'
})

var fixRegexpWellKnownSymbolLogic = function(KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY)
  var DELEGATES_TO_SYMBOL = !fails(function() {
    // String methods call symbol-named RegEp methods
    var O = {}

    O[SYMBOL] = function() {
      return 7
    }

    return ''[KEY](O) != 7
  })
  var DELEGATES_TO_EXEC =
    DELEGATES_TO_SYMBOL &&
    !fails(function() {
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

        re.constructor[SPECIES] = function() {
          return re
        }

        re.flags = ''
        re[SYMBOL] = /./[SYMBOL]
      }

      re.exec = function() {
        execCalled = true
        return null
      }

      re[SYMBOL]('')
      return !execCalled
    })

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL]
    var methods = exec(SYMBOL, ''[KEY], function(
      nativeMethod,
      regexp,
      str,
      arg2,
      forceStringMethod
    ) {
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
    })
    var stringMethod = methods[0]
    var regexMethod = methods[1]
    redefine(String.prototype, KEY, stringMethod)
    redefine(
      RegExp.prototype,
      SYMBOL,
      length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
        ? // 21.2.5.11 RegExp.prototype[@@split](string, limit)
          function(string, arg) {
            return regexMethod.call(string, this, arg)
          } // 21.2.5.6 RegExp.prototype[@@match](string)
        : // 21.2.5.9 RegExp.prototype[@@search](string)
          function(string) {
            return regexMethod.call(string, this)
          }
    )
    if (sham)
      createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true)
  }
}

// https://tc39.github.io/ecma262/#sec-toobject

var toObject = function(argument) {
  return Object(requireObjectCoercible(argument))
}

var createMethod$1 = function(CONVERT_TO_STRING) {
  return function($this, pos) {
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

var advanceStringIndex = function(S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1)
}

// https://tc39.github.io/ecma262/#sec-regexpexec

var regexpExecAbstract = function(R, S) {
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

var maybeToString = function(it) {
  return it === undefined ? it : String(it)
} // @@replace logic

fixRegexpWellKnownSymbolLogic('replace', 2, function(
  REPLACE,
  nativeReplace,
  maybeCallNative
) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this)
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE]
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue)
    }, // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function(regexp, replaceValue) {
      var res = maybeCallNative(nativeReplace, regexp, this, replaceValue)
      if (res.done) return res.value
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
          var replacement = String(replaceValue.apply(undefined, replacerArgs))
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

    return nativeReplace.call(replacement, symbols, function(match, ch) {
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
})

function exportPlugin(process, _ref) {
  var options = _ref.options
  process.defaultOptions = options
  return process
}

var info = {
  description: 'a js linter plugin of fis3 based on standard.',
  keywords: ['linter'],
  dependencies: ['eslint', 'standard'],
  options: {},
  links: {
    standard: 'https://github.com/standard/standard',
  },
}

var info$1 = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  default: info,
})

var formatter = eslint.CLIEngine.getFormatter()
var log = global.fis.log

function lint(content, file) {
  content = content.replace(/\n\s+$/, '')
  var results = []

  try {
    var _standard$lintTextSyn = standard.lintTextSync(content, {})

    results = _standard$lintTextSyn.results
  } catch (error) {
    log.error(error)
    process.exitCode = 1
    throw new Error('standard error.')
  }

  results = results[0]

  if (results.errorCount || results.warningCount) {
    log.warn('[%s] lint failed: \n %s', file.id, formatter([results]))

    if (results.errorCount) {
      process.exitCode = 1
      throw new Error('standard error.')
    }
  }
}

module.exports = exportPlugin(lint, info$1)
