import db from "../conn.js";
import check from "check-types"

export default async function apagarVendas(entrada) {
  const collection = db.collection("vendas");
  const { deletedCount } = await collection.deleteMany({ _id: { $in: entrada } })
  check.assert(deletedCount, 'nada foi apagado')
}