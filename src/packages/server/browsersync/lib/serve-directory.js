'use strict'

var fs = require('fs')
var path = require('path')
var serveDirectory = require('serve-directory')
var filesize = require('filesize')

var iconColor = '#6a737d'
var icons = 'directory file media'.split(' ')

var btoa =
  global.btoa ||
  function(str) {
    return new Buffer(str).toString('base64')
  }

function readStaticFile(file) {
  return fs
    .readFileSync(path.join(__dirname, '..', 'public', file), 'utf-8')
    .trim()
}

function getIconStyle(icons, iconColor) {
  return icons
    .map(function(iconName) {
      var svg = readStaticFile('icon/' + iconName + '.svg')
      svg = svg.replace('<svg ', '<svg fill="' + iconColor + '" ')
      var img = 'data:image/svg+xml;base64,' + btoa(svg)
      // ie can't recognize
      // var img = 'url(data:image/svg+xml;utf8,' + encodeURIComponent(svg)
      return '.file__icon_' + iconName + '{background-image:url(' + img + ')}'
    })
    .join('')
}

var config = {
  template: readStaticFile('directory.html').replace(/>\s*</g, '><'),
  style: readStaticFile('style.css') + getIconStyle(icons, iconColor),
  filesize: filesize
}

function getServeDirectoryMiddleWare(root) {
  return {
    route: '',
    handle: serveDirectory(root, config),
    id: 'Browsersync Server Directory Middleware'
  }
}

module.exports = getServeDirectoryMiddleWare
