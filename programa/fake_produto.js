import sqlite3 from 'sqlite3'
import { nanoid } from 'nanoid'
import { faker } from '@faker-js/faker'

const filename = '/home/rcd/apps/eagle.sqlite'
const db = new sqlite3.Database(filename)
const sql = 'INSERT INTO produtos (id, descricao, valor) VALUES(?, ?, ?)'
const values = [
  nanoid(),
  faker.commerce.product().toLowerCase(),
  faker.number.float({ min: 5, max: 29, fractionDigits: 2 })
]
db.run(sql, values, (err) => {
  if (err) console.log('Erro fatal tente novamente')
})
