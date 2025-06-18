import yup from 'yup'
import atualizarUserclient from '../src/atualizarUserclient.js'
import { faker } from '@faker-js/faker'

const schema = yup.object({
  id: yup.string().required(),
  username: yup.string().required().lowercase().trim(),
  senha: yup
    .string()
    .trim()
    .default(() => faker.internet.password()),
  liberado: yup.boolean().required()
})

export default async function wsAtualizarUserclient(req, res) {
  const o = await schema.validate(req.body, { stripUnknown: true })
  await atualizarUserclient(o)
  res.end()
}
