import util from 'util'
import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'app_database'

await client.connect()
const db = client.db(dbName)
const collection = db.collection('vendas')

const doc = await collection.findOne({}, { sort: [['dt', -1]] })
console.log(util.inspect(doc, { depth: 0 }))
await client.close()

