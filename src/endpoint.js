import assert from 'node:assert/strict'
import * as z from 'zod'
import dayjs from './dayjs.js'
import { schemaRelatorio, schemaIndice } from './schemas.js'
import flanker from './flanker.js'
import { buildGrafico, buildRelatorio, buildItens } from './utils.js'
import buildVenda from './build-venda/buildVenda.js'

export async function endPointGrafico(isoMonth) {
  const j = dayjs(isoMonth, 'YYYY-MM', true)
  assert(j.isValid(), 'isoMonth inválido')
  const a = j.startOf('month').toDate()
  const b = j.endOf('month').toDate()
  const registros = await flanker.getVendas(a, b)
  return buildGrafico(registros)
}

export async function endPointItens(isoDate) {
  const { success } = z.iso.date().safeParse(isoDate)
  assert(success, 'isoDate inválido')
  const j = dayjs(isoDate)
  const a = j.startOf('day').toDate()
  const b = j.endOf('day').toDate()
  const registros = await flanker.getVendas(a, b)
  return buildItens(registros.flatMap((o) => o.cart))
}

export async function endPointRelatorio(body) {
  const formulario = schemaRelatorio.parse(body)
  const registros = await flanker.getVendas(formulario.gte, formulario.lte)
  return buildRelatorio(registros)
}

export async function endPointIndice(body) {
  const formulario = schemaIndice.parse(body)
  const registros = await flanker.getVendas(formulario.gte, formulario.lte)
  const resposta = []
  registros.forEach((o) => {
    resposta.push({
      _id: o._id,
      dt: o.dt,
      dt_fmt: dayjs(o.dt).format('DD/MM/YYYY HH:mm:ss.SSS')
    })
  })
  resposta.sort((a, b) => a.dt - b.dt).reverse()
  return resposta
}

export async function endPointBuy(body) {
  const novo = buildVenda(body)
  await flanker.gravarVenda(novo)
}
