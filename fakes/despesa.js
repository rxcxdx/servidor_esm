import { nanoid } from 'nanoid'
import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'

const dto = {
  id: nanoid(),
  descricao: faker.lorem.word().toLowerCase(),
  valor: faker.number.float({ min: 100, max: 999, fractionDigits: 2 }),
  dt: dayjs().toDate()
}

console.log(dto)