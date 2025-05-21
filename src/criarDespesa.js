import yup from "yup";
import { Despesa } from "../eagle.js";
import { nanoid } from "nanoid";

const schema = yup.object({
  id: yup.string().default(() => nanoid()),
  descricao: yup.string().required(),
  valor: yup.number().required().positive(),
  dt: yup.date().required(),
});

export default async function criarDespesa(entrada) {
  const dto = schema.validateSync(entrada, { stripUnknown: true });
  await Despesa.create(dto);
}

