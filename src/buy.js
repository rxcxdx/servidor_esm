import db from './conn.js'
import { schemaVendaBase } from './schemas.js'

export default async function buy(entrada) {
  const venda = await schemaVendaBase.validate(entrada, {
    stripUnknown: true
  })
  const collection = db.collection('vendas')
  const { insertedId } = await collection.insertOne(venda)
  return insertedId
}
