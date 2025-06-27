import Decimal from 'decimal.js'

export default function calcSubtotalBean(o) {
  try {
    return new Decimal(o.valor).mul(o.quantidade).toNumber()
  } catch {
    throw new Error('subtotal não pode ser calculado')
  }
}
