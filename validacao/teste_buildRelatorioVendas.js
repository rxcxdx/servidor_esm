import buildRelatorioVendas from "../src/buildRelatorioVendas.js";
import check from "check-types";

const vendasMock = [
  { cart: [{ quantidade: 2, valor: 10 }] },
  { cart: [{ quantidade: 1, valor: 10 }, { quantidade: 1, valor: 10 }] },
];
const { linhas, itens, total } = buildRelatorioVendas(vendasMock)
check.assert.equal(2, linhas);
check.assert.equal(4, itens);
check.assert.equal(40, total);

