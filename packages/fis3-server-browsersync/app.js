'use strict'

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var path$1 = _interopDefault(require('path'))
var browserSync = _interopDefault(require('browser-sync'))
var yargs = _interopDefault(require('yargs'))
var merge = _interopDefault(require('lodash.merge'))
var morgan = _interopDefault(require('morgan'))
var bodyParser = _interopDefault(require('body-parser'))
var fs = _interopDefault(require('fs'))
var url = _interopDefault(require('url'))
var util = _interopDefault(require('util'))
var http = _interopDefault(require('http'))
var https = _interopDefault(require('https'))
var assert = _interopDefault(require('assert'))
var stream = _interopDefault(require('stream'))
var tty = _interopDefault(require('tty'))
var os = _interopDefault(require('os'))
var serveDirectory = _interopDefault(require('serve-directory'))
var serveDirectoryThemeOcticons = _interopDefault(
  require('serve-directory-theme-octicons')
)

// https://github.com/tc39/proposal-global

_export(
  {
    global: true,
  },
  {
    globalThis: global_1,
  }
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

function commonjsRequire() {
  throw new Error(
    'Dynamic requires are not currently supported by rollup-plugin-commonjs'
  )
}

function createCommonjsModule(fn, module) {
  return (module = {exports: {}}), fn(module, module.exports), module.exports
}

var check = function check(it) {
  return it && it.Math == Math && it
} // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028

var global_1 = // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func
  Function('return this')()

var fails = function fails(exec) {
  try {
    return !!exec()
  } catch (error) {
    return true
  }
}

var isObject = function isObject(it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function'
}

var toString = {}.toString

var classofRaw = function classofRaw(it) {
  return toString.call(it).slice(8, -1)
}

// https://tc39.github.io/ecma262/#sec-isarray

var isArray =
  Array.isArray ||
  function isArray(arg) {
    return classofRaw(arg) == 'Array'
  }

var ceil = Math.ceil
var floor = Math.floor // `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger

var toInteger = function toInteger(argument) {
  return isNaN((argument = +argument))
    ? 0
    : (argument > 0 ? floor : ceil)(argument)
}

var max = Math.max
var min = Math.min // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex = function toAbsoluteIndex(index, length) {
  var integer = toInteger(index)
  return integer < 0 ? max(integer + length, 0) : min(integer, length)
}

var min$1 = Math.min // `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength

var toLength = function toLength(argument) {
  return argument > 0 ? min$1(toInteger(argument), 0x1fffffffffffff) : 0 // 2 ** 53 - 1 == 9007199254740991
}

// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string

var toPrimitive = function toPrimitive(input, PREFERRED_STRING) {
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

var descriptors = !fails(function() {
  return (
    Object.defineProperty({}, 'a', {
      get: function get() {
        return 7
      },
    }).a != 7
  )
})

var document$1 = global_1.document // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document$1) && isObject(document$1.createElement)

var documentCreateElement = function documentCreateElement(it) {
  return EXISTS ? document$1.createElement(it) : {}
}

var ie8DomDefine =
  !descriptors &&
  !fails(function() {
    return (
      Object.defineProperty(documentCreateElement('div'), 'a', {
        get: function get() {
          return 7
        },
      }).a != 7
    )
  })

var anObject = function anObject(it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object')
  }

  return it
}

var nativeDefineProperty = Object.defineProperty // `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty

var f = descriptors
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
  f: f,
}

var createPropertyDescriptor = function createPropertyDescriptor(
  bitmap,
  value
) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value,
  }
}

var createProperty = function createProperty(object, key, value) {
  var propertyKey = toPrimitive(key)
  if (propertyKey in object)
    objectDefineProperty.f(
      object,
      propertyKey,
      createPropertyDescriptor(0, value)
    )
  else object[propertyKey] = value
}

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function requireObjectCoercible(it) {
  if (it == undefined) throw TypeError("Can't call method on " + it)
  return it
}

// https://tc39.github.io/ecma262/#sec-toobject

var toObject = function toObject(argument) {
  return Object(requireObjectCoercible(argument))
}

var FAILS_ON_PRIMITIVES = fails(function() {
  objectKeys(1)
}) // `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys

_export(
  {
    target: 'Object',
    stat: true,
    forced: FAILS_ON_PRIMITIVES,
  },
  {
    keys: function keys(it) {
      return objectKeys(toObject(it))
    },
  }
)

var MATCH = wellKnownSymbol('match') // `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp

var isRegexp = function isRegexp(it) {
  var isRegExp
  return (
    isObject(it) &&
    ((isRegExp = it[MATCH]) !== undefined
      ? !!isRegExp
      : classofRaw(it) == 'RegExp')
  )
}

var notARegexp = function notARegexp(it) {
  if (isRegexp(it)) {
    throw TypeError("The method doesn't accept regular expressions")
  }

  return it
}

var MATCH$1 = wellKnownSymbol('match')

var correctIsRegexpLogic = function correctIsRegexpLogic(METHOD_NAME) {
  var regexp = /./

  try {
    '/./'[METHOD_NAME](regexp)
  } catch (e) {
    try {
      regexp[MATCH$1] = false
      return '/./'[METHOD_NAME](regexp)
    } catch (f) {
      /* empty */
    }
  }

  return false
}

// https://tc39.github.io/ecma262/#sec-string.prototype.includes

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

var $includes = arrayIncludes.includes // `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes

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
) // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('includes')

var createMethod = function createMethod(IS_INCLUDES) {
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

var sloppyArrayMethod = function sloppyArrayMethod(METHOD_NAME, argument) {
  var method = [][METHOD_NAME]
  return (
    !method ||
    !fails(function() {
      // eslint-disable-next-line no-useless-call,no-throw-literal
      method.call(
        null,
        argument ||
          function() {
            throw 1
          },
        1
      )
    })
  )
}

var $indexOf = arrayIncludes.indexOf
var nativeIndexOf = [].indexOf
var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0
var SLOPPY_METHOD = sloppyArrayMethod('indexOf') // `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof

_export(
  {
    target: 'Array',
    proto: true,
    forced: NEGATIVE_ZERO || SLOPPY_METHOD,
  },
  {
    indexOf: function indexOf(
      searchElement
      /* , fromIndex = 0 */
    ) {
      return NEGATIVE_ZERO // convert -0 to +0
        ? nativeIndexOf.apply(this, arguments) || 0
        : $indexOf(
            this,
            searchElement,
            arguments.length > 1 ? arguments[1] : undefined
          )
    },
  }
)

var hasOwnProperty = {}.hasOwnProperty

var has = function has(it, key) {
  return hasOwnProperty.call(it, key)
}

var hiddenKeys = {}

var indexOf = arrayIncludes.indexOf

var objectKeysInternal = function objectKeysInternal(object, names) {
  var O = toIndexedObject(object)
  var i = 0
  var result = []
  var key

  for (key in O) {
    !has(hiddenKeys, key) && has(O, key) && result.push(key)
  } // Don't enum bug & hidden keys

  while (names.length > i) {
    if (has(O, (key = names[i++]))) {
      ~indexOf(result, key) || result.push(key)
    }
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

// https://tc39.github.io/ecma262/#sec-object.keys

var objectKeys =
  Object.keys ||
  function keys(O) {
    return objectKeysInternal(O, enumBugKeys)
  }

// https://tc39.github.io/ecma262/#sec-object.defineproperties

var objectDefineProperties = descriptors
  ? Object.defineProperties
  : function defineProperties(O, Properties) {
      anObject(O)
      var keys = objectKeys(Properties)
      var length = keys.length
      var index = 0
      var key

      while (length > index) {
        objectDefineProperty.f(O, (key = keys[index++]), Properties[key])
      }

      return O
    }

var path = global_1

var aFunction = function aFunction(variable) {
  return typeof variable == 'function' ? variable : undefined
}

var getBuiltIn = function getBuiltIn(namespace, method) {
  return arguments.length < 2
    ? aFunction(path[namespace]) || aFunction(global_1[namespace])
    : (path[namespace] && path[namespace][method]) ||
        (global_1[namespace] && global_1[namespace][method])
}

var html = getBuiltIn('document', 'documentElement')

var isPure = false

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

var setGlobal = function setGlobal(key, value) {
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

var shared = createCommonjsModule(function(module) {
  ;(module.exports = function(key, value) {
    return (
      sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {})
    )
  })('versions', []).push({
    version: '3.4.5',
    mode: 'global',
    copyright: '© 2019 Denis Pushkarev (zloirock.ru)',
  })
})

var id = 0
var postfix = Math.random()

var uid = function uid(key) {
  return (
    'Symbol(' +
    String(key === undefined ? '' : key) +
    ')_' +
    (++id + postfix).toString(36)
  )
}

var keys = shared('keys')

var sharedKey = function sharedKey(key) {
  return keys[key] || (keys[key] = uid(key))
}

var IE_PROTO = sharedKey('IE_PROTO')
var PROTOTYPE = 'prototype'

var Empty = function Empty() {
  /* empty */
} // Create object with fake `null` prototype: use iframe Object with cleared prototype

var _createDict = function createDict() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe')
  var length = enumBugKeys.length
  var lt = '<'
  var script = 'script'
  var gt = '>'
  var js = 'java' + script + ':'
  var iframeDocument
  iframe.style.display = 'none'
  html.appendChild(iframe)
  iframe.src = String(js)
  iframeDocument = iframe.contentWindow.document
  iframeDocument.open()
  iframeDocument.write(
    lt + script + gt + 'document.F=Object' + lt + '/' + script + gt
  )
  iframeDocument.close()
  _createDict = iframeDocument.F

  while (length--) {
    delete _createDict[PROTOTYPE][enumBugKeys[length]]
  }

  return _createDict()
} // `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create

var objectCreate =
  Object.create ||
  function create(O, Properties) {
    var result

    if (O !== null) {
      Empty[PROTOTYPE] = anObject(O)
      result = new Empty()
      Empty[PROTOTYPE] = null // add "__proto__" for Object.getPrototypeOf polyfill

      result[IE_PROTO] = O
    } else result = _createDict()

    return Properties === undefined
      ? result
      : objectDefineProperties(result, Properties)
  }

hiddenKeys[IE_PROTO] = true

var UNSCOPABLES = wellKnownSymbol('unscopables')
var ArrayPrototype = Array.prototype // Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

if (ArrayPrototype[UNSCOPABLES] == undefined) {
  createNonEnumerableProperty(ArrayPrototype, UNSCOPABLES, objectCreate(null))
} // add a key to Array.prototype[@@unscopables]

var addToUnscopables = function addToUnscopables(key) {
  ArrayPrototype[UNSCOPABLES][key] = true
}

var defineProperty = objectDefineProperty.f // `Array.prototype.lastIndex` getter
// https://github.com/keithamus/proposal-array-last

if (descriptors && !('lastIndex' in [])) {
  defineProperty(Array.prototype, 'lastIndex', {
    configurable: true,
    get: function lastIndex() {
      var O = toObject(this)
      var len = toLength(O.length)
      return len == 0 ? 0 : len - 1
    },
  })
  addToUnscopables('lastIndex')
}

// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags

var regexpFlags = function regexpFlags() {
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

// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags

if (descriptors && /./g.flags != 'g') {
  objectDefineProperty.f(RegExp.prototype, 'flags', {
    configurable: true,
    get: regexpFlags,
  })
}

var SPECIES = wellKnownSymbol('species') // `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate

var arraySpeciesCreate = function arraySpeciesCreate(originalArray, length) {
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

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable')
var MAX_SAFE_INTEGER = 0x1fffffffffffff
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded' // We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679

var IS_CONCAT_SPREADABLE_SUPPORT =
  v8Version >= 51 ||
  !fails(function() {
    var array = []
    array[IS_CONCAT_SPREADABLE] = false
    return array.concat()[0] !== array
  })
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat')

var isConcatSpreadable = function isConcatSpreadable(O) {
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

          for (k = 0; k < len; k++, n++) {
            if (k in E) createProperty(A, n, E[k])
          }
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

var createMethod$1 = function createMethod(CONVERT_TO_STRING) {
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

var advanceStringIndex = function advanceStringIndex(S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1)
}

// https://tc39.github.io/ecma262/#sec-regexpexec

var regexpExecAbstract = function regexpExecAbstract(R, S) {
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

var maybeToString = function maybeToString(it) {
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

        for (var j = 1; j < result.length; j++) {
          captures.push(maybeToString(result[j]))
        }

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

var aFunction$1 = function aFunction(it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function')
  }

  return it
}

var SPECIES$1 = wellKnownSymbol('species') // `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor

var speciesConstructor = function speciesConstructor(O, defaultConstructor) {
  var C = anObject(O).constructor
  var S
  return C === undefined || (S = anObject(C)[SPECIES$1]) == undefined
    ? defaultConstructor
    : aFunction$1(S)
}

var arrayPush = [].push
var min$3 = Math.min
var MAX_UINT32 = 0xffffffff // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError

var SUPPORTS_Y = !fails(function() {
  return !RegExp(MAX_UINT32, 'y')
}) // @@split logic

fixRegexpWellKnownSymbolLogic(
  'split',
  2,
  function(SPLIT, nativeSplit, maybeCallNative) {
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
      internalSplit = function internalSplit(separator, limit) {
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
      internalSplit = function internalSplit(separator, limit) {
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
      function(regexp, limit) {
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

var functionToString = Function.toString
var inspectSource = shared('inspectSource', function(it) {
  return functionToString.call(it)
})

var iterators = {}

var defineProperty$1 = objectDefineProperty.f
var FunctionPrototype = Function.prototype
var FunctionPrototypeToString = FunctionPrototype.toString
var nameRE = /^\s*function ([^ (]*)/
var NAME = 'name' // Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name

if (descriptors && !(NAME in FunctionPrototype)) {
  defineProperty$1(FunctionPrototype, NAME, {
    configurable: true,
    get: function get() {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1]
      } catch (error) {
        return ''
      }
    },
  })
}

var correctPrototypeGetter = !fails(function() {
  function F() {
    /* empty */
  }

  F.prototype.constructor = null
  return Object.getPrototypeOf(new F()) !== F.prototype
})

var FAILS_ON_PRIMITIVES$1 = fails(function() {
  objectGetPrototypeOf(1)
}) // `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof

_export(
  {
    target: 'Object',
    stat: true,
    forced: FAILS_ON_PRIMITIVES$1,
    sham: !correctPrototypeGetter,
  },
  {
    getPrototypeOf: function getPrototypeOf(it) {
      return objectGetPrototypeOf(toObject(it))
    },
  }
)

var IE_PROTO$1 = sharedKey('IE_PROTO')
var ObjectPrototype = Object.prototype // `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof

var objectGetPrototypeOf = correctPrototypeGetter
  ? Object.getPrototypeOf
  : function(O) {
      O = toObject(O)
      if (has(O, IE_PROTO$1)) return O[IE_PROTO$1]

      if (typeof O.constructor == 'function' && O instanceof O.constructor) {
        return O.constructor.prototype
      }

      return O instanceof Object ? ObjectPrototype : null
    }

var ITERATOR = wellKnownSymbol('iterator')
var BUGGY_SAFARI_ITERATORS = false

var returnThis = function returnThis() {
  return this
} // `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object

var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator

if ([].keys) {
  arrayIterator = [].keys() // Safari 8 has buggy iterators w/o `next`

  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true
  else {
    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(
      objectGetPrototypeOf(arrayIterator)
    )
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
      IteratorPrototype = PrototypeOfArrayIteratorPrototype
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {} // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

if (!has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis)
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS,
}

var defineProperty$2 = objectDefineProperty.f
var TO_STRING_TAG = wellKnownSymbol('toStringTag')

var setToStringTag = function setToStringTag(it, TAG, STATIC) {
  if (it && !has((it = STATIC ? it : it.prototype), TO_STRING_TAG)) {
    defineProperty$2(it, TO_STRING_TAG, {
      configurable: true,
      value: TAG,
    })
  }
}

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype

var returnThis$1 = function returnThis() {
  return this
}

var createIteratorConstructor = function createIteratorConstructor(
  IteratorConstructor,
  NAME,
  next
) {
  var TO_STRING_TAG = NAME + ' Iterator'
  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, {
    next: createPropertyDescriptor(1, next),
  })
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false)
  iterators[TO_STRING_TAG] = returnThis$1
  return IteratorConstructor
}

// https://tc39.github.io/ecma262/#sec-object.setprototypeof

_export(
  {
    target: 'Object',
    stat: true,
  },
  {
    setPrototypeOf: objectSetPrototypeOf,
  }
)

var aPossiblePrototype = function aPossiblePrototype(it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype')
  }

  return it
}

// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.

/* eslint-disable no-proto */

var objectSetPrototypeOf =
  Object.setPrototypeOf ||
  ('__proto__' in {}
    ? (function() {
        var CORRECT_SETTER = false
        var test = {}
        var setter

        try {
          setter = Object.getOwnPropertyDescriptor(
            Object.prototype,
            '__proto__'
          ).set
          setter.call(test, [])
          CORRECT_SETTER = test instanceof Array
        } catch (error) {
          /* empty */
        }

        return function setPrototypeOf(O, proto) {
          anObject(O)
          aPossiblePrototype(proto)
          if (CORRECT_SETTER) setter.call(O, proto)
          else O.__proto__ = proto
          return O
        }
      })()
    : undefined)

var IteratorPrototype$2 = iteratorsCore.IteratorPrototype
var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS
var ITERATOR$1 = wellKnownSymbol('iterator')
var KEYS = 'keys'
var VALUES = 'values'
var ENTRIES = 'entries'

var returnThis$2 = function returnThis() {
  return this
}

var defineIterator = function defineIterator(
  Iterable,
  NAME,
  IteratorConstructor,
  next,
  DEFAULT,
  IS_SET,
  FORCED
) {
  createIteratorConstructor(IteratorConstructor, NAME, next)

  var getIterationMethod = function getIterationMethod(KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator
    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype)
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

    return function() {
      return new IteratorConstructor(this)
    }
  }

  var TO_STRING_TAG = NAME + ' Iterator'
  var INCORRECT_VALUES_NAME = false
  var IterablePrototype = Iterable.prototype
  var nativeIterator =
    IterablePrototype[ITERATOR$1] ||
    IterablePrototype['@@iterator'] ||
    (DEFAULT && IterablePrototype[DEFAULT])
  var defaultIterator =
    (!BUGGY_SAFARI_ITERATORS$1 && nativeIterator) || getIterationMethod(DEFAULT)
  var anyNativeIterator =
    NAME == 'Array'
      ? IterablePrototype.entries || nativeIterator
      : nativeIterator
  var CurrentIteratorPrototype, methods, KEY // fix native

  if (anyNativeIterator) {
    CurrentIteratorPrototype = objectGetPrototypeOf(
      anyNativeIterator.call(new Iterable())
    )

    if (
      IteratorPrototype$2 !== Object.prototype &&
      CurrentIteratorPrototype.next
    ) {
      if (
        objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2
      ) {
        if (objectSetPrototypeOf) {
          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2)
        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
          createNonEnumerableProperty(
            CurrentIteratorPrototype,
            ITERATOR$1,
            returnThis$2
          )
        }
      } // Set @@toStringTag to native iterators

      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true)
    }
  } // fix Array#{values, @@iterator}.name in V8 / FF

  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true

    defaultIterator = function values() {
      return nativeIterator.call(this)
    }
  } // define iterator

  if (IterablePrototype[ITERATOR$1] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator)
  }

  iterators[NAME] = defaultIterator // export additional methods

  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES),
    }
    if (FORCED)
      for (KEY in methods) {
        if (
          BUGGY_SAFARI_ITERATORS$1 ||
          INCORRECT_VALUES_NAME ||
          !(KEY in IterablePrototype)
        ) {
          redefine(IterablePrototype, KEY, methods[KEY])
        }
      }
    else
      _export(
        {
          target: NAME,
          proto: true,
          forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME,
        },
        methods
      )
  }

  return methods
}

