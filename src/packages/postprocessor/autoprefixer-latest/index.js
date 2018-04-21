import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

export default function(content, file, conf) {
  return postcss([autoprefixer(conf)]).process(content).css
}
