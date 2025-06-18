import db from './conn.js'

const OPT = {
  sort: [['dt', -1]],
  limit: 10,
  projection: { _id: true, dt: true }
}

export default async function timeline() {
  const filtro = {}
  const collection = db.collection('vendas')
  const docs = await collection.find(filtro, OPT).toArray()
  return docs
}
