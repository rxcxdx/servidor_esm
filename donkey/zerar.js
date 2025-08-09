import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'app_database'

await client.connect()
const db = client.db(dbName)
const collection = db.collection('vendas')

await collection.deleteMany({})
await client.close()