var ARRAY_ITERATOR = 'Array Iterator'
var setInternalState = internalState.set
var getInternalState = internalState.getterFor(ARRAY_ITERATOR) // `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator

var es_array_iterator = defineIterator(
  Array,
  'Array',
  function(iterated, kind) {
    setInternalState(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject(iterated),
      // target
      index: 0,
      // next index
      kind: kind, // kind
    }) // `%ArrayIteratorPrototype%.next` method
    // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
  },
  function() {
    var state = getInternalState(this)
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
  'values'
) // argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject

iterators.Arguments = iterators.Array // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('keys')
addToUnscopables('values')
addToUnscopables('entries')

var charAt$1 = stringMultibyte.charAt
var STRING_ITERATOR = 'String Iterator'
var setInternalState$1 = internalState.set
var getInternalState$1 = internalState.getterFor(STRING_ITERATOR) // `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator

defineIterator(
  String,
  'String',
  function(iterated) {
    setInternalState$1(this, {
      type: STRING_ITERATOR,
      string: String(iterated),
      index: 0,
    }) // `%StringIteratorPrototype%.next` method
    // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
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
    point = charAt$1(string, index)
    state.index += point.length
    return {
      value: point,
      done: false,
    }
  }
)

var nativeIsExtensible = Object.isExtensible
var FAILS_ON_PRIMITIVES$2 = fails(function() {
  nativeIsExtensible(1)
}) // `Object.isExtensible` method
// https://tc39.github.io/ecma262/#sec-object.isextensible

_export(
  {
    target: 'Object',
    stat: true,
    forced: FAILS_ON_PRIMITIVES$2,
  },
  {
    isExtensible: function isExtensible(it) {
      return isObject(it)
        ? nativeIsExtensible
          ? nativeIsExtensible(it)
          : true
        : false
    },
  }
)

var redefineAll = function redefineAll(target, src, options) {
  for (var key in src) {
    redefine(target, key, src[key], options)
  }

  return target
}

var onFreeze = internalMetadata.onFreeze
var nativePreventExtensions = Object.preventExtensions
var FAILS_ON_PRIMITIVES$3 = fails(function() {
  nativePreventExtensions(1)
}) // `Object.preventExtensions` method
// https://tc39.github.io/ecma262/#sec-object.preventextensions

_export(
  {
    target: 'Object',
    stat: true,
    forced: FAILS_ON_PRIMITIVES$3,
    sham: !freezing,
  },
  {
    preventExtensions: function preventExtensions(it) {
      return nativePreventExtensions && isObject(it)
        ? nativePreventExtensions(onFreeze(it))
        : it
    },
  }
)

var freezing = !fails(function() {
  return Object.isExtensible(Object.preventExtensions({}))
})

var internalMetadata = createCommonjsModule(function(module) {
  var defineProperty = objectDefineProperty.f
  var METADATA = uid('meta')
  var id = 0

  var isExtensible =
    Object.isExtensible ||
    function() {
      return true
    }

  var setMetadata = function setMetadata(it) {
    defineProperty(it, METADATA, {
      value: {
        objectID: 'O' + ++id,
        // object ID
        weakData: {}, // weak collections IDs
      },
    })
  }

  var fastKey = function fastKey(it, create) {
    // return a primitive with prefix
    if (!isObject(it))
      return typeof it == 'symbol'
        ? it
        : (typeof it == 'string' ? 'S' : 'P') + it

    if (!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F' // not necessary to add metadata

      if (!create) return 'E' // add missing metadata

      setMetadata(it) // return object ID
    }

    return it[METADATA].objectID
  }

  var getWeakData = function getWeakData(it, create) {
    if (!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true // not necessary to add metadata

      if (!create) return false // add missing metadata

      setMetadata(it) // return the store of weak collections IDs
    }

    return it[METADATA].weakData
  } // add metadata on freeze-family methods calling

  var onFreeze = function onFreeze(it) {
    if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA))
      setMetadata(it)
    return it
  }

  var meta = (module.exports = {
    REQUIRED: false,
    fastKey: fastKey,
    getWeakData: getWeakData,
    onFreeze: onFreeze,
  })
  hiddenKeys[METADATA] = true
})
var internalMetadata_1 = internalMetadata.REQUIRED
var internalMetadata_2 = internalMetadata.fastKey
var internalMetadata_3 = internalMetadata.getWeakData
var internalMetadata_4 = internalMetadata.onFreeze

var $every = arrayIteration.every // `Array.prototype.every` method
// https://tc39.github.io/ecma262/#sec-array.prototype.every

_export(
  {
    target: 'Array',
    proto: true,
    forced: sloppyArrayMethod('every'),
  },
  {
    every: function every(
      callbackfn
      /* , thisArg */
    ) {
      return $every(
        this,
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined
      )
    },
  }
)

var $filter = arrayIteration.filter
var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter') // Edge 14- issue

var USES_TO_LENGTH =
  HAS_SPECIES_SUPPORT &&
  !fails(function() {
    ;[].filter.call(
      {
        length: -1,
        0: 1,
      },
      function(it) {
        throw it
      }
    )
  }) // `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species

_export(
  {
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH,
  },
  {
    filter: function filter(
      callbackfn
      /* , thisArg */
    ) {
      return $filter(
        this,
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined
      )
    },
  }
)

var $find = arrayIteration.find
var FIND = 'find'
var SKIPS_HOLES = true // Shouldn't skip holes

if (FIND in [])
  Array(1)[FIND](function() {
    SKIPS_HOLES = false
  }) // `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find

_export(
  {
    target: 'Array',
    proto: true,
    forced: SKIPS_HOLES,
  },
  {
    find: function find(
      callbackfn
      /* , that = undefined */
    ) {
      return $find(
        this,
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined
      )
    },
  }
) // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables(FIND)

var $findIndex = arrayIteration.findIndex
var FIND_INDEX = 'findIndex'
var SKIPS_HOLES$1 = true // Shouldn't skip holes

if (FIND_INDEX in [])
  Array(1)[FIND_INDEX](function() {
    SKIPS_HOLES$1 = false
  }) // `Array.prototype.findIndex` method
// https://tc39.github.io/ecma262/#sec-array.prototype.findindex

_export(
  {
    target: 'Array',
    proto: true,
    forced: SKIPS_HOLES$1,
  },
  {
    findIndex: function findIndex(
      callbackfn
      /* , that = undefined */
    ) {
      return $findIndex(
        this,
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined
      )
    },
  }
) // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables(FIND_INDEX)

var $map = arrayIteration.map
var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map') // FF49- issue

var USES_TO_LENGTH$1 =
  HAS_SPECIES_SUPPORT$1 &&
  !fails(function() {
    ;[].map.call(
      {
        length: -1,
        0: 1,
      },
      function(it) {
        throw it
      }
    )
  }) // `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species

_export(
  {
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$1,
  },
  {
    map: function map(
      callbackfn
      /* , thisArg */
    ) {
      return $map(
        this,
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined
      )
    },
  }
)

var $some = arrayIteration.some // `Array.prototype.some` method
// https://tc39.github.io/ecma262/#sec-array.prototype.some

_export(
  {
    target: 'Array',
    proto: true,
    forced: sloppyArrayMethod('some'),
  },
  {
    some: function some(
      callbackfn
      /* , thisArg */
    ) {
      return $some(
        this,
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined
      )
    },
  }
)

var bindContext = function bindContext(fn, that, length) {
  aFunction$1(fn)
  if (that === undefined) return fn

  switch (length) {
    case 0:
      return function() {
        return fn.call(that)
      }

    case 1:
      return function(a) {
        return fn.call(that, a)
      }

    case 2:
      return function(a, b) {
        return fn.call(that, a, b)
      }

    case 3:
      return function(a, b, c) {
        return fn.call(that, a, b, c)
      }
  }

  return function() /* ...args */
  {
    return fn.apply(that, arguments)
  }
}

var push = [].push // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation

var createMethod$2 = function createMethod(TYPE) {
  var IS_MAP = TYPE == 1
  var IS_FILTER = TYPE == 2
  var IS_SOME = TYPE == 3
  var IS_EVERY = TYPE == 4
  var IS_FIND_INDEX = TYPE == 6
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX
  return function($this, callbackfn, that, specificCreate) {
    var O = toObject($this)
    var self = indexedObject(O)
    var boundFunction = bindContext(callbackfn, that, 3)
    var length = toLength(self.length)
    var index = 0
    var create = specificCreate || arraySpeciesCreate
    var target = IS_MAP
      ? create($this, length)
      : IS_FILTER
      ? create($this, 0)
      : undefined
    var value, result

    for (; length > index; index++) {
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
                push.call(target, value)
              // filter
            }
          else if (IS_EVERY) return false // every
        }
      }
    }

    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target
  }
}

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$2(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod$2(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod$2(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod$2(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod$2(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod$2(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$2(6),
}

var $forEach = arrayIteration.forEach // `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach

var arrayForEach = sloppyArrayMethod('forEach')
  ? function forEach(
      callbackfn
      /* , thisArg */
    ) {
      return $forEach(
        this,
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined
      )
    }
  : [].forEach

// https://tc39.github.io/ecma262/#sec-array.prototype.foreach

_export(
  {
    target: 'Array',
    proto: true,
    forced: [].forEach != arrayForEach,
  },
  {
    forEach: arrayForEach,
  }
)

var replacement = /#|\.prototype\./

var isForced = function isForced(feature, detection) {
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

var ITERATOR$2 = wellKnownSymbol('iterator')
var ArrayPrototype$1 = Array.prototype // check on default Array iterator

var isArrayIteratorMethod = function isArrayIteratorMethod(it) {
  return (
    it !== undefined &&
    (iterators.Array === it || ArrayPrototype$1[ITERATOR$2] === it)
  )
}

var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag') // ES3 wrong here

var CORRECT_ARGUMENTS =
  classofRaw(
    (function() {
      return arguments
    })()
  ) == 'Arguments' // fallback for IE11 Script Access Denied error

var tryGet = function tryGet(it, key) {
  try {
    return it[key]
  } catch (error) {
    /* empty */
  }
} // getting tag from ES6+ `Object.prototype.toString`

var classof = toStringTagSupport
  ? classofRaw
  : function(it) {
      var O, tag, result
      return it === undefined
        ? 'Undefined'
        : it === null
        ? 'Null' // @@toStringTag case
        : typeof (tag = tryGet((O = Object(it)), TO_STRING_TAG$1)) == 'string'
        ? tag // builtinTag case
        : CORRECT_ARGUMENTS
        ? classofRaw(O) // ES3 arguments fallback
        : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function'
        ? 'Arguments'
        : result
    }

var ITERATOR$3 = wellKnownSymbol('iterator')

var getIteratorMethod = function getIteratorMethod(it) {
  if (it != undefined)
    return it[ITERATOR$3] || it['@@iterator'] || iterators[classof(it)]
}

var callWithSafeIterationClosing = function callWithSafeIterationClosing(
  iterator,
  fn,
  value,
  ENTRIES
) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value) // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return']
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator))
    throw error
  }
}

var iterate_1 = createCommonjsModule(function(module) {
  var Result = function Result(stopped, result) {
    this.stopped = stopped
    this.result = result
  }

  var iterate = (module.exports = function(
    iterable,
    fn,
    that,
    AS_ENTRIES,
    IS_ITERATOR
  ) {
    var boundFunction = bindContext(fn, that, AS_ENTRIES ? 2 : 1)
    var iterator, iterFn, index, length, result, next, step

    if (IS_ITERATOR) {
      iterator = iterable
    } else {
      iterFn = getIteratorMethod(iterable)
      if (typeof iterFn != 'function') throw TypeError('Target is not iterable') // optimisation for array iterators

      if (isArrayIteratorMethod(iterFn)) {
        for (
          index = 0, length = toLength(iterable.length);
          length > index;
          index++
        ) {
          result = AS_ENTRIES
            ? boundFunction(anObject((step = iterable[index]))[0], step[1])
            : boundFunction(iterable[index])
          if (result && result instanceof Result) return result
        }

        return new Result(false)
      }

      iterator = iterFn.call(iterable)
    }

    next = iterator.next

    while (!(step = next.call(iterator)).done) {
      result = callWithSafeIterationClosing(
        iterator,
        boundFunction,
        step.value,
        AS_ENTRIES
      )
      if (typeof result == 'object' && result && result instanceof Result)
        return result
    }

    return new Result(false)
  })

  iterate.stop = function(result) {
    return new Result(true, result)
  }
})

var anInstance = function anInstance(it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation')
  }

  return it
}

