import { Produto } from '../src/eagle.js'
import check from 'check-types'
import yargs from 'yargs'

const { id } = yargs(process.argv)
  .option('id', { type: 'string', demandOption: true })
  .parse()

try {
  const modelo = await Produto.findByPk(id)
  check.assert(modelo, 'produto não existe')
  await modelo.destroy()
} catch (err) {
  console.log(err.message)
}