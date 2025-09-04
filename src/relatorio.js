import { sumBy } from 'lodash-es'

export default function relatorio(registros) {
  return {
    vendas: registros.length,
    total: sumBy(registros, 'total')
  }
}
