import relatorio from './src/relatorio.js'
import calcularTotal from './src/calcular-total.js'

test('relatorio', () => {
  const o = relatorio([{ total: 10 }, { total: 10 }, { total: 0 }])
  expect(o.vendas).toBe(3)
  expect(o.total).toBe(20)
})

test('calcularTotal', () => {
  const v = calcularTotal([
    { valor: 3, quantidade: 2 },
    { valor: 0, quantidade: 1 },
  ])
  expect(v).toBe(6)
})

test('core', () => {
  expect(Number.parseFloat('')).toBeNaN()
  expect(Number.parseFloat('blablabla')).toBeNaN()
  expect(Number.isNaN(NaN)).toBeTruthy()
})
