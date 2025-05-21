import { groupBy, forEach, sumBy } from "lodash-es";
import { calcSubtotalBean } from "../matematica.js";
import Decimal from "decimal.js";

// tem q devolver um array
export default function buildRelatorioBeans(cart) {
  const grupo = groupBy(cart, "descricao");
  const resposta = [];
  forEach(grupo, (cartEspecifico, k) => {
    resposta.push({
      descricao: k,
      quantidade: sumBy(cartEspecifico, "quantidade"),
      subtotal: cartEspecifico.reduce((acc,o) => acc.plus(calcSubtotalBean(o)), new Decimal(0)).toNumber()

    });
  });
  resposta.sort((a,b) => a.subtotal - b.subtotal).reverse()
  return resposta
}
