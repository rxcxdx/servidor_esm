import Decimal from "decimal.js";
import check from "check-types";
import { consola } from "consola";
import collect from "collect.js";

export function calcMargemLucro(valA, valB) {
  // valA = (receita) = valor que é vendido
  // valB = (despesa) = valor que foi comprado
  // retorna porcentagem
  try {
    const resposta = new Decimal(valA)
      .minus(valB)
      .dividedBy(valA)
      .mul(100)
      .toDecimalPlaces(2)
      .toNumber();
    check.assert.number(resposta);
    return resposta;
  } catch {
    consola.warn("calcMargemLucro");
    return 0;
  }
}

export function calcSubtotalBean(o) {
  try {
    const resposta = new Decimal(o.quantidade).mul(o.valor).toNumber();
    check.assert.number(resposta);
    return resposta;
  } catch {
    consola.warn("calcSubtotalBean");
    return 0;
  }
}

export function reduzirVendas(vendas) {
  const colecaoCart = collect(vendas).flatMap((o) => o.cart);
  return {
    qntVendas: vendas.length,
    itens: colecaoCart.sum("quantidade"),
    total: colecaoCart.sum(calcSubtotalBean),
  };
}

export function reduzirVenda(venda) {
  const colecaoCart = collect(venda.cart);
  return {
    itens: colecaoCart.sum("quantidade"),
    total: colecaoCart.sum(calcSubtotalBean),
  };
}
