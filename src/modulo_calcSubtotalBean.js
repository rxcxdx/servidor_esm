import memoize from 'memoizee'
import hash from 'object-hash'
import Decimal from 'decimal.js'
import check from 'check-types'

function normalizador(args) {
  return hash([args[0].valor, args[0].quantidade])
}

export function calcSubtotalBeanCore(o) {
  try {
    const rs = new Decimal(o.valor).mul(o.quantidade).toNumber()
    check.assert.number(rs)
    return rs
  } catch {
    return 0
  }
}

export const calcSubtotalBean = memoize(calcSubtotalBeanCore, {
  normalizer: normalizador,
  max: 8000
})
