import yup from "yup";
import check from "check-types";
import db from "../src/conn.js";

const OPTIONS = {
  projection: { _id: true, obs: true },
  sort: [["dt", -1]],
  limit: 8,
};

const schema = yup.object({
  tamanho: yup.number().integer().min(0).required(),
});

export default async function cvendas(formulario) {
  const isValid = schema.isValidSync(formulario, { strict: true });
  check.assert(isValid, "entrada inváldia");
  const filtro = {
    cart: { $size: formulario.tamanho },
  };
  const collection = db.collection("vendas");
  const docs = await collection.find(filtro, OPTIONS).toArray();
  return docs;
}
