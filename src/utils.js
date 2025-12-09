import { sumBy } from 'lodash-es'
import { schemaVenda, schemaProduto } from './schemas.js'
import { faker } from '@faker-js/faker'
import Decimal from 'decimal.js-light'
import check from 'check-types'

function calcularSubtotalDoItem(o) {
  return new Decimal(o.quantidade).mul(o.valor).toNumber()
}

function somarCart(cart) {
  let rs = new Decimal(0)
  cart.forEach((o) => {
    rs = rs.add(calcularSubtotalDoItem(o))
  })
  return rs.toNumber()
}

export function calcularTotalDaVenda(registro) {
  return somarCart(registro.cart)
}

export function buildRelatorio(registros) {
  let total = new Decimal(0)
  registros.forEach((o) => {
    total = total.add(calcularTotalDaVenda(o))
  })
  return {
    vendas: registros.length,
    total: total.toNumber()
  }
}

export function buildItens(cart) {
  const mapa = Map.groupBy(cart, (o) => o.descricao)
  const resposta = []
  mapa.forEach((a, b) => {
    resposta.push({
      descricao: b,
      quantidade: sumBy(a, 'quantidade')
    })
  })
  resposta.sort((a, b) => a.quantidade - b.quantidade).reverse()
  return resposta
}

export function validarVenda(entrada) {
  const o = schemaVenda.validateSync(entrada, { stripUnknown: true })
  return o
}

export function validarProduto(entrada) {
  const o = schemaProduto.validateSync(entrada, { stripUnknown: true })
  return o
}

export function buildGraficoDias(registros) {
  const mapa = Map.groupBy(registros, (o) => o.dia)
  const rs = []
  mapa.forEach((lista, chave) => {
    rs.push({
      dia: chave,
      vendas: lista.length
    })
  })
  rs.sort((a, b) => a.dia.localeCompare(b.dia))
  return rs
}

export function buildGraficoUsernames(registros) {
  const mapa = Map.groupBy(registros, (o) => o.username)
  const rs = []
  mapa.forEach((lista, chave) => {
    rs.push({
      username: chave,
      vendas: lista.length,
      cor: faker.color.rgb()
    })
  })
  rs.sort((a, b) => a.vendas - b.vendas)
  return rs
}

export function buildVenda(registro) {
  return {
    total: calcularTotalDaVenda(registro),
    itens: sumBy(registro.cart, 'quantidade'),
    ...registro
  }
}

export function assertIsoMonth(v) {
  const regex = RegExp('^\\d{4}-\\d{2}$')
  check.assert(regex.test(v), 'isoMonth inválido')
}