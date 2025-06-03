import { input } from "@inquirer/prompts";
import { Produto } from "../eagle.js";
import check from "check-types";

try {
  const id = await input({ message: "Enter your id", required: true });
  const modelo = await Produto.findByPk(id);
  check.assert(modelo, "produto nao existe");
  await modelo.destroy();
} catch (err) {
  console.log("ERRO FATAL");
  console.log(err.name);
  console.log(err.message);
}
