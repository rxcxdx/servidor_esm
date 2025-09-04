import assert from 'node:assert/strict'
import { Sequelize, DataTypes } from 'sequelize'
import config from 'config'
import { schemaProduto } from './schemas.js'

const STORAGE = config.get('eagle')
const CONFIG_GLOBAL = { timestamps: false, freezeTableName: true }
const sequeConexao = new Sequelize({
  dialect: 'sqlite',
  storage: STORAGE,
  logging: undefined,
  define: CONFIG_GLOBAL
})

const Produto = sequeConexao.define('produtos', {
  id: { type: DataTypes.TEXT, primaryKey: true, allowNull: false },
  descricao: { type: DataTypes.TEXT, unique: true, allowNull: false },
  valor: { type: DataTypes.REAL, allowNull: false }
})

const Userclient = sequeConexao.define('userclients', {
  id: { type: DataTypes.TEXT, primaryKey: true, allowNull: false },
  username: { type: DataTypes.TEXT, unique: true, allowNull: false },
  password: { type: DataTypes.TEXT, allowNull: false },
  token: { type: DataTypes.TEXT, allowNull: false }
})

export async function apagarProduto(id) {
  const destroyed = await Produto.destroy({ where: { id } })
  assert(destroyed)
}

export async function gravarProduto(entrada) {
  const o = await schemaProduto.validate(entrada, { stripUnknown: true })
  await Produto.upsert(o)
}

export async function buscarProduto(id) {
  const o = await Produto.findByPk(id, { raw: true, rejectOnEmpty: true })
  return o
}

export async function buscarProdutos() {
  const docs = await Produto.findAll({
    raw: true,
    attributes: ['id', 'descricao']
  })
  docs.sort((a, b) => a.descricao.localeCompare(b.descricao))
  return docs
}

export async function grant(token) {
  await Userclient.findOne({
    where: { token },
    rejectOnEmpty: true
  })
}

export async function signin(username, password) {
  const modelo = await Userclient.findOne({
    where: { username, password },
    rejectOnEmpty: true
  })
  return { access_token: modelo.token }
}

export async function buscarUserclients() {
  const docs = await Userclient.findAll({ raw: true })
  return docs
}

export async function loja() {
  const docs = await Produto.findAll({ raw: true })
  docs.sort((a, b) => a.descricao.localeCompare(b.descricao))
  return docs
}
