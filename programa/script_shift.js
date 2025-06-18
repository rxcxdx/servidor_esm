import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb://localhost:27017')
await client.connect()
const collection = client.db('app_database').collection('vendas')
const doc = await collection.findOne({}, { sort: [['dt', -1]] })
await collection.deleteOne({ _id: doc._id })
await client.close()
