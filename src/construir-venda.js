import { schemaVenda } from './schemas.js'
import calcularTotal from './calcular-total.js'
import check from 'check-types'

// O QUE DEVOLVE É INSERIDO NO MONGO
// PODE LANÇAR ERROS

export default function construirVenda(entrada) {
  check.assert.object(entrada, 'entrada não é obj')
  const dto = {
    total: calcularTotal(entrada.cart),
    ...entrada
  }
  const o = schemaVenda.validateSync(dto, { stripUnknown: true })
  return o
}
