import { BigNumber } from 'bignumber.js'

export function calcSubtotalItem(item) {
  return new BigNumber(item.valor).multipliedBy(item.quantidade).toNumber()
}

export function somarCart(cart) {
  return cart
    .reduce((acc, o) => acc.plus(calcSubtotalItem(o)), new BigNumber(0))
    .toNumber()
}

export function calcMargemLucro(alpha, beta) {
  const piece = new BigNumber(alpha).minus(beta).dividedBy(alpha)
  const margemLucro = new BigNumber(100).multipliedBy(piece).decimalPlaces(2)
  return {
    alpha,
    beta,
    margemLucro: margemLucro.toNumber(),
    margemLucroFmt: margemLucro.toFormat({
      decimalSeparator: ',',
      suffix: ' %'
    })
  }
}
