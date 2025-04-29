import { challenger } from "../matematica.js";
import { sumBy } from "lodash-es";

export default function buildVendaCompleta(venda) {
  return {
    total: challenger(venda.cart),
    itens: sumBy(venda.cart, "quantidade"),
  };
}
