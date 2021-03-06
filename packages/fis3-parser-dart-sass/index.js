'use strict'

var path$2 = require('path')
var url = require('url')
var util = require('util')
var sass = require('sass')
var fs = require('fs')
var cartesianProduct = require('fast-cartesian-product')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {default: e}
}

var path__default = /*#__PURE__*/ _interopDefaultLegacy(path$2)
var sass__default = /*#__PURE__*/ _interopDefaultLegacy(sass)
var fs__default = /*#__PURE__*/ _interopDefaultLegacy(fs)
var cartesianProduct__default =
  /*#__PURE__*/ _interopDefaultLegacy(cartesianProduct)

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
          Object.getOwnPropertyDescriptor(source, key)
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

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  )
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  )
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr)
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr
}

function _iterableToArray(iter) {
  if (
    (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
    iter['@@iterator'] != null
  )
    return Array.from(iter)
}

function _iterableToArrayLimit(arr, i) {
  var _i =
    arr &&
    ((typeof Symbol !== 'undefined' && arr[Symbol.iterator]) ||
      arr['@@iterator'])

  if (_i == null) return
  var _arr = []
  var _n = true
  var _d = false

  var _s, _e

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
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

function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  )
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  )
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

var global$e = // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  (function () {
    return this
  })() ||
  Function('return this')()

var objectGetOwnPropertyDescriptor = {}

var fails$f = function (exec) {
  try {
    return !!exec()
  } catch (error) {
    return true
  }
}

var fails$e = fails$f // Detect IE8's incomplete defineProperty implementation

var descriptors = !fails$e(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return (
    Object.defineProperty({}, 1, {
      get: function () {
        return 7
      },
    })[1] != 7
  )
})

var objectPropertyIsEnumerable = {}

var $propertyIsEnumerable = {}.propertyIsEnumerable // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor // Nashorn ~ JDK8 bug

var NASHORN_BUG =
  getOwnPropertyDescriptor$2 &&
  !$propertyIsEnumerable.call(
    {
      1: 2,
    },
    1
  ) // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

objectPropertyIsEnumerable.f = NASHORN_BUG
  ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor$2(this, V)
      return !!descriptor && descriptor.enumerable
    }
  : $propertyIsEnumerable

var createPropertyDescriptor$4 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value,
  }
}

var toString$1 = {}.toString

var classofRaw$1 = function (it) {
  return toString$1.call(it).slice(8, -1)
}

var fails$d = fails$f
var classof$7 = classofRaw$1
var split = ''.split // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails$d(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0)
})
  ? function (it) {
      return classof$7(it) == 'String' ? split.call(it, '') : Object(it)
    }
  : Object

// https://tc39.es/ecma262/#sec-requireobjectcoercible

var requireObjectCoercible$7 = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it)
  return it
}

var IndexedObject$3 = indexedObject
var requireObjectCoercible$6 = requireObjectCoercible$7

var toIndexedObject$7 = function (it) {
  return IndexedObject$3(requireObjectCoercible$6(it))
}

var isObject$c = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function'
}

var isObject$b = isObject$c // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string

var toPrimitive$3 = function (input, PREFERRED_STRING) {
  if (!isObject$b(input)) return input
  var fn, val
  if (
    PREFERRED_STRING &&
    typeof (fn = input.toString) == 'function' &&
    !isObject$b((val = fn.call(input)))
  )
    return val
  if (
    typeof (fn = input.valueOf) == 'function' &&
    !isObject$b((val = fn.call(input)))
  )
    return val
  if (
    !PREFERRED_STRING &&
    typeof (fn = input.toString) == 'function' &&
    !isObject$b((val = fn.call(input)))
  )
    return val
  throw TypeError("Can't convert object to primitive value")
}

var requireObjectCoercible$5 = requireObjectCoercible$7 // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

var toObject$6 = function (argument) {
  return Object(requireObjectCoercible$5(argument))
}

var toObject$5 = toObject$6
var hasOwnProperty = {}.hasOwnProperty

var has$a =
  Object.hasOwn ||
  function hasOwn(it, key) {
    return hasOwnProperty.call(toObject$5(it), key)
  }

var global$d = global$e
var isObject$a = isObject$c
var document$1 = global$d.document // typeof document.createElement is 'object' in old IE

var EXISTS = isObject$a(document$1) && isObject$a(document$1.createElement)

var documentCreateElement$1 = function (it) {
  return EXISTS ? document$1.createElement(it) : {}
}

var DESCRIPTORS$7 = descriptors
var fails$c = fails$f
var createElement = documentCreateElement$1 // Thank's IE8 for his funny defineProperty

var ie8DomDefine =
  !DESCRIPTORS$7 &&
  !fails$c(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return (
      Object.defineProperty(createElement('div'), 'a', {
        get: function () {
          return 7
        },
      }).a != 7
    )
  })

var DESCRIPTORS$6 = descriptors
var propertyIsEnumerableModule = objectPropertyIsEnumerable
var createPropertyDescriptor$3 = createPropertyDescriptor$4
var toIndexedObject$6 = toIndexedObject$7
var toPrimitive$2 = toPrimitive$3
var has$9 = has$a
var IE8_DOM_DEFINE$1 = ie8DomDefine // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

objectGetOwnPropertyDescriptor.f = DESCRIPTORS$6
  ? $getOwnPropertyDescriptor
  : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject$6(O)
      P = toPrimitive$2(P, true)
      if (IE8_DOM_DEFINE$1)
        try {
          return $getOwnPropertyDescriptor(O, P)
        } catch (error) {
          /* empty */
        }
      if (has$9(O, P))
        return createPropertyDescriptor$3(
          !propertyIsEnumerableModule.f.call(O, P),
          O[P]
        )
    }

var objectDefineProperty = {}

var isObject$9 = isObject$c

var anObject$t = function (it) {
  if (!isObject$9(it)) {
    throw TypeError(String(it) + ' is not an object')
  }

  return it
}

var DESCRIPTORS$5 = descriptors
var IE8_DOM_DEFINE = ie8DomDefine
var anObject$s = anObject$t
var toPrimitive$1 = toPrimitive$3 // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

objectDefineProperty.f = DESCRIPTORS$5
  ? $defineProperty
  : function defineProperty(O, P, Attributes) {
      anObject$s(O)
      P = toPrimitive$1(P, true)
      anObject$s(Attributes)
      if (IE8_DOM_DEFINE)
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

var DESCRIPTORS$4 = descriptors
var definePropertyModule$5 = objectDefineProperty
var createPropertyDescriptor$2 = createPropertyDescriptor$4
var createNonEnumerableProperty$7 = DESCRIPTORS$4
  ? function (object, key, value) {
      return definePropertyModule$5.f(
        object,
        key,
        createPropertyDescriptor$2(1, value)
      )
    }
  : function (object, key, value) {
      object[key] = value
      return object
    }

var redefine$7 = {exports: {}}

var global$c = global$e
var createNonEnumerableProperty$6 = createNonEnumerableProperty$7

var setGlobal$3 = function (key, value) {
  try {
    createNonEnumerableProperty$6(global$c, key, value)
  } catch (error) {
    global$c[key] = value
  }

  return value
}

var global$b = global$e
var setGlobal$2 = setGlobal$3
var SHARED = '__core-js_shared__'
var store$3 = global$b[SHARED] || setGlobal$2(SHARED, {})
var sharedStore = store$3

var store$2 = sharedStore
var functionToString = Function.toString // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (typeof store$2.inspectSource != 'function') {
  store$2.inspectSource = function (it) {
    return functionToString.call(it)
  }
}

var inspectSource$2 = store$2.inspectSource

var global$a = global$e
var inspectSource$1 = inspectSource$2
var WeakMap$1 = global$a.WeakMap
var nativeWeakMap =
  typeof WeakMap$1 === 'function' &&
  /native code/.test(inspectSource$1(WeakMap$1))

var shared$4 = {exports: {}}

var isPure = false

var store$1 = sharedStore
;(shared$4.exports = function (key, value) {
  return store$1[key] || (store$1[key] = value !== undefined ? value : {})
})('versions', []).push({
  version: '3.13.1',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)',
})

var id$1 = 0
var postfix = Math.random()

var uid$3 = function (key) {
  return (
    'Symbol(' +
    String(key === undefined ? '' : key) +
    ')_' +
    (++id$1 + postfix).toString(36)
  )
}

var shared$3 = shared$4.exports
var uid$2 = uid$3
var keys = shared$3('keys')

var sharedKey$3 = function (key) {
  return keys[key] || (keys[key] = uid$2(key))
}

var hiddenKeys$5 = {}

var NATIVE_WEAK_MAP = nativeWeakMap
var global$9 = global$e
var isObject$8 = isObject$c
var createNonEnumerableProperty$5 = createNonEnumerableProperty$7
var objectHas = has$a
var shared$2 = sharedStore
var sharedKey$2 = sharedKey$3
var hiddenKeys$4 = hiddenKeys$5
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized'
var WeakMap = global$9.WeakMap
var set, get, has$8

var enforce = function (it) {
  return has$8(it) ? get(it) : set(it, {})
}

var getterFor = function (TYPE) {
  return function (it) {
    var state

    if (!isObject$8(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required')
    }

    return state
  }
}

if (NATIVE_WEAK_MAP || shared$2.state) {
  var store = shared$2.state || (shared$2.state = new WeakMap())
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

  has$8 = function (it) {
    return wmhas.call(store, it)
  }
} else {
  var STATE = sharedKey$2('state')
  hiddenKeys$4[STATE] = true

  set = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED)
    metadata.facade = it
    createNonEnumerableProperty$5(it, STATE, metadata)
    return metadata
  }

  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {}
  }

  has$8 = function (it) {
    return objectHas(it, STATE)
  }
}

var internalState = {
  set: set,
  get: get,
  has: has$8,
  enforce: enforce,
  getterFor: getterFor,
}

