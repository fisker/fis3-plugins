import _ from 'lodash'

module.exports = function (content, file, conf) {
  const data = conf.data
  const options = conf.options

  const compiled = _.template(content, options)

  content = compiled(data)

  return content
}
