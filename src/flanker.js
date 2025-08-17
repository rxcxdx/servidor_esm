import check from 'check-types'
import dayjs from 'dayjs'
import { MongoClient } from 'mongodb'
import assert from 'node:assert/strict'
import config from 'config'
import logger from './logger.js'
import construirVenda from './construirVenda.js'

const url = config.get('dbConfig.url')
const client = new MongoClient(url, { serverSelectionTimeoutMS: 3000 })
const dbName = config.get('dbConfig.dbName')

try {
  await client.connect()
  logger.silly('cliente do mongo conectado no servidor')
} catch {
  logger.error('mongo NÃO conectado no servidor')
  process.exit()
}

const db = client.db(dbName)
const collection = db.collection('vendas')

export async function findRelatorio(formulario) {
  const filtro = {
    dt: {
      $gte: dayjs(formulario.gte).startOf('day').toDate(),
      $lte: dayjs(formulario.lte).endOf('day').toDate()
    }
  }
  if (check.nonEmptyString(formulario.username)) {
    logger.verbose('filtrei username')
    filtro.username = formulario.username
  }
  const rs = await collection.find(filtro).toArray()
  return rs
}

export async function findCart(ISOString) {
  const joker = dayjs(ISOString)
  const gte = joker.startOf('day').toDate()
  const lte = joker.endOf('day').toDate()
  const filtro = {
    dt: {
      $gte: gte,
      $lte: lte
    }
  }
  const rs = await collection.find(filtro).toArray()
  return rs.flatMap((o) => o.cart)
}

export async function findGrafico(ISOString) {
  const joker = dayjs(ISOString)
  const match = {
    dt: {
      $gte: joker.startOf('month').toDate(),
      $lte: joker.endOf('month').toDate()
    }
  }
  const rs = await collection.find(match).toArray()
  rs.forEach((o) => {
    o.dia = dayjs(o.dt).format('YYYY-MM-DD')
  })
  return rs
}

export async function findIndice(ISOString) {
  const joker = dayjs(ISOString)
  const gte = joker.startOf('day').toDate()
  const lte = joker.endOf('day').toDate()
  const filtro = {
    dt: {
      $gte: gte,
      $lte: lte
    }
  }
  const options = {
    sort: [['dt', -1]],
    projection: {
      _id: true,
      dt: true
    }
  }
  const rs = await collection.find(filtro, options).toArray()
  return rs
}

export async function timeline() {
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
  const docs = await collection.find({}, options).toArray()
  return docs
}

export async function apagarVenda(v) {
  const { deletedCount } = await collection.deleteOne({ _id: v })
  assert(deletedCount, 'nada foi apagado')
}

export async function findVenda(v) {
  const o = await collection.findOne({ _id: v })
  check.assert.object(o, 'venda não existe')
  return o
}

export async function inserirDoc(foo) {
  const o = construirVenda(foo)
  const { insertedId } = await collection.insertOne(o)
  return insertedId
}
