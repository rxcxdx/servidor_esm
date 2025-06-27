import { Produto } from './eagle.js'
import yup from 'yup'
import { validarAscii } from '../src/assertr.js'
import { nanoid } from 'nanoid'

const schema = yup.object({
  id: yup.string().default(() => nanoid()).required(),
  descricao: yup.string().trim().lowercase().required(),
  valor: yup.number().positive().required()
})

export default async function upsertProduto(entrada) {
  const o = await schema.validate(entrada, { stripUnknown: true })
  validarAscii(o.descricao)
  await Produto.upsert(o)
}
