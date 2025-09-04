import yargs from 'yargs'
import util from 'util'
import { MongoClient } from 'mongodb'
const client = new MongoClient('mongodb://localhost:27017')
await client.connect()
const collection = client.db('app_database').collection('vendas')
const { _id } = yargs(process.argv)
  .option('_id', { type: 'string', demandOption: true, alias: 'k' })
  .parse()
const doc = await collection.findOne({ _id })
const str = util.inspect(doc, { depth: 0 })
console.log(str)
await client.close()
