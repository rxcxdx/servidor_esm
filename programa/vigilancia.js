import assert from 'node:assert/strict'
import { schemaVenda } from '../src/schemas.js'
import { MongoClient } from 'mongodb'
const client = new MongoClient('mongodb://localhost:27017')
await client.connect()
const collection = client.db('app_database').collection('vendas')
try {
  const registros = await collection.find({}).toArray()
  registros.forEach((o) => {
    assert(schemaVenda.isValidSync(o, { strict: true }), o._id)
  })
} catch (e) {
  console.log('coleção é INVALIDA iteração interrompida!')
  console.log(e.message)
} finally {
  await client.close()
}
