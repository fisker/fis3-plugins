import {
  html as jsBeautifier
} from 'js-beautify'

export default function(content, file, conf) {
  return content ? jsBeautifier(content, conf) : ''
}
