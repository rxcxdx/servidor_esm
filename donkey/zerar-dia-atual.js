import dayjs from 'dayjs'
import { MongoClient } from 'mongodb'
const client = new MongoClient('mongodb://localhost:27017')
await client.connect()
const collection = client.db('app_database').collection('vendas')
const filtro = {
  dt: {
    $gte: dayjs().startOf('d').toDate(),
    $lte: dayjs().endOf('d').toDate()
  }
}
await collection.deleteMany(filtro)
await client.close()
