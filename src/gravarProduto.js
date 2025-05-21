import yup from "yup";
import { validarAscii } from "../assertr.js";
import { Produto } from "../eagle.js";
import { nanoid } from "nanoid";

const schema = yup.object({
  id: yup.string().default(() => nanoid()),
  descricao: yup.string().trim().lowercase().required(),
  valor: yup.number().positive().required(),
});

export default async function gravarProduto(entrada) {
  // sim tenho que ter tudo
  const dto = schema.validateSync(entrada, { stripUnknown: true });
  validarAscii(dto.descricao);
  await Produto.upsert(dto);
}
