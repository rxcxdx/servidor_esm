import { Categoria } from "../eagle.js";
import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker";

const dto = {
  id: nanoid(),
  descricao: faker.color.human(),
}
await Categoria.create(dto)
