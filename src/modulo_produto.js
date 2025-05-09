import { Produto } from "../eagle.js"
import check from "check-types"
import { schemaProduto } from "./schemas.js"

const collator = new Intl.Collator('pt-BR')

export async function produtos() {
  const modelos = await Produto.findAll({ attributes: ['id', 'descricao'] })
  const docs = modelos.map(o => o.toJSON())
  docs.sort((a, b) => collator.compare(a.descricao, b.descricao))
  return docs
}

export async function loja() {
  const modelos = await Produto.findAll({ attributes: ['id', 'descricao', 'valor'] })
  const docs = modelos.map(o => o.toJSON())
  docs.sort((a, b) => collator.compare(a.descricao, b.descricao))
  return docs
}

export async function produto(productId) {
  const modelo = await Produto.findByPk(productId)
  check.assert(modelo, 'produto nao existe')
 return modelo.toJSON()
}

export async function gravarProduto(entrada) {  
  // PARA ATUALIZAR TENHO QUE ENVIAR TODOS OS CAMPOS
  const dto = schemaProduto.validateSync(entrada, { stripUnknown: true })
  await Produto.upsert(dto)
}
