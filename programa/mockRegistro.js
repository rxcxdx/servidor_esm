import { nanoid } from 'nanoid'
import { faker } from '@faker-js/faker'
import validarRegistro from './validarRegistro.js'
import assert from 'node:assert/strict'

export default function mockRegistro() {
  const o = {
    _id: nanoid(),
    dt: new Date(),
    username: 'zeca',
    cart: [
      {
        identifier: nanoid(),
        valor: 10,
        quantidade: 1,
        descricao: faker.commerce.product()
      },
      {
        identifier: nanoid(),
        valor: 10.12,
        quantidade: 1,
        descricao: faker.commerce.product()
      }
    ]
  }  
  assert(validarRegistro(o), 'REGISTRO INVÁLIDO')
  return o
}