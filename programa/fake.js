import buy from '../src/buy.js'
import { sample } from 'lodash-es'
import { faker } from '@faker-js/faker'
import delay from 'delay'

function mockBean() {
  return {
    descricao: faker.commerce.product(),
    quantidade: faker.number.int({ min: 1, max: 3 }),
    valor: faker.number.float({ min: 5, max: 49, fractionDigits: 2 })
  }
}

const QNT = 3
const matrix = []
for (let index = 0; index < QNT; index++) {
  matrix.push({
    username: sample(['bruce', 'zeca']),
    cart: [mockBean(), mockBean()],
    obs: faker.lorem.word()
  })
}
for (const entrada of matrix) {
  const v = await buy(entrada)
  console.log(v)
  await delay(1000)
}
process.exit()
