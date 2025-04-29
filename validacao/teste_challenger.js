import { challenger } from "../matematica.js";
import check from "check-types";

const cartMock = [
  { quantidade: 2, valor: 10 },
  { quantidade: 1, valor: 10.12 },
];
const total = challenger(cartMock);
check.assert.equal(30.12, total);
