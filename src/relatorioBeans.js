import db from "../src/conn.js";
import dayjs from "dayjs";
import yup from "yup";
import { filter } from "lodash-es";
import buildRelatorioBeans from "./buildRelatorioBeans.js";

const schema = yup.object({
  gte: yup.date().required(),
  lte: yup.date().required(),
  descricao: yup.string().ensure(),
});

export default async function relatorioBeans(entrada) {
  const formulario = schema.validateSync(entrada, { stripUnknown: true });
  const match = {
    dt: {
      $gte: formulario.gte,
      $lte: formulario.lte,
    },
  };
  const collection = db.collection("vendas");
  const vendas = await collection.find(match).toArray();
  let cart = vendas.flatMap((o) => o.cart);
  if (formulario.descricao) {
    cart = filter(cart, (o) => o.descricao.includes(formulario.descricao));
  }
  return {
    ...buildRelatorioBeans(cart),
    inicio: dayjs(formulario.gte).format(),
    fim: dayjs(formulario.lte).format(),
  };
}
