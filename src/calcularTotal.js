import BigNumber from 'bignumber.js'

export default function calcularTotal(cart) {
  return cart.reduce((ac, bean) => ac.plus(bean.quantidade*bean.valor), new BigNumber(0)).toNumber()
}
