import db from "../src/conn.js";
import { assertDayjs } from "../utils.js";
import buildGraficoDias from "./buildGraficoDias.js";

// recebe mes como dayjs
// é ws
export default async function graficoDias(a) {
  assertDayjs(a);
  const gte = a.startOf("month").toDate();
  const lte = a.endOf("month").toDate();
  const match = {
    dt: {
      $gte: gte,
      $lte: lte,
    },
  };
  const collection = db.collection("vendas");
  const registros = await collection.find(match).toArray();
  return buildGraficoDias(registros);
}
