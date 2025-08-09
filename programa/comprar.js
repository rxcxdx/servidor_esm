import { faker } from '@faker-js/faker'
import { sample } from 'lodash-es'
import { MongoClient } from 'mongodb'
import { buildBuy } from '../src/buildBuy.js'
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'app_database'
await client.connect()
const db = client.db(dbName)
const collection = db.collection('vendas')
const entrada = {
  username: sample(['zeca', 'bruce']),
  cart: [
    {
      valor: faker.number.float({ min: 5, max: 49, fractionDigits: 2 }),
      quantidade: faker.number.int({ min: 1, max: 3 }),
      descricao: faker.commerce.product().toLocaleLowerCase(),
      obs: faker.lorem.word()
    }

  ],
  obs: faker.lorem.word()
}
try {
  const o = buildBuy(entrada)
  const { insertedId } = await collection.insertOne(o)
  console.log(insertedId)
} catch (e) {
  console.log(e.message)
}
await client.close()
