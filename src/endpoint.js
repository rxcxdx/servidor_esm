import assert from 'node:assert/strict'
import * as z from 'zod'
import { schemaVenda } from './schemas.js'
import auth from 'basic-auth'
import { login, grant } from './bear.js'
import {
  buildGrafico,
  buildRelatorio,
  buildIndice,
  buildVenda,
  buildItens
} from './utils.js'
import { apagarVendas, getVendas, getVenda, gravarVenda, getTimeline, getVendasRelatorio } from './flanker.js'
import { upsertProduto } from './eagle.js'
import {
  parseISO,
  startOfMonth,
  endOfMonth,
  isMatch,
  startOfDay,
  endOfDay,
  format
} from 'date-fns'

export async function endPointGrafico(isoMonth) {
  assert(isMatch(isoMonth, 'yyyy-MM'), 'isoMonth inválido')
  const registros = await getVendas(
    startOfMonth(parseISO(isoMonth)),
    endOfMonth(parseISO(isoMonth))
  )
  return buildGrafico(registros)
}

export async function endPointRelatorio(body) {
  const schema = z.object({
    gte: z.iso.date(),
    lte: z.iso.date(),
    username: z.string().trim().optional()
  })
  const entrada = schema.parse(body)
  const registros = await getVendasRelatorio(entrada)
  return buildRelatorio(registros)
}

export async function endPointTimeline() {
  const registros = await getTimeline()
  registros.forEach((o) => {
    o.dia = format(o.dt, 'dd/MM/yyyy')
  })
  return registros
}

export async function endPointIndice(query) {
  const schema = z.object({
    isoDate: z.iso.date()
  })
  const entrada = schema.parse(query)  
  const registros = await getVendas(
    startOfDay(parseISO(entrada.isoDate)),
    endOfDay(parseISO(entrada.isoDate))
  )
  return buildIndice(registros)
}

export async function endPointItens(query) {
  const schema = z.object({
    isoDate: z.iso.date()
  })
  const entrada = schema.parse(query)
  const registros = await getVendas(
    startOfDay(parseISO(entrada.isoDate)),
    endOfDay(parseISO(entrada.isoDate))
  )
  return buildItens(registros.flatMap((o) => o.cart))
}

export async function endPointBuildVenda(vendaId) {
  const registro = await getVenda(vendaId)
  return buildVenda(registro)
}

export async function endPointBuy(body) {
  const o = schemaVenda.parse(body)
  await gravarVenda(o)
  return { _id: o._id, dt: o.dt }
}

export async function endPointUpsertProduto(body) {
  const schema = z.object({
    id: z.uuid().optional(),
    descricao: z.string().min(1),
    valor: z.number().positive(),
    atalho: z.boolean().optional()
  })
  const entrada = schema.parse(body)
  await upsertProduto(entrada)
}

export async function endPointApagar(body) {
  const schema = z.array(z.string()).min(1)
  const entrada = schema.parse(body)
  await apagarVendas(entrada)
}

export async function endPointLogin(req) {
  const credentials = auth(req)
  assert(credentials, 'credencial inválida')
  const o = login(credentials.name, credentials.pass)
  return o
}

export async function endPointGrant(token) {
  grant(token)
}
