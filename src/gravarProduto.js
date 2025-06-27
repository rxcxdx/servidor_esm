import { Produto } from './eagle.js'

export default async function gravarProduto(o) {
  const [modelo, flag] = await Produto.findOrCreate({
    where: { id: o.id },
    defaults: o
  })
  if (flag === false) {
    await modelo.update(o)
  }
}

