import db from "../src/conn.js";
import yup from "yup";
import dayjs from "dayjs";
import { reduzirVendas } from "../matematica.js";

const schema = yup.object({
  gte: yup.date().required(),
  lte: yup.date().required(),
});

export default async function relatorioVendas(entrada) {
  const formulario = schema.validateSync(entrada, { stripUnknown: true });
  const match = {
    dt: {
      $gte: formulario.gte,
      $lte: formulario.lte,
    },
  };
  const collection = db.collection("vendas");
  const vendas = await collection.find(match).toArray();
  return {
    ...reduzirVendas(vendas),
    inicio: dayjs(formulario.gte).format(),
    fim: dayjs(formulario.lte).format(),
  };
}