var global$8 = global$e
var createNonEnumerableProperty$4 = createNonEnumerableProperty$7
var has$7 = has$a
var setGlobal$1 = setGlobal$3
var inspectSource = inspectSource$2
var InternalStateModule$3 = internalState
var getInternalState$2 = InternalStateModule$3.get
var enforceInternalState = InternalStateModule$3.enforce
var TEMPLATE = String(String).split('String')
;(redefine$7.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false
  var simple = options ? !!options.enumerable : false
  var noTargetGet = options ? !!options.noTargetGet : false
  var state

  if (typeof value == 'function') {
    if (typeof key == 'string' && !has$7(value, 'name')) {
      createNonEnumerableProperty$4(value, 'name', key)
    }

    state = enforceInternalState(value)

    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '')
    }
  }

  if (O === global$8) {
    if (simple) O[key] = value
    else setGlobal$1(key, value)
    return
  } else if (!unsafe) {
    delete O[key]
  } else if (!noTargetGet && O[key]) {
    simple = true
  }

  if (simple) O[key] = value
  else createNonEnumerableProperty$4(O, key, value) // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return (
    (typeof this == 'function' && getInternalState$2(this).source) ||
    inspectSource(this)
  )
})

var global$7 = global$e
var path$1 = global$7

var path = path$1
var global$6 = global$e

var aFunction$g = function (variable) {
  return typeof variable == 'function' ? variable : undefined
}

var getBuiltIn$b = function (namespace, method) {
  return arguments.length < 2
    ? aFunction$g(path[namespace]) || aFunction$g(global$6[namespace])
    : (path[namespace] && path[namespace][method]) ||
        (global$6[namespace] && global$6[namespace][method])
}

var objectGetOwnPropertyNames = {}

var ceil = Math.ceil
var floor$1 = Math.floor // `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger

var toInteger$4 = function (argument) {
  return isNaN((argument = +argument))
    ? 0
    : (argument > 0 ? floor$1 : ceil)(argument)
}

var toInteger$3 = toInteger$4
var min$4 = Math.min // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

var toLength$9 = function (argument) {
  return argument > 0 ? min$4(toInteger$3(argument), 0x1fffffffffffff) : 0 // 2 ** 53 - 1 == 9007199254740991
}

var toInteger$2 = toInteger$4
var max$2 = Math.max
var min$3 = Math.min // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex$2 = function (index, length) {
  var integer = toInteger$2(index)
  return integer < 0 ? max$2(integer + length, 0) : min$3(integer, length)
}

var toIndexedObject$5 = toIndexedObject$7
var toLength$8 = toLength$9
var toAbsoluteIndex$1 = toAbsoluteIndex$2 // `Array.prototype.{ indexOf, includes }` methods implementation

var createMethod$4 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$5($this)
    var length = toLength$8(O.length)
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
  includes: createMethod$4(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$4(false),
}

var has$6 = has$a
var toIndexedObject$4 = toIndexedObject$7
var indexOf = arrayIncludes.indexOf
var hiddenKeys$3 = hiddenKeys$5

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$4(object)
  var i = 0
  var result = []
  var key

  for (key in O) !has$6(hiddenKeys$3, key) && has$6(O, key) && result.push(key) // Don't enum bug & hidden keys

  while (names.length > i)
    if (has$6(O, (key = names[i++]))) {
      ~indexOf(result, key) || result.push(key)
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
var hiddenKeys$2 = enumBugKeys$2.concat('length', 'prototype') // `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe

objectGetOwnPropertyNames.f =
  Object.getOwnPropertyNames ||
  function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$2)
  }

var objectGetOwnPropertySymbols = {}

objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols

var getBuiltIn$a = getBuiltIn$b
var getOwnPropertyNamesModule = objectGetOwnPropertyNames
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols
var anObject$r = anObject$t // all object keys, includes non-enumerable and symbols

var ownKeys$1 =
  getBuiltIn$a('Reflect', 'ownKeys') ||
  function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$r(it))
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys
  }

var has$5 = has$a
var ownKeys = ownKeys$1
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor
var definePropertyModule$4 = objectDefineProperty

var copyConstructorProperties$1 = function (target, source) {
  var keys = ownKeys(source)
  var defineProperty = definePropertyModule$4.f
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    if (!has$5(target, key))
      defineProperty(target, key, getOwnPropertyDescriptor(source, key))
  }
}

var fails$b = fails$f
var replacement = /#|\.prototype\./

var isForced$2 = function (feature, detection) {
  var value = data[normalize(feature)]
  return value == POLYFILL
    ? true
    : value == NATIVE
    ? false
    : typeof detection == 'function'
    ? fails$b(detection)
    : !!detection
}

var normalize = (isForced$2.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase()
})

var data = (isForced$2.data = {})
var NATIVE = (isForced$2.NATIVE = 'N')
var POLYFILL = (isForced$2.POLYFILL = 'P')
var isForced_1 = isForced$2

var global$5 = global$e
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f
var createNonEnumerableProperty$3 = createNonEnumerableProperty$7
var redefine$6 = redefine$7.exports
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
*/

var _export = function (options, source) {
  var TARGET = options.target
  var GLOBAL = options.global
  var STATIC = options.stat
  var FORCED, target, key, targetProperty, sourceProperty, descriptor

  if (GLOBAL) {
    target = global$5
  } else if (STATIC) {
    target = global$5[TARGET] || setGlobal(TARGET, {})
  } else {
    target = (global$5[TARGET] || {}).prototype
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
        options.forced
      ) // contained in target

      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue
        copyConstructorProperties(sourceProperty, targetProperty)
      } // add a flag to not completely full polyfills

      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$3(sourceProperty, 'sham', true)
      } // extend global

      redefine$6(target, key, sourceProperty, options)
    }
}

var aFunction$f = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function')
  }

  return it
}

var aFunction$e = aFunction$f
var toObject$4 = toObject$6
var IndexedObject$2 = indexedObject
var toLength$7 = toLength$9 // `Array.prototype.{ reduce, reduceRight }` methods implementation

var createMethod$3 = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction$e(callbackfn)
    var O = toObject$4(that)
    var self = IndexedObject$2(O)
    var length = toLength$7(O.length)
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
  left: createMethod$3(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod$3(true),
}

var fails$a = fails$f

var arrayMethodIsStrict$2 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME]
  return (
    !!method &&
    fails$a(function () {
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

var getBuiltIn$9 = getBuiltIn$b
var engineUserAgent = getBuiltIn$9('navigator', 'userAgent') || ''

var global$4 = global$e
var userAgent = engineUserAgent
var process$2 = global$4.process
var versions = process$2 && process$2.versions
var v8 = versions && versions.v8
var match, version

if (v8) {
  match = v8.split('.')
  version = match[0] < 4 ? 1 : match[0] + match[1]
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/)

  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/)
    if (match) version = match[1]
  }
}

var engineV8Version = version && +version

var classof$6 = classofRaw$1
var global$3 = global$e
var engineIsNode = classof$6(global$3.process) == 'process'

var $$s = _export
var $reduce = arrayReduce.left
var arrayMethodIsStrict$1 = arrayMethodIsStrict$2
var CHROME_VERSION = engineV8Version
var IS_NODE = engineIsNode
var STRICT_METHOD$1 = arrayMethodIsStrict$1('reduce') // Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982

var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83 // `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce

