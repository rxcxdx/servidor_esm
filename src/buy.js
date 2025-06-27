import db from './conn.js'
import { schemaVenda } from './schemas2.js'

export default async function buy(entrada) {
  const venda = await schemaVenda.validate(entrada, {
    stripUnknown: true
  })
  const collection = db.collection('vendas')
  const { insertedId } = await collection.insertOne(venda)
  return insertedId
}
