import ejs from 'ejs'

const PROJECT_ROOT = fis.project.getProjectPath()

module.exports = function (content, file, conf) {
  if (file.filename[0] === '_') {
    return content
  }

  const data = conf.data
  const options = conf.options

  options.root = PROJECT_ROOT
  options.filename = file.realpath
  options.cache = false

  content = ejs.render(content, data, options)

  return content
}
