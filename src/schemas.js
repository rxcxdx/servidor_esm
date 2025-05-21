import { nanoid } from "nanoid";
import yup from "yup";

const schemaBean = yup.object({
  identifier: yup.string().default(() => nanoid()),
  descricao: yup.string().lowercase().required(),
  quantidade: yup.number().integer().positive().required(),
  valor: yup.number().positive().required(),
});

const schemaVendaBase = yup.object({
  _id: yup.string().default(() => nanoid()),
  username: yup.string().required(),
  dt: yup.date().default(() => new Date()),
  obs: yup.string().lowercase().trim().min(1), 
  // yup.string().ensure().trim().lowercase(),
  cart: yup.array().required().of(schemaBean).min(1),
});

export { schemaVendaBase, schemaBean };

