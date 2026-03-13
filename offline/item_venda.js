import rcdmongo from './rcdmongo.js'
import util from 'util'

const { collection, client } = await rcdmongo()
const filtro = {
  cart: { $elemMatch: { identifier: null } }
}
const doc = await collection.findOne(filtro)
await client.close()
console.log(util.inspect(doc, { depth: 1 }))
