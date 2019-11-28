'use strict'

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var path$1 = require('path')
var util = _interopDefault(require('util'))
var sass = _interopDefault(require('node-sass'))
var fs = require('fs')
var cartesianProduct = _interopDefault(require('fast-cartesian-product'))

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

var document = global_1.document // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement)

var documentCreateElement = function documentCreateElement(it) {
  return EXISTS ? document.createElement(it) : {}
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

var SPECIES = wellKnownSymbol('species') // `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor

var speciesConstructor = function speciesConstructor(O, defaultConstructor) {
  var C = anObject(O).constructor
  var S
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined
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

var SPECIES$1 = wellKnownSymbol('species') // `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate

var arraySpeciesCreate = function arraySpeciesCreate(originalArray, length) {
  var C

  if (isArray(originalArray)) {
    C = originalArray.constructor // cross-realm fallback

    if (typeof C == 'function' && (C === Array || isArray(C.prototype)))
      C = undefined
    else if (isObject(C)) {
      C = C[SPECIES$1]
      if (C === null) C = undefined
    }
  }

  return new (C === undefined ? Array : C)(length === 0 ? 0 : length)
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
var MAX_SAFE_INTEGER = 0x1fffffffffffff
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

      if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
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
var FORCED =
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

if (FORCED) {
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
var FORCED$1 = !descriptors || FAILS_ON_PRIMITIVES$5 // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

_export(
  {
    target: 'Object',
    stat: true,
    forced: FORCED$1,
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

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable')
var MAX_SAFE_INTEGER$1 = 0x1fffffffffffff
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

var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT // `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species

_export(
  {
    target: 'Array',
    proto: true,
    forced: FORCED$2,
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
          if (n + len > MAX_SAFE_INTEGER$1)
            throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED)

          for (k = 0; k < len; k++, n++) {
            if (k in E) createProperty(A, n, E[k])
          }
        } else {
          if (n >= MAX_SAFE_INTEGER$1)
            throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED)
          createProperty(A, n++, E)
        }
      }

      A.length = n
      return A
    },
  }
)

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

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object)

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object)
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })
    keys.push.apply(keys, symbols)
  }

  return keys
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}

    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key])
      })
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
    } else {
      ownKeys$1(Object(source)).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        )
      })
    }
  }

  return target
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  )
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  )
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++)
      arr2[i] = arr[i]

    return arr2
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === '[object Arguments]'
  )
    return Array.from(iter)
}

function _iterableToArrayLimit(arr, i) {
  if (
    !(
      Symbol.iterator in Object(arr) ||
      Object.prototype.toString.call(arr) === '[object Arguments]'
    )
  ) {
    return
  }

  var _arr = []
  var _n = true
  var _d = false
  var _e = undefined

  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
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

function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance')
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance')
}

var propertyIsEnumerable = objectPropertyIsEnumerable.f // `Object.{ entries, values }` methods implementation

var createMethod$4 = function createMethod(TO_ENTRIES) {
  return function(it) {
    var O = toIndexedObject(it)
    var keys = objectKeys(O)
    var length = keys.length
    var i = 0
    var result = []
    var key

    while (length > i) {
      key = keys[i++]

      if (!descriptors || propertyIsEnumerable.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key])
      }
    }

    return result
  }
}

var objectToArray = {
  // `Object.entries` method
  // https://tc39.github.io/ecma262/#sec-object.entries
  entries: createMethod$4(true),
  // `Object.values` method
  // https://tc39.github.io/ecma262/#sec-object.values
  values: createMethod$4(false),
}

var $entries = objectToArray.entries // `Object.entries` method
// https://tc39.github.io/ecma262/#sec-object.entries

_export(
  {
    target: 'Object',
    stat: true,
  },
  {
    entries: function entries(O) {
      return $entries(O)
    },
  }
)

