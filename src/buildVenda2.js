import { sumBy } from 'lodash-es'
import calcSubtotalBean from './calcSubtotalBean.js'
import Decimal from 'decimal.js'

export default function buildVenda2(registro) {
  return {
    ...registro,
    itens: sumBy(registro.cart, 'quantidade'),
    total: registro.cart
      .reduce((acc, o) => acc.plus(calcSubtotalBean(o)), new Decimal(0))
      .toNumber()
  }
}