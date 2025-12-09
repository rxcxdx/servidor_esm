import rcdmongo from './rcdmongo.js'

const ENTRADA = {
  _id: 'D_hrcrl3QZ-VjKZuI-k4P'
}

const { collection, client } = await rcdmongo()
const rs = await collection.deleteOne({ _id: ENTRADA._id })
console.log(rs)
await client.close()
