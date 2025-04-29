import Decimal from "decimal.js";
import check from "check-types";

export function calcSubtotalBean(quantidade, valor) {
  try {
    const resposta = new Decimal(quantidade).mul(valor).toNumber();
    check.assert.number(resposta);
    return resposta
  } catch {
    // consola.warn("calcSubtotalBean")
    return 0;
  }
}

export function challenger(cart) {
  return cart
    .reduce(
      (acc, o) => acc.plus(calcSubtotalBean(o.quantidade, o.valor)),
      new Decimal(0)
    )
    .toNumber();
}

export function discovery(vendas) {
  return vendas
    .reduce((acc, o) => acc.plus(challenger(o.cart)), new Decimal(0))
    .toNumber();
}

export function calcMargemLucro(valA, valB) {
  // valA = (receita) = valor que é vendido
  // valB = (despesa) = valor que foi comprado
  // retorna porcentagem
  try {
    const piece = new Decimal(valA).minus(valB).dividedBy(valA);
    const resposta = new Decimal(100).mul(piece).toNumber()
    // resposta.toDecimalPlaces(2);
    check.assert.number(resposta);
    return resposta;
  } catch {
    // consola.warn("calcMargemLucro")
    return 0;
  }
}
