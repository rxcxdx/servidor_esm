import db from "../src/conn.js";
import check from "check-types"

// é ws
export default async function vendaSimples(v) {
  check.assert.nonEmptyString(v)
  const collection = db.collection("vendas");
  const doc = await collection.findOne({ _id: v })
  check.assert(doc, 'venda nao existe')
  return doc
}
