import { getVendasPorRange } from './flanker.js'
import { buildItens } from './utils.js'
import dayjs from 'dayjs'

export default async function itens(isoDate) {
  const gte = dayjs(isoDate).startOf('day')
  const lte = dayjs(isoDate).endOf('day')
  const registros = await getVendasPorRange(gte.toDate(), lte.toDate())
  const docs = buildItens(registros.flatMap((o) => o.cart))
  return {
    docs,
    inicio: gte.format(),
    fim: lte.format(),
    linhas: docs.length
  }
}
