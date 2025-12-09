import validator from 'validator'
import { filter, isEmpty, toNumber } from 'lodash-es'
import { calcularTotalDaVenda, buildRelatorio } from './src/utils.js'
import Decimal from 'decimal.js-light'

test('calcularTotalDaVenda', () => {
  const mock = {
    cart: [
      { valor: 0, quantidade: 1 },
      { valor: 10, quantidade: 1 },
      { valor: 10.12, quantidade: 1 },
      { valor: 1, quantidade: 2 }
    ]
  }
  const v = calcularTotalDaVenda(mock)
  expect(v).toBe(22.12)
})

test('buildRelatorio', () => {
  const mock = [
    { cart: [{ valor: 10, quantidade: 1 }] },
    { cart: [{ valor: 10.12, quantidade: 1 }] },
    {
      cart: [
        { valor: 1, quantidade: 1 },
        { valor: 1, quantidade: 1 }
      ]
    },
    { cart: [{ valor: 0, quantidade: 1 }] },
    { cart: [{ valor: 1, quantidade: 2 }] }
  ]
  const o = buildRelatorio(mock)
  expect(o.vendas).toBe(5)
  expect(o.total).toBe(24.12)
})

test('core', () => {
  expect(Number('')).toBe(0)
  expect(Number('kkkk')).toBeNaN()
  expect(toNumber('')).toBe(0)
  expect(toNumber('kkkk')).toBeNaN()
  // expect(() => assertIsoMonth('2025-12')).not.toThrow()
  // expect(() => assertIsoMonth('2025-12-01')).toThrow()
})

test('vazio', () => {
  expect(isEmpty({})).toBeTruthy()
  expect(isEmpty([])).toBeTruthy()
})

test('filtragem1', () => {
  const matrix = ['banana', 'verde_banana', 'bananada', 'zebra', 'BANANA']
  const v = filter(matrix, (v) => v.includes('banana'))
  expect(v.length).toBe(3)
})

test('filtragem2', () => {
  const matrix = ['banana', 'verde_banana', 'bananada', 'zebra', 'BANANA']
  const regex = RegExp('banana', 'i')
  const v = filter(matrix, (v) => regex.test(v))
  expect(v.length).toBe(4)
})

test('filtragem3', () => {
  const matrix = ['banana', 'verde_banana', 'bananada', 'zebra', 'BANANA']
  const v = filter(matrix, (v) => v.includes(''))
  expect(v.length).toBe(5)
})

test('iso', () => {
  const joker1 = '2025-09-25'
  const joker2 = '2025-09-25T22:56:09.324Z'
  const joker3 = '2025-09-25T19:56:09-03:00'
  const joker4 = '2025-09'
  expect(validator.isISO8601(joker1)).toBeTruthy()
  expect(validator.isISO8601(joker2)).toBeTruthy()
  expect(validator.isISO8601(joker3)).toBeTruthy()
  expect(validator.isISO8601(joker4)).toBeTruthy()
})

test('matematica', () => {
  expect(new Decimal(10.22).mul(6).toNumber()).toBe(61.32)
})
