import { MongoClient } from 'mongodb'
import { nanoid } from 'nanoid'

const client = new MongoClient('mongodb://localhost:27017')
await client.connect()
const collection = client.db('app_database').collection('vendas')

const dto = {
  _id: nanoid(),
  username: 'bruce',
  dt: new Date(),
  cart: [
    {
      identifier: nanoid(),
      descricao: 'fanta',
      quantidade: 1,
      valor: 1
    }
  ]
}

const { insertedId } = await collection.insertOne(dto)
console.log(insertedId)
await client.close()
