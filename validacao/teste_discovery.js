import { discovery } from "../matematica.js";
import check from "check-types";

const vendasMock = [
  { cart: [{ quantidade: 1, valor: 10 }] },
  { cart: [{ quantidade: 1, valor: 10.12 }] },
  {
    cart: [
      { quantidade: 1, valor: 1 },
      { quantidade: 1, valor: 1 },
    ],
  },
  { cart: [{ quantidade: 2, valor: 1 }] },
];
const total = discovery(vendasMock);
check.assert.equal(24.12, total);
