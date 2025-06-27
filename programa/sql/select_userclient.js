import sqlite3 from 'sqlite3'

const filename = '/home/rcd/apps/eagle.sqlite'
const db = new sqlite3.Database(filename)

const sql = 'SELECT * FROM userclients WHERE id=?'

const id = 'vTM4JzqCPuWWca1NTWdHs'

db.get(sql, id, (err, row) => {
  if (err) {
    console.log('erro fatal')
    return
  }
  console.log(row)
})