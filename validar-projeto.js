import fs from 'fs'
import assert from 'node:assert/strict'

const arquivos = [
  'prettier.config.js',
  'eslint.config.js'
]

arquivos.forEach((v) => {
  assert(fs.existsSync(v), 'arquivo não existe')
})
