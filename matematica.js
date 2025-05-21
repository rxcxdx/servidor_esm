import Decimal from "decimal.js";
import { sumBy } from "lodash-es";

export function calcSubtotalBean(o) {
  return new Decimal(o.quantidade).mul(o.valor).toNumber();
}

export function reduzirVendas(vendas) {
  const cart = vendas.flatMap((o) => o.cart);
  return {
    quantVendas: vendas.length,
    itens: sumBy(cart, "quantidade"),
    total: cart.reduce((acc,o) => acc.plus(calcSubtotalBean(o)), new Decimal(0)).toNumber()
  };
}

export function reduzirVenda(venda) {
  const cart = venda.cart
  return {
    itens: sumBy(cart, "quantidade"),
    total: cart.reduce((acc,o) => acc.plus(calcSubtotalBean(o)), new Decimal(0)).toNumber()
  };
}
