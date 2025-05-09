import { gravarProduto } from "../src/modulo_produto.js";
import { faker } from "@faker-js/faker";

// faker.commerce.product(),

const entrada = {
  descricao: faker.lorem.word(),
  valor: faker.number.float({ min: 6, max: 15, fractionDigits: 2 }),
  categoriaId: "H5Mhk3nsMb4cCuuzl83YJ",
  isAtalho: false,
};

try {
  await gravarProduto(entrada);
} catch (err) {
  console.log("ERRO FATAL");
  console.log(err.name);
  console.log(err.message);
}
