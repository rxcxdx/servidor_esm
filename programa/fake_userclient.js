import { faker } from '@faker-js/faker'
import { schemaUserclient } from '../src/schemas.js'
import { nanoid } from 'nanoid'
import sqlite3 from 'sqlite3'
const db = new sqlite3.Database('/home/rcd/apps/eagle.sqlite')
const entrada = {
  id: nanoid(),
  username: faker.internet.username(),
  senha: faker.internet.password(),
  access_token: nanoid()
}
const o = schemaUserclient.validateSync(entrada, { stripUnknown: true })
const sql = 'INSERT INTO userclients (id,username,senha,access_token) VALUES (?,?,?,?)'
const params = [o.id, o.username, o.senha, o.access_token]
db.run(sql, params, (err) => {
  if (err) console.log(err.message)
})
