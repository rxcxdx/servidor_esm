import relatorio from '../src/relatorio.js'
import { calcularTotal } from '../src/buildBuy.js'
describe('a porra toda', () => {
  it('relatorio', () => {
    const o = relatorio([
      { total: 10 },
      { total: 10.12 }
    ])
    expect(o.vendas).toBe(2)
    expect(o.total).toBe(20.12)    
  })
  it('calcularTotal', () => {
    const v = calcularTotal([
      { valor: 10.12, quantidade: 1 },
      { valor: 10, quantidade: 2 },
      { valor: 0, quantidade: 1 },
    ])
    expect(v).toBe(30.12)
  })
  it('core do javascript', () => {
    expect(Number.parseFloat('blablabla')).toBeNaN()
    expect(Number.parseFloat('')).toBeNaN()
    expect(Number.isNaN(NaN)).toBeTrue()
  })
})