var defineProperty$6 = objectDefineProperty.f
var fastKey = internalMetadata.fastKey
var setInternalState$4 = internalState.set
var internalStateGetterFor$1 = internalState.getterFor
var collectionStrong = {
  getConstructor: function getConstructor(
    wrapper,
    CONSTRUCTOR_NAME,
    IS_MAP,
    ADDER
  ) {
    var C = wrapper(function(that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME)
      setInternalState$4(that, {
        type: CONSTRUCTOR_NAME,
        index: objectCreate(null),
        first: undefined,
        last: undefined,
        size: 0,
      })
      if (!descriptors) that.size = 0
      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP)
    })
    var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME)

    var define = function define(that, key, value) {
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
        if (descriptors) state.size++
        else that.size++ // add to index

        if (index !== 'F') state.index[index] = entry
      }

      return that
    }

    var getEntry = function getEntry(that, key) {
      var state = getInternalState(that) // fast case

      var index = fastKey(key)
      var entry
      if (index !== 'F') return state.index[index] // frozen object case

      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry
      }
    }

    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
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
        if (descriptors) state.size = 0
        else that.size = 0
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      delete: function _delete(key) {
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
          if (descriptors) state.size--
          else that.size--
        }

        return !!entry
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(
        callbackfn
        /* , that = undefined */
      ) {
        var state = getInternalState(this)
        var boundFunction = bindContext(
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined,
          3
        )
        var entry

        while ((entry = entry ? entry.next : state.first)) {
          boundFunction(entry.value, entry.key, this) // revert to the last existing entry

          while (entry && entry.removed) {
            entry = entry.previous
          }
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(this, key)
      },
    })
    redefineAll(
      C.prototype,
      IS_MAP
        ? {
            // 23.1.3.6 Map.prototype.get(key)
            get: function get(key) {
              var entry = getEntry(this, key)
              return entry && entry.value
            },
            // 23.1.3.9 Map.prototype.set(key, value)
            set: function set(key, value) {
              return define(this, key === 0 ? 0 : key, value)
            },
          }
        : {
            // 23.2.3.1 Set.prototype.add(value)
            add: function add(value) {
              return define(this, (value = value === 0 ? 0 : value), value)
            },
          }
    )
    if (descriptors)
      defineProperty$6(C.prototype, 'size', {
        get: function get() {
          return getInternalState(this).size
        },
      })
    return C
  },
  setStrong: function setStrong(C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator'
    var getInternalCollectionState = internalStateGetterFor$1(CONSTRUCTOR_NAME)
    var getInternalIteratorState = internalStateGetterFor$1(ITERATOR_NAME) // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11

    defineIterator(
      C,
      CONSTRUCTOR_NAME,
      function(iterated, kind) {
        setInternalState$4(this, {
          type: ITERATOR_NAME,
          target: iterated,
          state: getInternalCollectionState(iterated),
          kind: kind,
          last: undefined,
        })
      },
      function() {
        var state = getInternalIteratorState(this)
        var kind = state.kind
        var entry = state.last // revert to the last existing entry

        while (entry && entry.removed) {
          entry = entry.previous
        } // get next entry

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
      true
    ) // add [@@species], 23.1.2.2, 23.2.2.2

    setSpecies(CONSTRUCTOR_NAME)
  },
}

// https://tc39.github.io/ecma262/#sec-set-objects

var es_set = collection(
  'Set',
  function(init) {
    return function Set() {
      return init(this, arguments.length ? arguments[0] : undefined)
    }
  },
  collectionStrong
)

var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f
var nativeStartsWith = ''.startsWith
var min$5 = Math.min
var CORRECT_IS_REGEXP_LOGIC = correctIsRegexpLogic('startsWith') // https://github.com/zloirock/core-js/pull/702

