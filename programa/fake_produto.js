import { faker } from '@faker-js/faker'
import { schemaProduto } from '../src/schemas.js'
import { nanoid } from 'nanoid'
import sqlite3 from 'sqlite3'
const db = new sqlite3.Database('/home/rcd/apps/eagle.sqlite')
const entrada = {
  id: nanoid(),
  descricao: faker.commerce.product(),
  valor: faker.number.float({ min: 5, max: 49, fractionDigits: 2 })
}
const o = schemaProduto.validateSync(entrada, { stripUnknown: true })
const sql = 'INSERT INTO produtos (id,descricao,valor) VALUES (?,?,?)'
const params = [o.id, o.descricao, o.valor]
db.run(sql, params, (err) => {
  if (err) console.log(err.message)
})
