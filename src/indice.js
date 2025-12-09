import { getVendasPorRange } from './flanker.js'
import { pick } from 'lodash-es'
import dayjs from 'dayjs'

const paths = ['_id', 'dt']

export default async function indice(isoDate) {
  const gte = dayjs(isoDate).startOf('day')
  const lte = dayjs(isoDate).endOf('day')

  const registros = await getVendasPorRange(gte.toDate(), lte.toDate())

  const docs = registros.map((o) => pick(o, paths))

  docs.sort((a, b) => a.dt - b.dt).reverse()
  return {
    docs,
    inicio: gte.format(),
    fim: lte.format(),
    linhas: docs.length
  }
}
