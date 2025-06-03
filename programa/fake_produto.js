import { faker } from "@faker-js/faker";
import upsertProduto from "../src/upsertProduto.js";

try {
  const entrada = {
    descricao: faker.commerce.product(),
    valor: faker.number.float({ min: 5, max: 29, fractionDigits: 2 }),
  };
  await upsertProduto(entrada);
} catch (err) {
  console.log("ERRO FATAL");
  console.log(err.name);
  console.log(err.message);
}
