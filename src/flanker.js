import { MongoClient } from 'mongodb'
import config from 'config'
import { logger } from './logger.js'
import assert from 'node:assert/strict'
import { formatISO,parseISO,startOfDay,endOfDay } from 'date-fns'
import cleanDeep from 'clean-deep'

const url = config.get('dbConfig.url')
const client = new MongoClient(url, { serverSelectionTimeoutMS: 3000 })
const dbName = config.get('dbConfig.dbName')

try {
  logger.info('conectando mongo...')
  await client.connect()
} catch {
  logger.error('mongo nao conectado no servidor')
}

const db = client.db(dbName)
const collection = db.collection('vendas')

async function getVendas(a, b) {
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

async function getVendasRelatorio(formulario) {
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

async function getVenda(_id) {
  const registro = await collection.findOne({ _id })
  assert(registro, 'venda não existe')
  return registro
}

async function gravarVenda(o) {
  await collection.insertOne(o)
}

async function getTimeline() {
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

async function apagarVenda(_id) {
  const { deletedCount } = await collection.deleteOne({ _id })
  assert(deletedCount, 'nada foi apagado')
}

export default {
  getVendas,
  getVendasRelatorio,
  getVenda,
  gravarVenda,
  getTimeline,
  apagarVenda
}