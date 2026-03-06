import { sumBy } from 'lodash-es'
import { calcSubtotalItem, calcTotalVenda } from './matematica.js'
import { BigNumber } from 'bignumber.js'
import dayjs from 'dayjs'
import util from 'util'
import chalk from 'chalk'

export function buildRelatorio(registros) {
  const total = registros
    .reduce((acc, o) => acc.plus(calcTotalVenda(o)), new BigNumber(0))
    .toNumber()
  return {
    vendas: registros.length,
    total: total
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

export function buildGrafico(registros) {
  registros.forEach((o) => {
    o.dia = o.dt.getDate()
  })
  const mapa = Map.groupBy(registros, (o) => o.dia)
  const rs = []
  mapa.forEach((lista, chave) => {
    rs.push({
      dia: chave,
      vendas: lista.length
    })
  })
  rs.sort((a, b) => a.dia - b.dia)
  return rs
}

export function buildIndice(registros) {
  const resposta = []
  registros.forEach((o) => {
    resposta.push({
      _id: o._id,
      dt: o.dt,
      dt_fmt: dayjs(o.dt).format('DD/MM/YYYY HH:mm:ss:SSS')
    })
  })
  resposta.sort((a, b) => a.dt - b.dt).reverse()
  return resposta
}

export function buildVenda(registro) {
  registro.cart.forEach((o) => {
    o.subtotal = calcSubtotalItem(o)
  })
  return {
    ...registro,
    total: calcTotalVenda(registro),
    itens: sumBy(registro.cart, 'quantidade')
  }
}

export function rcdebug(o, depth) {
  console.log(chalk.bgYellowBright(util.inspect(o, { depth })))
}
