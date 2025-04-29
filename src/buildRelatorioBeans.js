import { challenger } from "../matematica.js";
import { rollups, descending } from "d3-array";
import { sumBy } from "lodash-es";

function reduce(superCart) {
  return {
    itens: sumBy(superCart, "quantidade"),
    subtotal: challenger(superCart),
  };
}

export default function buildRelatorioBeans(cart) {
  const matrix = rollups(cart, reduce, (o) => o.descricao);
  matrix.sort((a, b) => descending(a[1].subtotal, b[1].subtotal));
  return matrix;
}
