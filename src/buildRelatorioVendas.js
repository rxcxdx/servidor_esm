import { sumBy } from "lodash-es";
import { discovery } from "../matematica.js";

function calcItens(cart) {  
  return sumBy(cart, 'quantidade')
}

export default function buildRelatorioVendas(vendas) {
  return {
    linhas: vendas.length,
    itens: calcItens(vendas.flatMap(o => o.cart)),
    total: discovery(vendas),
  };
}

