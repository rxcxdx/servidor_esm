import db from "../src/conn.js";
import { assertDayjs } from "../utils.js";
import buildRelatorioVendas from "./buildRelatorioVendas.js";

// recebe dia como dayjs
// é o ws
// devolve obj
export default async function relatorioVendas(a) {
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
  const vendas = await collection.find(match).toArray();
  const { linhas, itens, total } = buildRelatorioVendas(vendas)
  return {
    linhas,
    itens,
    total,
    inicio: gte.format(),
    fim: lte.format()
  };
}

