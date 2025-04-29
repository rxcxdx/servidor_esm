import buildVendaCompleta from "../src/buildVendaCompleta.js";
import check from "check-types";

const vendaMock = {
  cart: [
    { quantidade: 1, valor: 10 },
    { quantidade: 1, valor: 10.12 },
  ],
};
const { total, itens } = buildVendaCompleta(vendaMock);
check.assert.equal(20.12, total);
check.assert.equal(2, itens);
