import db from "../conn.js";
import check from "check-types";
import { reduzirVenda } from "../matematica.js";
import { calcSubtotalBean } from "../modulo_calcSubtotalBean.js";

export default async function buildVenda(id) {
  const collection = db.collection("vendas");
  const venda = await collection.findOne({ _id: id });
  check.assert(venda, "venda nao existe");
  const { itens, total } = reduzirVenda(venda);
  venda.cart.forEach((o) => {
    o.subtotal = calcSubtotalBean(o);
  });  
  venda.itens = itens;
  venda.total = total;
  return venda;
}