// https://tc39.github.io/ecma262/#sec-array.from

var arrayFrom = function from(
  arrayLike
  /* , mapfn = undefined, thisArg = undefined */
) {
  var O = toObject(arrayLike)
  var C = typeof this == 'function' ? this : Array
  var argumentsLength = arguments.length
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined
  var mapping = mapfn !== undefined
  var index = 0
  var iteratorMethod = getIteratorMethod(O)
  var length, result, step, iterator, next
  if (mapping)
    mapfn = bindContext(
      mapfn,
      argumentsLength > 2 ? arguments[2] : undefined,
      2
    ) // if the target is not iterable or it's an array with the default iterator - use a simple case

  if (
    iteratorMethod != undefined &&
    !(C == Array && isArrayIteratorMethod(iteratorMethod))
  ) {
    iterator = iteratorMethod.call(O)
    next = iterator.next
    result = new C()

    for (; !(step = next.call(iterator)).done; index++) {
      createProperty(
        result,
        index,
        mapping
          ? callWithSafeIterationClosing(
              iterator,
              mapfn,
              [step.value, index],
              true
            )
          : step.value
      )
    }
  } else {
    length = toLength(O.length)
    result = new C(length)

    for (; length > index; index++) {
      createProperty(result, index, mapping ? mapfn(O[index], index) : O[index])
    }
  }

  result.length = index
  return result
}

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function(iterable) {
  Array.from(iterable)
}) // `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from

_export(
  {
    target: 'Array',
    stat: true,
    forced: INCORRECT_ITERATION,
  },
  {
    from: arrayFrom,
  }
)

var ITERATOR$4 = wellKnownSymbol('iterator')
var SAFE_CLOSING = false

try {
  var called = 0
  var iteratorWithReturn = {
    next: function next() {
      return {
        done: !!called++,
      }
    },
    return: function _return() {
      SAFE_CLOSING = true
    },
  }

  iteratorWithReturn[ITERATOR$4] = function() {
    return this
  } // eslint-disable-next-line no-throw-literal

  Array.from(iteratorWithReturn, function() {
    throw 2
  })
} catch (error) {
  /* empty */
}

var checkCorrectnessOfIteration = function checkCorrectnessOfIteration(
  exec,
  SKIP_CLOSING
) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false
  var ITERATION_SUPPORT = false

  try {
    var object = {}

    object[ITERATOR$4] = function() {
      return {
        next: function next() {
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

var inheritIfRequired = function inheritIfRequired($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype
  if (
    // it can work only with native `setPrototypeOf`
    objectSetPrototypeOf && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject((NewTargetPrototype = NewTarget.prototype)) &&
    NewTargetPrototype !== Wrapper.prototype
  )
    objectSetPrototypeOf($this, NewTargetPrototype)
  return $this
}

var collection = function collection(CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1
  var ADDER = IS_MAP ? 'set' : 'add'
  var NativeConstructor = global_1[CONSTRUCTOR_NAME]
  var NativePrototype = NativeConstructor && NativeConstructor.prototype
  var Constructor = NativeConstructor
  var exported = {}

  var fixMethod = function fixMethod(KEY) {
    var nativeMethod = NativePrototype[KEY]
    redefine(
      NativePrototype,
      KEY,
      KEY == 'add'
        ? function add(value) {
            nativeMethod.call(this, value === 0 ? 0 : value)
            return this
          }
        : KEY == 'delete'
        ? function(key) {
            return IS_WEAK && !isObject(key)
              ? false
              : nativeMethod.call(this, key === 0 ? 0 : key)
          }
        : KEY == 'get'
        ? function get(key) {
            return IS_WEAK && !isObject(key)
              ? undefined
              : nativeMethod.call(this, key === 0 ? 0 : key)
          }
        : KEY == 'has'
        ? function has(key) {
            return IS_WEAK && !isObject(key)
              ? false
              : nativeMethod.call(this, key === 0 ? 0 : key)
          }
        : function set(key, value) {
            nativeMethod.call(this, key === 0 ? 0 : key, value)
            return this
          }
    )
  } // eslint-disable-next-line max-len

  if (
    isForced_1(
      CONSTRUCTOR_NAME,
      typeof NativeConstructor != 'function' ||
        !(
          IS_WEAK ||
          (NativePrototype.forEach &&
            !fails(function() {
              new NativeConstructor().entries().next()
            }))
        )
    )
  ) {
    // create collection constructor
    Constructor = common.getConstructor(
      wrapper,
      CONSTRUCTOR_NAME,
      IS_MAP,
      ADDER
    )
    internalMetadata.REQUIRED = true
  } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor() // early implementations not supports chaining

    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false

    var THROWS_ON_PRIMITIVES = fails(function() {
      instance.has(1)
    }) // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new

    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function(iterable) {
      new NativeConstructor(iterable)
    }) // for early implementations -0 and +0 not the same

    var BUGGY_ZERO =
      !IS_WEAK &&
      fails(function() {
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new NativeConstructor()
        var index = 5

        while (index--) {
          $instance[ADDER](index, index)
        }

        return !$instance.has(-0)
      })

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function(dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME)
        var that = inheritIfRequired(
          new NativeConstructor(),
          dummy,
          Constructor
        )
        if (iterable != undefined)
          iterate_1(iterable, that[ADDER], that, IS_MAP)
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
  _export(
    {
      global: true,
      forced: Constructor != NativeConstructor,
    },
    exported
  )
  setToStringTag(Constructor, CONSTRUCTOR_NAME)
  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP)
  return Constructor
}

var max$2 = Math.max
var min$4 = Math.min
var MAX_SAFE_INTEGER$1 = 0x1fffffffffffff
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded' // `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species

_export(
  {
    target: 'Array',
    proto: true,
    forced: !arrayMethodHasSpeciesSupport('splice'),
  },
  {
    splice: function splice(
      start,
      deleteCount
      /* , ...items */
    ) {
      var O = toObject(this)
      var len = toLength(O.length)
      var actualStart = toAbsoluteIndex(start, len)
      var argumentsLength = arguments.length
      var insertCount, actualDeleteCount, A, k, from, to

      if (argumentsLength === 0) {
        insertCount = actualDeleteCount = 0
      } else if (argumentsLength === 1) {
        insertCount = 0
        actualDeleteCount = len - actualStart
      } else {
        insertCount = argumentsLength - 2
        actualDeleteCount = min$4(
          max$2(toInteger(deleteCount), 0),
          len - actualStart
        )
      }

      if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
        throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED)
      }

      A = arraySpeciesCreate(O, actualDeleteCount)

      for (k = 0; k < actualDeleteCount; k++) {
        from = actualStart + k
        if (from in O) createProperty(A, k, O[from])
      }

      A.length = actualDeleteCount

      if (insertCount < actualDeleteCount) {
        for (k = actualStart; k < len - actualDeleteCount; k++) {
          from = k + actualDeleteCount
          to = k + insertCount
          if (from in O) O[to] = O[from]
          else delete O[to]
        }

        for (k = len; k > len - actualDeleteCount + insertCount; k--) {
          delete O[k - 1]
        }
      } else if (insertCount > actualDeleteCount) {
        for (k = len - actualDeleteCount; k > actualStart; k--) {
          from = k + actualDeleteCount - 1
          to = k + insertCount - 1
          if (from in O) O[to] = O[from]
          else delete O[to]
        }
      }

      for (k = 0; k < insertCount; k++) {
        O[k + actualStart] = arguments[k + 2]
      }

      O.length = len - actualDeleteCount + insertCount
      return A
    },
  }
)

var getWeakData = internalMetadata.getWeakData
var setInternalState$2 = internalState.set
var internalStateGetterFor = internalState.getterFor
var find = arrayIteration.find
var findIndex = arrayIteration.findIndex
var id$1 = 0 // fallback for uncaught frozen keys

var uncaughtFrozenStore = function uncaughtFrozenStore(store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore())
}

var UncaughtFrozenStore = function UncaughtFrozenStore() {
  this.entries = []
}

var findUncaughtFrozen = function findUncaughtFrozen(store, key) {
  return find(store.entries, function(it) {
    return it[0] === key
  })
}

UncaughtFrozenStore.prototype = {
  get: function get(key) {
    var entry = findUncaughtFrozen(this, key)
    if (entry) return entry[1]
  },
  has: function has(key) {
    return !!findUncaughtFrozen(this, key)
  },
  set: function set(key, value) {
    var entry = findUncaughtFrozen(this, key)
    if (entry) entry[1] = value
    else this.entries.push([key, value])
  },
  delete: function _delete(key) {
    var index = findIndex(this.entries, function(it) {
      return it[0] === key
    })
    if (~index) this.entries.splice(index, 1)
    return !!~index
  },
}
var collectionWeak = {
  getConstructor: function getConstructor(
    wrapper,
    CONSTRUCTOR_NAME,
    IS_MAP,
    ADDER
  ) {
    var C = wrapper(function(that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME)
      setInternalState$2(that, {
        type: CONSTRUCTOR_NAME,
        id: id$1++,
        frozen: undefined,
      })
      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP)
    })
    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME)

    var define = function define(that, key, value) {
      var state = getInternalState(that)
      var data = getWeakData(anObject(key), true)
      if (data === true) uncaughtFrozenStore(state).set(key, value)
      else data[state.id] = value
      return that
    }

    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      delete: function _delete(key) {
        var state = getInternalState(this)
        if (!isObject(key)) return false
        var data = getWeakData(key)
        if (data === true) return uncaughtFrozenStore(state)['delete'](key)
        return data && has(data, state.id) && delete data[state.id]
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has$1(key) {
        var state = getInternalState(this)
        if (!isObject(key)) return false
        var data = getWeakData(key)
        if (data === true) return uncaughtFrozenStore(state).has(key)
        return data && has(data, state.id)
      },
    })
    redefineAll(
      C.prototype,
      IS_MAP
        ? {
            // 23.3.3.3 WeakMap.prototype.get(key)
            get: function get(key) {
              var state = getInternalState(this)

              if (isObject(key)) {
                var data = getWeakData(key)
                if (data === true) return uncaughtFrozenStore(state).get(key)
                return data ? data[state.id] : undefined
              }
            },
            // 23.3.3.5 WeakMap.prototype.set(key, value)
            set: function set(key, value) {
              return define(this, key, value)
            },
          }
        : {
            // 23.4.3.1 WeakSet.prototype.add(value)
            add: function add(value) {
              return define(this, value, true)
            },
          }
    )
    return C
  },
}

var collectionDeleteAll = function collectionDeleteAll /* ...elements */() {
  var collection = anObject(this)
  var remover = aFunction$1(collection['delete'])
  var allDeleted = true
  var wasDeleted

  for (var k = 0, len = arguments.length; k < len; k++) {
    wasDeleted = remover.call(collection, arguments[k])
    allDeleted = allDeleted && wasDeleted
  }

  return !!allDeleted
}

// https://github.com/tc39/proposal-collection-methods

_export(
  {
    target: 'WeakMap',
    proto: true,
    real: true,
    forced: isPure,
  },
  {
    deleteAll: function deleteAll /* ...elements */() {
      return collectionDeleteAll.apply(this, arguments)
    },
  }
)

var WeakMap = global_1.WeakMap
var nativeWeakMap =
  typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap))

var es_weakMap = createCommonjsModule(function(module) {
  var enforceIternalState = internalState.enforce
  var IS_IE11 = !global_1.ActiveXObject && 'ActiveXObject' in global_1
  var isExtensible = Object.isExtensible
  var InternalWeakMap

  var wrapper = function wrapper(init) {
    return function WeakMap() {
      return init(this, arguments.length ? arguments[0] : undefined)
    }
  } // `WeakMap` constructor
  // https://tc39.github.io/ecma262/#sec-weakmap-constructor

  var $WeakMap = (module.exports = collection(
    'WeakMap',
    wrapper,
    collectionWeak
  )) // IE11 WeakMap frozen keys fix
  // We can't use feature detection because it crash some old IE builds
  // https://github.com/zloirock/core-js/issues/485

  if (nativeWeakMap && IS_IE11) {
    InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true)
    internalMetadata.REQUIRED = true
    var WeakMapPrototype = $WeakMap.prototype
    var nativeDelete = WeakMapPrototype['delete']
    var nativeHas = WeakMapPrototype.has
    var nativeGet = WeakMapPrototype.get
    var nativeSet = WeakMapPrototype.set
    redefineAll(WeakMapPrototype, {
      delete: function _delete(key) {
        if (isObject(key) && !isExtensible(key)) {
          var state = enforceIternalState(this)
          if (!state.frozen) state.frozen = new InternalWeakMap()
          return nativeDelete.call(this, key) || state.frozen['delete'](key)
        }

        return nativeDelete.call(this, key)
      },
      has: function has(key) {
        if (isObject(key) && !isExtensible(key)) {
          var state = enforceIternalState(this)
          if (!state.frozen) state.frozen = new InternalWeakMap()
          return nativeHas.call(this, key) || state.frozen.has(key)
        }

        return nativeHas.call(this, key)
      },
      get: function get(key) {
        if (isObject(key) && !isExtensible(key)) {
          var state = enforceIternalState(this)
          if (!state.frozen) state.frozen = new InternalWeakMap()
          return nativeHas.call(this, key)
            ? nativeGet.call(this, key)
            : state.frozen.get(key)
        }

        return nativeGet.call(this, key)
      },
      set: function set(key, value) {
        if (isObject(key) && !isExtensible(key)) {
          var state = enforceIternalState(this)
          if (!state.frozen) state.frozen = new InternalWeakMap()
          nativeHas.call(this, key)
            ? nativeSet.call(this, key, value)
            : state.frozen.set(key, value)
        } else nativeSet.call(this, key, value)

        return this
      },
    })
  }
})

var WeakMap$1 = global_1.WeakMap
var set, get, has$1

var enforce = function enforce(it) {
  return has$1(it) ? get(it) : set(it, {})
}

