import { nanoid } from 'nanoid'
import yup from 'yup'

const schemaBean = yup.object({
  identifier: yup.string().default(() => nanoid()).required(),
  descricao: yup.string().required(),
  quantidade: yup.number().integer().required().positive(),
  valor: yup.number().required().min(0),
  obs: yup.string()
})

const schemaVenda = yup.object({
  _id: yup.string().default(() => nanoid()).required(),
  dt: yup.date().default(() => new Date()).required(),
  username: yup.string().required(),
  total: yup.number().required().min(0),
  obs: yup.string(),
  cart: yup.array().required().of(schemaBean).min(1,'cart vazio'),
})

const schemaProduto = yup.object({
  id: yup.string().required().default(() => nanoid()),
  descricao: yup.string().required(),
  valor: yup.number().required().positive(),
  categoriaId: yup.string().required()
})

export { schemaVenda, schemaProduto }
