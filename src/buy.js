import db from "../src/conn.js";
import { schemaVendaBase } from "./schemas.js";

export default async function buy(entrada) {
  const venda = schemaVendaBase.validateSync(entrada, {
    stripUnknown: true,
  });
  const collection = db.collection("vendas");
  await collection.insertOne(venda);
  return venda;
}
