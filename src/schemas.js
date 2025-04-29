import Joi from "joi";
import { nanoid } from "nanoid";

const schemaCartItem = Joi.object({
  identifier: Joi.string().default(() => nanoid()),
  descricao: Joi.string().required().lowercase(),
  quantidade: Joi.number().required().integer().positive(),
  valor: Joi.number().required().positive().precision(2),
}).required();

const schemaVendaBase = Joi.object({
  _id: Joi.string().default(() => nanoid()),
  username: Joi.string().required(),
  cart: Joi.array().required().min(1).items(schemaCartItem),
  obs: Joi.string().trim().lowercase().empty(""),
  dt: Joi.date().default(() => new Date()),
}).required();

const schemaProduto = Joi.object({
  id: Joi.string().default(() => nanoid()).empty(''),
  descricao: Joi.string().required().trim().lowercase(),
  valor: Joi.number().required().positive().precision(2),
  categoriaId: Joi.string().required(),
  isAtalho: Joi.boolean().required()
}).required()


const schemaDespesa = Joi.object({
  id: Joi.string().default(() => nanoid()),
  descricao: Joi.string().required().lowercase().trim(),
  valor: Joi.number().required().positive().precision(2),
  dt: Joi.date().required()
}).required()


export { schemaVendaBase, schemaProduto, schemaDespesa };

