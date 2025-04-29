import { Produto } from "../eagle.js"
import { schemaProduto } from "./schemas.js"

// PARA ATUALIZAR TENHO QUE ENVIAR TODOS OS CAMPOS
// é ws
export default async function gravarProduto(entrada) {
  const dto = await schemaProduto.validateAsync(entrada)
  await Produto.upsert(dto)
}


