import yup from "yup";
import { validarAscii } from "../assertr.js";
import { Produto } from "../eagle.js";
import { nanoid } from "nanoid";

const schema = yup.object({
  id: yup.string().default(() => nanoid()),
  descricao: yup.string().trim().lowercase().required(),
  valor: yup.number().positive().required(),
});

export default async function upsertProduto(entrada) {
  // tenho que ter tudo para upsert
  const dto = await schema.validate(entrada, { stripUnknown: true });
  validarAscii(dto.descricao);
  await Produto.upsert(dto);
}
