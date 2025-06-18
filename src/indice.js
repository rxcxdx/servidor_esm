import db from './conn.js'
import dayjs from 'dayjs'
import check from 'check-types'

const OPT = {
  sort: [['dt', -1]],
  projection: { _id: true, dt: true, obs: true, username: true }
}

export default async function indice({ gte, lte, tamanhoCart, obsExiste }) {
  const filtro = {
    dt: {
      $gte: gte,
      $lte: lte
    }
  }
  if (check.number(tamanhoCart)) {
    Object.assign(filtro, { cart: { $size: tamanhoCart } })
  }
  if (obsExiste === true) {
    Object.assign(filtro, { obs: { $exists: true } })
  }
  const collection = db.collection('vendas')
  const vendas = await collection.find(filtro, OPT).toArray()
  return {
    inicio: dayjs(gte).format(),
    fim: dayjs(lte).format(),
    quantVendas: vendas.length,
    vendas
  }
}
