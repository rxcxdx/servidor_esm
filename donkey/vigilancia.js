import rcdmongo from './rcdmongo.js'
import { schemaVenda } from '../src/schemas.js'
import check from 'check-types'

const { collection, client } = await rcdmongo()

try {
  const registros = await collection.find({}).toArray()
  registros.forEach((o) => {
    check.assert(
      schemaVenda.isValidSync(o, { strict: true }),
      'REGISTRO INVÁLIDO'
    )
  })
} catch (e) {
  console.log('coleção é INVALIDA iteração interrompida!')
  console.log(e.name)
  console.log(e.message)
} finally {
  await client.close()
}
