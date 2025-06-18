import { MongoClient } from 'mongodb'

describe('cart', () => {
  it('identifier', async () => {
    const client = new MongoClient('mongodb://localhost:27017')
    await client.connect()
    const collection = client.db('app_database').collection('vendas')
    const v = await collection.countDocuments({
      cart: { $elemMatch: { identifier: { $not: { $type: 'string' } } } }
    })
    await client.close()
    expect(v).toBe(0)
  })

  it('valor', async () => {
    const client = new MongoClient('mongodb://localhost:27017')
    await client.connect()
    const collection = client.db('app_database').collection('vendas')
    const v = await collection.countDocuments({
      cart: { $elemMatch: { valor: { $not: { $type: 'number' } } } }
    })
    await client.close()
    expect(v).toBe(0)
  })

  it('quantidade', async () => {
    const client = new MongoClient('mongodb://localhost:27017')
    await client.connect()
    const collection = client.db('app_database').collection('vendas')
    const v = await collection.countDocuments({
      cart: { $elemMatch: { quantidade: { $not: { $type: 'number' } } } }
    })
    await client.close()
    expect(v).toBe(0)
  })
})
