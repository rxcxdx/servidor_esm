import yup from "yup";
import { Userclient } from "../eagle.js";

const schema = yup.object({
  id: yup.string().required(),
  senha: yup.string().required().trim(),
  liberado: yup.boolean().required(),
});

export default async function atualizarUserclient(entrada) {
  const dto = await schema.validate(entrada, { stripUnknown: true });
  await Userclient.update(dto, {
    where: { id: dto.id },
  });
}
