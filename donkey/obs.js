import rcdmongo from './rcdmongo.js'
import { faker } from '@faker-js/faker'

const _ID = 'b0ad8e10-b532-42e6-a141-769395ab3b29'
const OBS = faker.lorem.word()
const { collection, client } = await rcdmongo()
const filtro = {
  _id: _ID
}
const modificar = {
  $set: { obs: OBS }
}
await collection.updateOne(filtro, modificar)
await client.close()
