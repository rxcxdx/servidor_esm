import { faker } from '@faker-js/faker'
import { MongoClient } from 'mongodb'
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'app_database'
await client.connect()
const db = client.db(dbName)
const collection = db.collection('vendas')
const filtro = {
  _id: 'RQSgQENMY3-dllUaqRcsz',
  cart: { $elemMatch: { identifier: 'x-sKC1QwWhFyL4Zkhek_y' } }
}
await collection.updateOne(filtro, {
  $set: { 'cart.$.obs': faker.lorem.word() }
})
await client.close()