var getterFor = function getterFor(TYPE) {
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

  set = function set(it, metadata) {
    wmset.call(store$1, it, metadata)
    return metadata
  }

  get = function get(it) {
    return wmget.call(store$1, it) || {}
  }

  has$1 = function has(it) {
    return wmhas.call(store$1, it)
  }
} else {
  var STATE = sharedKey('state')
  hiddenKeys[STATE] = true

  set = function set(it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata)
    return metadata
  }

  get = function get(it) {
    return has(it, STATE) ? it[STATE] : {}
  }

  has$1 = function has$1(it) {
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

var SPECIES$2 = wellKnownSymbol('species')
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

var fixRegexpWellKnownSymbolLogic = function fixRegexpWellKnownSymbolLogic(
  KEY,
  length,
  exec,
  sham
) {
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

        re.constructor[SPECIES$2] = function() {
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

fixRegexpWellKnownSymbolLogic('match', 1, function(
  MATCH,
  nativeMatch,
  maybeCallNative
) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this)
      var matcher = regexp == undefined ? undefined : regexp[MATCH]
      return matcher !== undefined
        ? matcher.call(regexp, O)
        : new RegExp(regexp)[MATCH](String(O))
    }, // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function(regexp) {
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
})

var userAgent = getBuiltIn('navigator', 'userAgent') || ''

var process$1 = global_1.process
var versions = process$1 && process$1.versions
var v8 = versions && versions.v8
var match, version

if (v8) {
  match = v8.split('.')
  version = match[0] + match[1]
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/)

  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/)
    if (match) version = match[1]
  }
}

var v8Version = version && +version

var SPECIES$3 = wellKnownSymbol('species')

var arrayMethodHasSpeciesSupport = function arrayMethodHasSpeciesSupport(
  METHOD_NAME
) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return (
    v8Version >= 51 ||
    !fails(function() {
      var array = []
      var constructor = (array.constructor = {})

      constructor[SPECIES$3] = function() {
        return {
          foo: 1,
        }
      }

      return array[METHOD_NAME](Boolean).foo !== 1
    })
  )
}

var SPECIES$4 = wellKnownSymbol('species')
var nativeSlice = [].slice
var max$3 = Math.max // `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects

_export(
  {
    target: 'Array',
    proto: true,
    forced: !arrayMethodHasSpeciesSupport('slice'),
  },
  {
    slice: function slice(start, end) {
      var O = toIndexedObject(this)
      var length = toLength(O.length)
      var k = toAbsoluteIndex(start, length)
      var fin = toAbsoluteIndex(end === undefined ? length : end, length) // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

      var Constructor, result, n

      if (isArray(O)) {
        Constructor = O.constructor // cross-realm fallback

        if (
          typeof Constructor == 'function' &&
          (Constructor === Array || isArray(Constructor.prototype))
        ) {
          Constructor = undefined
        } else if (isObject(Constructor)) {
          Constructor = Constructor[SPECIES$4]
          if (Constructor === null) Constructor = undefined
        }

        if (Constructor === Array || Constructor === undefined) {
          return nativeSlice.call(O, k, fin)
        }
      }

      result = new (Constructor === undefined ? Array : Constructor)(
        max$3(fin - k, 0)
      )

      for (n = 0; k < fin; k++, n++) {
        if (k in O) createProperty(result, n, O[k])
      }

      result.length = n
      return result
    },
  }
)

var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f
var toString$1 = {}.toString
var windowNames =
  typeof window == 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window)
    : []

var getWindowNames = function getWindowNames(it) {
  try {
    return nativeGetOwnPropertyNames(it)
  } catch (error) {
    return windowNames.slice()
  }
} // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

var f$1 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(toIndexedObject(it))
}

var objectGetOwnPropertyNamesExternal = {
  f: f$1,
}

var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f
var FAILS_ON_PRIMITIVES$4 = fails(function() {
  return !Object.getOwnPropertyNames(1)
}) // `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

_export(
  {
    target: 'Object',
    stat: true,
    forced: FAILS_ON_PRIMITIVES$4,
  },
  {
    getOwnPropertyNames: nativeGetOwnPropertyNames$1,
  }
)

var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype') // `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

var f$2 =
  Object.getOwnPropertyNames ||
  function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1)
  }

var objectGetOwnPropertyNames = {
  f: f$2,
}

var f$3 = Object.getOwnPropertySymbols
var objectGetOwnPropertySymbols = {
  f: f$3,
}

var ownKeys =
  getBuiltIn('Reflect', 'ownKeys') ||
  function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it))
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys
  }

var copyConstructorProperties = function copyConstructorProperties(
  target,
  source
) {
  var keys = ownKeys(source)
  var defineProperty = objectDefineProperty.f
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    if (!has(target, key))
      defineProperty(target, key, getOwnPropertyDescriptor(source, key))
  }
}

var defineProperty$3 = objectDefineProperty.f
var NativeSymbol = global_1.Symbol

if (
  descriptors &&
  typeof NativeSymbol == 'function' &&
  (!('description' in NativeSymbol.prototype) || // Safari 12 bug
    NativeSymbol().description !== undefined)
) {
  var EmptyStringDescriptionStore = {} // wrap Symbol constructor for correct work with undefined description

  var SymbolWrapper = function Symbol() {
    var description =
      arguments.length < 1 || arguments[0] === undefined
        ? undefined
        : String(arguments[0])
    var result =
      this instanceof SymbolWrapper
        ? new NativeSymbol(description) // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
        : description === undefined
        ? NativeSymbol()
        : NativeSymbol(description)
    if (description === '') EmptyStringDescriptionStore[result] = true
    return result
  }

  copyConstructorProperties(SymbolWrapper, NativeSymbol)
  var symbolPrototype = (SymbolWrapper.prototype = NativeSymbol.prototype)
  symbolPrototype.constructor = SymbolWrapper
  var symbolToString = symbolPrototype.toString
  var native = String(NativeSymbol('test')) == 'Symbol(test)'
  var regexp = /^Symbol\((.*)\)[^)]+$/
  defineProperty$3(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this
      var string = symbolToString.call(symbol)
      if (has(EmptyStringDescriptionStore, symbol)) return ''
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1')
      return desc === '' ? undefined : desc
    },
  })
  _export(
    {
      global: true,
      forced: true,
    },
    {
      Symbol: SymbolWrapper,
    }
  )
}

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

var f$4 = NASHORN_BUG
  ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor(this, V)
      return !!descriptor && descriptor.enumerable
    }
  : nativePropertyIsEnumerable
var objectPropertyIsEnumerable = {
  f: f$4,
}

var f$5 = wellKnownSymbol
var wrappedWellKnownSymbol = {
  f: f$5,
}

var defineProperty$4 = objectDefineProperty.f

var defineWellKnownSymbol = function defineWellKnownSymbol(NAME) {
  var Symbol = path.Symbol || (path.Symbol = {})
  if (!has(Symbol, NAME))
    defineProperty$4(Symbol, NAME, {
      value: wrappedWellKnownSymbol.f(NAME),
    })
}

var $forEach$1 = arrayIteration.forEach
var HIDDEN = sharedKey('hidden')
var SYMBOL = 'Symbol'
var PROTOTYPE$1 = 'prototype'
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive')
var setInternalState$3 = internalState.set
var getInternalState$2 = internalState.getterFor(SYMBOL)
var ObjectPrototype$1 = Object[PROTOTYPE$1]
var $Symbol = global_1.Symbol
var $stringify = getBuiltIn('JSON', 'stringify')
var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f
var nativeDefineProperty$1 = objectDefineProperty.f
var nativeGetOwnPropertyNames$2 = objectGetOwnPropertyNamesExternal.f
var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f
var AllSymbols = shared('symbols')
var ObjectPrototypeSymbols = shared('op-symbols')
var StringToSymbolRegistry = shared('string-to-symbol-registry')
var SymbolToStringRegistry = shared('symbol-to-string-registry')
var WellKnownSymbolsStore = shared('wks')
var QObject = global_1.QObject // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

var USE_SETTER =
  !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

var setSymbolDescriptor =
  descriptors &&
  fails(function() {
    return (
      objectCreate(
        nativeDefineProperty$1({}, 'a', {
          get: function get() {
            return nativeDefineProperty$1(this, 'a', {
              value: 7,
            }).a
          },
        })
      ).a != 7
    )
  })
    ? function(O, P, Attributes) {
        var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(
          ObjectPrototype$1,
          P
        )
        if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P]
        nativeDefineProperty$1(O, P, Attributes)

        if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
          nativeDefineProperty$1(
            ObjectPrototype$1,
            P,
            ObjectPrototypeDescriptor
          )
        }
      }
    : nativeDefineProperty$1

var wrap = function wrap(tag, description) {
  var symbol = (AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]))
  setInternalState$3(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description,
  })
  if (!descriptors) symbol.description = description
  return symbol
}

var isSymbol =
  nativeSymbol && typeof $Symbol.iterator == 'symbol'
    ? function(it) {
        return typeof it == 'symbol'
      }
    : function(it) {
        return Object(it) instanceof $Symbol
      }

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype$1)
    $defineProperty(ObjectPrototypeSymbols, P, Attributes)
  anObject(O)
  var key = toPrimitive(P, true)
  anObject(Attributes)

  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN))
        nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}))
      O[HIDDEN][key] = true
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false
      Attributes = objectCreate(Attributes, {
        enumerable: createPropertyDescriptor(0, false),
      })
    }

    return setSymbolDescriptor(O, key, Attributes)
  }

  return nativeDefineProperty$1(O, key, Attributes)
}

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O)
  var properties = toIndexedObject(Properties)
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties))
  $forEach$1(keys, function(key) {
    if (!descriptors || $propertyIsEnumerable.call(properties, key))
      $defineProperty(O, key, properties[key])
  })
  return O
}

var $create = function create(O, Properties) {
  return Properties === undefined
    ? objectCreate(O)
    : $defineProperties(objectCreate(O), Properties)
}

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true)
  var enumerable = nativePropertyIsEnumerable$1.call(this, P)
  if (
    this === ObjectPrototype$1 &&
    has(AllSymbols, P) &&
    !has(ObjectPrototypeSymbols, P)
  )
    return false
  return enumerable ||
    !has(this, P) ||
    !has(AllSymbols, P) ||
    (has(this, HIDDEN) && this[HIDDEN][P])
    ? enumerable
    : true
}

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O)
  var key = toPrimitive(P, true)
  if (
    it === ObjectPrototype$1 &&
    has(AllSymbols, key) &&
    !has(ObjectPrototypeSymbols, key)
  )
    return
  var descriptor = nativeGetOwnPropertyDescriptor(it, key)

  if (
    descriptor &&
    has(AllSymbols, key) &&
    !(has(it, HIDDEN) && it[HIDDEN][key])
  ) {
    descriptor.enumerable = true
  }

  return descriptor
}

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames$2(toIndexedObject(O))
  var result = []
  $forEach$1(names, function(key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key)
  })
  return result
}

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1
  var names = nativeGetOwnPropertyNames$2(
    IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O)
  )
  var result = []
  $forEach$1(names, function(key) {
    if (
      has(AllSymbols, key) &&
      (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype$1, key))
    ) {
      result.push(AllSymbols[key])
    }
  })
  return result
} // `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor

if (!nativeSymbol) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor')
    var description =
      !arguments.length || arguments[0] === undefined
        ? undefined
        : String(arguments[0])
    var tag = uid(description)

    var setter = function setter(value) {
      if (this === ObjectPrototype$1) setter.call(ObjectPrototypeSymbols, value)
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value))
    }

    if (descriptors && USE_SETTER)
      setSymbolDescriptor(ObjectPrototype$1, tag, {
        configurable: true,
        set: setter,
      })
    return wrap(tag, description)
  }

  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
    return getInternalState$2(this).tag
  })
  objectPropertyIsEnumerable.f = $propertyIsEnumerable
  objectDefineProperty.f = $defineProperty
  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor
  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames
  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols

  if (descriptors) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState$2(this).description
      },
    })

    {
      redefine(
        ObjectPrototype$1,
        'propertyIsEnumerable',
        $propertyIsEnumerable,
        {
          unsafe: true,
        }
      )
    }
  }
}

if (!useSymbolAsUid) {
  wrappedWellKnownSymbol.f = function(name) {
    return wrap(wellKnownSymbol(name), name)
  }
}

_export(
  {
    global: true,
    wrap: true,
    forced: !nativeSymbol,
    sham: !nativeSymbol,
  },
  {
    Symbol: $Symbol,
  }
)
$forEach$1(objectKeys(WellKnownSymbolsStore), function(name) {
  defineWellKnownSymbol(name)
})
_export(
  {
    target: SYMBOL,
    stat: true,
    forced: !nativeSymbol,
  },
  {
    // `Symbol.for` method
    // https://tc39.github.io/ecma262/#sec-symbol.for
    for: function _for(key) {
      var string = String(key)
      if (has(StringToSymbolRegistry, string))
        return StringToSymbolRegistry[string]
      var symbol = $Symbol(string)
      StringToSymbolRegistry[string] = symbol
      SymbolToStringRegistry[symbol] = string
      return symbol
    },
    // `Symbol.keyFor` method
    // https://tc39.github.io/ecma262/#sec-symbol.keyfor
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol')
      if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym]
    },
    useSetter: function useSetter() {
      USE_SETTER = true
    },
    useSimple: function useSimple() {
      USE_SETTER = false
    },
  }
)
_export(
  {
    target: 'Object',
    stat: true,
    forced: !nativeSymbol,
    sham: !descriptors,
  },
  {
    // `Object.create` method
    // https://tc39.github.io/ecma262/#sec-object.create
    create: $create,
    // `Object.defineProperty` method
    // https://tc39.github.io/ecma262/#sec-object.defineproperty
    defineProperty: $defineProperty,
    // `Object.defineProperties` method
    // https://tc39.github.io/ecma262/#sec-object.defineproperties
    defineProperties: $defineProperties,
    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  }
)
_export(
  {
    target: 'Object',
    stat: true,
    forced: !nativeSymbol,
  },
  {
    // `Object.getOwnPropertyNames` method
    // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
    getOwnPropertyNames: $getOwnPropertyNames,
    // `Object.getOwnPropertySymbols` method
    // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
    getOwnPropertySymbols: $getOwnPropertySymbols,
  }
) // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443

_export(
  {
    target: 'Object',
    stat: true,
    forced: fails(function() {
      objectGetOwnPropertySymbols.f(1)
    }),
  },
  {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      return objectGetOwnPropertySymbols.f(toObject(it))
    },
  }
) // `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify

if ($stringify) {
  var FORCED_JSON_STRINGIFY =
    !nativeSymbol ||
    fails(function() {
      var symbol = $Symbol() // MS Edge converts symbol values to JSON as {}

      return (
        $stringify([symbol]) != '[null]' || // WebKit converts symbol values to JSON as null
        $stringify({
          a: symbol,
        }) != '{}' || // V8 throws on boxed symbols
        $stringify(Object(symbol)) != '{}'
      )
    })
  _export(
    {
      target: 'JSON',
      stat: true,
      forced: FORCED_JSON_STRINGIFY,
    },
    {
      // eslint-disable-next-line no-unused-vars
      stringify: function stringify(it, replacer, space) {
        var args = [it]
        var index = 1
        var $replacer

        while (arguments.length > index) {
          args.push(arguments[index++])
        }

        $replacer = replacer
        if ((!isObject(replacer) && it === undefined) || isSymbol(it)) return // IE8 returns string on undefined

        if (!isArray(replacer))
          replacer = function replacer(key, value) {
            if (typeof $replacer == 'function')
              value = $replacer.call(this, key, value)
            if (!isSymbol(value)) return value
          }
        args[1] = replacer
        return $stringify.apply(null, args)
      },
    }
  )
} // `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive

