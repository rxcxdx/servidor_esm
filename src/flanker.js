import { MongoClient } from 'mongodb'
import config from 'config'
import { logger } from './logger.js'
import assert from 'node:assert/strict'
import { formatISO,parseISO,startOfDay,endOfDay } from 'date-fns'
import cleanDeep from 'clean-deep'

const url = config.get('dbConfig.url')
export const client = new MongoClient(url, { serverSelectionTimeoutMS: 3000 })
const dbName = config.get('dbConfig.dbName')

try {
  logger.info('conectando mongo...')
  await client.connect()
} catch {
  logger.error('mongo nao conectado no servidor')
}

const db = client.db(dbName)
const collection = db.collection('vendas')

export async function getVendas(a, b) {
  logger.info(formatISO(a))
  logger.info(formatISO(b))
  const query = {
    dt: {
      $gte: a,
      $lte: b
    }
  }
  const rs = await collection.find(query).toArray()
  return rs
}

export async function getVendasRelatorio(formulario) {
  let query = {
    dt: {
      $gte: startOfDay(parseISO(formulario.gte)),
      $lte: endOfDay(parseISO(formulario.lte)),
    },
    username: formulario.username
  }
  query = cleanDeep(query) 
  const rs = await collection.find(query).toArray()
  return rs
}

export async function getVenda(vendaId) {
  const registro = await collection.findOne({ _id: vendaId })
  assert(registro, 'venda não existe')
  return registro
}

export async function gravarVenda(o) {
  await collection.insertOne(o)
}

export async function getTimeline() {
  const options = {
    sort: [['dt', -1]],
    limit: 30,
    projection: {
      _id: true,
      dt: true,
      username: true,
      obs: true
    }
  }
  const rs = await collection.find({}, options).toArray()
  return rs
}

export async function apagarVendas(lista) {
  const { deletedCount } = await collection.deleteMany({
    _id: { $in: lista }
  })
  assert(deletedCount, 'nada foi apagado')
}
