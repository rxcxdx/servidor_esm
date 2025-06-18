import { input } from '@inquirer/prompts'
import { Produto } from '../src/eagle.js'
import check from 'check-types'

try {
  const chave = await input({ message: 'chave:', required: true })
  const deleted = await Produto.destroy({ where: { id: chave } })
  check.assert(deleted)
} catch {
  console.log('nada foi apagado')
}