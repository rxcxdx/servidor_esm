import buy from "../src/buy.js";
import mockBean from "./mockBean.js";
import { consola } from "consola";
const QNT = 8;
const matrix = [];
for (let index = 0; index < QNT; index++) {
  matrix.push({
    username: "bruce",
    cart: [mockBean(), mockBean()]
  });
}
for (const entrada of matrix) {
  const { _id } = await buy(entrada);
  consola.success(_id);
}
process.exit();