$$s(
  {
    target: 'Array',
    proto: true,
    forced: !STRICT_METHOD$1 || CHROME_BUG,
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

var $$r = _export
var IndexedObject$1 = indexedObject
var toIndexedObject$3 = toIndexedObject$7
var arrayMethodIsStrict = arrayMethodIsStrict$2
var nativeJoin = [].join
var ES3_STRINGS = IndexedObject$1 != Object
var STRICT_METHOD = arrayMethodIsStrict('join', ',') // `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join

$$r(
  {
    target: 'Array',
    proto: true,
    forced: ES3_STRINGS || !STRICT_METHOD,
  },
  {
    join: function join(separator) {
      return nativeJoin.call(
        toIndexedObject$3(this),
        separator === undefined ? ',' : separator
      )
    },
  }
)

var classof$5 = classofRaw$1 // `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe

var isArray$3 =
  Array.isArray ||
  function isArray(arg) {
    return classof$5(arg) == 'Array'
  }

var toPrimitive = toPrimitive$3
var definePropertyModule$3 = objectDefineProperty
var createPropertyDescriptor$1 = createPropertyDescriptor$4

var createProperty$2 = function (object, key, value) {
  var propertyKey = toPrimitive(key)
  if (propertyKey in object)
    definePropertyModule$3.f(
      object,
      propertyKey,
      createPropertyDescriptor$1(0, value)
    )
  else object[propertyKey] = value
}

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION$2 = engineV8Version
var fails$9 = fails$f // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

var nativeSymbol =
  !!Object.getOwnPropertySymbols &&
  !fails$9(function () {
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

var global$2 = global$e
var shared$1 = shared$4.exports
var has$4 = has$a
var uid$1 = uid$3
var NATIVE_SYMBOL = nativeSymbol
var USE_SYMBOL_AS_UID = useSymbolAsUid
var WellKnownSymbolsStore = shared$1('wks')
var Symbol$1 = global$2.Symbol
var createWellKnownSymbol = USE_SYMBOL_AS_UID
  ? Symbol$1
  : (Symbol$1 && Symbol$1.withoutSetter) || uid$1

var wellKnownSymbol$i = function (name) {
  if (
    !has$4(WellKnownSymbolsStore, name) ||
    !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')
  ) {
    if (NATIVE_SYMBOL && has$4(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name]
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name)
    }
  }

  return WellKnownSymbolsStore[name]
}

var isObject$7 = isObject$c
var isArray$2 = isArray$3
var wellKnownSymbol$h = wellKnownSymbol$i
var SPECIES$5 = wellKnownSymbol$h('species') // `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

var arraySpeciesCreate$2 = function (originalArray, length) {
  var C

  if (isArray$2(originalArray)) {
    C = originalArray.constructor // cross-realm fallback

    if (typeof C == 'function' && (C === Array || isArray$2(C.prototype)))
      C = undefined
    else if (isObject$7(C)) {
      C = C[SPECIES$5]
      if (C === null) C = undefined
    }
  }

  return new (C === undefined ? Array : C)(length === 0 ? 0 : length)
}

var fails$8 = fails$f
var wellKnownSymbol$g = wellKnownSymbol$i
var V8_VERSION$1 = engineV8Version
var SPECIES$4 = wellKnownSymbol$g('species')

var arrayMethodHasSpeciesSupport$4 = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return (
    V8_VERSION$1 >= 51 ||
    !fails$8(function () {
      var array = []
      var constructor = (array.constructor = {})

      constructor[SPECIES$4] = function () {
        return {
          foo: 1,
        }
      }

      return array[METHOD_NAME](Boolean).foo !== 1
    })
  )
}

var $$q = _export
var fails$7 = fails$f
var isArray$1 = isArray$3
var isObject$6 = isObject$c
var toObject$3 = toObject$6
var toLength$6 = toLength$9
var createProperty$1 = createProperty$2
var arraySpeciesCreate$1 = arraySpeciesCreate$2
var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$4
var wellKnownSymbol$f = wellKnownSymbol$i
var V8_VERSION = engineV8Version
var IS_CONCAT_SPREADABLE = wellKnownSymbol$f('isConcatSpreadable')
var MAX_SAFE_INTEGER = 0x1fffffffffffff
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded' // We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679

var IS_CONCAT_SPREADABLE_SUPPORT =
  V8_VERSION >= 51 ||
  !fails$7(function () {
    var array = []
    array[IS_CONCAT_SPREADABLE] = false
    return array.concat()[0] !== array
  })
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$3('concat')

var isConcatSpreadable = function (O) {
  if (!isObject$6(O)) return false
  var spreadable = O[IS_CONCAT_SPREADABLE]
  return spreadable !== undefined ? !!spreadable : isArray$1(O)
}

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT // `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species

$$q(
  {
    target: 'Array',
    proto: true,
    forced: FORCED,
  },
  {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject$3(this)
      var A = arraySpeciesCreate$1(O, 0)
      var n = 0
      var i, k, length, len, E

      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i]

        if (isConcatSpreadable(E)) {
          len = toLength$6(E.length)
          if (n + len > MAX_SAFE_INTEGER)
            throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED)

          for (k = 0; k < len; k++, n++)
            if (k in E) createProperty$1(A, n, E[k])
        } else {
          if (n >= MAX_SAFE_INTEGER)
            throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED)
          createProperty$1(A, n++, E)
        }
      }

      A.length = n
      return A
    },
  }
)

var aFunction$d = aFunction$f // optional / simple context binding

var functionBindContext = function (fn, that, length) {
  aFunction$d(fn)
  if (that === undefined) return fn

  switch (length) {
    case 0:
      return function () {
        return fn.call(that)
      }

    case 1:
      return function (a) {
        return fn.call(that, a)
      }

    case 2:
      return function (a, b) {
        return fn.call(that, a, b)
      }

    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c)
      }
  }

  return function () /* ...args */
  {
    return fn.apply(that, arguments)
  }
}

var bind$7 = functionBindContext
var IndexedObject = indexedObject
var toObject$2 = toObject$6
var toLength$5 = toLength$9
var arraySpeciesCreate = arraySpeciesCreate$2
var push = [].push // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation

