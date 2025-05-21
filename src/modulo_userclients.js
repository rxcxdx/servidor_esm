import { Userclient } from "../eagle.js";
import check from "check-types";

export async function userclient(id) {
  const modelo = await Userclient.findByPk(id);
  check.assert(modelo, "userclient nao existe");
  return modelo.toJSON();
}

export async function userclients() {
  const docs = await Userclient.findAll({
    attributes: ["id", "username"],
    order: [["username", "ASC"]],
    raw: true
  });
  return docs
}
