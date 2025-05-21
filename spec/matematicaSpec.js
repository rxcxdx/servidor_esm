import { reduzirVenda, calcSubtotalBean, reduzirVendas } from "../matematica.js";

const venda1 = {
  cart: [{ quantidade: 1, valor: 10 }],
};
const venda2 = {
  cart: [{ quantidade: 1, valor: 10.12 }],
};
const venda3 = {
  cart: [
    { quantidade: 2, valor: 1 },
    { quantidade: 1, valor: 3 },
  ],
};

describe("matematica", () => {
  it("calcSubtotalBean", () => {
    expect(calcSubtotalBean({ quantidade: 4, valor: 2 })).toBe(8);
    expect(calcSubtotalBean({ quantidade: 10, valor: 10.12 })).toBe(101.2);
  });
  it("reduzirVendas", () => {
    const o = reduzirVendas([venda1, venda2]);
    expect(o.total).toBe(20.12);
    expect(o.itens).toBe(2);
    expect(o.quantVendas).toBe(2);
  });
  it("reduzirVenda", () => {
    const o = reduzirVenda(venda3);
    expect(o.total).toBe(5);
    expect(o.itens).toBe(3);
  });
});
