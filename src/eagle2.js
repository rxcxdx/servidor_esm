import sqlite3 from 'sqlite3'
import config from 'config'
import check from 'check-types'
import { schemaProduto } from './schemas.js'

const db = new sqlite3.Database(config.get('eagle'))

export async function produtos() {
  return new Promise((resolve, reject) => {
    db.all('SELECT id,descricao FROM produtos', (err, rows) => {
      if (err) {
        reject(err)
        return
      }
      rows.sort((a, b) => a.descricao.localeCompare(b.descricao))
      resolve(rows)
    })
  })
}

export async function loja() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM produtos', (err, rows) => {
      if (err) {
        reject(err)
        return
      }
      rows.sort((a, b) => a.descricao.localeCompare(b.descricao))
      resolve(rows)
    })
  })
}

export async function atualizarProduto(entrada) {  
  const o = await schemaProduto.validate(entrada, { stripUnknown: true })
  const sql = 'UPDATE produtos SET descricao=?,valor=? WHERE id=?'
  const params = [o.descricao, o.valor, o.id]
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

export async function produto(id) {
  const sql = 'SELECT * FROM produtos WHERE id=?'
  const params = [id]
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err)
        return
      }
      if (check.not.object(row)) {
        reject(new Error('produto não existe'))
        return
      }
      resolve(row)
    })
  })
}

export async function apagarProduto(id) {  
  const sql = 'DELETE FROM produtos WHERE id=?'
  const params = [id]
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err)
        return
      }
      if (!this.changes) {
        reject(new Error('nada foi apagado'))
        return
      }
      resolve()
    })
  })
}