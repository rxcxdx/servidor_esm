import { MongoClient } from 'mongodb'
import dayjs from 'dayjs'

const client = new MongoClient('mongodb://localhost:27017')
await client.connect()
const collection = client.db('app_database').collection('vendas')
const rs1 = await collection.countDocuments({})
console.log('linhas', rs1)
const doc1 = await collection.findOne({}, { sort: [['dt', 1]] })
console.log('inicio', dayjs(doc1.dt).format())
const doc2 = await collection.findOne({}, { sort: [['dt', -1]] })
console.log('fim', dayjs(doc2.dt).format())
await client.close()
