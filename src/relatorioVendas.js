import db from './conn.js'
import dayjs from 'dayjs'
import { reduzirVendas } from './matematica.js'
import check from 'check-types'

export default async function relatorioVendas(formulario) {
  const filtro = {
    dt: {
      $gte: formulario.gte,
      $lte: formulario.lte
    }
  }
  if (check.nonEmptyString(formulario.username)) {
    Object.assign(filtro, { username: formulario.username })
  }
  const collection = db.collection('vendas')
  const vendas = await collection.find(filtro).toArray()
  return {
    ...reduzirVendas(vendas),
    inicio: dayjs(formulario.gte).format(),
    fim: dayjs(formulario.lte).format()
  }
}
