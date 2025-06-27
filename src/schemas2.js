import yup from 'yup'

const schemaBean = yup.object({
  identifier: yup.string().required(),
  descricao: yup.string().required(),
  quantidade: yup.number().integer().positive().required(),
  valor: yup.number().positive().required()
})

const schemaVenda = yup.object({
  _id: yup.string().required(),
  username: yup.string().required(),
  dt: yup.date().required(),
  obs: yup.string(),
  cart: yup.array().required().of(schemaBean).min(1)
})

export { schemaVenda }
