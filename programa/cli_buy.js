import buy from "../src/buy.js";
import { consola } from "consola";
import { faker } from "@faker-js/faker";
const entrada = {
  obs: faker.lorem.word(),
  username: "bruce",
  cart: [{ descricao: "abacaxi", quantidade: 1, valor: 1 }],
};
const { _id } = await buy(entrada);
consola.success(_id);
process.exit();
