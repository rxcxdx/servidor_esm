import db from "../src/conn.js";
import { assertDayjs } from "../utils.js";
import buildRelatorioBeans from "./buildRelatorioBeans.js";

// recebe dia como dayjs
// é o ws
// devolve obj
export default async function relatorioBeans(a) {
  assertDayjs(a);
  const gte = a.startOf("d")
  const lte = a.endOf("d")
  const match = {
    dt: {
      $gte: gte.toDate(),
      $lte: lte.toDate(),
    },
  };
  const collection = db.collection("vendas");
  const registros = await collection.find(match).toArray();  
  return {
    relatorio: buildRelatorioBeans(registros.flatMap(o => o.cart)),
    inicio: gte.format(),
    fim: lte.format()
  }
}
