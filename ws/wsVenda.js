import db from '../src/conn.js'
import buildVenda2 from '../src/buildVenda2.js'
import assert from 'node:assert/strict'

export default async function wsVenda(req, res) {
  const collection = db.collection('vendas')
  const registro = await collection.findOne({ _id: req.params.vendaId })
  const o = buildVenda2(registro)
  assert(o, 'venda não existe')
  res.send(o)
}