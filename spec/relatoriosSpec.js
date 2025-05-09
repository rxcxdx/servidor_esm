import buildRelatorioBeans from "../src/buildRelatorioBeans.js";
import check from "check-types";

const cart = [
  { descricao: "gloves", quantidade: 1, valor: 10 },
  { descricao: "gloves", quantidade: 1, valor: 10.12 },
];

const resposta = {
  gloves: { subtotal: 20.12, itens: 2 },
};

describe("relatorios", () => {
  it("beans", () => {
    const { relatorio } = buildRelatorioBeans(cart);
    expect(check.identical(resposta, relatorio)).toBe(true);
  });
});
