import { cloneDeep } from 'lodash-es'
import { schemaVenda } from './schemas.js'
import BigNumber from 'bignumber.js'

export function calcularTotal(cart) {
  return cart.reduce((ac, bean) => ac.plus(bean.quantidade*bean.valor), new BigNumber(0)).toNumber()
}

// primeiro passo depois do web service
// o retorno é inserido no mongo
export function buildBuy(entrada) {
  const joker = cloneDeep(entrada)
  joker.total = calcularTotal(joker.cart)
  const o = schemaVenda.validateSync(joker, { stripUnknown: true })
  return o
}
