import buy from "../src/buy.js";
import { consola } from "consola";

const entrada = {
  username: "bruce",
  cart: [{ descricao: "abacaxi", quantidade: 1, valor: 1 }],
  // obs: 'verdão',
  // dt: new Date(),
};

const { _id } = await buy(entrada);
consola.success(_id);
process.exit();
