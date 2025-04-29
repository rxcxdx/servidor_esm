import db from "../src/conn.js";
import { assertDayjs } from "../utils.js";
import buildGraficoHoras from "./buildGraficoHoras.js";

// recebe dia como dayjs
// é ws
export default async function graficoHoras(a) {
  assertDayjs(a);
  const gte = a.startOf('day').toDate();
  const lte = a.endOf('day').toDate();
  const match = {
    dt: {
      $gte: gte,
      $lte: lte,
    },
  };
  const collection = db.collection("vendas");
  const registros = await collection.find(match).toArray(); 
  return buildGraficoHoras(registros);
}

