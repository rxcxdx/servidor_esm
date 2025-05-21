import check from "check-types"
import db from "../src/conn.js";

export default async function apagarVendas(entrada) {
  const collection = db.collection("vendas");
  const { deletedCount } = await collection.deleteMany({ _id: { $in: entrada } })
  check.assert(deletedCount, 'nada foi apagado')
}