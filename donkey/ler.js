import yargs from 'yargs'
import util from 'util'
import { MongoClient } from 'mongodb'
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'app_database'
await client.connect()
const db = client.db(dbName)
const collection = db.collection('vendas')

const { _id } = yargs(process.argv)
  .option('_id', { type: 'string', demandOption: true, alias: 'k' })
  .parse()

  const doc = await collection.findOne({ _id })
const str = util.inspect(doc, { depth: 2 })
console.log(str)
await client.close()
