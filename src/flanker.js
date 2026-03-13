import assert from 'node:assert/strict'
import { MongoClient } from 'mongodb'
import config from 'config'
import { logger } from './logger.js'
import check from 'check-types'

const url = config.get('dbConfig.url')
const client = new MongoClient(url, { serverSelectionTimeoutMS: 3000 })
const dbName = config.get('dbConfig.dbName')

try {
  logger.debug('conectando mongo...')
  await client.connect()
} catch {
  logger.error('mongo nao conectado no servidor')
}

const db = client.db(dbName)
const collection = db.collection('vendas')

async function getVendas(a, b) {
  check.assert.date(a, 'flanker getVendas recebeu errado a')
  check.assert.date(b, 'flanker getVendas recebeu errado b')
  logger.debug(a)
  logger.debug(b)
  const query = {
    dt: {
      $gte: a,
      $lte: b
    }
  }
  const rs = await collection.find(query).toArray()
  return rs
}

async function getVenda(_id) {
  const registro = await collection.findOne({ _id })
  assert(registro, 'venda não existe')
  return registro
}

async function gravarVenda(o) {
  await collection.insertOne(o)
}

async function getTimelineVendas() {
  const options = {
    limit: 100,
    projection: {
      cart: false
    },
    sort: [['dt', -1]]
  }
  const rs = await collection.find({}, options).toArray()
  return rs
}

async function apagarVenda(_id) {
  const { deletedCount } = await collection.deleteOne({ _id })
  assert(deletedCount, 'nada foi apagado')
}

async function editarDt(formulario) {
  const filtro = { _id: formulario._id }
  const modificar = {
    $set: { dt: formulario.dt }
  }
  const { modifiedCount } = await collection.updateOne(filtro, modificar)
  assert(modifiedCount, 'nada foi alterado')
}

export default {
  getVenda,
  getVendas,
  gravarVenda,
  getTimelineVendas,
  apagarVenda,
  editarDt
}
