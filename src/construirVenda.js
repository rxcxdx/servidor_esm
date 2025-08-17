import clone from 'clone'
import { schemaVenda } from './schemas.js'
import calcularTotal from './calcularTotal.js'

export default function construirVenda(entrada) {
  const joker = clone(entrada)
  joker.total = calcularTotal(joker.cart)
  const o = schemaVenda.validateSync(joker, { stripUnknown: true })
  return o
}
