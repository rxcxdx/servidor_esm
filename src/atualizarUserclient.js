import { Userclient } from './eagle.js'
import yup from 'yup'
import check from 'check-types'

const schema = yup.object({
  id: yup.string().required(),
  username: yup.string().lowercase().trim().required(),
  senha: yup.string().trim().required(),
  liberado: yup.boolean().required()
})

export default async function atualizarUserclient(entrada) {
  const o = await schema.validate(entrada, { stripUnknown: true })
  const modelo = await Userclient.findByPk(o.id)
  check.assert(modelo, 'userclient não existe')
  modelo.senha = o.senha;
  modelo.liberado = o.liberado;
  await modelo.save();
}
