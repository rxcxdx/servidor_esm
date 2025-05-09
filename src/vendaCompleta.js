import db from "../src/conn.js";
import check from "check-types";
import { calcSubtotalBean, reduzirVenda } from "../matematica.js";
import intl from "../intl.js";

export default async function vendaCompleta(v) {
  check.assert.nonEmptyString(v);
  const collection = db.collection("vendas");
  const venda = await collection.findOne({ _id: v });
  check.assert(venda, "venda nao existe");
  venda.cart.forEach((o) => {
    o.subtotal = calcSubtotalBean(o);
  });
  return {
    ...venda,
    ...reduzirVenda(venda),
    dia: intl.formatDate(venda.dt),
    hora: intl.formatTime(venda.dt, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }),
  };
}
