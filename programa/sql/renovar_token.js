import sqlite3 from 'sqlite3'
import { v4 as uuidv4 } from 'uuid'

const filename = '/home/rcd/apps/eagle.sqlite'
const db = new sqlite3.Database(filename)

const sql = 'UPDATE userclients SET access_token=? WHERE id=?'

const values = [uuidv4(), 'vTM4JzqCPuWWca1NTWdHs']

db.run(sql, values, (err) => {
  if (err) console.log('Erro fatal tente novamente')
})