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
  obs: yup.string().ensure().trim().lowercase(),
  cart: yup.array().required().of(schemaBean).min(1),
});

const schemaProduto = yup.object({
  id: yup.string().default(() => nanoid()),
  descricao: yup.string().trim().lowercase().required(),
  valor: yup.number().positive().required(),
  categoriaId: yup.string().required(),
  isAtalho: yup.boolean().required(),
});

const schemaDespesa = yup.object({
  id: yup.string().default(() => nanoid()),
  descricao: yup.string().required(),
  valor: yup.number().required().positive(),
  dt: yup.date().required(),
});

export { schemaVendaBase, schemaProduto, schemaDespesa, schemaBean };

