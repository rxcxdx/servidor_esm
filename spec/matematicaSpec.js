import { reduzirVenda, reduzirVendas } from "../matematica.js";
import { calcSubtotalBeanCore } from "../modulo_calcSubtotalBean.js";

const venda1 = {
  cart: [{ quantidade: 1, valor: 10 }],
};
const venda2 = {
  cart: [{ quantidade: 1, valor: 10.12 }],
};
const venda3 = {
  cart: [
    { quantidade: 1, valor: 10 },
    { quantidade: 1, valor: 10.12 },
  ],
};

describe("matematica", () => {
  it("calcSubtotalBeanCore", () => {
    expect(calcSubtotalBeanCore({ quantidade: 4, valor: 2 })).toBe(8);
    expect(calcSubtotalBeanCore({ quantidade: 10, valor: 10.12 })).toBe(101.2);
  });
  it("reduzirVendas", () => {
    const o = reduzirVendas([venda1, venda2]);
    expect(o.total).toBe(20.12);
    expect(o.itens).toBe(2);
    expect(o.quantVendas).toBe(2);
  });

  it("reduzirVenda", () => {
    const o = reduzirVenda(venda3);
    expect(o.total).toBe(20.12);
    expect(o.itens).toBe(2);
  });

});
