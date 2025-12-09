import { faker } from '@faker-js/faker'
import rcdmongo from './rcdmongo.js'

const ENTRADA = {
  _id: 'hoLdFIf9J3PwSiGUsaOSp',
  identifier: 'e0GcLWnLnDQ5jnKFd0-R1'
}

const { collection, client } = await rcdmongo()

const filtro = {
  _id: ENTRADA._id,
  'cart.identifier': ENTRADA.identifier
}

await collection.updateOne(filtro, {
  $set: { 'cart.$.obs': faker.lorem.word() }
})

await client.close()