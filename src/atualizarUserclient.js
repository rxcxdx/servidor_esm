import yup from "yup";
import { Userclient } from "../eagle.js";
import check from "check-types";

const schema = yup.object({
  id: yup.string().required(),
  username: yup.string().required().trim().lowercase(),
  senha: yup.string().required(),
  superuser: yup.boolean().required(),
  liberado: yup.boolean().required(),
});

export default async function atualizarUserclient(entrada) {
  const dto = schema.validateSync(entrada, { stripUnknown: true });
  const modelo = await Userclient.findByPk(dto.id);
  check.assert(modelo, "userclient nao existe");
  modelo.username = dto.username
  modelo.senha = dto.senha
  modelo.superuser = dto.superuser
  modelo.liberado = dto.liberado
 await modelo.save();
}



