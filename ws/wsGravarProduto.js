import yup from 'yup'
import { validarAscii } from '../src/assertr.js'
import gravarProduto from '../src/gravarProduto.js'
import { nanoid } from 'nanoid'

const schema = yup.object({
  id: yup.string().default(() => nanoid()),
  descricao: yup.string().trim().lowercase().required(),
  valor: yup.number().positive().required()
})

export default async function wsGravarProduto(req, res) {
  const dto = await schema.validate(req.body, { stripUnknown: true })
  validarAscii(dto.descricao)
  await gravarProduto(dto)
  res.end()
}
