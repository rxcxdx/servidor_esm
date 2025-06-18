import { Userclient } from './eagle.js'

export default async function atualizarUserclient(o) {
  await Userclient.update(o, { where: { id: o.id } })
}
