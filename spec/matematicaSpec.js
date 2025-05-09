import { calcMargemLucro, reduzirVenda, calcSubtotalBean, reduzirVendas } from "../matematica.js";

const venda1 = {
  cart: [{ quantidade: 2, valor: 10 }],
};
const venda2 = {
  cart: [
    { quantidade: 1, valor: 10 },
    { quantidade: 1, valor: 10 },
  ],
};
const venda3 = {
  cart: [{ quantidade: 1, valor: 10.12 }],
};
const venda4 = {
  cart: [
    { quantidade: 1, valor: 10 },
    { quantidade: 1, valor: 10.12 },
  ],
};

describe("matematica", () => {
  it("calcMargemLucro", () => {
    expect(calcMargemLucro(10.12, 10)).toBe(1.19);
    expect(calcMargemLucro(10, 0)).toBe(100);
  });
  it("calcSubtotalBean", () => {
    expect(calcSubtotalBean({ quantidade: 4, valor: 2 })).toBe(8);
  });
  it("reduzirVendas", () => {
    const o = reduzirVendas([venda1, venda2, venda3]);
    expect(o.total).toBe(50.12);
    expect(o.itens).toBe(5);
    expect(o.qntVendas).toBe(3);
  });

  it("reduzirVenda", () => {
    const o = reduzirVenda(venda4);
    expect(o.total).toBe(20.12);
    expect(o.itens).toBe(2);
  });
});
