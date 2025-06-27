import buildVenda2 from './src/buildVenda2.js'
import util from 'util'
import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb://localhost:27017')

try {
  await client.connect()
  const collection = client.db('app_database').collection('vendas')
  const registro = await collection.findOne({ _id: 'l39XX0yexzsQPYQp45lmR' })
  const o = buildVenda2(registro)
  console.log(util.inspect(o, { depth: 2 }))
} catch (error) {
  console.log(error.message)
} finally {
  await client.close()
}