var MDN_POLYFILL_BUG =
  !CORRECT_IS_REGEXP_LOGIC &&
  !!(function() {
    var descriptor = getOwnPropertyDescriptor$2(String.prototype, 'startsWith')
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

var collectionAddAll = function collectionAddAll /* ...elements */() {
  var set = anObject(this)
  var adder = aFunction$1(set.add)

  for (var k = 0, len = arguments.length; k < len; k++) {
    adder.call(set, arguments[k])
  }

  return set
}

// https://github.com/tc39/proposal-collection-methods

_export(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: isPure,
  },
  {
    addAll: function addAll /* ...elements */() {
      return collectionAddAll.apply(this, arguments)
    },
  }
)

// https://github.com/tc39/proposal-collection-methods

_export(
  {
    target: 'Set',
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

// https://github.com/tc39/proposal-set-methods

_export(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: isPure,
  },
  {
    difference: function difference(iterable) {
      var set = anObject(this)
      var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set)
      var remover = aFunction$1(newSet['delete'])
      iterate_1(iterable, function(value) {
        remover.call(newSet, value)
      })
      return newSet
    },
  }
)

// https://github.com/tc39/proposal-collection-methods

_export(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: isPure,
  },
  {
    filter: function filter(
      callbackfn
      /* , thisArg */
    ) {
      var set = anObject(this)
      var iterator = getSetIterator(set)
      var boundFunction = bindContext(
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined,
        3
      )
      var newSet = new (speciesConstructor(set, getBuiltIn('Set')))()
      var adder = aFunction$1(newSet.add)
      iterate_1(
        iterator,
        function(value) {
          if (boundFunction(value, value, set)) adder.call(newSet, value)
        },
        undefined,
        false,
        true
      )
      return newSet
    },
  }
)

// https://github.com/tc39/proposal-collection-methods

_export(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: isPure,
  },
  {
    find: function find(
      callbackfn
      /* , thisArg */
    ) {
      var set = anObject(this)
      var iterator = getSetIterator(set)
      var boundFunction = bindContext(
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined,
        3
      )
      return iterate_1(
        iterator,
        function(value) {
          if (boundFunction(value, value, set)) return iterate_1.stop(value)
        },
        undefined,
        false,
        true
      ).result
    },
  }
)

// https://github.com/tc39/proposal-set-methods

_export(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: isPure,
  },
  {
    intersection: function intersection(iterable) {
      var set = anObject(this)
      var newSet = new (speciesConstructor(set, getBuiltIn('Set')))()
      var hasCheck = aFunction$1(set.has)
      var adder = aFunction$1(newSet.add)
      iterate_1(iterable, function(value) {
        if (hasCheck.call(set, value)) adder.call(newSet, value)
      })
      return newSet
    },
  }
)

// https://tc39.github.io/proposal-set-methods/#Set.prototype.isDisjointFrom

_export(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: isPure,
  },
  {
    isDisjointFrom: function isDisjointFrom(iterable) {
      var set = anObject(this)
      var hasCheck = aFunction$1(set.has)
      return !iterate_1(iterable, function(value) {
        if (hasCheck.call(set, value) === true) return iterate_1.stop()
      }).stopped
    },
  }
)

var getIterator = function getIterator(it) {
  var iteratorMethod = getIteratorMethod(it)

  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable')
  }

  return anObject(iteratorMethod.call(it))
}

// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSubsetOf

_export(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: isPure,
  },
  {
    isSubsetOf: function isSubsetOf(iterable) {
      var iterator = getIterator(this)
      var otherSet = anObject(iterable)
      var hasCheck = otherSet.has

      if (typeof hasCheck != 'function') {
        otherSet = new (getBuiltIn('Set'))(iterable)
        hasCheck = aFunction$1(otherSet.has)
      }

      return !iterate_1(
        iterator,
        function(value) {
          if (hasCheck.call(otherSet, value) === false) return iterate_1.stop()
        },
        undefined,
        false,
        true
      ).stopped
    },
  }
)

// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSupersetOf

_export(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: isPure,
  },
  {
    isSupersetOf: function isSupersetOf(iterable) {
      var set = anObject(this)
      var hasCheck = aFunction$1(set.has)
      return !iterate_1(iterable, function(value) {
        if (hasCheck.call(set, value) === false) return iterate_1.stop()
      }).stopped
    },
  }
)

// https://github.com/tc39/proposal-collection-methods

_export(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: isPure,
  },
  {
    join: function join(separator) {
      var set = anObject(this)
      var iterator = getSetIterator(set)
      var sep = separator === undefined ? ',' : String(separator)
      var result = []
      iterate_1(iterator, result.push, result, false, true)
      return result.join(sep)
    },
  }
)

// https://github.com/tc39/proposal-collection-methods

