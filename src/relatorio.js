import { getVendasPorRange } from './flanker.js'
import { buildRelatorio } from './utils.js'
import dayjs from 'dayjs'

export default async function relatorio(body) {
  const gte = dayjs(body.gte).startOf('day')
  const lte = dayjs(body.lte).endOf('day')
  const registros = await getVendasPorRange(gte.toDate(), lte.toDate())
  return {
    ...buildRelatorio(registros),
    inicio: gte.format(),
    fim: lte.format()
  }
}
