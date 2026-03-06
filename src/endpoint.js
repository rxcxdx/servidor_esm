import assert from 'node:assert/strict'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import { schemaRelatorio, schemaVenda, schemaIndice } from './schemas.js'
import flanker from './flanker.js'
import {
  buildGrafico,
  buildRelatorio,
  buildIndice,
  buildVenda,
  buildItens
} from './utils.js'
import { nanoid } from 'nanoid'

dayjs.extend(customParseFormat)

export async function endPointGrafico(isoMonth) {
  const j = dayjs(isoMonth, 'YYYY-MM', true)
  assert(j.isValid(), 'isoMonth inválido')
  const a = j.startOf('month').toDate()
  const b = j.endOf('month').toDate()
  const registros = await flanker.getVendas(a, b)
  return buildGrafico(registros)
}

export async function endPointItens(isoDate) {
  const j = dayjs(isoDate, 'YYYY-MM-DD', true)
  assert(j.isValid(), 'isoDate inválido')
  const a = j.startOf('day').toDate()
  const b = j.endOf('day').toDate()
  const registros = await flanker.getVendas(a, b)
  return buildItens(registros.flatMap((o) => o.cart))
}

export async function endPointRelatorio(body) {
  const formulario = schemaRelatorio.parse(body)
  const registros = await flanker.getVendas(
    dayjs(formulario.gte).startOf('day').toDate(),
    dayjs(formulario.lte).endOf('day').toDate()
  )
  return buildRelatorio(registros)
}

export async function endPointIndice(body) {
  const formulario = schemaIndice.parse(body)
  const registros = await flanker.getVendas(
    dayjs(formulario.gte).startOf('day').toDate(),
    dayjs(formulario.lte).endOf('day').toDate()
  )
  return buildIndice(registros)
}

export async function endPointVenda(_id) {
  const registro = await flanker.getVenda(_id)
  return buildVenda(registro)
}

export async function endPointBuy(body) {
  const o = schemaVenda.parse(body)
  o._id = nanoid()
  o.dt = new Date()
  await flanker.gravarVenda(o)
  return { _id: o._id, dt: o.dt }
}
