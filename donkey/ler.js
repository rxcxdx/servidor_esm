import minimist from 'minimist'
import rcdmongo from './rcdmongo.js'
import util from 'util'
import check from 'check-types'

const argv = minimist(process.argv, {
  default: { _id: null }
})

const { collection, client } = await rcdmongo()
try {
  const doc = await collection.findOne({ _id: argv._id })
  check.assert(doc, 'venda não existe')
  const str = util.inspect(doc, { depth: 0 })
  console.log(str)
} catch (e) {
  console.log(e.message)
} finally {
  await client.close()
}
