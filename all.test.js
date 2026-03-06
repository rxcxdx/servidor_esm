import { isEmpty } from 'lodash-es'
import { buildRelatorio } from './src/utils.js'
import { calcTotalVenda } from './src/matematica.js'

test('calcTotalVenda', () => {
  const mockVenda = {
    cart: [
      {
        valor: 10.12,
        quantidade: 2
      }
    ]
  }
  expect(calcTotalVenda(mockVenda)).toBe(20.24)
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
    { cart: [{ valor: 1, quantidade: 2 }] }
  ]
  const o = buildRelatorio(mock)
  expect(o.vendas).toBe(4)
  expect(o.total).toBe(24.12)
})

test('isEmpty', () => {
  expect(isEmpty({})).toBeTruthy()
  expect(isEmpty([])).toBeTruthy()
  expect(isEmpty(undefined)).toBeTruthy()
  expect(isEmpty(null)).toBeTruthy()
})
