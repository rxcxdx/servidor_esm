import yup from "yup";
import { Estoque } from "../eagle.js";
import { nanoid } from "nanoid";

const schema = yup.object({
  id: yup.string().default(() => nanoid()),
  descricao: yup.string().required().trim().lowercase(),
  quantidade: yup.number().required().integer(),
});

export default async function criarEstoque(entrada) {
  const dto = await schema.validate(entrada, { stripUnknown: true });
  await Estoque.create(dto);
}
