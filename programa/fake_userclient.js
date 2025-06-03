import { faker } from "@faker-js/faker";
import { Userclient } from "../eagle.js";
import { nanoid } from "nanoid";

const entrada = {
  id: nanoid(),
  username: faker.internet.username(),
  senha: faker.internet.password(),
  liberado: true,
};

await Userclient.create(entrada);
