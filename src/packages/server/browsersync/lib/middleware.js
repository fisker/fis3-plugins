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
      path.join(root, 'server.conf'),
      path.join(root, 'config', 'server.conf'),
      path.join(root, 'mock', 'server.conf'),
    ],
    data_path: [path.join(root, 'test'), path.join(root, 'mock')],
  }

  return function (request, response, next) {
    ;[
      ydRewrite(options),
      bodyParser.urlencoded({extended: false}),
      bodyParser.json(),
      ydPreview(options),
      ydScript(options),
    ].reduceRight(
      (next, middleware) =>
        function () {
          middleware(request, response, next)
        },
      next
    )()
  }
}

function getMiddleware(name, handler) {
  return function (...arguments_) {
    return {
      route: '',
      handle: handler(...arguments_),
      id: `Browsersync ${name} Middleware`,
    }
  }
}

export default {
  logger: getMiddleware('Logger', morgan),
  mock: getMiddleware('Mock', mock),
  directory(root) {
    return getMiddleware('Server Directory', serveDirectory)(
      root,
      serveDirectoryThemeOcticons
    )
  },
}
