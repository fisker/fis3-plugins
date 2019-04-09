import path from 'path'
import fs from 'fs'
import execa from 'execa'
import yargs from 'yargs'

const {fis} = global
const util = fis.require('command-server/lib/util.js')
const {argv} = yargs
const CWD = process.cwd()

// 每 0.2 秒读取子进程的输出文件。
//
// 为什么不直接通过 child.stdout 读取？
// 因为如果使用 stdio pipe 的方式去开启子进程，当 master 进程退出后，子进程再有输出就会导致程序莫名的崩溃。
// 解决办法是，让子进程的输出直接指向文件指针。
// master 每隔一段时间去读文件，获取子进程输出。
function watchOnFile(file, callback) {
  let lastIndex = 0
  let timer

  function read() {
    const stat = fs.statSync(file)

    if (stat.size !== lastIndex) {
      const fd = fs.openSync(file, 'r')
      const buffer = Buffer.alloc(stat.size - lastIndex)

      try {
        fs.readSync(fd, buffer, lastIndex, stat.size - lastIndex)
        const content = buffer.toString('utf8')
        lastIndex = stat.size

        callback(content)
      } catch (error) {
        // 从头读起
        lastIndex = 0
      }
    }

    timer = setTimeout(read, 200)
  }

  read()
  return function() {
    clearTimeout(timer)
  }
}

function start(opt, callback) {
  const defaultScript = path.join(opt.root, 'server.js')
  const script = fis.util.exists(defaultScript)
    ? defaultScript
    : path.join(__dirname, 'app.js')
  const logFile = path.join(opt.root, 'server.log')

  const timeout = Math.max(opt.timeout * 1000, 60000)
  let timeoutTimer

  const arguments_ = [
    script,
    '--root',
    opt.root || CWD,
    '--port',
    opt.port || 8080,
    '--https',
    opt.https,
    '--context',
    CWD,
    '--bs-config',
    argv.bsConfig,
  ]

  process.stdout.write('\n Starting browser-sync server ...')

  const server = execa(process.execPath, arguments_, {
    cwd: path.dirname(script),
    detached: opt.daemon,
    stdio: [
      0,
      opt.daemon ? fs.openSync(logFile, 'w') : 'pipe',
      opt.daemon ? fs.openSync(logFile, 'w+') : 'pipe',
    ],
  })

  let log = ''
  let started = false
  let error = false
  let stoper

  function onData(chunk) {
    if (started) {
      return
    }

    chunk = chunk.toString('utf8')
    log += chunk
    process.stdout.write('.')

    if (chunk.includes('Error')) {
      if (error) {
        return
      }

      error = true
      process.stdout.write(' fail.\n')

      const match = chunk.match(/Error:?\s+([^\r\n]+)/i)
      let errorMessage = 'unknown'

      if (chunk.includes('EADDRINUSE')) {
        log = ''
        errorMessage = `Address already in use:${opt.port}`
      } else if (match) {
        errorMessage = match[1]
      }

      if (log) {
        console.log(log)
      }

      if (stoper) {
        stoper()
      }

      try {
        callback(errorMessage)
      } catch (error) {
        console.log(error)
      }

      try {
        process.kill(server.pid)
      } catch (error) {}
    } else if (chunk.includes('Listening on')) {
      started = true
      if (stoper) {
        stoper()
      }
      clearTimeout(timeoutTimer)

      process.stdout.write(` at port [${opt.port}]\n`)
      callback(null)
    }
  }

  if (opt.daemon) {
    stoper = watchOnFile(logFile, onData)
    util.pid(server.pid) // save pid to file.
    server.unref()

    timeoutTimer = setTimeout(function() {
      process.stdout.write(' fail\n')
      if (log) {
        console.log(log)
      }
      fis.log.error('timeout')
    }, timeout)
  } else {
    server.stdout.on('data', onData)
    server.stderr.on('data', onData)
    server.stdout.pipe(process.stdout)
    server.stderr.pipe(process.stderr)
  }
}

module.exports = {start}
