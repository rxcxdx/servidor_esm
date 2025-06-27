import sqlite3 from 'sqlite3'

const filename = '/home/rcd/apps/eagle.sqlite'
const db = new sqlite3.Database(filename)

const sql = 'DELETE FROM produtos'

db.exec(sql, (err) => {
  if (err) console.log('Erro fatal tente novamente')
})
