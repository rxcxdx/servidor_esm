import check from 'check-types'
import dayjs from 'dayjs'
import { MongoClient } from 'mongodb'
import assert from 'node:assert/strict'
import config from 'config'
import logger from './logger.js'
import { remove } from 'lodash-es'
import calcularTotal from './calcular-total.js'

const url = config.get('dbConfig.url')
const client = new MongoClient(url, { serverSelectionTimeoutMS: 3000 })
const dbName = config.get('dbConfig.dbName')

try {
  await client.connect()
  logger.info('cliente do mongo conectado no servidor')
} catch {
  logger.error('mongo NÃO conectado no servidor')
  process.exit()
}

const db = client.db(dbName)
const collection = db.collection('vendas')

export async function buscarRelatorio(formulario) {
  const filtro = {
    dt: {
      $gte: dayjs(formulario.gte).startOf('day').toDate(),
      $lte: dayjs(formulario.lte).endOf('day').toDate()
    }
  }
  if (check.nonEmptyString(formulario.username)) {
    filtro.username = formulario.username
  }
  const rs = await collection.find(filtro).toArray()
  return rs
}

export async function buscarCart(ISOString) {
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

export async function buscarGrafico(ISOString) {
  const joker = dayjs(ISOString)
  const match = {
    dt: {
      $gte: joker.startOf('month').toDate(),
      $lte: joker.endOf('month').toDate()
    }
  }
  const rs = await collection.find(match).toArray()
  rs.forEach((o) => {
    o.dia = dayjs(o.dt).format('DD')
  })
  return rs
}

export async function buscarIndice(ISOString) {
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

export async function buscarVenda(v) {
  const o = await collection.findOne({ _id: v })
  assert(o, 'venda não existe')
  return o
}

export async function buscarTimeline() {
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
  assert(deletedCount)
}

export async function apagarCartItem(a, b) {
  // _id
  // identifier
  const o = await collection.findOne({ _id: a, 'cart.identifier': b })
  assert(o, 'nada encontrado')
  assert(o.cart.length > 1, 'não pode apagar')
  remove(o.cart, { identifier: b })
  const TOTAL = calcularTotal(o.cart)
  await collection.updateOne(
    { _id: a },
    { $set: { cart: o.cart, total: TOTAL } }
  )
}

export async function inserirDoc(o) {
  await collection.insertOne(o)
}
