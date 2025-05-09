import db from "../src/conn.js";
import yup from "yup";
import dayjs from "dayjs";

const schema = yup.object({
  gte: yup.date().required(),
  lte: yup.date().required()
})

const OPT = {
  sort: [["dt", -1]],
  projection: { _id: true, dt: true },
};

export default async function indice(entrada) {
  const formulario = schema.validateSync(entrada, { stripUnknown: true })
  const match = {
    dt: {
      $gte: formulario.gte,
      $lte: formulario.lte,
    },
  };
  const collection = db.collection("vendas");
  const vendas = await collection.find(match, OPT).toArray();
  return {
    inicio: dayjs(formulario.gte).format(),
    fim: dayjs(formulario.lte).format(),
    linhas: vendas.length,
    vendas
  }
} 

