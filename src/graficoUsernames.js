import { getVendasPorRange } from './flanker.js'
import { buildGraficoUsernames } from './utils.js'
import dayjs from 'dayjs'

export default async function graficoUsernames(isoDate) {
  const gte = dayjs(isoDate).startOf('day')
  const lte = dayjs(isoDate).endOf('day')

  const registros = await getVendasPorRange(gte.toDate(), lte.toDate())

  const docs = buildGraficoUsernames(registros)

  return {
    docs,
    inicio: gte.format(),
    fim: lte.format(),
    linhas: docs.length
  }
}
