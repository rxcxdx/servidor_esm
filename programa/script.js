/*
exec(sql [, callback])
run(sql [, param, ...] [, callback])
all(sql [, param, ...] [, callback])
get(sql [, param, ...] [, callback])
*/

import sqlite3 from 'sqlite3'

const filename = '/home/rcd/apps/eagle.sqlite'
const db = new sqlite3.Database(filename)
const sql = 'SELECT * FROM userclients'


db.all(sql, (err, rows) => {
  if (err) {
    console.log('erro fatal')
    return
  }
  console.log(rows.length)
  console.log(rows)
})