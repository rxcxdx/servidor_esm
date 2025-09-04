import { nanoid } from 'nanoid'
import yup from 'yup'

const schemaBean = yup.object({
  identifier: yup
    .string()
    .default(() => nanoid())
    .required(),
  descricao: yup.string().required(),
  quantidade: yup.number().integer().required().positive(),
  valor: yup.number().required().min(0),
  obs: yup.string()
})

export const schemaVenda = yup.object({
  _id: yup
    .string()
    .default(() => nanoid())
    .required(),
  dt: yup
    .date()
    .default(() => new Date())
    .required(),
  username: yup.string().required(),
  total: yup.number().required().min(0),
  cart: yup.array().required().of(schemaBean).min(1, 'Carrinho vazio'),
  obs: yup.string()
})

export const schemaProduto = yup.object({
  id: yup
    .string()
    .default(() => nanoid())
    .required(),
  descricao: yup.string().required(),
  valor: yup.number().required().positive()
})

export const schemaUserclient = yup.object({
  id: yup.string().required(),
  username: yup.string().required(),
  senha: yup.string().required(),
  access_token: yup.string().required()
})
