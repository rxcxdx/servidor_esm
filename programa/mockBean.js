import { faker } from "@faker-js/faker";

const opt = {
  min: 5,
  max: 49,
};

export default function mockBean() {
  return {
    descricao: faker.commerce.product(),
    quantidade: 1,
    valor: faker.number.float(opt),
  };
}

