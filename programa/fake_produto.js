import { gravarProduto } from '../src/eagle.js'
import { faker } from '@faker-js/faker'
import { nanoid } from 'nanoid'
const dto = {
  id: nanoid(),
  descricao: faker.commerce.product().toLowerCase(),
  valor: faker.number.float({ min: 2, max: 50, fractionDigits: 2 }),
  categoriaId: 'go3ECfiGEJmULsFhO7Ov4'
}
await gravarProduto(dto)
