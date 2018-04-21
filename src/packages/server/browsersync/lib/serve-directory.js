'use strict'

import path from 'path'
import fs from 'fs'
import serveDirectory from 'serve-directory'
import serveDirectoryThemeOcticons from 'serve-directory-theme-octicons'

function getServeDirectoryMiddleWare(root) {
  return {
    route: '',
    handle: serveDirectory(root, serveDirectoryThemeOcticons),
    id: 'Browsersync Server Directory Middleware'
  }
}

export default getServeDirectoryMiddleWare
