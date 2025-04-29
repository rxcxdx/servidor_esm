import db from "../src/conn.js";

const OPTIONS = {
  sort: [["dt", -1]],
  limit: 40,
};

// é ws
export default async function timeline() {
  const collection = db.collection("vendas");
  const docs = await collection.find({}, OPTIONS).toArray();
  return docs.flatMap((o) => o.cart);
}
