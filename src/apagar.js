import check from "check-types"
import db from "../src/conn.js";

export default async function apagar(entrada) {
  check.assert.nonEmptyArray(entrada, 'nenhuma venda')
  const collection = db.collection("vendas");
  const { deletedCount } = await collection.deleteMany({ _id: { $in: entrada } })
  check.assert(deletedCount, 'nada foi apagado')
}