var createMethod$2 = function (TYPE) {
  var IS_MAP = TYPE == 1
  var IS_FILTER = TYPE == 2
  var IS_SOME = TYPE == 3
  var IS_EVERY = TYPE == 4
  var IS_FIND_INDEX = TYPE == 6
  var IS_FILTER_OUT = TYPE == 7
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject$2($this)
    var self = IndexedObject(O)
    var boundFunction = bind$7(callbackfn, that, 3)
    var length = toLength$5(self.length)
    var index = 0
    var create = specificCreate || arraySpeciesCreate
    var target = IS_MAP
      ? create($this, length)
      : IS_FILTER || IS_FILTER_OUT
      ? create($this, 0)
      : undefined
    var value, result

    for (; length > index; index++)
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
          else
            switch (TYPE) {
              case 4:
                return false
              // every

              case 7:
                push.call(target, value)
              // filterOut
            }
        }
      }

    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target
  }
}

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$2(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod$2(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod$2(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod$2(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod$2(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod$2(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$2(6),
  // `Array.prototype.filterOut` method
  // https://github.com/tc39/proposal-array-filtering
  filterOut: createMethod$2(7),
}

var $$p = _export
var $map = arrayIteration.map
var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$4
var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$2('map') // `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species

$$p(
  {
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT$2,
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

var wellKnownSymbol$e = wellKnownSymbol$i
var TO_STRING_TAG$2 = wellKnownSymbol$e('toStringTag')
var test = {}
test[TO_STRING_TAG$2] = 'z'
var toStringTagSupport = String(test) === '[object z]'

var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport
var classofRaw = classofRaw$1
var wellKnownSymbol$d = wellKnownSymbol$i
var TO_STRING_TAG$1 = wellKnownSymbol$d('toStringTag') // ES3 wrong here

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

var classof$4 = TO_STRING_TAG_SUPPORT$2
  ? classofRaw
  : function (it) {
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

var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport
var classof$3 = classof$4 // `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring

var objectToString = TO_STRING_TAG_SUPPORT$1
  ? {}.toString
  : function toString() {
      return '[object ' + classof$3(this) + ']'
    }

var TO_STRING_TAG_SUPPORT = toStringTagSupport
var redefine$5 = redefine$7.exports
var toString = objectToString // `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring

if (!TO_STRING_TAG_SUPPORT) {
  redefine$5(Object.prototype, 'toString', toString, {
    unsafe: true,
  })
}

var anObject$q = anObject$t // `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags

var regexpFlags$1 = function () {
  var that = anObject$q(this)
  var result = ''
  if (that.global) result += 'g'
  if (that.ignoreCase) result += 'i'
  if (that.multiline) result += 'm'
  if (that.dotAll) result += 's'
  if (that.unicode) result += 'u'
  if (that.sticky) result += 'y'
  return result
}

var redefine$4 = redefine$7.exports
var anObject$p = anObject$t
var fails$6 = fails$f
var flags = regexpFlags$1
var TO_STRING = 'toString'
var RegExpPrototype$1 = RegExp.prototype
var nativeToString = RegExpPrototype$1[TO_STRING]
var NOT_GENERIC = fails$6(function () {
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
  redefine$4(
    RegExp.prototype,
    TO_STRING,
    function toString() {
      var R = anObject$p(this)
      var p = String(R.source)
      var rf = R.flags
      var f = String(
        rf === undefined &&
          R instanceof RegExp &&
          !('flags' in RegExpPrototype$1)
          ? flags.call(R)
          : rf
      )
      return '/' + p + '/' + f
    },
    {
      unsafe: true,
    }
  )
}

function exportPlugin(process, _ref) {
  var options = _ref.options
  process.defaultOptions = options
  return process
}

var internalObjectKeys = objectKeysInternal
var enumBugKeys$1 = enumBugKeys$3 // `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe

var objectKeys$2 =
  Object.keys ||
  function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1)
  }

var DESCRIPTORS$3 = descriptors
var definePropertyModule$2 = objectDefineProperty
var anObject$o = anObject$t
var objectKeys$1 = objectKeys$2 // `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe

var objectDefineProperties = DESCRIPTORS$3
  ? Object.defineProperties
  : function defineProperties(O, Properties) {
      anObject$o(O)
      var keys = objectKeys$1(Properties)
      var length = keys.length
      var index = 0
      var key

      while (length > index)
        definePropertyModule$2.f(O, (key = keys[index++]), Properties[key])

      return O
    }

var getBuiltIn$8 = getBuiltIn$b
var html$1 = getBuiltIn$8('document', 'documentElement')

var anObject$n = anObject$t
var defineProperties = objectDefineProperties
var enumBugKeys = enumBugKeys$3
var hiddenKeys$1 = hiddenKeys$5
var html = html$1
var documentCreateElement = documentCreateElement$1
var sharedKey$1 = sharedKey$3
var GT = '>'
var LT = '<'
var PROTOTYPE = 'prototype'
var SCRIPT = 'script'
var IE_PROTO$1 = sharedKey$1('IE_PROTO')

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

hiddenKeys$1[IE_PROTO$1] = true // `Object.create` method
// https://tc39.es/ecma262/#sec-object.create

var objectCreate =
  Object.create ||
  function create(O, Properties) {
    var result

    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject$n(O)
      result = new EmptyConstructor()
      EmptyConstructor[PROTOTYPE] = null // add "__proto__" for Object.getPrototypeOf polyfill

      result[IE_PROTO$1] = O
    } else result = NullProtoObject()

    return Properties === undefined
      ? result
      : defineProperties(result, Properties)
  }

var wellKnownSymbol$c = wellKnownSymbol$i
var create$2 = objectCreate
var definePropertyModule$1 = objectDefineProperty
var UNSCOPABLES = wellKnownSymbol$c('unscopables')
var ArrayPrototype$1 = Array.prototype // Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
  definePropertyModule$1.f(ArrayPrototype$1, UNSCOPABLES, {
    configurable: true,
    value: create$2(null),
  })
} // add a key to Array.prototype[@@unscopables]

var addToUnscopables$2 = function (key) {
  ArrayPrototype$1[UNSCOPABLES][key] = true
}

var $$o = _export
var $includes = arrayIncludes.includes
var addToUnscopables$1 = addToUnscopables$2 // `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes

$$o(
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

addToUnscopables$1('includes')

var isObject$5 = isObject$c
var classof$2 = classofRaw$1
var wellKnownSymbol$b = wellKnownSymbol$i
var MATCH$1 = wellKnownSymbol$b('match') // `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp

var isRegexp = function (it) {
  var isRegExp
  return (
    isObject$5(it) &&
    ((isRegExp = it[MATCH$1]) !== undefined
      ? !!isRegExp
      : classof$2(it) == 'RegExp')
  )
}

var isRegExp$1 = isRegexp

var notARegexp = function (it) {
  if (isRegExp$1(it)) {
    throw TypeError("The method doesn't accept regular expressions")
  }

  return it
}

var wellKnownSymbol$a = wellKnownSymbol$i
var MATCH = wellKnownSymbol$a('match')

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

var $$n = _export
var notARegExp$1 = notARegexp
var requireObjectCoercible$4 = requireObjectCoercible$7
var correctIsRegExpLogic$1 = correctIsRegexpLogic // `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes

$$n(
  {
    target: 'String',
    proto: true,
    forced: !correctIsRegExpLogic$1('includes'),
  },
  {
    includes: function includes(
      searchString
      /* , position = 0 */
    ) {
      return !!~String(requireObjectCoercible$4(this)).indexOf(
        notARegExp$1(searchString),
        arguments.length > 1 ? arguments[1] : undefined
      )
    },
  }
)

var iterators = {}

var fails$5 = fails$f
var correctPrototypeGetter = !fails$5(function () {
  function F() {
    /* empty */
  }

  F.prototype.constructor = null // eslint-disable-next-line es/no-object-getprototypeof -- required for testing

  return Object.getPrototypeOf(new F()) !== F.prototype
})

var has$3 = has$a
var toObject$1 = toObject$6
var sharedKey = sharedKey$3
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter
var IE_PROTO = sharedKey('IE_PROTO')
var ObjectPrototype = Object.prototype // `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe

var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER
  ? Object.getPrototypeOf
  : function (O) {
      O = toObject$1(O)
      if (has$3(O, IE_PROTO)) return O[IE_PROTO]

      if (typeof O.constructor == 'function' && O instanceof O.constructor) {
        return O.constructor.prototype
      }

      return O instanceof Object ? ObjectPrototype : null
    }

var fails$4 = fails$f
var getPrototypeOf$1 = objectGetPrototypeOf
var createNonEnumerableProperty$2 = createNonEnumerableProperty$7
var has$2 = has$a
var wellKnownSymbol$9 = wellKnownSymbol$i
var ITERATOR$4 = wellKnownSymbol$9('iterator')
var BUGGY_SAFARI_ITERATORS$1 = false

var returnThis$2 = function () {
  return this
} // `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object

var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator
/* eslint-disable es/no-array-prototype-keys -- safe */

if ([].keys) {
  arrayIterator = [].keys() // Safari 8 has buggy iterators w/o `next`

  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(
      getPrototypeOf$1(arrayIterator)
    )
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
      IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype
  }
}

var NEW_ITERATOR_PROTOTYPE =
  IteratorPrototype$2 == undefined ||
  fails$4(function () {
    var test = {} // FF44- legacy iterators case

    return IteratorPrototype$2[ITERATOR$4].call(test) !== test
  })
if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {} // `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator

if (!has$2(IteratorPrototype$2, ITERATOR$4)) {
  createNonEnumerableProperty$2(IteratorPrototype$2, ITERATOR$4, returnThis$2)
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1,
}

var defineProperty$2 = objectDefineProperty.f
var has$1 = has$a
var wellKnownSymbol$8 = wellKnownSymbol$i
var TO_STRING_TAG = wellKnownSymbol$8('toStringTag')

var setToStringTag$3 = function (it, TAG, STATIC) {
  if (it && !has$1((it = STATIC ? it : it.prototype), TO_STRING_TAG)) {
    defineProperty$2(it, TO_STRING_TAG, {
      configurable: true,
      value: TAG,
    })
  }
}

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype
var create$1 = objectCreate
var createPropertyDescriptor = createPropertyDescriptor$4
var setToStringTag$2 = setToStringTag$3
var Iterators$4 = iterators

var returnThis$1 = function () {
  return this
}

var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator'
  IteratorConstructor.prototype = create$1(IteratorPrototype$1, {
    next: createPropertyDescriptor(1, next),
  })
  setToStringTag$2(IteratorConstructor, TO_STRING_TAG, false)
  Iterators$4[TO_STRING_TAG] = returnThis$1
  return IteratorConstructor
}

var isObject$4 = isObject$c

var aPossiblePrototype$1 = function (it) {
  if (!isObject$4(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype')
  }

  return it
}

/* eslint-disable no-proto -- safe */
var anObject$m = anObject$t
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
          anObject$m(O)
          aPossiblePrototype(proto)
          if (CORRECT_SETTER) setter.call(O, proto)
          else O.__proto__ = proto
          return O
        }
      })()
    : undefined)

var $$m = _export
var createIteratorConstructor = createIteratorConstructor$1
var getPrototypeOf = objectGetPrototypeOf
var setPrototypeOf$1 = objectSetPrototypeOf
var setToStringTag$1 = setToStringTag$3
var createNonEnumerableProperty$1 = createNonEnumerableProperty$7
var redefine$3 = redefine$7.exports
var wellKnownSymbol$7 = wellKnownSymbol$i
var Iterators$3 = iterators
var IteratorsCore = iteratorsCore
var IteratorPrototype = IteratorsCore.IteratorPrototype
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS
var ITERATOR$3 = wellKnownSymbol$7('iterator')
var KEYS = 'keys'
var VALUES = 'values'
var ENTRIES = 'entries'

var returnThis = function () {
  return this
}

var defineIterator$3 = function (
  Iterable,
  NAME,
  IteratorConstructor,
  next,
  DEFAULT,
  IS_SET,
  FORCED
) {
  createIteratorConstructor(IteratorConstructor, NAME, next)

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype)
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

    return function () {
      return new IteratorConstructor(this)
    }
  }

  var TO_STRING_TAG = NAME + ' Iterator'
  var INCORRECT_VALUES_NAME = false
  var IterablePrototype = Iterable.prototype
  var nativeIterator =
    IterablePrototype[ITERATOR$3] ||
    IterablePrototype['@@iterator'] ||
    (DEFAULT && IterablePrototype[DEFAULT])
  var defaultIterator =
    (!BUGGY_SAFARI_ITERATORS && nativeIterator) || getIterationMethod(DEFAULT)
  var anyNativeIterator =
    NAME == 'Array'
      ? IterablePrototype.entries || nativeIterator
      : nativeIterator
  var CurrentIteratorPrototype, methods, KEY // fix native

  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(
      anyNativeIterator.call(new Iterable())
    )

    if (
      IteratorPrototype !== Object.prototype &&
      CurrentIteratorPrototype.next
    ) {
      if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf$1) {
          setPrototypeOf$1(CurrentIteratorPrototype, IteratorPrototype)
        } else if (typeof CurrentIteratorPrototype[ITERATOR$3] != 'function') {
          createNonEnumerableProperty$1(
            CurrentIteratorPrototype,
            ITERATOR$3,
            returnThis
          )
        }
      } // Set @@toStringTag to native iterators

      setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true)
    }
  } // fix Array.prototype.{ values, @@iterator }.name in V8 / FF

  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true

    defaultIterator = function values() {
      return nativeIterator.call(this)
    }
  } // define iterator

  if (IterablePrototype[ITERATOR$3] !== defaultIterator) {
    createNonEnumerableProperty$1(
      IterablePrototype,
      ITERATOR$3,
      defaultIterator
    )
  }

  Iterators$3[NAME] = defaultIterator // export additional methods

  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES),
    }
    if (FORCED)
      for (KEY in methods) {
        if (
          BUGGY_SAFARI_ITERATORS ||
          INCORRECT_VALUES_NAME ||
          !(KEY in IterablePrototype)
        ) {
          redefine$3(IterablePrototype, KEY, methods[KEY])
        }
      }
    else
      $$m(
        {
          target: NAME,
          proto: true,
          forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME,
        },
        methods
      )
  }

  return methods
}

var toIndexedObject$2 = toIndexedObject$7
var addToUnscopables = addToUnscopables$2
var Iterators$2 = iterators
var InternalStateModule$2 = internalState
var defineIterator$2 = defineIterator$3
var ARRAY_ITERATOR = 'Array Iterator'
var setInternalState$2 = InternalStateModule$2.set
var getInternalState$1 = InternalStateModule$2.getterFor(ARRAY_ITERATOR) // `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator

defineIterator$2(
  Array,
  'Array',
  function (iterated, kind) {
    setInternalState$2(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject$2(iterated),
      // target
      index: 0,
      // next index
      kind: kind, // kind
    }) // `%ArrayIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  },
  function () {
    var state = getInternalState$1(this)
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
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject

Iterators$2.Arguments = Iterators$2.Array // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('keys')
addToUnscopables('values')
addToUnscopables('entries')

var internalMetadata = {exports: {}}

var fails$3 = fails$f
var freezing = !fails$3(function () {
  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}))
})

var hiddenKeys = hiddenKeys$5
var isObject$3 = isObject$c
var has = has$a
var defineProperty$1 = objectDefineProperty.f
var uid = uid$3
var FREEZING = freezing
var METADATA = uid('meta')
var id = 0 // eslint-disable-next-line es/no-object-isextensible -- safe

var isExtensible =
  Object.isExtensible ||
  function () {
    return true
  }

var setMetadata = function (it) {
  defineProperty$1(it, METADATA, {
    value: {
      objectID: 'O' + ++id,
      // object ID
      weakData: {}, // weak collections IDs
    },
  })
}

var fastKey$1 = function (it, create) {
  // return a primitive with prefix
  if (!isObject$3(it))
    return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it

  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F' // not necessary to add metadata

    if (!create) return 'E' // add missing metadata

    setMetadata(it) // return object ID
  }

  return it[METADATA].objectID
}

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true // not necessary to add metadata

    if (!create) return false // add missing metadata

    setMetadata(it) // return the store of weak collections IDs
  }

  return it[METADATA].weakData
} // add metadata on freeze-family methods calling

