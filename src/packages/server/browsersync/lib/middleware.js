'use strict'

import path from 'path'

import morgan from 'morgan'

import bodyParser from 'body-parser'
import ydRewrite from 'yog-devtools/lib/rewrite'
import ydPreview from 'yog-devtools/lib/preview'
import ydScript from 'yog-devtools/lib/script'

import serveDirectory from 'serve-directory'
import serveDirectoryThemeOcticons from 'serve-directory-theme-octicons'

function mock(root) {
  const options = {
    view_path: '', // 避免报错。
    rewrite_file: [
      path.join(root, 'config', 'server.conf'),
      path.join(root, 'mock', 'server.conf')
    ],
    data_path: [path.join(root, 'test'), path.join(root, 'mock')]
  }

  return function(req, res, next) {
    ;[
      ydRewrite(options),
      bodyParser.urlencoded({extended: false}),
      bodyParser.json(),
      ydPreview(options),
      ydScript(options)
    ].reduceRight(function(next, middlewave) {
      return function() {
        middlewave(req, res, next)
      }
    }, next)()
  }
}

function getMiddleware(name, handler) {
  return function() {
    return {
      route: '',
      handle: handler.apply(null, arguments),
      id: `Browsersync ${name} Middleware`
    }
  }
}

export default {
  logger: getMiddleware('Logger', morgan),
  mock: getMiddleware('Mock', mock),
  directory: function(root) {
    return getMiddleware('Server Directory', serveDirectory)(
      root,
      serveDirectoryThemeOcticons
    )
  }
}
