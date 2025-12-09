import { getVenda } from './flanker.js'
import { buildVenda } from './utils.js'

export default async function venda(v) {
  const registro = await getVenda(v)
  return buildVenda(registro)
}