var onFreeze = function (it) {
  if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA))
    setMetadata(it)
  return it
}

var meta = (internalMetadata.exports = {
  REQUIRED: false,
  fastKey: fastKey$1,
  getWeakData: getWeakData,
  onFreeze: onFreeze,
})
hiddenKeys[METADATA] = true

var wellKnownSymbol$6 = wellKnownSymbol$i
var Iterators$1 = iterators
var ITERATOR$2 = wellKnownSymbol$6('iterator')
var ArrayPrototype = Array.prototype // check on default Array iterator

var isArrayIteratorMethod$1 = function (it) {
  return (
    it !== undefined &&
    (Iterators$1.Array === it || ArrayPrototype[ITERATOR$2] === it)
  )
}

var classof$1 = classof$4
var Iterators = iterators
var wellKnownSymbol$5 = wellKnownSymbol$i
var ITERATOR$1 = wellKnownSymbol$5('iterator')

var getIteratorMethod$2 = function (it) {
  if (it != undefined)
    return it[ITERATOR$1] || it['@@iterator'] || Iterators[classof$1(it)]
}

var anObject$l = anObject$t

var iteratorClose$1 = function (iterator) {
  var returnMethod = iterator['return']

  if (returnMethod !== undefined) {
    return anObject$l(returnMethod.call(iterator)).value
  }
}

var anObject$k = anObject$t
var isArrayIteratorMethod = isArrayIteratorMethod$1
var toLength$4 = toLength$9
var bind$6 = functionBindContext
var getIteratorMethod$1 = getIteratorMethod$2
var iteratorClose = iteratorClose$1

var Result = function (stopped, result) {
  this.stopped = stopped
  this.result = result
}

var iterate$g = function (iterable, unboundFunction, options) {
  var that = options && options.that
  var AS_ENTRIES = !!(options && options.AS_ENTRIES)
  var IS_ITERATOR = !!(options && options.IS_ITERATOR)
  var INTERRUPTED = !!(options && options.INTERRUPTED)
  var fn = bind$6(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED)
  var iterator, iterFn, index, length, result, next, step

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator)
    return new Result(true, condition)
  }

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject$k(value)
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1])
    }

    return INTERRUPTED ? fn(value, stop) : fn(value)
  }

  if (IS_ITERATOR) {
    iterator = iterable
  } else {
    iterFn = getIteratorMethod$1(iterable)
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable') // optimisation for array iterators

    if (isArrayIteratorMethod(iterFn)) {
      for (
        index = 0, length = toLength$4(iterable.length);
        length > index;
        index++
      ) {
        result = callFn(iterable[index])
        if (result && result instanceof Result) return result
      }

      return new Result(false)
    }

    iterator = iterFn.call(iterable)
  }

  next = iterator.next

  while (!(step = next.call(iterator)).done) {
    try {
      result = callFn(step.value)
    } catch (error) {
      iteratorClose(iterator)
      throw error
    }

    if (typeof result == 'object' && result && result instanceof Result)
      return result
  }

  return new Result(false)
}

var anInstance$2 = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation')
  }

  return it
}

var wellKnownSymbol$4 = wellKnownSymbol$i
var ITERATOR = wellKnownSymbol$4('iterator')
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

var isObject$2 = isObject$c
var setPrototypeOf = objectSetPrototypeOf // makes subclassing work correct for wrapped built-ins

var inheritIfRequired$1 = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject$2((NewTargetPrototype = NewTarget.prototype)) &&
    NewTargetPrototype !== Wrapper.prototype
  )
    setPrototypeOf($this, NewTargetPrototype)
  return $this
}

var $$l = _export
var global$1 = global$e
var isForced = isForced_1
var redefine$2 = redefine$7.exports
var InternalMetadataModule = internalMetadata.exports
var iterate$f = iterate$g
var anInstance$1 = anInstance$2
var isObject$1 = isObject$c
var fails$2 = fails$f
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1
var setToStringTag = setToStringTag$3
var inheritIfRequired = inheritIfRequired$1

var collection$1 = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1
  var ADDER = IS_MAP ? 'set' : 'add'
  var NativeConstructor = global$1[CONSTRUCTOR_NAME]
  var NativePrototype = NativeConstructor && NativeConstructor.prototype
  var Constructor = NativeConstructor
  var exported = {}

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY]
    redefine$2(
      NativePrototype,
      KEY,
      KEY == 'add'
        ? function add(value) {
            nativeMethod.call(this, value === 0 ? 0 : value)
            return this
          }
        : KEY == 'delete'
        ? function (key) {
            return IS_WEAK && !isObject$1(key)
              ? false
              : nativeMethod.call(this, key === 0 ? 0 : key)
          }
        : KEY == 'get'
        ? function get(key) {
            return IS_WEAK && !isObject$1(key)
              ? undefined
              : nativeMethod.call(this, key === 0 ? 0 : key)
          }
        : KEY == 'has'
        ? function has(key) {
            return IS_WEAK && !isObject$1(key)
              ? false
              : nativeMethod.call(this, key === 0 ? 0 : key)
          }
        : function set(key, value) {
            nativeMethod.call(this, key === 0 ? 0 : key, value)
            return this
          }
    )
  }

  var REPLACE = isForced(
    CONSTRUCTOR_NAME,
    typeof NativeConstructor != 'function' ||
      !(
        IS_WEAK ||
        (NativePrototype.forEach &&
          !fails$2(function () {
            new NativeConstructor().entries().next()
          }))
      )
  )

  if (REPLACE) {
    // create collection constructor
    Constructor = common.getConstructor(
      wrapper,
      CONSTRUCTOR_NAME,
      IS_MAP,
      ADDER
    )
    InternalMetadataModule.REQUIRED = true
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor() // early implementations not supports chaining

    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false

    var THROWS_ON_PRIMITIVES = fails$2(function () {
      instance.has(1)
    }) // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new -- required for testing

    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) {
      new NativeConstructor(iterable)
    }) // for early implementations -0 and +0 not the same

    var BUGGY_ZERO =
      !IS_WEAK &&
      fails$2(function () {
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new NativeConstructor()
        var index = 5

        while (index--) $instance[ADDER](index, index)

        return !$instance.has(-0)
      })

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance$1(dummy, Constructor, CONSTRUCTOR_NAME)
        var that = inheritIfRequired(
          new NativeConstructor(),
          dummy,
          Constructor
        )
        if (iterable != undefined)
          iterate$f(iterable, that[ADDER], {
            that: that,
            AS_ENTRIES: IS_MAP,
          })
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
  $$l(
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

var redefine$1 = redefine$7.exports

var redefineAll$1 = function (target, src, options) {
  for (var key in src) redefine$1(target, key, src[key], options)

  return target
}

var getBuiltIn$7 = getBuiltIn$b
var definePropertyModule = objectDefineProperty
var wellKnownSymbol$3 = wellKnownSymbol$i
var DESCRIPTORS$2 = descriptors
var SPECIES$3 = wellKnownSymbol$3('species')

var setSpecies$1 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$7(CONSTRUCTOR_NAME)
  var defineProperty = definePropertyModule.f

  if (DESCRIPTORS$2 && Constructor && !Constructor[SPECIES$3]) {
    defineProperty(Constructor, SPECIES$3, {
      configurable: true,
      get: function () {
        return this
      },
    })
  }
}

var defineProperty = objectDefineProperty.f
var create = objectCreate
var redefineAll = redefineAll$1
var bind$5 = functionBindContext
var anInstance = anInstance$2
var iterate$e = iterate$g
var defineIterator$1 = defineIterator$3
var setSpecies = setSpecies$1
var DESCRIPTORS$1 = descriptors
var fastKey = internalMetadata.exports.fastKey
var InternalStateModule$1 = internalState
var setInternalState$1 = InternalStateModule$1.set
var internalStateGetterFor = InternalStateModule$1.getterFor
var collectionStrong$1 = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME)
      setInternalState$1(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0,
      })
      if (!DESCRIPTORS$1) that.size = 0
      if (iterable != undefined)
        iterate$e(iterable, that[ADDER], {
          that: that,
          AS_ENTRIES: IS_MAP,
        })
    })
    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME)

    var define = function (that, key, value) {
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
        if (DESCRIPTORS$1) state.size++
        else that.size++ // add to index

        if (index !== 'F') state.index[index] = entry
      }

      return that
    }

    var getEntry = function (that, key) {
      var state = getInternalState(that) // fast case

      var index = fastKey(key)
      var entry
      if (index !== 'F') return state.index[index] // frozen object case

      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry
      }
    }

    redefineAll(C.prototype, {
      // `{ Map, Set }.prototype.clear()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.clear
      // https://tc39.es/ecma262/#sec-set.prototype.clear
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
        if (DESCRIPTORS$1) state.size = 0
        else that.size = 0
      },
      // `{ Map, Set }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.delete
      // https://tc39.es/ecma262/#sec-set.prototype.delete
      delete: function (key) {
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
          if (DESCRIPTORS$1) state.size--
          else that.size--
        }

        return !!entry
      },
      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.foreach
      // https://tc39.es/ecma262/#sec-set.prototype.foreach
      forEach: function forEach(
        callbackfn
        /* , that = undefined */
      ) {
        var state = getInternalState(this)
        var boundFunction = bind$5(
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined,
          3
        )
        var entry

        while ((entry = entry ? entry.next : state.first)) {
          boundFunction(entry.value, entry.key, this) // revert to the last existing entry

          while (entry && entry.removed) entry = entry.previous
        }
      },
      // `{ Map, Set}.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.has
      // https://tc39.es/ecma262/#sec-set.prototype.has
      has: function has(key) {
        return !!getEntry(this, key)
      },
    })
    redefineAll(
      C.prototype,
      IS_MAP
        ? {
            // `Map.prototype.get(key)` method
            // https://tc39.es/ecma262/#sec-map.prototype.get
            get: function get(key) {
              var entry = getEntry(this, key)
              return entry && entry.value
            },
            // `Map.prototype.set(key, value)` method
            // https://tc39.es/ecma262/#sec-map.prototype.set
            set: function set(key, value) {
              return define(this, key === 0 ? 0 : key, value)
            },
          }
        : {
            // `Set.prototype.add(value)` method
            // https://tc39.es/ecma262/#sec-set.prototype.add
            add: function add(value) {
              return define(this, (value = value === 0 ? 0 : value), value)
            },
          }
    )
    if (DESCRIPTORS$1)
      defineProperty(C.prototype, 'size', {
        get: function () {
          return getInternalState(this).size
        },
      })
    return C
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator'
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME)
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME) // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
    // https://tc39.es/ecma262/#sec-map.prototype.entries
    // https://tc39.es/ecma262/#sec-map.prototype.keys
    // https://tc39.es/ecma262/#sec-map.prototype.values
    // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
    // https://tc39.es/ecma262/#sec-set.prototype.entries
    // https://tc39.es/ecma262/#sec-set.prototype.keys
    // https://tc39.es/ecma262/#sec-set.prototype.values
    // https://tc39.es/ecma262/#sec-set.prototype-@@iterator

    defineIterator$1(
      C,
      CONSTRUCTOR_NAME,
      function (iterated, kind) {
        setInternalState$1(this, {
          type: ITERATOR_NAME,
          target: iterated,
          state: getInternalCollectionState(iterated),
          kind: kind,
          last: undefined,
        })
      },
      function () {
        var state = getInternalIteratorState(this)
        var kind = state.kind
        var entry = state.last // revert to the last existing entry

        while (entry && entry.removed) entry = entry.previous // get next entry

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
    ) // `{ Map, Set }.prototype[@@species]` accessors
    // https://tc39.es/ecma262/#sec-get-map-@@species
    // https://tc39.es/ecma262/#sec-get-set-@@species

    setSpecies(CONSTRUCTOR_NAME)
  },
}

