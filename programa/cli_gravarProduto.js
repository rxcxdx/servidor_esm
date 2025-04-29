import gravarProduto from "../src/gravarProduto.js";
import { faker } from "@faker-js/faker";

const VALOR = faker.number.float({ fractionDigits: 2, min: 6, max: 15 });

// faker.commerce.product()
// faker.lorem.word()

const entrada = {
  id: '',
  descricao: faker.commerce.product(),
  valor: VALOR,
  categoriaId: 'H5Mhk3nsMb4cCuuzl83YJ',
  isAtalho: 'false'
};

try {
  await gravarProduto(entrada)
} catch (err) {
  console.log("ERRO FATAL");
  console.log(err.name);
  console.log(err.message);
}
