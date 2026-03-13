import check from 'check-types'
import { calcSubtotalItem, somarCart } from './src/matematica.js'
import { buildRelatorio, buildGrafico, buildItens } from './src/utils.js'

test('calcSubtotalItem', () => {
  expect(calcSubtotalItem({ valor: 1, quantidade: null })).toBeNaN()
  expect(calcSubtotalItem({ valor: 33.91, quantidade: 3 })).toBe(101.73)
})

test('buildRelatorio', () => {
  const mock = [{ total: 10 }, { total: 10.12 }]
  const o = buildRelatorio(mock)
  expect(o.total).toBe(20.12)
  expect(o.vendas).toBe(2)
})

test('somarCart', () => {
  const mock = [
    { quantidade: 3, valor: 29.46 },
    { quantidade: 4, valor: 37.31 },
    { quantidade: 2, valor: 25.11 }
  ]
  const rs = somarCart(mock)
  expect(rs).toBe(287.84)
})

test('buildGrafico', () => {
  const mock = [
    { dt: new Date('2026-03-06T12:12:12.000Z') },
    { dt: new Date('2026-03-05T15:15:15.000Z') },
    { dt: new Date('2026-03-06T14:14:14.000Z') }
  ]
  const grafico = buildGrafico(mock)
  const flag = check.identical(grafico, [
    { dia: '05', vendas: 1 },
    { dia: '06', vendas: 2 }
  ])
  expect(flag).toBeTruthy()
})

test('buildItens', () => {
  const mock = [
    { descricao: 'ovo', quantidade: 1 },
    { descricao: 'cebola', quantidade: 1 },
    { descricao: 'ovo', quantidade: 2 }
  ]
  const itens = buildItens(mock)
  const flag = check.identical(itens, [
    { descricao: 'ovo', quantidade: 3 },
    { descricao: 'cebola', quantidade: 1 }
  ])
  expect(flag).toBeTruthy()
})
