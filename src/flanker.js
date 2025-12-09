import { MongoClient } from 'mongodb'
import config from 'config'
import { logger } from './logger.js'
import check from 'check-types'
import { validarVenda } from './utils.js'

const url = config.get('dbConfig.url')
const client = new MongoClient(url, { serverSelectionTimeoutMS: 3000 })
const dbName = config.get('dbConfig.dbName')

try {
  logger.info('conectando mongo no servidor...')
  await client.connect()
} catch {
  logger.error('mongo nao conectado no servidor')
}

const db = client.db(dbName)
const collection = db.collection('vendas')

export async function getVendasPorRange(gte, lte) {
  check.assert.date(gte)
  check.assert.date(lte)
  const query = {
    dt: {
      $gte: gte,
      $lte: lte
    }
  }
  const rs = await collection.find(query).toArray()
  return rs
}

export async function getVenda(v) {
  const rs = await collection.findOne({ _id: v })
  check.assert(rs, 'venda não existe')
  return rs
}

export async function gravarVenda(body) {
  const o = validarVenda(body)
  await collection.insertOne(o)
  return { _id: o._id, dt: o.dt }
}

export async function getTimeline() {
  const options = {
    sort: [['dt', -1]],
    limit: 30,
    projection: {
      dt: true,
      _id: true,
      username: true,
      obs: true
    }
  }
  const rs = await collection.find({}, options).toArray()
  return rs
}