if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
  createNonEnumerableProperty(
    $Symbol[PROTOTYPE$1],
    TO_PRIMITIVE,
    $Symbol[PROTOTYPE$1].valueOf
  )
} // `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag

setToStringTag($Symbol, SYMBOL)
hiddenKeys[HIDDEN] = true

var WellKnownSymbolsStore$1 = shared('wks')
var Symbol$1 = global_1.Symbol
var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : uid

var wellKnownSymbol = function wellKnownSymbol(name) {
  if (!has(WellKnownSymbolsStore$1, name)) {
    if (nativeSymbol && has(Symbol$1, name))
      WellKnownSymbolsStore$1[name] = Symbol$1[name]
    else WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name)
  }

  return WellKnownSymbolsStore$1[name]
}

var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag')
var test = {}
test[TO_STRING_TAG$2] = 'z'
var toStringTagSupport = String(test) === '[object z]'

// https://tc39.github.io/ecma262/#sec-object.prototype.tostring

var objectToString = toStringTagSupport
  ? {}.toString
  : function toString() {
      return '[object ' + classof(this) + ']'
    }

// https://tc39.github.io/ecma262/#sec-object.prototype.tostring

if (!toStringTagSupport) {
  redefine(Object.prototype, 'toString', objectToString, {
    unsafe: true,
  })
}

var DatePrototype = Date.prototype
var INVALID_DATE = 'Invalid Date'
var TO_STRING = 'toString'
var nativeDateToString = DatePrototype[TO_STRING]
var getTime = DatePrototype.getTime // `Date.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tostring

if (new Date(NaN) + '' != INVALID_DATE) {
  redefine(DatePrototype, TO_STRING, function toString() {
    var value = getTime.call(this) // eslint-disable-next-line no-self-compare

    return value === value ? nativeDateToString.call(this) : INVALID_DATE
  })
}

var TO_STRING$1 = 'toString'
var RegExpPrototype = RegExp.prototype
var nativeToString = RegExpPrototype[TO_STRING$1]
var NOT_GENERIC = fails(function() {
  return (
    nativeToString.call({
      source: 'a',
      flags: 'b',
    }) != '/a/b'
  )
}) // FF44- RegExp#toString has a wrong name

var INCORRECT_NAME = nativeToString.name != TO_STRING$1 // `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring

if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(
    RegExp.prototype,
    TO_STRING$1,
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

var SPECIES$5 = wellKnownSymbol('species')

var setSpecies = function setSpecies(CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME)
  var defineProperty = objectDefineProperty.f

  if (descriptors && Constructor && !Constructor[SPECIES$5]) {
    defineProperty(Constructor, SPECIES$5, {
      configurable: true,
      get: function get() {
        return this
      },
    })
  }
}

var defineProperty$5 = objectDefineProperty.f
var getOwnPropertyNames = objectGetOwnPropertyNames.f
var MATCH$2 = wellKnownSymbol('match')
var NativeRegExp = global_1.RegExp
var RegExpPrototype$1 = NativeRegExp.prototype
var re1 = /a/g
var re2 = /a/g // "new" should create a new object, old webkit bug

var CORRECT_NEW = new NativeRegExp(re1) !== re1
var FORCED$1 =
  descriptors &&
  isForced_1(
    'RegExp',
    !CORRECT_NEW ||
      fails(function() {
        re2[MATCH$2] = false // RegExp constructor can alter flags and IsRegExp works correct with @@match

        return (
          NativeRegExp(re1) != re1 ||
          NativeRegExp(re2) == re2 ||
          NativeRegExp(re1, 'i') != '/a/i'
        )
      })
  ) // `RegExp` constructor
// https://tc39.github.io/ecma262/#sec-regexp-constructor

if (FORCED$1) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper
    var patternIsRegExp = isRegexp(pattern)
    var flagsAreUndefined = flags === undefined
    return !thisIsRegExp &&
      patternIsRegExp &&
      pattern.constructor === RegExpWrapper &&
      flagsAreUndefined
      ? pattern
      : inheritIfRequired(
          CORRECT_NEW
            ? new NativeRegExp(
                patternIsRegExp && !flagsAreUndefined
                  ? pattern.source
                  : pattern,
                flags
              )
            : NativeRegExp(
                (patternIsRegExp = pattern instanceof RegExpWrapper)
                  ? pattern.source
                  : pattern,
                patternIsRegExp && flagsAreUndefined
                  ? regexpFlags.call(pattern)
                  : flags
              ),
          thisIsRegExp ? this : RegExpPrototype$1,
          RegExpWrapper
        )
  }

  var proxy = function proxy(key) {
    key in RegExpWrapper ||
      defineProperty$5(RegExpWrapper, key, {
        configurable: true,
        get: function get() {
          return NativeRegExp[key]
        },
        set: function set(it) {
          NativeRegExp[key] = it
        },
      })
  }

  var keys$1 = getOwnPropertyNames(NativeRegExp)
  var index = 0

  while (keys$1.length > index) {
    proxy(keys$1[index++])
  }

  RegExpPrototype$1.constructor = RegExpWrapper
  RegExpWrapper.prototype = RegExpPrototype$1
  redefine(global_1, 'RegExp', RegExpWrapper)
} // https://tc39.github.io/ecma262/#sec-get-regexp-@@species

setSpecies('RegExp')

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

var toIndexedObject = function toIndexedObject(it) {
  return indexedObject(requireObjectCoercible(it))
}

var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f
var FAILS_ON_PRIMITIVES$5 = fails(function() {
  nativeGetOwnPropertyDescriptor$1(1)
})
var FORCED$2 = !descriptors || FAILS_ON_PRIMITIVES$5 // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

_export(
  {
    target: 'Object',
    stat: true,
    forced: FORCED$2,
    sham: !descriptors,
  },
  {
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
      return nativeGetOwnPropertyDescriptor$1(toIndexedObject(it), key)
    },
  }
)

var nativeGetOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

var f$6 = descriptors
  ? nativeGetOwnPropertyDescriptor$2
  : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject(O)
      P = toPrimitive(P, true)
      if (ie8DomDefine)
        try {
          return nativeGetOwnPropertyDescriptor$2(O, P)
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
  f: f$6,
}

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

var _export = function _export(options, source) {
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

var nativeJoin = [].join
var ES3_STRINGS = indexedObject != Object
var SLOPPY_METHOD$1 = sloppyArrayMethod('join', ',') // `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join

_export(
  {
    target: 'Array',
    proto: true,
    forced: ES3_STRINGS || SLOPPY_METHOD$1,
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
      fn: function fn(snippet, match) {
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

var createMethod$3 = function createMethod(IS_RIGHT) {
  return function(that, callbackfn, argumentsLength, memo) {
    aFunction$1(callbackfn)
    var O = toObject(that)
    var self = indexedObject(O)
    var length = toLength(O.length)
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
          throw TypeError('Reduce of empty array with no initial value')
        }
      }

    for (; IS_RIGHT ? index >= 0 : length > index; index += i) {
      if (index in self) {
        memo = callbackfn(memo, self[index], index, O)
      }
    }

    return memo
  }
}

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod$3(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod$3(true),
}

var $reduceRight = arrayReduce.right // `Array.prototype.reduceRight` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduceright

_export(
  {
    target: 'Array',
    proto: true,
    forced: sloppyArrayMethod('reduceRight'),
  },
  {
    reduceRight: function reduceRight(
      callbackfn
      /* , initialValue */
    ) {
      return $reduceRight(
        this,
        callbackfn,
        arguments.length,
        arguments.length > 1 ? arguments[1] : undefined
      )
    },
  }
)

// https://tc39.github.io/ecma262/#sec-object.is

_export(
  {
    target: 'Object',
    stat: true,
  },
  {
    is: sameValue,
  }
)

// `SameValue` abstract operation
// https://tc39.github.io/ecma262/#sec-samevalue
var sameValue =
  Object.is ||
  function is(x, y) {
    // eslint-disable-next-line no-self-compare
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y
  }

fixRegexpWellKnownSymbolLogic('search', 1, function(
  SEARCH,
  nativeSearch,
  maybeCallNative
) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible(this)
      var searcher = regexp == undefined ? undefined : regexp[SEARCH]
      return searcher !== undefined
        ? searcher.call(regexp, O)
        : new RegExp(regexp)[SEARCH](String(O))
    }, // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function(regexp) {
      var res = maybeCallNative(nativeSearch, regexp, this)
      if (res.done) return res.value
      var rx = anObject(regexp)
      var S = String(this)
      var previousLastIndex = rx.lastIndex
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0
      var result = regexpExecAbstract(rx, S)
      if (!sameValue(rx.lastIndex, previousLastIndex))
        rx.lastIndex = previousLastIndex
      return result === null ? -1 : result.index
    },
  ]
})

var eventemitter3 = createCommonjsModule(function(module) {
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
    once
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
    event
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
})

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
var whitespaces =
  '\t\n\x0B\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF'

var whitespace = '[' + whitespaces + ']'
var ltrim = RegExp('^' + whitespace + whitespace + '*')
var rtrim = RegExp(whitespace + whitespace + '*$') // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

