import { Sequelize, DataTypes } from 'sequelize'
import config from 'config'
import assert from 'node:assert/strict'

const STORAGE = config.get('eagle')

const CONFIG_GLOBAL = {
  freezeTableName: true
}

function conversor(modelos) {
  return modelos.map((o) => o.toJSON())
}

const sequeConexao = new Sequelize({
  dialect: 'sqlite',
  storage: STORAGE,
  logging: undefined,
  define: CONFIG_GLOBAL
})

const Produto = sequeConexao.define('produtos', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
})

async function upsertProduto(o) {
  await Produto.upsert(o)
}

async function getProduto(id) {
  const modelo = await Produto.findByPk(id, {
    rejectOnEmpty: true,
    attributes: ['id', 'descricao', 'valor']
  })
  return modelo.toJSON()
}

async function getProdutos() {
  const modelos = await Produto.findAll({
    attributes: ['id', 'descricao']
  })
  const rs = conversor(modelos)
  rs.sort((a, b) => a.descricao.localeCompare(b.descricao))
  return rs
}

async function loja() {
  const modelos = await Produto.findAll({
    attributes: ['id', 'descricao', 'valor']
  })
  const rs = conversor(modelos)
  rs.sort((a, b) => a.descricao.localeCompare(b.descricao))
  return rs
}

async function apagarProduto(id) {
  const destroyed = await Produto.destroy({ where: { id } })
  assert(destroyed, 'nada foi apagado')
}

async function sincronizar() {
  await sequeConexao.sync({ force: true })
}

export default {
  upsertProduto,
  getProduto,
  getProdutos,
  loja,
  apagarProduto,
  sincronizar
}