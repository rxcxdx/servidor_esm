import { faker } from '@faker-js/faker'
import construirVenda from '../src/construir-venda.js'
import { sample } from 'lodash-es'
import { MongoClient } from 'mongodb'

function novo() {
  return {
    valor: faker.number.float({ min: 5, max: 49, fractionDigits: 2 }),
    quantidade: faker.number.int({ min: 1, max: 3 }),
    descricao: faker.commerce.product(),
    obs: faker.lorem.word()
  }
}

const client = new MongoClient('mongodb://localhost:27017')
await client.connect()
const collection = client.db('app_database').collection('vendas')
const entrada = {
  username: sample(['zeca', 'bruce']),
  cart: [
    novo(),
    novo(),
    novo()
  ],
  obs: faker.lorem.word()
}
const o = construirVenda(entrada)
await collection.insertOne(o)
await client.close()


