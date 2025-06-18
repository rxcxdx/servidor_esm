import sqlite3 from 'sqlite3'
import { nanoid } from 'nanoid'
import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'

const filename = '/home/rcd/apps/eagle.sqlite'
const db = new sqlite3.Database(filename)
const sql =
  'INSERT INTO userclients (id, username, senha, liberado, access_token) VALUES(?, ?, ?, ?, ?)'
const values = [
  nanoid(),
  faker.person.firstName().toLowerCase(),
  faker.internet.password(),
  1,
  uuidv4()
]
db.run(sql, values, (err) => {
  if (err) console.log('Erro fatal tente novamente')
})
