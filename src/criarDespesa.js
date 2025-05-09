import { Despesa } from "../eagle.js";
import { schemaDespesa } from "../src/schemas.js";

export async function criarDespesa(entrada) {
  const dto = schemaDespesa.validateSync(entrada, { stripUnknown: true });
  await Despesa.create(dto);
}