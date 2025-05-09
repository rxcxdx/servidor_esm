import buildGraficoDias from "../src/buildGraficoDias.js";
import check from "check-types";

const vendas = [
  { dia: '7', cart: [{ quantidade: 1, valor: 10 }]},
  { dia: '7', cart: [{ quantidade: 1, valor: 10.12 }]},
]

const resposta = {
  '7': 20.12
}

describe("graficos", () => {
  it("dias", () => {
    const o = buildGraficoDias(vendas)
    expect(check.identical(resposta, o)).toBe(true);
  });
});
