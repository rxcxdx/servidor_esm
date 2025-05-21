import { Produto } from "./eagle.js";

const dto = {
  id: 'l4k81Jh2i0sSFshq2t-GZ',
  descricao: 'conscendo',
  valor: 12
}

try {
  await Produto.update(dto, { where: { id: dto.id}})
} catch (err) {
  console.log('erro fatal')
  console.log(err.message);
}
