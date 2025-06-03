import buy from "../src/buy.js";
import mockBean from "./mockBean.js";
import { sample } from "lodash-es";
import { faker } from "@faker-js/faker";

const QNT = 5;
const matrix = [];
for (let index = 0; index < QNT; index++) {
  matrix.push({
    username: sample(["bruce", 'zeca']),
    cart: [mockBean(), mockBean()],
    obs: faker.lorem.word(),
  });
}
for (const entrada of matrix) {
  const v = await buy(entrada);
  console.log(v);
}
process.exit();
