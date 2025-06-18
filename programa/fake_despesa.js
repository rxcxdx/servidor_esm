import criarDespesa from '../src/criarDespesa.js'
import { faker } from '@faker-js/faker'

await criarDespesa({
  descricao: faker.lorem.word(),
  valor: faker.number.float({ min: 2, max: 99, fractionDigits: 2 }),
  dt: new Date()
})
