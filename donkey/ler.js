import yargs from 'yargs'
import util from 'util'
import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'app_database'

await client.connect()
const db = client.db(dbName)
const collection = db.collection('vendas')

const { _id, depth } = yargs(process.argv)
  .option('_id', { type: 'string', demandOption: true, alias: 'k' })
  .option('depth', { type: 'number', alias: 'd', default: 0 })
  .parse()

const doc = await collection.findOne({ _id })
const str = util.inspect(doc, { depth })
console.log(str)
