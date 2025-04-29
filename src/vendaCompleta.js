import db from "../src/conn.js";
import check from "check-types";
import { calcSubtotalBean } from "../matematica.js";
import buildVendaCompleta from "./buildVendaCompleta.js";

// é ws
export default async function vendaCompleta(v) {
  check.assert.nonEmptyString(v);
  const collection = db.collection("vendas");
  const doc = await collection.findOne({ _id: v });
  check.assert(doc, "venda nao existe");
  const { total, itens } = buildVendaCompleta(doc);
  doc.cart.forEach((o) => {
    o.subtotal = calcSubtotalBean(o.quantidade, o.valor);
  });
  return {
    ...doc,
    total,
    itens,
  };
}
