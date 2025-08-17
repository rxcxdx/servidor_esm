import assert from 'node:assert/strict'
import { MongoClient } from 'mongodb'
import { schemaVenda } from '../src/schemas.js'
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'app_database'
await client.connect()
const db = client.db(dbName)
const collection = db.collection('vendas')
try {  
  const registros = await collection.find({}).toArray()
  registros.forEach((o) => {
    assert(schemaVenda.isValidSync(o, { strict: true }), o._id)
  })
} catch (e) {
  console.log('coleção é INVALIDA iteração interrompida')
  console.log(e.message)
} finally {
  await client.close()
}
