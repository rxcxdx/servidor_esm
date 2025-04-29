import { Produto } from "../eagle.js"
import check from "check-types"

export default async function produto(productId) {
  const modelo = await Produto.findByPk(productId)
  check.assert(modelo, 'produto nao existe')
 return modelo.toJSON()
}
