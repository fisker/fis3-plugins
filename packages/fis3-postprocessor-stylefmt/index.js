'use strict'

var info = {
  description: 'a css formatter of fis3 based on stylefmt.',
  keywords: [],
  options: {},
  links: {
    stylefmt: 'https://github.com/morishitter/stylefmt',
  },
}
var info_3 = info.options

module.exports = function() {
  throw new Error('use prettier instead of stylefmt')
}

module.exports.defaultOptions = info_3
