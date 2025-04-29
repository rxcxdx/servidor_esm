import Joi from "joi";
import check from "check-types";
import db from "../src/conn.js";

const OPTIONS = {
  projection: { _id: true, dt: true, obs: true },
  sort: [["dt", -1]],
  limit: 20,
};

const schemao = Joi.object({
  tamanho: Joi.number().integer().min(0).empty(''),
  exists: Joi.boolean().empty(''),
  pattern: Joi.string().empty(''),
}).required();

export default async function cvendas(entrada) {
  const formulario = await schemao.validateAsync(entrada);
  const filtro = {};
  if (check.number(formulario.tamanho)) {
    filtro.cart = { $size: formulario.tamanho };
  }
  if (check.boolean(formulario.exists)) {
    filtro.obs = { $exists: formulario.exists };
  }
  if (check.string(formulario.pattern)) {
    filtro.obs = { $regex: formulario.pattern, $options: "i" };
  }
  const collection = db.collection("vendas");
  const docs = await collection.find(filtro, OPTIONS).toArray();
  return docs;
}
