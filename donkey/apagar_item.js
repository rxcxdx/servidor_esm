import rcdmongo from './rcdmongo.js'

const ENTRADA = {
  _id: 'D_hrcrl3QZ-VjKZuI-k4P',
  identifier: '6QxXRGAQXGnQcTSgDCxtH'
}

const { collection, client } = await rcdmongo()
const filtro = {
  _id: ENTRADA._id,
  'cart.identifier': ENTRADA.identifier
}
const modificar = {
  $pull: { cart: { identifier: ENTRADA.identifier } }
}
const rs = await collection.updateOne(filtro, modificar)
console.log(rs)
await client.close()
