import { getVendasPorRange } from './flanker.js'
import { buildGraficoDias } from './utils.js'
import dayjs from 'dayjs'

export default async function graficoDias(isoMonth) {
  const gte = dayjs(isoMonth).startOf('month')
  const lte = dayjs(isoMonth).endOf('month')
  const registros = await getVendasPorRange(gte.toDate(), lte.toDate())
  registros.forEach((o) => {
    o.dia = dayjs(o.dt).format('DD')
  })
  const docs = buildGraficoDias(registros)
  return {
    docs,
    inicio: gte.format(),
    fim: lte.format(),
    linhas: docs.length
  }
}