var collection = collection$1
var collectionStrong = collectionStrong$1 // `Set` constructor
// https://tc39.es/ecma262/#sec-set-objects

collection(
  'Set',
  function (init) {
    return function Set() {
      return init(this, arguments.length ? arguments[0] : undefined)
    }
  },
  collectionStrong
)

var toInteger$1 = toInteger$4
var requireObjectCoercible$3 = requireObjectCoercible$7 // `String.prototype.{ codePointAt, at }` methods implementation

var createMethod$1 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible$3($this))
    var position = toInteger$1(pos)
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
  codeAt: createMethod$1(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$1(true),
}

var charAt$1 = stringMultibyte.charAt
var InternalStateModule = internalState
var defineIterator = defineIterator$3
var STRING_ITERATOR = 'String Iterator'
var setInternalState = InternalStateModule.set
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR) // `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator

defineIterator(
  String,
  'String',
  function (iterated) {
    setInternalState(this, {
      type: STRING_ITERATOR,
      string: String(iterated),
      index: 0,
    }) // `%StringIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  },
  function next() {
    var state = getInternalState(this)
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

var anObject$j = anObject$t
var aFunction$c = aFunction$f // https://github.com/tc39/collection-methods

var collectionAddAll$1 = function () /* ...elements */
{
  var set = anObject$j(this)
  var adder = aFunction$c(set.add)

  for (var k = 0, len = arguments.length; k < len; k++) {
    adder.call(set, arguments[k])
  }

  return set
}

var $$k = _export
var IS_PURE$f = isPure
var collectionAddAll = collectionAddAll$1 // `Set.prototype.addAll` method
// https://github.com/tc39/proposal-collection-methods

$$k(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$f,
  },
  {
    addAll: function addAll /* ...elements */() {
      return collectionAddAll.apply(this, arguments)
    },
  }
)

var anObject$i = anObject$t
var aFunction$b = aFunction$f // https://github.com/tc39/collection-methods

var collectionDeleteAll$1 = function () /* ...elements */
{
  var collection = anObject$i(this)
  var remover = aFunction$b(collection['delete'])
  var allDeleted = true
  var wasDeleted

  for (var k = 0, len = arguments.length; k < len; k++) {
    wasDeleted = remover.call(collection, arguments[k])
    allDeleted = allDeleted && wasDeleted
  }

  return !!allDeleted
}

var $$j = _export
var IS_PURE$e = isPure
var collectionDeleteAll = collectionDeleteAll$1 // `Set.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods

$$j(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$e,
  },
  {
    deleteAll: function deleteAll /* ...elements */() {
      return collectionDeleteAll.apply(this, arguments)
    },
  }
)

var anObject$h = anObject$t
var aFunction$a = aFunction$f
var wellKnownSymbol$2 = wellKnownSymbol$i
var SPECIES$2 = wellKnownSymbol$2('species') // `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor

var speciesConstructor$7 = function (O, defaultConstructor) {
  var C = anObject$h(O).constructor
  var S
  return C === undefined || (S = anObject$h(C)[SPECIES$2]) == undefined
    ? defaultConstructor
    : aFunction$a(S)
}

var $$i = _export
var IS_PURE$d = isPure
var getBuiltIn$6 = getBuiltIn$b
var anObject$g = anObject$t
var aFunction$9 = aFunction$f
var speciesConstructor$6 = speciesConstructor$7
var iterate$d = iterate$g // `Set.prototype.difference` method
// https://github.com/tc39/proposal-set-methods

$$i(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$d,
  },
  {
    difference: function difference(iterable) {
      var set = anObject$g(this)
      var newSet = new (speciesConstructor$6(set, getBuiltIn$6('Set')))(set)
      var remover = aFunction$9(newSet['delete'])
      iterate$d(iterable, function (value) {
        remover.call(newSet, value)
      })
      return newSet
    },
  }
)

var anObject$f = anObject$t
var getIteratorMethod = getIteratorMethod$2

var getIterator$1 = function (it) {
  var iteratorMethod = getIteratorMethod(it)

  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable')
  }

  return anObject$f(iteratorMethod.call(it))
}

var getSetIterator$7 = function (it) {
  // eslint-disable-next-line es/no-set -- safe
  return Set.prototype.values.call(it)
}

var $$h = _export
var IS_PURE$c = isPure
var anObject$e = anObject$t
var bind$4 = functionBindContext
var getSetIterator$6 = getSetIterator$7
var iterate$c = iterate$g // `Set.prototype.every` method
// https://github.com/tc39/proposal-collection-methods

$$h(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$c,
  },
  {
    every: function every(
      callbackfn
      /* , thisArg */
    ) {
      var set = anObject$e(this)
      var iterator = getSetIterator$6(set)
      var boundFunction = bind$4(
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined,
        3
      )
      return !iterate$c(
        iterator,
        function (value, stop) {
          if (!boundFunction(value, value, set)) return stop()
        },
        {
          IS_ITERATOR: true,
          INTERRUPTED: true,
        }
      ).stopped
    },
  }
)

var $$g = _export
var IS_PURE$b = isPure
var getBuiltIn$5 = getBuiltIn$b
var anObject$d = anObject$t
var aFunction$8 = aFunction$f
var bind$3 = functionBindContext
var speciesConstructor$5 = speciesConstructor$7
var getSetIterator$5 = getSetIterator$7
var iterate$b = iterate$g // `Set.prototype.filter` method
// https://github.com/tc39/proposal-collection-methods

$$g(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$b,
  },
  {
    filter: function filter(
      callbackfn
      /* , thisArg */
    ) {
      var set = anObject$d(this)
      var iterator = getSetIterator$5(set)
      var boundFunction = bind$3(
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined,
        3
      )
      var newSet = new (speciesConstructor$5(set, getBuiltIn$5('Set')))()
      var adder = aFunction$8(newSet.add)
      iterate$b(
        iterator,
        function (value) {
          if (boundFunction(value, value, set)) adder.call(newSet, value)
        },
        {
          IS_ITERATOR: true,
        }
      )
      return newSet
    },
  }
)

var $$f = _export
var IS_PURE$a = isPure
var anObject$c = anObject$t
var bind$2 = functionBindContext
var getSetIterator$4 = getSetIterator$7
var iterate$a = iterate$g // `Set.prototype.find` method
// https://github.com/tc39/proposal-collection-methods

$$f(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$a,
  },
  {
    find: function find(
      callbackfn
      /* , thisArg */
    ) {
      var set = anObject$c(this)
      var iterator = getSetIterator$4(set)
      var boundFunction = bind$2(
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined,
        3
      )
      return iterate$a(
        iterator,
        function (value, stop) {
          if (boundFunction(value, value, set)) return stop(value)
        },
        {
          IS_ITERATOR: true,
          INTERRUPTED: true,
        }
      ).result
    },
  }
)

var $$e = _export
var IS_PURE$9 = isPure
var getBuiltIn$4 = getBuiltIn$b
var anObject$b = anObject$t
var aFunction$7 = aFunction$f
var speciesConstructor$4 = speciesConstructor$7
var iterate$9 = iterate$g // `Set.prototype.intersection` method
// https://github.com/tc39/proposal-set-methods

$$e(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$9,
  },
  {
    intersection: function intersection(iterable) {
      var set = anObject$b(this)
      var newSet = new (speciesConstructor$4(set, getBuiltIn$4('Set')))()
      var hasCheck = aFunction$7(set.has)
      var adder = aFunction$7(newSet.add)
      iterate$9(iterable, function (value) {
        if (hasCheck.call(set, value)) adder.call(newSet, value)
      })
      return newSet
    },
  }
)

var $$d = _export
var IS_PURE$8 = isPure
var anObject$a = anObject$t
var aFunction$6 = aFunction$f
var iterate$8 = iterate$g // `Set.prototype.isDisjointFrom` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isDisjointFrom