var createMethod$4 = function createMethod(TYPE) {
  return function($this) {
    var string = String(requireObjectCoercible($this))
    if (TYPE & 1) string = string.replace(ltrim, '')
    if (TYPE & 2) string = string.replace(rtrim, '')
    return string
  }
}

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod$4(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod$4(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod$4(3),
}

var non = '\u200B\x85\u180E' // check that a method works with the correct list
// of whitespaces and has a correct name

var forcedStringTrimMethod = function forcedStringTrimMethod(METHOD_NAME) {
  return fails(function() {
    return (
      !!whitespaces[METHOD_NAME]() ||
      non[METHOD_NAME]() != non ||
      whitespaces[METHOD_NAME].name !== METHOD_NAME
    )
  })
}

var $trim = stringTrim.trim // `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim

_export(
  {
    target: 'String',
    proto: true,
    forced: forcedStringTrimMethod('trim'),
  },
  {
    trim: function trim() {
      return $trim(this)
    },
  }
)

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

var common_1 = createCommonjsModule(function(module, exports) {
  var common = exports,
    extend = util._extend
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

  common.setupOutgoing = function(outgoing, options, req, forward) {
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
    ].forEach(function(e) {
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
        requiresPort(outgoing.port, options[forward || 'target'].protocol) &&
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

  common.setupSocket = function(socket) {
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

  common.getPort = function(req) {
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

  common.hasEncryptedConnection = function(req) {
    return Boolean(req.connection.encrypted || req.connection.pair)
  }
  /**
   * OS-agnostic join (doesn't break on URLs like path.join does on Windows)>
   *
   * @return {String} The generated path.
   *
   * @api private
   */

  common.urlJoin = function() {
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
    property
  ) {
    if (Array.isArray(header)) {
      return header.map(function(headerElement) {
        return rewriteCookieProperty(headerElement, config, property)
      })
    }

    return header.replace(
      new RegExp('(;\\s*' + property + '=)([^;]+)', 'i'),
      function(match, prefix, previousValue) {
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
      }
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
})

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
    options
  ) {
    if (
      (options.hostRewrite || options.autoRewrite || options.protocolRewrite) &&
      proxyRes.headers['location'] &&
      redirectRegex.test(proxyRes.statusCode)
    ) {
      var target = url.parse(options.target)
      var u = url.parse(proxyRes.headers['location']) // make sure the redirected host matches the target host before rewriting

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
      setHeader = function setHeader(key, header) {
        if (header == undefined) return

        if (rewriteCookieDomainConfig && key.toLowerCase() === 'set-cookie') {
          header = common_1.rewriteCookieProperty(
            header,
            rewriteCookieDomainConfig,
            'domain'
          )
        }

        if (rewriteCookiePathConfig && key.toLowerCase() === 'set-cookie') {
          header = common_1.rewriteCookieProperty(
            header,
            rewriteCookiePathConfig,
            'path'
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

    Object.keys(proxyRes.headers).forEach(function(key) {
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

var trim = stringTrim.trim
var nativeParseInt = global_1.parseInt
var hex = /^[+-]?0[Xx]/
var FORCED$3 =
  nativeParseInt(whitespaces + '08') !== 8 ||
  nativeParseInt(whitespaces + '0x16') !== 22 // `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix

var _parseInt = FORCED$3
  ? function parseInt(string, radix) {
      var S = trim(String(string))
      return nativeParseInt(S, radix >>> 0 || (hex.test(S) ? 16 : 10))
    }
  : nativeParseInt

// https://tc39.github.io/ecma262/#sec-parseint-string-radix

_export(
  {
    global: true,
    forced: parseInt != _parseInt,
  },
  {
    parseInt: _parseInt,
  }
)

var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f
var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f
var defineProperty$6 = objectDefineProperty.f
var trim$1 = stringTrim.trim
var NUMBER = 'Number'
var NativeNumber = global_1[NUMBER]
var NumberPrototype = NativeNumber.prototype // Opera ~12 has broken Object#toString

var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER // `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber

var toNumber = function toNumber(argument) {
  var it = toPrimitive(argument, false)
  var first, third, radix, maxCode, digits, length, index, code

  if (typeof it == 'string' && it.length > 2) {
    it = trim$1(it)
    first = it.charCodeAt(0)

    if (first === 43 || first === 45) {
      third = it.charCodeAt(2)
      if (third === 88 || third === 120) return NaN // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66:
        case 98:
          radix = 2
          maxCode = 49
          break
        // fast equal of /^0b[01]+$/i

        case 79:
        case 111:
          radix = 8
          maxCode = 55
          break
        // fast equal of /^0o[0-7]+$/i

        default:
          return +it
      }

      digits = it.slice(2)
      length = digits.length

      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index) // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols

        if (code < 48 || code > maxCode) return NaN
      }

      return parseInt(digits, radix)
    }
  }

  return +it
} // `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor

if (
  isForced_1(
    NUMBER,
    !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1')
  )
) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value
    var dummy = this
    return dummy instanceof NumberWrapper && // check on 1..constructor(foo) case
      (BROKEN_CLASSOF
        ? fails(function() {
            NumberPrototype.valueOf.call(dummy)
          })
        : classofRaw(dummy) != NUMBER)
      ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper)
      : toNumber(it)
  }

  for (
    var keys$2 = descriptors
        ? getOwnPropertyNames$1(NativeNumber)
        : // ES3:
          (
            'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + // ES2015 (in case, if modules with ES2015 Number statics required before):
            'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
            'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
          ).split(','),
      j = 0,
      key;
    keys$2.length > j;
    j++
  ) {
    if (has(NativeNumber, (key = keys$2[j])) && !has(NumberWrapper, key)) {
      defineProperty$6(
        NumberWrapper,
        key,
        getOwnPropertyDescriptor$2(NativeNumber, key)
      )
    }
  }

  NumberWrapper.prototype = NumberPrototype
  NumberPrototype.constructor = NumberWrapper
  redefine(global_1, NUMBER, NumberWrapper)
}

var nativeAssign = Object.assign
var defineProperty$7 = Object.defineProperty // `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign

var objectAssign =
  !nativeAssign ||
  fails(function() {
    // should have correct order of operations (Edge bug)
    if (
      descriptors &&
      nativeAssign(
        {
          b: 1,
        },
        nativeAssign(
          defineProperty$7({}, 'a', {
            enumerable: true,
            get: function get() {
              defineProperty$7(this, 'b', {
                value: 3,
                enumerable: false,
              })
            },
          }),
          {
            b: 2,
          }
        )
      ).b !== 1
    )
      return true // should work with symbols and should have deterministic property order (V8 bug)

    var A = {}
    var B = {} // eslint-disable-next-line no-undef

    var symbol = Symbol()
    var alphabet = 'abcdefghijklmnopqrst'
    A[symbol] = 7
    alphabet.split('').forEach(function(chr) {
      B[chr] = chr
    })
    return (
      nativeAssign({}, A)[symbol] != 7 ||
      objectKeys(nativeAssign({}, B)).join('') != alphabet
    )
  })
    ? function assign(target, source) {
        // eslint-disable-line no-unused-vars
        var T = toObject(target)
        var argumentsLength = arguments.length
        var index = 1
        var getOwnPropertySymbols = objectGetOwnPropertySymbols.f
        var propertyIsEnumerable = objectPropertyIsEnumerable.f

        while (argumentsLength > index) {
          var S = indexedObject(arguments[index++])
          var keys = getOwnPropertySymbols
            ? objectKeys(S).concat(getOwnPropertySymbols(S))
            : objectKeys(S)
          var length = keys.length
          var j = 0
          var key

          while (length > j) {
            key = keys[j++]
            if (!descriptors || propertyIsEnumerable.call(S, key))
              T[key] = S[key]
          }
        }

        return T
      }
    : nativeAssign

// https://tc39.github.io/ecma262/#sec-object.assign

_export(
  {
    target: 'Object',
    stat: true,
    forced: Object.assign !== objectAssign,
  },
  {
    assign: objectAssign,
  }
)

var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f
var nativeStartsWith = ''.startsWith
var min$5 = Math.min
var CORRECT_IS_REGEXP_LOGIC = correctIsRegexpLogic('startsWith') // https://github.com/zloirock/core-js/pull/702

var MDN_POLYFILL_BUG =
  !CORRECT_IS_REGEXP_LOGIC &&
  !!(function() {
    var descriptor = getOwnPropertyDescriptor$3(String.prototype, 'startsWith')
    return descriptor && !descriptor.writable
  })() // `String.prototype.startsWith` method
// https://tc39.github.io/ecma262/#sec-string.prototype.startswith

_export(
  {
    target: 'String',
    proto: true,
    forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC,
  },
  {
    startsWith: function startsWith(
      searchString
      /* , position = 0 */
    ) {
      var that = String(requireObjectCoercible(this))
      notARegexp(searchString)
      var index = toLength(
        min$5(arguments.length > 1 ? arguments[1] : undefined, that.length)
      )
      var search = String(searchString)
      return nativeStartsWith
        ? nativeStartsWith.call(that, search, index)
        : that.slice(index, index + search.length) === search
    },
  }
)

// https://tc39.github.io/ecma262/#sec-symbol.iterator

defineWellKnownSymbol('iterator')

var trim$2 = stringTrim.trim
var nativeParseFloat = global_1.parseFloat
var FORCED$4 = 1 / nativeParseFloat(whitespaces + '-0') !== -Infinity // `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string

var _parseFloat = FORCED$4
  ? function parseFloat(string) {
      var trimmedString = trim$2(String(string))
      var result = nativeParseFloat(trimmedString)
      return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result
    }
  : nativeParseFloat

// https://tc39.github.io/ecma262/#sec-parsefloat-string

_export(
  {
    global: true,
    forced: parseFloat != _parseFloat,
  },
  {
    parseFloat: _parseFloat,
  }
)

/**
 * Helpers.
 */
var s = 1000
var m = s * 60
var h = m * 60
var d = h * 24
var w = d * 7
var y = d * 365.25
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

var ms = function ms(val, options) {
  options = options || {}
  var type = typeof val

  if (type === 'string' && val.length > 0) {
    return parse(val)
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val)
  }

  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  )
}
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str)

  if (str.length > 100) {
    return
  }

  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  )

  if (!match) {
    return
  }

  var n = parseFloat(match[1])
  var type = (match[2] || 'ms').toLowerCase()

  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y

    case 'weeks':
    case 'week':
    case 'w':
      return n * w

    case 'days':
    case 'day':
    case 'd':
      return n * d

    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h

    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m

    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s

    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n

    default:
      return undefined
  }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms)

  if (msAbs >= d) {
    return Math.round(ms / d) + 'd'
  }

  if (msAbs >= h) {
    return Math.round(ms / h) + 'h'
  }

  if (msAbs >= m) {
    return Math.round(ms / m) + 'm'
  }

  if (msAbs >= s) {
    return Math.round(ms / s) + 's'
  }

  return ms + 'ms'
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms)

  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day')
  }

  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour')
  }

  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute')
  }

  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second')
  }

  return ms + ' ms'
}
/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '')
}

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
  createDebug.debug = createDebug
  createDebug.default = createDebug
  createDebug.coerce = coerce
  createDebug.disable = disable
  createDebug.enable = enable
  createDebug.enabled = enabled
  createDebug.humanize = ms
  Object.keys(env).forEach(function(key) {
    createDebug[key] = env[key]
  })
  /**
   * Active `debug` instances.
   */

  createDebug.instances = []
  /**
   * The currently active debug mode names, and names to skip.
   */

  createDebug.names = []
  createDebug.skips = []
  /**
   * Map of special "%n" handling functions, for the debug "format" argument.
   *
   * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
   */

  createDebug.formatters = {}
  /**
   * Selects a color for a debug namespace
   * @param {String} namespace The namespace string for the for the debug instance to be colored
   * @return {Number|String} An ANSI color code for the given namespace
   * @api private
   */

  function selectColor(namespace) {
    var hash = 0

    for (var i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i)
      hash |= 0 // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length]
  }

  createDebug.selectColor = selectColor
  /**
   * Create a debugger with the given `namespace`.
   *
   * @param {String} namespace
   * @return {Function}
   * @api public
   */

  function createDebug(namespace) {
    var prevTime

    function debug() {
      // Disabled?
      if (!debug.enabled) {
        return
      }

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key]
      }

      var self = debug // Set `diff` timestamp

      var curr = Number(new Date())
      var ms = curr - (prevTime || curr)
      self.diff = ms
      self.prev = prevTime
      self.curr = curr
      prevTime = curr
      args[0] = createDebug.coerce(args[0])

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O')
      } // Apply any `formatters` transformations

      var index = 0
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return match
        }

        index++
        var formatter = createDebug.formatters[format]

        if (typeof formatter === 'function') {
          var val = args[index]
          match = formatter.call(self, val) // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1)
          index--
        }

        return match
      }) // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args)
      var logFn = self.log || createDebug.log
      logFn.apply(self, args)
    }

    debug.namespace = namespace
    debug.enabled = createDebug.enabled(namespace)
    debug.useColors = createDebug.useColors()
    debug.color = selectColor(namespace)
    debug.destroy = destroy
    debug.extend = extend // Debug.formatArgs = formatArgs;
    // debug.rawLog = rawLog;
    // env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug)
    }

    createDebug.instances.push(debug)
    return debug
  }

  function destroy() {
    var index = createDebug.instances.indexOf(this)

    if (index !== -1) {
      createDebug.instances.splice(index, 1)
      return true
    }

    return false
  }

  function extend(namespace, delimiter) {
    return createDebug(
      this.namespace +
        (typeof delimiter === 'undefined' ? ':' : delimiter) +
        namespace
    )
  }
  /**
   * Enables a debug mode by namespaces. This can include modes
   * separated by a colon and wildcards.
   *
   * @param {String} namespaces
   * @api public
   */

  function enable(namespaces) {
    createDebug.save(namespaces)
    createDebug.names = []
    createDebug.skips = []
    var i
    var split = (typeof namespaces === 'string' ? namespaces : '').split(
      /[\s,]+/
    )
    var len = split.length

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue
      }

      namespaces = split[i].replace(/\*/g, '.*?')

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'))
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'))
      }
    }

    for (i = 0; i < createDebug.instances.length; i++) {
      var instance = createDebug.instances[i]
      instance.enabled = createDebug.enabled(instance.namespace)
    }
  }
  /**
   * Disable debug output.
   *
   * @api public
   */

  function disable() {
    createDebug.enable('')
  }
  /**
   * Returns true if the given mode name is enabled, false otherwise.
   *
   * @param {String} name
   * @return {Boolean}
   * @api public
   */

  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true
    }

    var i
    var len

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true
      }
    }

    return false
  }
  /**
   * Coerce `val`.
   *
   * @param {Mixed} val
   * @return {Mixed}
   * @api private
   */

  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message
    }

    return val
  }

  createDebug.enable(createDebug.load())
  return createDebug
}

var common = setup

var browser = createCommonjsModule(function(module, exports) {
  function _typeof(obj) {
    if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
      _typeof = function _typeof(obj) {
        return typeof obj
      }
    } else {
      _typeof = function _typeof(obj) {
        return obj &&
          typeof Symbol === 'function' &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? 'symbol'
          : typeof obj
      }
    }

    return _typeof(obj)
  }
  /* eslint-env browser */

  /**
   * This is the web browser implementation of `debug()`.
   */

  exports.log = log
  exports.formatArgs = formatArgs
  exports.save = save
  exports.load = load
  exports.useColors = useColors
  exports.storage = localstorage()
  /**
   * Colors.
   */

  exports.colors = [
    '#0000CC',
    '#0000FF',
    '#0033CC',
    '#0033FF',
    '#0066CC',
    '#0066FF',
    '#0099CC',
    '#0099FF',
    '#00CC00',
    '#00CC33',
    '#00CC66',
    '#00CC99',
    '#00CCCC',
    '#00CCFF',
    '#3300CC',
    '#3300FF',
    '#3333CC',
    '#3333FF',
    '#3366CC',
    '#3366FF',
    '#3399CC',
    '#3399FF',
    '#33CC00',
    '#33CC33',
    '#33CC66',
    '#33CC99',
    '#33CCCC',
    '#33CCFF',
    '#6600CC',
    '#6600FF',
    '#6633CC',
    '#6633FF',
    '#66CC00',
    '#66CC33',
    '#9900CC',
    '#9900FF',
    '#9933CC',
    '#9933FF',
    '#99CC00',
    '#99CC33',
    '#CC0000',
    '#CC0033',
    '#CC0066',
    '#CC0099',
    '#CC00CC',
    '#CC00FF',
    '#CC3300',
    '#CC3333',
    '#CC3366',
    '#CC3399',
    '#CC33CC',
    '#CC33FF',
    '#CC6600',
    '#CC6633',
    '#CC9900',
    '#CC9933',
    '#CCCC00',
    '#CCCC33',
    '#FF0000',
    '#FF0033',
    '#FF0066',
    '#FF0099',
    '#FF00CC',
    '#FF00FF',
    '#FF3300',
    '#FF3333',
    '#FF3366',
    '#FF3399',
    '#FF33CC',
    '#FF33FF',
    '#FF6600',
    '#FF6633',
    '#FF9900',
    '#FF9933',
    '#FFCC00',
    '#FFCC33',
  ]
  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */
  // eslint-disable-next-line complexity

  function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if (
      typeof window !== 'undefined' &&
      window.process &&
      (window.process.type === 'renderer' || window.process.__nwjs)
    ) {
      return true
    } // Internet Explorer and Edge do not support colors.

    if (
      typeof navigator !== 'undefined' &&
      navigator.userAgent &&
      navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
    ) {
      return false
    } // Is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632

    return (
      (typeof document !== 'undefined' &&
        document.documentElement &&
        document.documentElement.style &&
        document.documentElement.style.WebkitAppearance) || // Is firebug? http://stackoverflow.com/a/398120/376773
      (typeof window !== 'undefined' &&
        window.console &&
        (window.console.firebug ||
          (window.console.exception && window.console.table))) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      (typeof navigator !== 'undefined' &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
        parseInt(RegExp.$1, 10) >= 31) || // Double check webkit in userAgent just in case we are in a worker
      (typeof navigator !== 'undefined' &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
    )
  }
  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
    args[0] =
      (this.useColors ? '%c' : '') +
      this.namespace +
      (this.useColors ? ' %c' : ' ') +
      args[0] +
      (this.useColors ? '%c ' : ' ') +
      '+' +
      module.exports.humanize(this.diff)

    if (!this.useColors) {
      return
    }

    var c = 'color: ' + this.color
    args.splice(1, 0, c, 'color: inherit') // The final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into

    var index = 0
    var lastC = 0
    args[0].replace(/%[a-zA-Z%]/g, function(match) {
      if (match === '%%') {
        return
      }

      index++

      if (match === '%c') {
        // We only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index
      }
    })
    args.splice(lastC, 0, c)
  }
  /**
   * Invokes `console.log()` when available.
   * No-op when `console.log` is not a "function".
   *
   * @api public
   */

  function log() {
    var _console // This hackery is required for IE8/9, where
    // the `console.log` function doesn't have 'apply'

    return (
      (typeof console === 'undefined' ? 'undefined' : _typeof(console)) ===
        'object' &&
      console.log &&
      (_console = console).log.apply(_console, arguments)
    )
  }
  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */

  function save(namespaces) {
    try {
      if (namespaces) {
        exports.storage.setItem('debug', namespaces)
      } else {
        exports.storage.removeItem('debug')
      }
    } catch (error) {
      // Swallow
      // XXX (@Qix-) should we be logging these?
    }
  }
  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
    var r

    try {
      r = exports.storage.getItem('debug')
    } catch (error) {} // Swallow
    // XXX (@Qix-) should we be logging these?
    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG

    if (!r && typeof process !== 'undefined' && 'env' in process) {
      r = process.env.DEBUG
    }

    return r
  }
  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */

  function localstorage() {
    try {
      // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
      // The Browser also has localStorage in the global context.
      return localStorage
    } catch (error) {
      // Swallow
      // XXX (@Qix-) should we be logging these?
    }
  }

  module.exports = common(exports)
  var formatters = module.exports.formatters
  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */

  formatters.j = function(v) {
    try {
      return JSON.stringify(v)
    } catch (error) {
      return '[UnexpectedJSONParseError]: ' + error.message
    }
  }
})
var browser_1 = browser.log
var browser_2 = browser.formatArgs
var browser_3 = browser.save
var browser_4 = browser.load
var browser_5 = browser.useColors
var browser_6 = browser.storage
var browser_7 = browser.colors

var $reduce = arrayReduce.left // `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce

_export(
  {
    target: 'Array',
    proto: true,
    forced: sloppyArrayMethod('reduce'),
  },
  {
    reduce: function reduce(
      callbackfn
      /* , initialValue */
    ) {
      return $reduce(
        this,
        callbackfn,
        arguments.length,
        arguments.length > 1 ? arguments[1] : undefined
      )
    },
  }
)

// https://tc39.github.io/ecma262/#sec-string.prototype.repeat

_export(
  {
    target: 'String',
    proto: true,
  },
  {
    repeat: stringRepeat,
  }
)

// https://tc39.github.io/ecma262/#sec-string.prototype.repeat

var stringRepeat =
  ''.repeat ||
  function repeat(count) {
    var str = String(requireObjectCoercible(this))
    var result = ''
    var n = toInteger(count)
    if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions')

    for (; n > 0; (n >>>= 1) && (str += str)) {
      if (n & 1) result += str
    }

    return result
  }

var ceil$1 = Math.ceil // `String.prototype.{ padStart, padEnd }` methods implementation

