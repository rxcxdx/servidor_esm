import { MongoClient } from 'mongodb'
import util from 'util'

const client = new MongoClient('mongodb://localhost:27017')
await client.connect()
const collection = client.db('app_database').collection('vendas')
const doc = await collection.findOne({}, { sort: [['dt', -1]] })
console.log(util.inspect(doc, { depth: 0 }))
await client.close()
