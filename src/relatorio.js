import BigNumber from 'bignumber.js'

export default function relatorio(registros) {
  return {
    vendas: registros.length,
    total: registros
      .reduce((ac, o) => ac.plus(o.total), new BigNumber(0))
      .toNumber()
  }
}