var createMethod$5 = function createMethod(IS_END) {
  return function($this, maxLength, fillString) {
    var S = String(requireObjectCoercible($this))
    var stringLength = S.length
    var fillStr = fillString === undefined ? ' ' : String(fillString)
    var intMaxLength = toLength(maxLength)
    var fillLen, stringFiller
    if (intMaxLength <= stringLength || fillStr == '') return S
    fillLen = intMaxLength - stringLength
    stringFiller = stringRepeat.call(fillStr, ceil$1(fillLen / fillStr.length))
    if (stringFiller.length > fillLen)
      stringFiller = stringFiller.slice(0, fillLen)
    return IS_END ? S + stringFiller : stringFiller + S
  }
}

var stringPad = {
  // `String.prototype.padStart` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.padstart
  start: createMethod$5(false),
  // `String.prototype.padEnd` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.padend
  end: createMethod$5(true),
}

var padStart = stringPad.start
var abs = Math.abs
var DatePrototype$1 = Date.prototype
var getTime$1 = DatePrototype$1.getTime
var nativeDateToISOString = DatePrototype$1.toISOString // `Date.prototype.toISOString` method implementation
// https://tc39.github.io/ecma262/#sec-date.prototype.toisostring
// PhantomJS / old WebKit fails here:

var dateToIsoString =
  fails(function() {
    return (
      nativeDateToISOString.call(new Date(-5e13 - 1)) !=
      '0385-07-25T07:06:39.999Z'
    )
  }) ||
  !fails(function() {
    nativeDateToISOString.call(new Date(NaN))
  })
    ? function toISOString() {
        if (!isFinite(getTime$1.call(this)))
          throw RangeError('Invalid time value')
        var date = this
        var year = date.getUTCFullYear()
        var milliseconds = date.getUTCMilliseconds()
        var sign = year < 0 ? '-' : year > 9999 ? '+' : ''
        return (
          sign +
          padStart(abs(year), sign ? 6 : 4, 0) +
          '-' +
          padStart(date.getUTCMonth() + 1, 2, 0) +
          '-' +
          padStart(date.getUTCDate(), 2, 0) +
          'T' +
          padStart(date.getUTCHours(), 2, 0) +
          ':' +
          padStart(date.getUTCMinutes(), 2, 0) +
          ':' +
          padStart(date.getUTCSeconds(), 2, 0) +
          '.' +
          padStart(milliseconds, 3, 0) +
          'Z'
        )
      }
    : nativeDateToISOString

// https://tc39.github.io/ecma262/#sec-date.prototype.toisostring
// PhantomJS / old WebKit has a broken implementations

_export(
  {
    target: 'Date',
    proto: true,
    forced: Date.prototype.toISOString !== dateToIsoString,
  },
  {
    toISOString: dateToIsoString,
  }
)

var hasFlag = function hasFlag(flag, argv) {
  argv = argv || process.argv
  var prefix = flag.startsWith('-') ? '' : flag.length === 1 ? '-' : '--'
  var pos = argv.indexOf(prefix + flag)
  var terminatorPos = argv.indexOf('--')
  return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos)
}

var env = process.env
var forceColor

if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false')) {
  forceColor = false
} else if (
  hasFlag('color') ||
  hasFlag('colors') ||
  hasFlag('color=true') ||
  hasFlag('color=always')
) {
  forceColor = true
}

if ('FORCE_COLOR' in env) {
  forceColor =
    env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0
}

function translateLevel(level) {
  if (level === 0) {
    return false
  }

  return {
    level: level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3,
  }
}

function supportsColor(stream) {
  if (forceColor === false) {
    return 0
  }

  if (
    hasFlag('color=16m') ||
    hasFlag('color=full') ||
    hasFlag('color=truecolor')
  ) {
    return 3
  }

  if (hasFlag('color=256')) {
    return 2
  }

  if (stream && !stream.isTTY && forceColor !== true) {
    return 0
  }

  var min = forceColor ? 1 : 0

  if (process.platform === 'win32') {
    // Node.js 7.5.0 is the first version of Node.js to include a patch to
    // libuv that enables 256 color output on Windows. Anything earlier and it
    // won't work. However, here we target Node.js 8 at minimum as it is an LTS
    // release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
    // release that supports 256 colors. Windows 10 build 14931 is the first release
    // that supports 16m/TrueColor.
    var osRelease = os.release().split('.')

    if (
      Number(process.versions.node.split('.')[0]) >= 8 &&
      Number(osRelease[0]) >= 10 &&
      Number(osRelease[2]) >= 10586
    ) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2
    }

    return 1
  }

  if ('CI' in env) {
    if (
      ['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(function(sign) {
        return sign in env
      }) ||
      env.CI_NAME === 'codeship'
    ) {
      return 1
    }

    return min
  }

  if ('TEAMCITY_VERSION' in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0
  }

  if (env.COLORTERM === 'truecolor') {
    return 3
  }

  if ('TERM_PROGRAM' in env) {
    var version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10)

    switch (env.TERM_PROGRAM) {
      case 'iTerm.app':
        return version >= 3 ? 3 : 2

      case 'Apple_Terminal':
        return 2
      // No default
    }
  }

  if (/-256(color)?$/i.test(env.TERM)) {
    return 2
  }

  if (
    /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)
  ) {
    return 1
  }

  if ('COLORTERM' in env) {
    return 1
  }

  if (env.TERM === 'dumb') {
    return min
  }

  return min
}

function getSupportLevel(stream) {
  var level = supportsColor(stream)
  return translateLevel(level)
}

var supportsColor_1 = {
  supportsColor: getSupportLevel,
  stdout: getSupportLevel(process.stdout),
  stderr: getSupportLevel(process.stderr),
}

var node = createCommonjsModule(function(module, exports) {
  /**
   * Module dependencies.
   */

  /**
   * This is the Node.js implementation of `debug()`.
   */

  exports.init = init
  exports.log = log
  exports.formatArgs = formatArgs
  exports.save = save
  exports.load = load
  exports.useColors = useColors
  /**
   * Colors.
   */

  exports.colors = [6, 2, 3, 4, 5, 1]

  try {
    // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
    // eslint-disable-next-line import/no-extraneous-dependencies
    var supportsColor = supportsColor_1

    if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
      exports.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221,
      ]
    }
  } catch (error) {} // Swallow - we only care if `supports-color` is available; it doesn't have to be.

  /**
   * Build up the default `inspectOpts` object from the environment variables.
   *
   *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
   */

  exports.inspectOpts = Object.keys(process.env)
    .filter(function(key) {
      return /^debug_/i.test(key)
    })
    .reduce(function(obj, key) {
      // Camel-case
      var prop = key
        .substring(6)
        .toLowerCase()
        .replace(/_([a-z])/g, function(_, k) {
          return k.toUpperCase()
        }) // Coerce string value into JS value

      var val = process.env[key]

      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false
      } else if (val === 'null') {
        val = null
      } else {
        val = Number(val)
      }

      obj[prop] = val
      return obj
    }, {})
  /**
   * Is stdout a TTY? Colored output is enabled when `true`.
   */

  function useColors() {
    return 'colors' in exports.inspectOpts
      ? Boolean(exports.inspectOpts.colors)
      : tty.isatty(process.stderr.fd)
  }
  /**
   * Adds ANSI color escape codes if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
    var name = this.namespace,
      useColors = this.useColors

    if (useColors) {
      var c = this.color
      var colorCode = '\x1B[3' + (c < 8 ? c : '8;5;' + c)
      var prefix = '  '.concat(colorCode, ';1m').concat(name, ' \x1B[0m')
      args[0] = prefix + args[0].split('\n').join('\n' + prefix)
      args.push(
        colorCode + 'm+' + module.exports.humanize(this.diff) + '\x1B[0m'
      )
    } else {
      args[0] = getDate() + name + ' ' + args[0]
    }
  }

  function getDate() {
    if (exports.inspectOpts.hideDate) {
      return ''
    }

    return new Date().toISOString() + ' '
  }
  /**
   * Invokes `util.format()` with the specified arguments and writes to stderr.
   */

  function log() {
    return process.stderr.write(util.format.apply(util, arguments) + '\n')
  }
  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */

  function save(namespaces) {
    if (namespaces) {
      process.env.DEBUG = namespaces
    } else {
      // If you set a process.env field to null or undefined, it gets cast to the
      // string 'null' or 'undefined'. Just delete instead.
      delete process.env.DEBUG
    }
  }
  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
    return process.env.DEBUG
  }
  /**
   * Init logic for `debug` instances.
   *
   * Create a new `inspectOpts` object in case `useColors` is set
   * differently for a particular `debug` instance.
   */

  function init(debug) {
    debug.inspectOpts = {}
    var keys = Object.keys(exports.inspectOpts)

    for (var i = 0; i < keys.length; i++) {
      debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]]
    }
  }

  module.exports = common(exports)
  var formatters = module.exports.formatters
  /**
   * Map %o to `util.inspect()`, all on a single line.
   */

  formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors
    return util.inspect(v, this.inspectOpts).replace(/\s*\n\s*/g, ' ')
  }
  /**
   * Map %O to `util.inspect()`, allowing multiple lines if needed.
   */

  formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors
    return util.inspect(v, this.inspectOpts)
  }
})
var node_1 = node.init
var node_2 = node.log
var node_3 = node.formatArgs
var node_4 = node.save
var node_5 = node.load
var node_6 = node.useColors
var node_7 = node.colors
var node_8 = node.inspectOpts

var src = createCommonjsModule(function(module) {
  /**
   * Detect Electron renderer / nwjs process, which is node, but we should
   * treat as a browser.
   */

  if (
    typeof process === 'undefined' ||
    process.type === 'renderer' ||
    process.browser === true ||
    process.__nwjs
  ) {
    module.exports = browser
  } else {
    module.exports = node
  }
})

var URL = url.URL
var Writable = stream.Writable
var debug = src('follow-redirects') // RFC7231§4.2.1: Of the request methods defined by this specification,
// the GET, HEAD, OPTIONS, and TRACE methods are defined to be safe.

var SAFE_METHODS = {
  GET: true,
  HEAD: true,
  OPTIONS: true,
  TRACE: true,
} // Create handlers that pass events from native requests

var eventHandlers = Object.create(null)
;['abort', 'aborted', 'error', 'socket', 'timeout'].forEach(function(event) {
  eventHandlers[event] = function(arg) {
    this._redirectable.emit(event, arg)
  }
}) // An HTTP(S) request that can be redirected

function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this)
  options.headers = options.headers || {}
  this._options = options
  this._ended = false
  this._ending = false
  this._redirectCount = 0
  this._redirects = []
  this._requestBodyLength = 0
  this._requestBodyBuffers = [] // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.

  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host
    }

    delete options.host
  } // Attach a callback if passed

  if (responseCallback) {
    this.on('response', responseCallback)
  } // React to responses of native requests

  var self = this

  this._onNativeResponse = function(response) {
    self._processResponse(response)
  } // Complete the URL object when necessary

  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf('?')

    if (searchPos < 0) {
      options.pathname = options.path
    } else {
      options.pathname = options.path.substring(0, searchPos)
      options.search = options.path.substring(searchPos)
    }
  } // Perform the first request

  this._performRequest()
}

RedirectableRequest.prototype = Object.create(Writable.prototype) // Writes buffered data to the current native request

RedirectableRequest.prototype.write = function(data, encoding, callback) {
  // Writing is not allowed if end has been called
  if (this._ending) {
    throw new Error('write after end')
  } // Validate input and shift parameters if necessary

  if (
    !(
      typeof data === 'string' ||
      (typeof data === 'object' && 'length' in data)
    )
  ) {
    throw new Error('data should be a string, Buffer or Uint8Array')
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
    this.emit(
      'error',
      new Error('Request body larger than maxBodyLength limit')
    )
    this.abort()
  }
} // Ends the current native request

RedirectableRequest.prototype.end = function(data, encoding, callback) {
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
    this.write(data, encoding, function() {
      self._ended = true
      currentRequest.end(null, null, callback)
    })
    this._ending = true
  }
} // Sets a header value on the current native request

RedirectableRequest.prototype.setHeader = function(name, value) {
  this._options.headers[name] = value

  this._currentRequest.setHeader(name, value)
} // Clears a header value on the current native request

RedirectableRequest.prototype.removeHeader = function(name) {
  delete this._options.headers[name]

  this._currentRequest.removeHeader(name)
} // Global timeout for all underlying requests

RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
  if (callback) {
    this.once('timeout', callback)
  }

  if (this.socket) {
    startTimer(this, msecs)
  } else {
    var self = this

    this._currentRequest.once('socket', function() {
      startTimer(self, msecs)
    })
  }

  this.once('response', clearTimer)
  this.once('error', clearTimer)
  return this
}

function startTimer(request, msecs) {
  clearTimeout(request._timeout)
  request._timeout = setTimeout(function() {
    request.emit('timeout')
  }, msecs)
}

function clearTimer() {
  clearTimeout(this._timeout)
} // Proxy all other public ClientRequest methods

;[
  'abort',
  'flushHeaders',
  'getHeader',
  'setNoDelay',
  'setSocketKeepAlive',
].forEach(function(method) {
  RedirectableRequest.prototype[method] = function(a, b) {
    return this._currentRequest[method](a, b)
  }
}) // Proxy all public ClientRequest properties
;['aborted', 'connection', 'socket'].forEach(function(property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function get() {
      return this._currentRequest[property]
    },
  })
}) // Executes the next native request (initial or redirect)

RedirectableRequest.prototype._performRequest = function() {
  // Load the native protocol
  var protocol = this._options.protocol
  var nativeProtocol = this._options.nativeProtocols[protocol]

  if (!nativeProtocol) {
    this.emit('error', new Error('Unsupported protocol ' + protocol))
    return
  } // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)

  if (this._options.agents) {
    var scheme = protocol.substr(0, protocol.length - 1)
    this._options.agent = this._options.agents[scheme]
  } // Create the native request

  var request = (this._currentRequest = nativeProtocol.request(
    this._options,
    this._onNativeResponse
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

RedirectableRequest.prototype._processResponse = function(response) {
  // Store the redirected response
  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: response.statusCode,
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
    response.statusCode >= 300 &&
    response.statusCode < 400
  ) {
    // Abort the current request
    this._currentRequest.removeAllListeners()

    this._currentRequest.on('error', noop)

    this._currentRequest.abort() // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).

    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit('error', new Error('Max redirects exceeded.'))
      return
    } // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe […],
    // since the user might not wish to redirect an unsafe request.
    // RFC7231§6.4.7: The 307 (Temporary Redirect) status code indicates
    // that the target resource resides temporarily under a different URI
    // and the user agent MUST NOT change the request method
    // if it performs an automatic redirection to that URI.

    var header
    var headers = this._options.headers

    if (
      response.statusCode !== 307 &&
      !(this._options.method in SAFE_METHODS)
    ) {
      this._options.method = 'GET' // Drop a possible entity and headers related to it

      this._requestBodyBuffers = []

      for (header in headers) {
        if (/^content-/i.test(header)) {
          delete headers[header]
        }
      }
    } // Drop the Host header, as the redirect might lead to a different host

    if (!this._isRedirect) {
      for (header in headers) {
        if (/^host$/i.test(header)) {
          delete headers[header]
        }
      }
    } // Perform the redirected request

    var redirectUrl = url.resolve(this._currentUrl, location)
    debug('redirecting to', redirectUrl)
    Object.assign(this._options, url.parse(redirectUrl))
    this._isRedirect = true

    this._performRequest() // Discard the remainder of the response to avoid waiting for data

    response.destroy()
  } else {
    // The response is not a redirect; return it as-is
    response.responseUrl = this._currentUrl
    response.redirects = this._redirects
    this.emit('response', response) // Clean up

    this._requestBodyBuffers = []
  }
} // Wraps the key/value object of protocols with redirect functionality

function wrap$1(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024,
  } // Wrap each protocol

  var nativeProtocols = {}
  Object.keys(protocols).forEach(function(scheme) {
    var protocol = scheme + ':'
    var nativeProtocol = (nativeProtocols[protocol] = protocols[scheme])
    var wrappedProtocol = (exports[scheme] = Object.create(nativeProtocol)) // Executes a request, following redirects

    wrappedProtocol.request = function(input, options, callback) {
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
        options
      )
      options.nativeProtocols = nativeProtocols
      assert.equal(options.protocol, protocol, 'protocol mismatch')
      debug('options', options)
      return new RedirectableRequest(options, callback)
    } // Executes a GET request, following redirects

    wrappedProtocol.get = function(input, options, callback) {
      var request = wrappedProtocol.request(input, options, callback)
      request.end()
      return request
    }
  })
  return exports
}
/* istanbul ignore next */

