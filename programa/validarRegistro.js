import { schemaVenda } from '../src/schemas2.js'

export default function validarRegistro(o) {
  return schemaVenda.isValidSync(o, { strict: true })
}