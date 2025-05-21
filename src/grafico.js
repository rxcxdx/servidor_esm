import db from "../src/conn.js";
import dayjs from "dayjs";
import buildGrafico from "./buildGrafico.js";
import { validarYearMonth } from "../assertr.js";

export default async function grafico(entrada) {
  validarYearMonth(entrada)
  const joker = dayjs(entrada)   
  const match = {
    dt: {
      $gte: joker.startOf("month").toDate(),
      $lte: joker.endOf("month").toDate()
    },
  };
  const collection = db.collection("vendas");
  const vendas = await collection.find(match).toArray();
  vendas.forEach((o) => {
    o.dia = dayjs(o.dt).format('DD')
  });
  return {
    descricao: joker.format('MMM/YYYY'),
    grafico: buildGrafico(vendas)
  }
}