$$d(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$8,
  },
  {
    isDisjointFrom: function isDisjointFrom(iterable) {
      var set = anObject$a(this)
      var hasCheck = aFunction$6(set.has)
      return !iterate$8(
        iterable,
        function (value, stop) {
          if (hasCheck.call(set, value) === true) return stop()
        },
        {
          INTERRUPTED: true,
        }
      ).stopped
    },
  }
)

var $$c = _export
var IS_PURE$7 = isPure
var getBuiltIn$3 = getBuiltIn$b
var anObject$9 = anObject$t
var aFunction$5 = aFunction$f
var getIterator = getIterator$1
var iterate$7 = iterate$g // `Set.prototype.isSubsetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSubsetOf

$$c(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$7,
  },
  {
    isSubsetOf: function isSubsetOf(iterable) {
      var iterator = getIterator(this)
      var otherSet = anObject$9(iterable)
      var hasCheck = otherSet.has

      if (typeof hasCheck != 'function') {
        otherSet = new (getBuiltIn$3('Set'))(iterable)
        hasCheck = aFunction$5(otherSet.has)
      }

      return !iterate$7(
        iterator,
        function (value, stop) {
          if (hasCheck.call(otherSet, value) === false) return stop()
        },
        {
          IS_ITERATOR: true,
          INTERRUPTED: true,
        }
      ).stopped
    },
  }
)

var $$b = _export
var IS_PURE$6 = isPure
var anObject$8 = anObject$t
var aFunction$4 = aFunction$f
var iterate$6 = iterate$g // `Set.prototype.isSupersetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSupersetOf

$$b(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$6,
  },
  {
    isSupersetOf: function isSupersetOf(iterable) {
      var set = anObject$8(this)
      var hasCheck = aFunction$4(set.has)
      return !iterate$6(
        iterable,
        function (value, stop) {
          if (hasCheck.call(set, value) === false) return stop()
        },
        {
          INTERRUPTED: true,
        }
      ).stopped
    },
  }
)

var $$a = _export
var IS_PURE$5 = isPure
var anObject$7 = anObject$t
var getSetIterator$3 = getSetIterator$7
var iterate$5 = iterate$g // `Set.prototype.join` method
// https://github.com/tc39/proposal-collection-methods

$$a(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$5,
  },
  {
    join: function join(separator) {
      var set = anObject$7(this)
      var iterator = getSetIterator$3(set)
      var sep = separator === undefined ? ',' : String(separator)
      var result = []
      iterate$5(iterator, result.push, {
        that: result,
        IS_ITERATOR: true,
      })
      return result.join(sep)
    },
  }
)

var $$9 = _export
var IS_PURE$4 = isPure
var getBuiltIn$2 = getBuiltIn$b
var anObject$6 = anObject$t
var aFunction$3 = aFunction$f
var bind$1 = functionBindContext
var speciesConstructor$3 = speciesConstructor$7
var getSetIterator$2 = getSetIterator$7
var iterate$4 = iterate$g // `Set.prototype.map` method
// https://github.com/tc39/proposal-collection-methods

$$9(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$4,
  },
  {
    map: function map(
      callbackfn
      /* , thisArg */
    ) {
      var set = anObject$6(this)
      var iterator = getSetIterator$2(set)
      var boundFunction = bind$1(
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined,
        3
      )
      var newSet = new (speciesConstructor$3(set, getBuiltIn$2('Set')))()
      var adder = aFunction$3(newSet.add)
      iterate$4(
        iterator,
        function (value) {
          adder.call(newSet, boundFunction(value, value, set))
        },
        {
          IS_ITERATOR: true,
        }
      )
      return newSet
    },
  }
)

var $$8 = _export
var IS_PURE$3 = isPure
var anObject$5 = anObject$t
var aFunction$2 = aFunction$f
var getSetIterator$1 = getSetIterator$7
var iterate$3 = iterate$g // `Set.prototype.reduce` method
// https://github.com/tc39/proposal-collection-methods

$$8(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$3,
  },
  {
    reduce: function reduce(
      callbackfn
      /* , initialValue */
    ) {
      var set = anObject$5(this)
      var iterator = getSetIterator$1(set)
      var noInitial = arguments.length < 2
      var accumulator = noInitial ? undefined : arguments[1]
      aFunction$2(callbackfn)
      iterate$3(
        iterator,
        function (value) {
          if (noInitial) {
            noInitial = false
            accumulator = value
          } else {
            accumulator = callbackfn(accumulator, value, value, set)
          }
        },
        {
          IS_ITERATOR: true,
        }
      )
      if (noInitial)
        throw TypeError('Reduce of empty set with no initial value')
      return accumulator
    },
  }
)

var $$7 = _export
var IS_PURE$2 = isPure
var anObject$4 = anObject$t
var bind = functionBindContext
var getSetIterator = getSetIterator$7
var iterate$2 = iterate$g // `Set.prototype.some` method
// https://github.com/tc39/proposal-collection-methods

$$7(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$2,
  },
  {
    some: function some(
      callbackfn
      /* , thisArg */
    ) {
      var set = anObject$4(this)
      var iterator = getSetIterator(set)
      var boundFunction = bind(
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined,
        3
      )
      return iterate$2(
        iterator,
        function (value, stop) {
          if (boundFunction(value, value, set)) return stop()
        },
        {
          IS_ITERATOR: true,
          INTERRUPTED: true,
        }
      ).stopped
    },
  }
)

var $$6 = _export
var IS_PURE$1 = isPure
var getBuiltIn$1 = getBuiltIn$b
var anObject$3 = anObject$t
var aFunction$1 = aFunction$f
var speciesConstructor$2 = speciesConstructor$7
var iterate$1 = iterate$g // `Set.prototype.symmetricDifference` method
// https://github.com/tc39/proposal-set-methods

$$6(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE$1,
  },
  {
    symmetricDifference: function symmetricDifference(iterable) {
      var set = anObject$3(this)
      var newSet = new (speciesConstructor$2(set, getBuiltIn$1('Set')))(set)
      var remover = aFunction$1(newSet['delete'])
      var adder = aFunction$1(newSet.add)
      iterate$1(iterable, function (value) {
        remover.call(newSet, value) || adder.call(newSet, value)
      })
      return newSet
    },
  }
)

var $$5 = _export
var IS_PURE = isPure
var getBuiltIn = getBuiltIn$b
var anObject$2 = anObject$t
var aFunction = aFunction$f
var speciesConstructor$1 = speciesConstructor$7
var iterate = iterate$g // `Set.prototype.union` method
// https://github.com/tc39/proposal-set-methods

$$5(
  {
    target: 'Set',
    proto: true,
    real: true,
    forced: IS_PURE,
  },
  {
    union: function union(iterable) {
      var set = anObject$2(this)
      var newSet = new (speciesConstructor$1(set, getBuiltIn('Set')))(set)
      iterate(iterable, aFunction(newSet.add), {
        that: newSet,
      })
      return newSet
    },
  }
)

var $$4 = _export
var isObject = isObject$c
var isArray = isArray$3
var toAbsoluteIndex = toAbsoluteIndex$2
var toLength$3 = toLength$9
var toIndexedObject$1 = toIndexedObject$7
var createProperty = createProperty$2
var wellKnownSymbol$1 = wellKnownSymbol$i
var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$4
var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('slice')
var SPECIES$1 = wellKnownSymbol$1('species')
var nativeSlice = [].slice
var max$1 = Math.max // `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects

$$4(
  {
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT$1,
  },
  {
    slice: function slice(start, end) {
      var O = toIndexedObject$1(this)
      var length = toLength$3(O.length)
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
          Constructor = Constructor[SPECIES$1]
          if (Constructor === null) Constructor = undefined
        }

        if (Constructor === Array || Constructor === undefined) {
          return nativeSlice.call(O, k, fin)
        }
      }

      result = new (Constructor === undefined ? Array : Constructor)(
        max$1(fin - k, 0)
      )

      for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k])

      result.length = n
      return result
    },
  }
)

var DESCRIPTORS = descriptors
var objectKeys = objectKeys$2
var toIndexedObject = toIndexedObject$7
var propertyIsEnumerable = objectPropertyIsEnumerable.f // `Object.{ entries, values }` methods implementation

var createMethod = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it)
    var keys = objectKeys(O)
    var length = keys.length
    var i = 0
    var result = []
    var key

    while (length > i) {
      key = keys[i++]

      if (!DESCRIPTORS || propertyIsEnumerable.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key])
      }
    }

    return result
  }
}

var objectToArray = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod(false),
}

var $$3 = _export
var $entries = objectToArray.entries // `Object.entries` method
// https://tc39.es/ecma262/#sec-object.entries

$$3(
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

var $$2 = _export
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f
var toLength$2 = toLength$9
var notARegExp = notARegexp
var requireObjectCoercible$2 = requireObjectCoercible$7
var correctIsRegExpLogic = correctIsRegexpLogic

var $startsWith = ''.startsWith
var min$2 = Math.min
var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith') // https://github.com/zloirock/core-js/pull/702

var MDN_POLYFILL_BUG =
  !CORRECT_IS_REGEXP_LOGIC &&
  !!(function () {
    var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith')
    return descriptor && !descriptor.writable
  })() // `String.prototype.startsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.startswith

$$2(
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
      var that = String(requireObjectCoercible$2(this))
      notARegExp(searchString)
      var index = toLength$2(
        min$2(arguments.length > 1 ? arguments[1] : undefined, that.length)
      )
      var search = String(searchString)
      return $startsWith
        ? $startsWith.call(that, search, index)
        : that.slice(index, index + search.length) === search
    },
  }
)

var regexpStickyHelpers = {}

var fails$1 = fails$f // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.

function RE(s, f) {
  return RegExp(s, f)
}

regexpStickyHelpers.UNSUPPORTED_Y = fails$1(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y')
  re.lastIndex = 2
  return re.exec('abcd') != null
})
regexpStickyHelpers.BROKEN_CARET = fails$1(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy')
  re.lastIndex = 2
  return re.exec('str') != null
})

/* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */

/* eslint-disable regexp/no-useless-quantifier -- testing */

var regexpFlags = regexpFlags$1
var stickyHelpers$1 = regexpStickyHelpers
var shared = shared$4.exports
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

var UNSUPPORTED_Y$1 =
  stickyHelpers$1.UNSUPPORTED_Y || stickyHelpers$1.BROKEN_CARET // nonparticipating capturing group, copied from es5-shim's String#split patch.

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

var regexpExec$3 = patchedExec

var $$1 = _export
var exec = regexpExec$3 // `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec

$$1(
  {
    target: 'RegExp',
    proto: true,
    forced: /./.exec !== exec,
  },
  {
    exec: exec,
  }
)

var redefine = redefine$7.exports
var regexpExec$2 = regexpExec$3
var fails = fails$f
var wellKnownSymbol = wellKnownSymbol$i
var createNonEnumerableProperty = createNonEnumerableProperty$7
var SPECIES = wellKnownSymbol('species')
var RegExpPrototype = RegExp.prototype
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
        var $exec = regexp.exec

        if ($exec === regexpExec$2 || $exec === RegExpPrototype.exec) {
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
        REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:
          REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,
      }
    )
    var stringMethod = methods[0]
    var regexMethod = methods[1]
    redefine(String.prototype, KEY, stringMethod)
    redefine(
      RegExpPrototype,
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

  if (sham) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true)
}

var charAt = stringMultibyte.charAt // `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex

var advanceStringIndex$2 = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1)
}

var toObject = toObject$6
var floor = Math.floor
var replace = ''.replace
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g // `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution

var getSubstitution$1 = function (
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

  return replace.call(replacement, symbols, function (match, ch) {
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
          var f = floor(n / 10)
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

var classof = classofRaw$1
var regexpExec$1 = regexpExec$3 // `RegExpExec` abstract operation
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

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver')
  }

  return regexpExec$1.call(R, S)
}

var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic
var anObject$1 = anObject$t
var toLength$1 = toLength$9
var toInteger = toInteger$4
var requireObjectCoercible$1 = requireObjectCoercible$7
var advanceStringIndex$1 = advanceStringIndex$2
var getSubstitution = getSubstitution$1
var regExpExec = regexpExecAbstract
var max = Math.max
var min$1 = Math.min

var maybeToString = function (it) {
  return it === undefined ? it : String(it)
} // @@replace logic

fixRegExpWellKnownSymbolLogic$1(
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
      // https://tc39.es/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible$1(this)
        var replacer =
          searchValue == undefined ? undefined : searchValue[REPLACE]
        return replacer !== undefined
          ? replacer.call(searchValue, O, replaceValue)
          : nativeReplace.call(String(O), searchValue, replaceValue)
      }, // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (regexp, replaceValue) {
        if (
          (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
          (typeof replaceValue === 'string' &&
            replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
        ) {
          var res = maybeCallNative(nativeReplace, regexp, this, replaceValue)
          if (res.done) return res.value
        }

        var rx = anObject$1(regexp)
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
          var result = regExpExec(rx, S)
          if (result === null) break
          results.push(result)
          if (!global) break
          var matchStr = String(result[0])
          if (matchStr === '')
            rx.lastIndex = advanceStringIndex$1(
              S,
              toLength$1(rx.lastIndex),
              fullUnicode
            )
        }

        var accumulatedResult = ''
        var nextSourcePosition = 0

        for (var i = 0; i < results.length; i++) {
          result = results[i]
          var matched = String(result[0])
          var position = max(min$1(toInteger(result.index), S.length), 0)
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
    ]
  }
)

var $ = _export
var $filter = arrayIteration.filter
var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$4
var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter') // `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species

$(
  {
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT,
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

var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic
var isRegExp = isRegexp
var anObject = anObject$t
var requireObjectCoercible = requireObjectCoercible$7
var speciesConstructor = speciesConstructor$7
var advanceStringIndex = advanceStringIndex$2
var toLength = toLength$9
var callRegExpExec = regexpExecAbstract
var regexpExec = regexpExec$3
var stickyHelpers = regexpStickyHelpers
var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y
var arrayPush = [].push
var min = Math.min
var MAX_UINT32 = 0xffffffff // @@split logic

fixRegExpWellKnownSymbolLogic(
  'split',
  2,
  function (SPLIT, nativeSplit, maybeCallNative) {
    var internalSplit

    if (
      'abbc'.split(/(b)*/)[1] == 'c' || // eslint-disable-next-line regexp/no-empty-group -- required for testing
      'test'.split(/(?:)/, -1).length != 4 ||
      'ab'.split(/(?:ab)*/).length != 2 ||
      '.'.split(/(.?)(.?)/).length != 4 || // eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
      '.'.split(/()()/).length > 1 ||
      ''.split(/.?/).length
    ) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function (separator, limit) {
        var string = String(requireObjectCoercible(this))
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0
        if (lim === 0) return []
        if (separator === undefined) return [string] // If `separator` is not a regex, use native split

        if (!isRegExp(separator)) {
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
      // https://tc39.es/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = requireObjectCoercible(this)
        var splitter = separator == undefined ? undefined : separator[SPLIT]
        return splitter !== undefined
          ? splitter.call(separator, O, limit)
          : internalSplit.call(String(O), separator, limit)
      }, // `RegExp.prototype[@@split]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
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
          (UNSUPPORTED_Y ? 'g' : 'y') // ^(? + rx + ) is needed, in combination with some S slicing, to
        // simulate the 'y' flag.

        var splitter = new C(
          UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx,
          flags
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
          var z = callRegExpExec(splitter, UNSUPPORTED_Y ? S.slice(q) : S)
          var e

          if (
            z === null ||
            (e = min(
              toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)),
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
  UNSUPPORTED_Y
)

var isPartial = function isPartial(file) {
  return file[0] === '_'
}

var extensions = ['scss', 'css', 'sass'].map(function (extension) {
  return '.'.concat(extension)
})

var hasExtension = function hasExtension(file) {
  return extensions.includes(path__default['default'].extname(file))
}

var unique = function unique(array) {
  return _toConsumableArray(new Set(array))
}

function getDirectories(directories, file) {
  directories = directories.map(function (directory) {
    return path__default['default'].join(directory, file)
  })

  if (path__default['default'].isAbsolute(file)) {
    directories.push(file)
  }

  return directories.map(function (directory) {
    return path__default['default'].dirname(directory)
  })
}

function possibleFileNames(file) {
  var fileName = path__default['default'].basename(file)
  var fileNames = [fileName]

  if (!isPartial(fileName)) {
    fileNames.unshift('_'.concat(fileName))
  }

  return hasExtension(fileName)
    ? fileNames
    : cartesianProduct__default['default']([fileNames, extensions]).map(
        function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            fileName = _ref2[0],
            extension = _ref2[1]

          return fileName + extension
        }
      )
}

function getFiles(directories, file) {
  directories = getDirectories(directories, file)
  var fileNames = possibleFileNames(file)
  var files = cartesianProduct__default['default']([
    directories,
    fileNames,
  ]).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      directory = _ref4[0],
      fileName = _ref4[1]

    return path__default['default'].join(directory, fileName)
  })
  return unique(files)
}

function resolveInDirectories(_ref5) {
  var includePaths = _ref5.includePaths,
    _ref5$cache = _ref5.cache,
    cache = _ref5$cache === void 0 ? {} : _ref5$cache,
    _ref5$alias = _ref5.alias,
    alias = _ref5$alias === void 0 ? {} : _ref5$alias
  return function (file, previous) {
    var cacheKey = ''
      .concat(path__default['default'].normalize(previous), '|')
      .concat(file)

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
          _path = _Object$entries$_i[1]

        if (file.startsWith(aliasName)) {
          file = file.replace(aliasName, ''.concat(_path, '/'))
        }
      }

      files = getFiles(
        [path__default['default'].dirname(previous)].concat(
          _toConsumableArray(includePaths),
          [process.cwd()]
        ),
        file
      )
    }

    var results = files
      .map(function (file) {
        try {
          return {
            file: file,
            contents: fs__default['default'].readFileSync(file, 'utf8'),
          }
        } catch (_unused) {
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
              .map(function (_ref6) {
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
              .map(function (_ref7) {
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
  description: 'A fis plugin to parse sass with dart-sass.',
  keywords: ['scss', 'sass', 'dart-sass'],
  dependencies: ['sass', 'fast-cartesian-product'],
  options: {
    outputStyle: 'expanded',
    sourceMapContents: true,
    sourceMap: false,
    omitSourceMapUrl: false,
  },
  links: {
    sass: 'http://sass-lang.com/',
    'dart-sass': 'https://github.com/sass/dart-sass/',
  },
}

var _global = global,
  fis = _global.fis
var PROJECT_ROOT = fis.project.getProjectPath()

function normalizeIncludePath(directories) {
  return directories.reduce(function (all, directory) {
    var directories_ = []

    if (
      path__default['default'].isAbsolute(directory) &&
      directory[0] !== '/'
    ) {
      directories_.push(directory)
    } else {
      directories_.push(
        directory,
        path__default['default'].join(PROJECT_ROOT, directory),
        path__default['default'].join(process$1.cwd(), directory)
      )
    }

    return [].concat(_toConsumableArray(all), directories_)
  }, [])
}

function process$1(content, file, config) {
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
  includePaths = [path__default['default'].dirname(file.realpath)].concat(
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

  var options = _objectSpread2(
    _objectSpread2({}, config),
    {},
    {
      includePaths: includePaths.map(function (directory) {
        return url.pathToFileURL(directory).href
      }),
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
    }
  )

  delete options.outFile
  var result

  try {
    result = sass__default['default'].renderSync(options)
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

module.exports = exportPlugin(process$1, info)
