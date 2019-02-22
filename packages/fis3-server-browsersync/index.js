"use strict";

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _child_process = require("child_process");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _global = global,
    fis = _global.fis;

var util = fis.require('command-server/lib/util.js'); // 每 0.2 秒读取子进程的输出文件。
//
// 为什么不直接通过 child.stdout 读取？
// 因为如果使用 stdio pipe 的方式去开启子进程，当 master 进程退出后，子进程再有输出就会导致程序莫名的崩溃。
// 解决办法是，让子进程的输出直接指向文件指针。
// master 每隔一段时间去读文件，获取子进程输出。


function watchOnFile(filepath, callback) {
  var lastIndex = 0;
  var timer;

  function read() {
    var stat = _fs.default.statSync(filepath);

    if (stat.size !== lastIndex) {
      var fd = _fs.default.openSync(filepath, 'r');

      var buffer = Buffer.from(stat.size - lastIndex);

      try {
        _fs.default.readSync(fd, buffer, lastIndex, stat.size - lastIndex);

        var content = buffer.toString('utf8');
        lastIndex = stat.size;
        callback(content);
      } catch (error) {
        // 从头读起
        lastIndex = 0;
      }
    }

    timer = setTimeout(read, 200);
  }

  read();
  return function () {
    clearTimeout(timer);
  };
}

function start(opt, callback) {
  var script = _path.default.join(opt.root, 'server.js');

  if (!fis.util.exists(script)) {
    script = _path.default.join(__dirname, 'app.js');
  }

  var timeout = Math.max(opt.timeout * 1000, 60000);
  var timeoutTimer;
  var args = [script];

  if (opt['bs-config']) {
    var bsConfig = _path.default.join(process.cwd(), "".concat(opt['bs-config']));

    if (fis.util.exists(bsConfig)) {
      opt['bs-config'] = bsConfig;
    } else {
      delete opt['bs-config'];
    }
  }

  opt.context = process.cwd(); // 把 options 通过 args 传给 app 程序。

  fis.util.map(opt, function (key, value) {
    args.push("--".concat(key), String(value));
  });
  process.stdout.write('\n Starting fis-server .');

  var logFile = _path.default.join(opt.root, 'server.log');

  var server = (0, _child_process.spawn)(process.execPath, args, {
    cwd: _path.default.dirname(script),
    detached: opt.daemon,
    stdio: [0, opt.daemon ? _fs.default.openSync(logFile, 'w') : 'pipe', opt.daemon ? _fs.default.openSync(logFile, 'w+') : 'pipe']
  });
  var log = '';
  var started = false;
  var error = false;
  var stoper;

  function onData(chunk) {
    if (started) {
      return;
    }

    chunk = chunk.toString('utf8');
    log += chunk;
    process.stdout.write('.');

    if (chunk.indexOf('Error') !== -1) {
      if (error) {
        return;
      }

      error = true;
      process.stdout.write(' fail.\n');
      var match = chunk.match(/Error:?\s+([^\r\n]+)/i);
      var errMsg = 'unknown';

      if (chunk.indexOf('EADDRINUSE') !== -1) {
        log = '';
        errMsg = "Address already in use:".concat(opt.port);
      } else if (match) {
        errMsg = match[1];
      }

      if (log) {
        console.log(log);
      }

      if (stoper) {
        stoper();
      }

      try {
        callback(errMsg);
      } catch (error) {
        console.log(error);
      } // try {
      //   process.kill(server.pid, 'SIGKILL');
      // } catch (e) {}

    } else if (chunk.indexOf('Listening on') !== -1) {
      started = true;

      if (stoper) {
        stoper();
      }

      clearTimeout(timeoutTimer);
      process.stdout.write(" at port [".concat(opt.port, "]\n"));
      callback(null);
    }
  }

  if (opt.daemon) {
    stoper = watchOnFile(logFile, onData);
    util.pid(server.pid); // save pid to file.

    server.unref();
    timeoutTimer = setTimeout(function () {
      process.stdout.write(' fail\n');

      if (log) {
        console.log(log);
      }

      fis.log.error('timeout');
    }, timeout);
  } else {
    server.stdout.on('data', onData);
    server.stderr.on('data', onData);
    server.stdout.pipe(process.stdout);
    server.stderr.pipe(process.stderr);
  }
}

module.exports = {
  start: start
};