import { Categoria } from "../eagle.js"

export default async function categorias() {
  const modelos = await Categoria.findAll()
  const docs = modelos.map(o => o.toJSON())
  return docs
}

