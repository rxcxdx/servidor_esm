import { Produto } from "../eagle.js"
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

// trocar nome do arquivo
