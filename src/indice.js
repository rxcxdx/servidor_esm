import db from './conn.js'
import check from 'check-types'
// import dayjs from 'dayjs'

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
    console.log('FILTRO tamanhoCart')
    Object.assign(filtro, { cart: { $size: tamanhoCart } })
  }
  if (obsExiste === true) {
    console.log('FILTRO obsExiste')
    Object.assign(filtro, { obs: { $exists: true } })
  }
  const collection = db.collection('vendas')
  const docs = await collection.find(filtro, OPT).toArray()
  return docs
}