_export(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: isPure,
  },
  {
    map: function map(
      callbackfn
      /* , thisArg */
    ) {
      var set = anObject(this)
      var iterator = getSetIterator(set)
      var boundFunction = bindContext(
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined,
        3
      )
      var newSet = new (speciesConstructor(set, getBuiltIn('Set')))()
      var adder = aFunction$1(newSet.add)
      iterate_1(
        iterator,
        function(value) {
          adder.call(newSet, boundFunction(value, value, set))
        },
        undefined,
        false,
        true
      )
      return newSet
    },
  }
)

// https://github.com/tc39/proposal-collection-methods

_export(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: isPure,
  },
  {
    reduce: function reduce(
      callbackfn
      /* , initialValue */
    ) {
      var set = anObject(this)
      var iterator = getSetIterator(set)
      var noInitial = arguments.length < 2
      var accumulator = noInitial ? undefined : arguments[1]
      aFunction$1(callbackfn)
      iterate_1(
        iterator,
        function(value) {
          if (noInitial) {
            noInitial = false
            accumulator = value
          } else {
            accumulator = callbackfn(accumulator, value, value, set)
          }
        },
        undefined,
        false,
        true
      )
      if (noInitial)
        throw TypeError('Reduce of empty set with no initial value')
      return accumulator
    },
  }
)

// https://github.com/tc39/proposal-collection-methods

_export(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: isPure,
  },
  {
    some: function some(
      callbackfn
      /* , thisArg */
    ) {
      var set = anObject(this)
      var iterator = getSetIterator(set)
      var boundFunction = bindContext(
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined,
        3
      )
      return iterate_1(
        iterator,
        function(value) {
          if (boundFunction(value, value, set)) return iterate_1.stop()
        },
        undefined,
        false,
        true
      ).stopped
    },
  }
)

// https://github.com/tc39/proposal-set-methods

_export(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: isPure,
  },
  {
    symmetricDifference: function symmetricDifference(iterable) {
      var set = anObject(this)
      var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set)
      var remover = aFunction$1(newSet['delete'])
      var adder = aFunction$1(newSet.add)
      iterate_1(iterable, function(value) {
        remover.call(newSet, value) || adder.call(newSet, value)
      })
      return newSet
    },
  }
)

// https://github.com/tc39/proposal-set-methods

_export(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: isPure,
  },
  {
    union: function union(iterable) {
      var set = anObject(this)
      var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set)
      iterate_1(iterable, aFunction$1(newSet.add), newSet)
      return newSet
    },
  }
)

var getSetIterator = function(it) {
  // eslint-disable-next-line no-undef
  return Set.prototype.values.call(it)
}

// https://github.com/tc39/proposal-collection-methods

_export(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: isPure,
  },
  {
    every: function every(
      callbackfn
      /* , thisArg */
    ) {
      var set = anObject(this)
      var iterator = getSetIterator(set)
      var boundFunction = bindContext(
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined,
        3
      )
      return !iterate_1(
        iterator,
        function(value) {
          if (!boundFunction(value, value, set)) return iterate_1.stop()
        },
        undefined,
        false,
        true
      ).stopped
    },
  }
)

var isPartial = function isPartial(file) {
  return file[0] === '_'
}

var extensions = ['scss', 'css', 'sass'].map(function(extension) {
  return '.'.concat(extension)
})

var hasExtension = function hasExtension(file) {
  return extensions.includes(path$1.extname(file))
}

var unique = function unique(array) {
  return _toConsumableArray(new Set(array))
}

function getDirectories(directories, file) {
  directories = directories.map(function(directory) {
    return path$1.join(directory, file)
  })

  if (path$1.isAbsolute(file)) {
    directories.push(file)
  }

  return directories.map(path$1.dirname)
}

function possibleFileNames(file) {
  var fileName = path$1.basename(file)
  var fileNames = [fileName]

  if (!isPartial(fileName)) {
    fileNames.unshift('_'.concat(fileName))
  }

  return hasExtension(fileName)
    ? fileNames
    : cartesianProduct([fileNames, extensions]).map(function(_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          fileName = _ref2[0],
          extension = _ref2[1]

        return fileName + extension
      })
}

