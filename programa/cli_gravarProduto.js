import { faker } from "@faker-js/faker";
import gravarProduto from "../src/gravarProduto.js";

// faker.commerce.product(),
// faker.lorem.word()

const entrada = {
  // id: nanoid(),
  descricao: faker.commerce.product(),
  valor: faker.number.float({ min: 5, max: 29, fractionDigits: 2 }),
};

try {
  await gravarProduto(entrada);
} catch (err) {
  console.log("ERRO FATAL");
  console.log(err.name);
  console.log(err.message);
}
