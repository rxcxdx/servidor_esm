import { faker } from '@faker-js/faker'
import rcdmongo from './rcdmongo.js'

const ENTRADA = {
  _id: 'hoLdFIf9J3PwSiGUsaOSp'
}

const { collection, client } = await rcdmongo()
await collection.updateOne(
  { _id: ENTRADA._id },
  { $set: { obs: faker.lorem.word() } }
)
await client.close()
