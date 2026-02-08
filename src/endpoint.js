import assert from 'node:assert/strict'
import * as z from 'zod'
import flanker from './flanker.js'
import {
  buildGrafico,
  buildRelatorio,
  buildIndice,
  buildVenda,
  buildItens
} from './utils.js'
import {
  parseISO,
  startOfMonth,
  endOfMonth,
  isMatch,
  startOfDay,
  endOfDay
} from 'date-fns'

export async function endPointGrafico(isoMonth) {
  assert(isMatch(isoMonth, 'yyyy-MM'), 'isoMonth inválido')
  const registros = await flanker.getVendas(
    startOfMonth(parseISO(isoMonth)),
    endOfMonth(parseISO(isoMonth))
  )
  return buildGrafico(registros)
}

export async function endPointRelatorio(body) {
  const schema = z.object({
    gte: z.iso.date(),
    lte: z.iso.date(),
    username: z.string().optional()
  })
  const formulario = schema.parse(body)
  const registros = await flanker.getVendasRelatorio(formulario)
  return buildRelatorio(registros)
}

export async function endPointIndice(isoDate) {
  assert(isMatch(isoDate, 'yyyy-MM-dd'), 'isoDate inválido')
  const registros = await flanker.getVendas(
    startOfDay(parseISO(isoDate)),
    endOfDay(parseISO(isoDate))
  )
  return buildIndice(registros)
}

export async function endPointItens(isoDate) {
  assert(isMatch(isoDate, 'yyyy-MM-dd'), 'isoDate inválido')
  const registros = await flanker.getVendas(
    startOfDay(parseISO(isoDate)),
    endOfDay(parseISO(isoDate))
  )
  return buildItens(registros.flatMap((o) => o.cart))
}

export async function endPointVenda(_id) {
  const registro = await flanker.getVenda(_id)
  return buildVenda(registro)
}
