import db from './conn.js'
import dayjs from 'dayjs'
import { sumBy, filter } from 'lodash-es'
import Decimal from 'decimal.js'
import buildRelatorioBeans from './buildRelatorioBeans.js'
import check from 'check-types'

export default async function relatorioBeans({ gte, lte, descricao }) {
  const match = {
    dt: {
      $gte: gte,
      $lte: lte
    }
  }
  const collection = db.collection('vendas')
  const vendas = await collection.find(match).toArray()
  let cart = vendas.flatMap((o) => o.cart)
  if (check.nonEmptyString(descricao)) {
    cart = filter(cart, (o) => o.descricao.includes(descricao))
  }
  const relatorio = buildRelatorioBeans(cart)
  return {
    relatorio,
    inicio: dayjs(gte).format(),
    fim: dayjs(lte).format(),
    itens: sumBy(relatorio, 'quantidade'),
    total: relatorio
      .reduce((acc, o) => acc.plus(o.subtotal), new Decimal(0))
      .toNumber()
  }
}
