import util from 'util'
import { MongoClient } from 'mongodb'
import check from 'check-types'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const client = new MongoClient('mongodb://localhost:27017')
try {
  const { id } = yargs(hideBin(process.argv))
    .option('id', { type: 'string', demandOption: true })
    .parse()
  await client.connect()
  const collection = client.db('app_database').collection('vendas')
  const doc = await collection.findOne({ _id: id })
  check.assert(doc, 'doc não existe')
  console.log(util.inspect(doc, { depth: 2 }))
} catch (err) {
  console.log(err.message)
} finally {
  await client.close()
}