function noop() {}
/* empty */
// from https://github.com/nodejs/node/blob/master/lib/internal/url.js

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
} // Exports

var followRedirects = wrap$1({
  http: http,
  https: https,
})
var wrap_1 = wrap$1
followRedirects.wrap = wrap_1

var web_o = webOutgoing
web_o = Object.keys(web_o).map(function(pass) {
  return web_o[pass]
})
var nativeAgents = {
  http: http,
  https: https,
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
    var encrypted = req.isSpdy || common_1.hasEncryptedConnection(req)
    var values = {
      for: req.connection.remoteAddress || req.socket.remoteAddress,
      port: common_1.getPort(req),
      proto: encrypted ? 'https' : 'http',
    }
    ;['for', 'port', 'proto'].forEach(function(header) {
      req.headers['x-forwarded-' + header] =
        (req.headers['x-forwarded-' + header] || '') +
        (req.headers['x-forwarded-' + header] ? ',' : '') +
        values[header]
    })
    req.headers['x-forwarded-host'] = req.headers['host'] || ''
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
      var forwardReq = (options.forward.protocol === 'https:'
        ? https
        : http
      ).request(
        common_1.setupOutgoing(options.ssl || {}, options, req, 'forward')
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

    var proxyReq = (options.target.protocol === 'https:'
      ? https
      : http
    ).request(common_1.setupOutgoing(options.ssl || {}, options, req)) // Enable developers to modify the proxyReq before headers are sent

    proxyReq.on('socket', function(socket) {
      if (server) {
        server.emit('proxyReq', proxyReq, req, res, options)
      }
    }) // allow outgoing socket to timeout so that we could
    // show an error page at the initial request

    if (options.proxyTimeout) {
      proxyReq.setTimeout(options.proxyTimeout, function() {
        proxyReq.abort()
      })
    } // Ensure we abort proxy if request is aborted

    req.on('aborted', function() {
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
    proxyReq.on('response', function(proxyRes) {
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
        proxyRes.on('end', function() {
          if (server) server.emit('end', req, res, proxyRes)
        }) // We pipe to the response unless its expected to be handled by the user

        if (!options.selfHandleResponse) proxyRes.pipe(res)
      } else {
        if (server) server.emit('end', req, res, proxyRes)
      }
    })
  },
}

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
      port: common_1.getPort(req),
      proto: common_1.hasEncryptedConnection(req) ? 'wss' : 'ws',
    }
    ;['for', 'port', 'proto'].forEach(function(header) {
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
    var createHttpHeader = function createHttpHeader(line, headers) {
      return (
        Object.keys(headers)
          .reduce(
            function(head, key) {
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
            [line]
          )
          .join('\r\n') + '\r\n\r\n'
      )
    }

    common_1.setupSocket(socket)
    if (head && head.length) socket.unshift(head)
    var proxyReq = (common_1.isSSL.test(options.target.protocol)
      ? https
      : http
    ).request(common_1.setupOutgoing(options.ssl || {}, options, req)) // Enable developers to modify the proxyReq before headers are sent

    if (server) {
      server.emit('proxyReqWs', proxyReq, req, socket, options, head)
    } // Error Handler

    proxyReq.on('error', onOutgoingError)
    proxyReq.on('response', function(res) {
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
            res.headers
          )
        )
        res.pipe(socket)
      }
    })
    proxyReq.on('upgrade', function(proxyRes, proxySocket, proxyHead) {
      proxySocket.on('error', onOutgoingError) // Allow us to listen when the websocket has completed

      proxySocket.on('end', function() {
        server.emit('close', proxyRes, proxySocket, proxyHead)
      }) // The pipe below will end proxySocket if socket closes cleanly, but not
      // if it errors (eg, vanishes from the net and starts returning
      // EHOSTUNREACH). We need to do that explicitly.

      socket.on('error', function() {
        proxySocket.end()
      })
      common_1.setupSocket(proxySocket)
      if (proxyHead && proxyHead.length) proxySocket.unshift(proxyHead) //
      // Remark: Handle writing the headers to the socket when switching protocols
      // Also handles when a header is an array
      //

      socket.write(
        createHttpHeader('HTTP/1.1 101 Switching Protocols', proxyRes.headers)
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

var httpProxy_1 = createCommonjsModule(function(module) {
  var httpProxy = module.exports,
    extend = util._extend,
    parse_url = url.parse
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
    return function(options) {
      return function(
        req,
        res
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

        ;['target', 'forward'].forEach(function(e) {
          if (typeof requestOptions[e] === 'string')
            requestOptions[e] = parse_url(requestOptions[e])
        })

        if (!requestOptions.target && !requestOptions.forward) {
          return this.emit(
            'error',
            new Error('Must provide a proper URL as target')
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
    eventemitter3.call(this)
    options = options || {}
    options.prependPath = options.prependPath === false ? false : true
    this.web = this.proxyRequest = createRightProxy('web')(options)
    this.ws = this.proxyWebsocketRequest = createRightProxy('ws')(options)
    this.options = options
    this.webPasses = Object.keys(webIncoming).map(function(pass) {
      return webIncoming[pass]
    })
    this.wsPasses = Object.keys(wsIncoming).map(function(pass) {
      return wsIncoming[pass]
    })
    this.on('error', this.onError, this)
  }

  util.inherits(ProxyServer, eventemitter3)

  ProxyServer.prototype.onError = function(err) {
    //
    // Remark: Replicate node core behavior using EE3
    // so we force people to handle their own errors
    //
    if (this.listeners('error').length === 1) {
      throw err
    }
  }

  ProxyServer.prototype.listen = function(port, hostname) {
    var self = this,
      closure = function closure(req, res) {
        self.web(req, res)
      }

    this._server = this.options.ssl
      ? https.createServer(this.options.ssl, closure)
      : http.createServer(closure)

    if (this.options.ws) {
      this._server.on('upgrade', function(req, socket, head) {
        self.ws(req, socket, head)
      })
    }

    this._server.listen(port, hostname)

    return this
  }

  ProxyServer.prototype.close = function(callback) {
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

  ProxyServer.prototype.before = function(type, passName, callback) {
    if (type !== 'ws' && type !== 'web') {
      throw new Error('type must be `web` or `ws`')
    }

    var passes = type === 'ws' ? this.wsPasses : this.webPasses,
      i = false
    passes.forEach(function(v, idx) {
      if (v.name === passName) i = idx
    })
    if (i === false) throw new Error('No such pass')
    passes.splice(i, 0, callback)
  }

  ProxyServer.prototype.after = function(type, passName, callback) {
    if (type !== 'ws' && type !== 'web') {
      throw new Error('type must be `web` or `ws`')
    }

    var passes = type === 'ws' ? this.wsPasses : this.webPasses,
      i = false
    passes.forEach(function(v, idx) {
      if (v.name === passName) i = idx
    })
    if (i === false) throw new Error('No such pass')
    passes.splice(i++, 0, callback)
  }
})

var ProxyServer = httpProxy_1.Server
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
   *    hostRewrite: rewrites the location hostname on (301/302/307/308) redirects, Default: null.
   *    autoRewrite: rewrites the location host/port on (301/302/307/308) redirects based on requested host/port. Default: false.
   *    protocolRewrite: rewrites the location protocol on (301/302/307/308) redirects to 'http' or 'https'. Default: null.
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

var httpProxy = ProxyServer

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

var httpProxy$1 = httpProxy

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

var parseUrl = url.parse

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
  file.forEach(function(file) {
    if (!fs.existsSync(file)) {
      return null
    }

    var content = fs.readFileSync(file, 'utf-8')
    var lines = content.split(/\r\n|\n/)
    var rrule = /^(rewrite|redirect|proxy)\s+([^\s]+)\s+([^\s]+)$/i
    lines.forEach(function(line) {
      var m = rrule.exec(line)

      if (!m) {
        return
      }

      rules.push(new Ruler(m[1].toLowerCase(), new RegExp(m[2], 'i'), m[3]))
    })
  })
  return {
    match: function match(url) {
      var found
      var arr = [url.path, url.pathname]
      rules.every(function(ruler) {
        arr.every(function(url) {
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

var rewrite = function rewrite(options) {
  var file = options.rewrite_file
  var parser // todo cache the file.

  function lazyload() {
    // 每次都加载好了，server.conf 有可能经常改动。
    parser =
      /*parser || */
      rewriteParser(file)
  }

  var proxy = httpProxy$1.createProxyServer({
    changeOrigin: true,
    autoRewrite: true,
  })
  proxy.on('error', function(error, req, res) {
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
  return function(req, res, next) {
    lazyload()
    var url = parseUrl(req.url)
    var ruler = parser && parser.match(url)

    if (ruler) {
      var to = ruler.to.replace(/\$(\d+)/g, function(all, index) {
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
              '</a>\n'
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

function mixin(a, b) {
  if (a && b) {
    for (var key in b) {
      a[key] = b[key]
    }
  }

  return a
}

var preview = function preview(options) {
  var rpage = /^\/([\w0-9_\-]+)\/page\/(.*)$/i
  var tplroot = path$1.resolve(options.view_path)
  var dirs = Array.isArray(options.data_path)
    ? options.data_path
    : [options.data_path]
  dirs = dirs.map(function(dir) {
    return path$1.resolve(dir)
  })

  function previewPage(ns, page, req, res, next) {
    var tplfile, jsonfile, jsfile, m
    var data = {}
    var jsreturn = null
    var rendered = false
    m = /^(.*)\.tpl$/i.exec(page)

    if (m) {
      page = m[1]
    }

    tplfile = path$1.join(tplroot, ns, page + '.tpl')

    if (!fs.existsSync(tplfile)) {
      return next()
    }

    dirs.every(function(dir) {
      var filepath = path$1.join(dir, ns, 'page', page + '.json')

      if (fs.existsSync(filepath)) {
        jsonfile = filepath
      }

      return !jsonfile
    })

    if (jsonfile) {
      try {
        delete commonjsRequire.cache[commonjsRequire.resolve(jsonfile)]
        data = commonjsRequire(jsonfile)
      } catch (err) {
        data = {}
      }
    }

    render = function render(locals) {
      if (rendered) {
        return
      }

      rendered = true
      var tpl = ns + '/' + page + '.tpl'
      locals && mixin(data, locals)
      res.render(tpl, data)
    }

    jsfile = path$1.join(dataroot, ns, 'page', page + '.js')

    if (fs.existsSync(jsfile)) {
      delete commonjsRequire.cache[commonjsRequire.resolve(jsfile)]
      res.locals = res.locals || {}
      res.locals = mixin(res.locals, data)
      jsreturn = commonjsRequire()(req, res, render)
    } else {
      render(data)
    }
  }

  return function(req, res, next) {
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

var script = function script(options) {
  var dataroot = options.data_path
  var rpage = /^\/(?:test|mock)\/(.*\.(js|json))(?:$|\?)/i

  function execScript(page, type, req, res, next) {
    var dirs = Array.isArray(dataroot) ? dataroot : [dataroot]
    var file
    dirs.every(function(dir) {
      var filepath = path$1.join(dir, page)

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
        delete commonjsRequire.cache[commonjsRequire.resolve(file)]
        commonjsRequire(file)(req, res, next)
      } catch (err) {
        next(err)
      }
    } else {
      fs.readFile(file, function(err, buf) {
        if (err) return next(err)
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Content-Length': buf.length,
        })
        res.end(buf)
      })
    }
  }

  return function(req, res, next) {
    var url = req.url
    var match = rpage.exec(url)

    if (match) {
      execScript(match[1], match[2], req, res, next)
    } else {
      next()
    }
  }
}

function mock(root) {
  var options = {
    view_path: '',
    // 避免报错。
    rewrite_file: [
      path$1.join(root, 'server.conf'),
      path$1.join(root, 'config', 'server.conf'),
      path$1.join(root, 'mock', 'server.conf'),
    ],
    data_path: [path$1.join(root, 'test'), path$1.join(root, 'mock')],
  }
  return function(request, response, next) {
    ;[
      rewrite(options),
      bodyParser.urlencoded({
        extended: false,
      }),
      bodyParser.json(),
      preview(options),
      script(options),
    ].reduceRight(function(next, middlewave) {
      return function() {
        middlewave(request, response, next)
      }
    }, next)()
  }
}

function getMiddleware(name, handler) {
  return function() {
    return {
      route: '',
      handle: handler.apply(void 0, arguments),
      id: 'Browsersync '.concat(name, ' Middleware'),
    }
  }
}

var middleware = {
  logger: getMiddleware('Logger', morgan),
  mock: getMiddleware('Mock', mock),
  directory: function directory(root) {
    return getMiddleware('Server Directory', serveDirectory)(
      root,
      serveDirectoryThemeOcticons
    )
  },
}

var mock$1 = middleware.mock,
  logger = middleware.logger,
  directory = middleware.directory
var defaultOptions = merge({}, defaultConfig, {
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
  } catch (_) {}

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
    path$1.resolve(argv.context, argv.bsConfig || bs.instance.config.userFile)
  )
  var config = merge({}, defaultOptions, userConfig, overrideOptions, {
    server: {
      baseDir: argv.root,
    },
    port: argv.port, // https: argv.https
  })
  config.middleware = parseMiddleware(config.middleware) // logger

  config.middleware.push(logger('short')) // mock

  config.middleware.push(mock$1(argv.root)) // serveDirectory

  if (config.server && config.server.directory) {
    config.middleware.push(directory(argv.root))
    config.server.directory = false
  }

  return config
}

var argv = yargs.argv
startServer(argv)

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
  return function() {
    console.log(
      'Listening on %s://127.0.0.1:%d',
      config.https ? 'https' : 'http',
      config.port
    )
  }
}

function watch(bs, root) {
  return function(event, file) {
    var relativePath = path$1.relative(root, file)

    if (
      !relativePath ||
      relativePath === 'server.log' ||
      /(^|[/\\])[._]./.test(relativePath)
    ) {
      return
    }

    bs.reload(file)
    logEvent(event, relativePath)
  }
}

function signalTerminate(bs) {
  process.on('SIGTERM', function() {
    console.log('Recive quit signal in worker %s.', process.pid)
    bs.exit()
  })
}

function replaceScriptTag(bs) {
  // replace scriptTag template with mine
  bs.instance.config.templates.scriptTag = path$1.join(
    __dirname,
    'templates/script-tags.tmpl'
  )
}

function startServer(argv) {
  var bs = browserSync.create()
  var bsConfig = getConfig(bs, argv)
  bs.exit()
  bs.init(bsConfig, onInit(bsConfig))
  bs.watch(argv.root, watch(bs, argv.root))
  replaceScriptTag(bs)
  signalTerminate(bs)
}
