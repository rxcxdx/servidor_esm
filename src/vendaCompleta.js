import db from "../src/conn.js";
import check from "check-types";
import { reduzirVenda, calcSubtotalBean } from "../matematica.js";
import dayjs from "dayjs";

export default async function vendaCompleta(v) {
  const collection = db.collection("vendas");
  const venda = await collection.findOne({ _id: v });''
  check.assert(venda, "venda nao existe");
  venda.cart.forEach((o) => {
    o.subtotal = calcSubtotalBean(o);
  });
  return {
    ...venda,
    ...reduzirVenda(venda),
    dia: dayjs(venda.dt).format('DD/MM/YYYY'),
    hora: dayjs(venda.dt).format('HH:mm:ss')
  };
}
