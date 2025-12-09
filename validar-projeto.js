import fs from 'fs'
import check from 'check-types'

const arquivos = [
  'prettier.config.js',
  'eslint.config.js'
  // etc...
]

arquivos.forEach((v) => {
  check.assert(fs.existsSync(v), 'arquivo não existe')
})
