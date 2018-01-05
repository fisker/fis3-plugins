'use strict'

var fs = require('fs')
var path = require('path')
var serveDirectory = require('serve-directory')
var serveDirectoryThemeOcticons = require('serve-directory-theme-octicons')

function getServeDirectoryMiddleWare(root) {
  return {
    route: '',
    handle: serveDirectory(root, serveDirectoryThemeOcticons),
    id: 'Browsersync Server Directory Middleware'
  }
}

module.exports = getServeDirectoryMiddleWare
