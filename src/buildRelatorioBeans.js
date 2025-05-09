import collect from "collect.js";
import { calcSubtotalBean } from "../matematica.js";

export default function buildRelatorioBeans(cart) {
  const colecao = collect(cart)
    .groupBy("descricao")
    .map((c) => ({
      subtotal: c.sum(calcSubtotalBean),
      itens: c.sum("quantidade"),
    }))
  return {
    itens: colecao.sum("itens"),
    relatorio: colecao.all(),
    total: colecao.sum("subtotal"),
  };
}
