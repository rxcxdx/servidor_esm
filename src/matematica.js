import { BigNumber } from 'bignumber.js'
import check from 'check-types'


export function calcSubtotalItemCore(valor, quantidade) {
  const rs = new BigNumber(valor).multipliedBy(quantidade).toNumber()
  return rs
}

export function calcSubtotalItem(o) {
  check.assert.object(o)
  return calcSubtotalItemCore(o.valor, o.quantidade)
}

function somarCart(cart) {
  return cart
    .reduce((acc, o) => acc.plus(calcSubtotalItem(o)), new BigNumber(0))
    .toNumber()
}

export function calcTotalVenda(o) {
  check.assert.object(o)
  return somarCart(o.cart)
}
