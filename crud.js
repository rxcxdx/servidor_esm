import { Produto, Userclient } from "./eagle.js";
import check from "check-types";

export async function produto(id) {
  const doc = await Produto.findByPk(id, { raw: true });
  check.assert(doc, "produto nao existe");
  return doc;
}

export async function produtos() {
  const docs = await Produto.findAll({
    attributes: ["id", "descricao"],
    order: [["descricao", "ASC"]],
    raw: true,
  });
  return docs;
}

export async function userclients() {
  const docs = await Userclient.findAll({
    attributes: ["id", "username"],
    raw: true,
  });
  return docs;
}

export async function loja() {
  const docs = await Produto.findAll({
    order: [["descricao", "ASC"]],
    raw: true,
  });
  return docs;
}

export async function userclient(id) {
  const modelo = await Userclient.findByPk(id);
  check.assert(modelo, "userclient nao existe");
  return modelo.toJSON();
}
