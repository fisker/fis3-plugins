import {render} from 'pug'

export default function(content, file, conf) {
  return content ? render(content, conf) : ''
}
