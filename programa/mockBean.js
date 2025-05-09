import { faker } from "@faker-js/faker";

export default function mockBean() {
  return {
    descricao: faker.commerce.product(),
    quantidade: faker.number.int({ min: 1, max: 3 }),
    valor: faker.number.float({ min: 5, max: 49, fractionDigits: 2 }),
  };
}
