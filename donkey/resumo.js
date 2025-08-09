//import dayjs from 'dayjs'
import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'app_database'

await client.connect()
const db = client.db(dbName)
// const collection = db.collection('vendas')

// const rs1 = await collection.countDocuments()
// console.log('linhas', rs1)
/*
const doc1 = await collection.findOne({}, { sort: [['dt', 1]] })
console.log('inicio', dayjs(doc1.dt).format())
const doc2 = await collection.findOne({}, { sort: [['dt', -1]] })
console.log('fim', dayjs(doc2.dt).format())
*/
const stats = await db.stats()
console.log(stats)
await client.close()