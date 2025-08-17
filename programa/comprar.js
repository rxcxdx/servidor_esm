import { faker } from '@faker-js/faker'
import { MongoClient } from 'mongodb'
import construirVenda from '../src/construirVenda.js'
import dayjs from 'dayjs'

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'app_database'
await client.connect()
const db = client.db(dbName)
const collection = db.collection('vendas')
const entrada = {
  username: 'zeca',
  cart: [
    {
      valor: faker.number.float({ min: 5, max: 49, fractionDigits: 2 }),
      quantidade: faker.number.int({ min: 1, max: 3 }),
      descricao: faker.commerce.product().toLocaleLowerCase(),
      obs: faker.lorem.word()
    },
    {
      valor: faker.number.float({ min: 5, max: 49, fractionDigits: 2 }),
      quantidade: faker.number.int({ min: 1, max: 3 }),
      descricao: faker.commerce.product().toLocaleLowerCase(),
      obs: faker.lorem.word()
    }
  ],
  obs: faker.lorem.word(),
  dt: dayjs('2025-08-01T10:00:00-03:00').toDate()
}
const o = construirVenda(entrada)
await collection.insertOne(o)
await client.close()
