import db from "../src/conn.js";
import buildGraficoDias from "./buildGraficoDias.js";
import yup from "yup";
import dayjs from "dayjs";

export default async function graficoDias(entrada) {
  const joker = yup.date().required().validateSync(entrada)  
  const gte = dayjs(joker).startOf("month")
  const lte = dayjs(joker).endOf("month")
  const match = {
    dt: {
      $gte: gte.toDate(),
      $lte: lte.toDate(),
    },
  };
  const collection = db.collection("vendas");
  const vendas = await collection.find(match).toArray();
  vendas.forEach((o) => {
    o.dia = dayjs(o.dt).format('D')
  });
  return buildGraficoDias(vendas);
}