function getFiles(directories, file) {
  directories = getDirectories(directories, file)
  var fileNames = possibleFileNames(file)
  var files = cartesianProduct([directories, fileNames]).map(function(_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      directory = _ref4[0],
      fileName = _ref4[1]

    return path$1.join(directory, fileName)
  })
  return unique(files)
}

function resolveInDirectories(_ref5) {
  var includePaths = _ref5.includePaths,
    _ref5$cache = _ref5.cache,
    cache = _ref5$cache === void 0 ? {} : _ref5$cache,
    _ref5$alias = _ref5.alias,
    alias = _ref5$alias === void 0 ? {} : _ref5$alias
  return function(file, previous) {
    var cacheKey = ''.concat(path$1.normalize(previous), '|').concat(file)

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
          paths: [process.cwd()],
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
          path = _Object$entries$_i[1]

        if (file.startsWith(aliasName)) {
          file = file.replace(aliasName, ''.concat(path, '/'))
        }
      }

      files = getFiles(
        [path$1.dirname(previous)].concat(_toConsumableArray(includePaths), [
          process.cwd(),
        ]),
        file
      )
    }

    var results = files
      .map(function(file) {
        try {
          return {
            file: file,
            contents: fs.readFileSync(file, 'utf8'),
          }
        } catch (error) {
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
            ". It's not clear which file to import. \n found files:"
          )
          .concat(
            results
              .map(function(_ref6) {
                var file = _ref6.file
                return file
              })
              .join('\n')
          )
      )
    }

    if (results.length === 0) {
      return new Error(
        'importing '
          .concat(file, ' from ')
          .concat(
            previous,
            '. File to import not found or unreadable. \n tried files:'
          )
          .concat(
            results
              .map(function(_ref7) {
                var file = _ref7.file
                return file
              })
              .join('\n')
          )
      )
    }

    var result = results[0]
    cache[cacheKey] = result
    return result
  }
}

var info = {
  description: 'A fis plugin to parse sass with latest node-sass.',
  keywords: ['scss', 'sass', 'node-sass'],
  dependencies: ['node-sass', 'fast-cartesian-product'],
  options: {
    outputStyle: 'expanded',
    sourceMapContents: true,
    sourceMap: false,
    omitSourceMapUrl: false,
  },
  links: {
    sass: 'http://sass-lang.com/',
    'node-sass': 'https://github.com/sass/node-sass',
  },
}
var info_4 = info.options

var _global = global,
  fis = _global.fis
var PROJECT_ROOT = fis.project.getProjectPath()

function normalizeIncludePath(directories) {
  return directories.reduce(function(all, directory) {
    var directories_ = []

    if (path$1.isAbsolute(directory) && directory[0] !== '/') {
      directories_.push(directory)
    } else {
      directories_.push(directory)
      directories_.push(path$1.join(PROJECT_ROOT, directory))
      directories_.push(path$1.join(process.cwd(), directory))
    }

    return [].concat(_toConsumableArray(all), directories_)
  }, [])
}

module.exports = function(content, file, config) {
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
  includePaths = [path$1.dirname(file.realpath)].concat(
    _toConsumableArray(normalizeIncludePath(includePaths)),
    [PROJECT_ROOT]
  )
  var sourceMapFile

  if (sourceMap) {
    sourceMapContents = true
    sourceMapFile = fis.file.wrap(
      ''
        .concat(file.dirname, '/')
        .concat(file.filename)
        .concat(file.rExt, '.map')
    )
    sourceMap = sourceMapFile.getUrl(
      fis.compile.settings.hash,
      fis.compile.settings.domain
    )
  }

  var _importer = resolveInDirectories({
    includePaths: includePaths,
    alias: _objectSpread2(
      {
        '@/': PROJECT_ROOT,
      },
      alias
    ),
  })

  var options = _objectSpread2({}, config, {
    includePaths: includePaths,
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
  })

  delete options.outFile
  var result

  try {
    result = sass.renderSync(options)
  } catch (error) {
    fis.log.error(
      util.format(
        '%s'.red + ' [`%s` %s:%s]'.yellow,
        error.message,
        error.file,
        error.line,
        error.column
      )
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

module.exports.defaultOptions = info_4
