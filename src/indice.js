import db from "../src/conn.js";
import { assertDayjs } from "../utils.js";

const OPT = {
  sort: [["dt", -1]],
  projection: { _id: true, dt: true },
};

// a como dayjs dia
// b como dayjs dia
export default async function indice(a, b) {
  assertDayjs(a);
  assertDayjs(b);
  const gte = a.startOf('d')
  const lte = b.endOf('d')
  const match = {
    dt: {
      $gte: gte.toDate(),
      $lte: lte.toDate(),
    },
  };
  const collection = db.collection("vendas");
  const vendas = await collection.find(match, OPT).toArray();
  return {
    inicio: gte.format(),
    fim: lte.format(),
    vendas
  }
} 

