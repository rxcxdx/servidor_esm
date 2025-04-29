import { Despesa } from "../eagle.js"
import { faker } from "@faker-js/faker";
import { schemaDespesa } from "../src/schemas.js"

const VALOR = faker.number.float({ min: 50, max: 199 });

const entrada = {
  descricao: faker.lorem.words(),
  valor: VALOR,
  dt: Date.now(),
};

const dto = await schemaDespesa.validateAsync(entrada)

await Despesa.create(dto)
