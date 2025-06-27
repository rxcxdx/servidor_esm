import Decimal from 'decimal.js'
import { sumBy } from 'lodash-es'
import calcSubtotalBean from './calcSubtotalBean.js'

export default function reduzirVendas(vendas) {
  const cart = vendas.flatMap((o) => o.cart)
  return {
    quantVendas: vendas.length,
    itens: sumBy(cart, 'quantidade'),
    total: cart
      .reduce((acc, o) => acc.plus(calcSubtotalBean(o)), new Decimal(0))
      .toNumber()
  }
}